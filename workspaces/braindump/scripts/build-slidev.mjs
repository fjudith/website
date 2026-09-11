#!/usr/bin/env node
/**
 * Build step for Slidev decks.
 *
 * Decks live in an npm workspace under `slides/`, one package per deck:
 *   slides/decks/<name>/package.json   (name, its own @slidev/cli version)
 *   slides/decks/<name>/slides.md      (the deck source + colocated assets)
 *
 * Each deck is built via its OWN `npm run build` (so it uses the Slidev
 * version pinned in that deck's package.json), with the base path, output
 * directory and router mode passed through. The built app is emitted to
 * `static/slides/<name>/`, which Docusaurus serves verbatim at
 * `/slides/<name>/` (embeddable via the <Slides> component).
 *
 * Passed to each deck build:
 *   --base <baseUrl>/slides/<name>/   so assets resolve under the subdirectory
 *   --out  <abs>/static/slides/<name> so output lands where Docusaurus serves it
 *   --router-mode hash                so routing works without server rewrites
 *
 * After building, a manifest is written to `src/slides-manifest.json` listing
 * every deck (name, title, path). The decks index page reads this manifest.
 */
import { execFile } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const root = fileURLToPath(new URL('..', import.meta.url));
const slidesWorkspace = join(root, 'slides');
const decksDir = join(slidesWorkspace, 'decks');
const outRoot = join(root, 'static', 'slides');
const manifestFile = join(root, 'src', 'slides-manifest.json');

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

// Docusaurus baseUrl prefix (e.g. "/website/" on GitHub Pages, "/" locally).
// Slidev assets must resolve under the same prefix the site is served from.
const siteBase = (process.env.DOCUSAURUS_BASE_URL || '/').replace(/\/+$/, '');

// Limit build concurrency to keep CI memory/CPU reasonable.
const CONCURRENCY = Math.max(1, Number(process.env.SLIDEV_CONCURRENCY) || 3);

/**
 * Discover decks. Returns [{ name, dir, entry }].
 * A deck is a workspace package folder with a slides.md:
 *   slides/decks/<name>/slides.md
 */
function discoverDecks() {
  let entries;
  try {
    entries = readdirSync(decksDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const decks = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === 'node_modules') continue;

    const dir = join(decksDir, entry.name);
    const slidesMd = join(dir, 'slides.md');
    try {
      if (statSync(slidesMd).isFile()) {
        decks.push({ name: entry.name, dir, entry: slidesMd });
      }
    } catch {
      // No slides.md in this folder — not a deck, skip.
    }
  }
  return decks.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Extract the `title` from a deck's YAML frontmatter (first --- ... --- block).
 * Falls back to the deck name. Kept intentionally simple — no YAML dependency.
 */
function readDeckTitle(entry, fallback) {
  try {
    const text = readFileSync(entry, 'utf8');
    const match = text.match(/^---\n([\s\S]*?)\n---/);
    if (match) {
      const titleLine = match[1]
        .split('\n')
        .find((line) => /^title\s*:/.test(line));
      if (titleLine) {
        return titleLine
          .replace(/^title\s*:/, '')
          .trim()
          .replace(/^['"]|['"]$/g, '');
      }
    }
  } catch {
    /* ignore */
  }
  return fallback;
}

/**
 * Whether this deck's Slidev version supports `--router-mode`. Older versions
 * (e.g. v51) do not and error on unknown args, so probe `build --help`.
 */
async function supportsRouterMode(dir) {
  try {
    const { stdout } = await execFileAsync(
      npmCmd,
      ['exec', '--', 'slidev', 'build', '--help'],
      { cwd: dir, maxBuffer: 1024 * 1024 * 16 },
    );
    return /router-mode/.test(stdout);
  } catch {
    return false;
  }
}

async function buildDeck({ name, dir }) {
  const base = `${siteBase}/slides/${name}/`;
  const out = join(outRoot, name);

  const args = ['run', 'build', '--', '--out', out, '--base', base];
  // Hash routing avoids server rewrites for subdirectory deploys, but only
  // pass it to Slidev versions that support the flag.
  if (await supportsRouterMode(dir)) {
    args.push('--router-mode', 'hash');
  } else {
    console.log(
      `[slidev] ${name}: Slidev version has no --router-mode; building without it`,
    );
  }

  console.log(`[slidev] building ${name} -> static/slides/${name}/`);
  // Run the deck's own build script (uses its pinned Slidev version). Args
  // after `--` are forwarded to `slidev build`.
  await execFileAsync(npmCmd, args, { cwd: dir, maxBuffer: 1024 * 1024 * 64 });
}

/** Run tasks with bounded concurrency. */
async function runPool(items, worker, limit) {
  const results = [];
  let index = 0;
  const runners = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (index < items.length) {
        const current = items[index++];
        results.push(await worker(current));
      }
    },
  );
  await Promise.all(runners);
  return results;
}

async function main() {
  const decks = discoverDecks();

  // Always (re)write the manifest, even when empty, so the index page has a
  // file to import.
  mkdirSync(join(root, 'src'), { recursive: true });

  if (decks.length === 0) {
    console.log('[slidev] no decks found in slides/decks, skipping build.');
    writeFileSync(manifestFile, JSON.stringify({ decks: [] }, null, 2) + '\n');
    return;
  }

  // The slides workspace has its own dependencies; make sure they are
  // installed before building any deck.
  if (!existsSync(join(slidesWorkspace, 'node_modules'))) {
    console.log('[slidev] installing slides workspace dependencies...');
    await execFileAsync(npmCmd, ['ci'], {
      cwd: slidesWorkspace,
      maxBuffer: 1024 * 1024 * 64,
    }).catch(() =>
      // Fall back to `npm install` if there is no lockfile yet.
      execFileAsync(npmCmd, ['install'], {
        cwd: slidesWorkspace,
        maxBuffer: 1024 * 1024 * 64,
      }),
    );
  }

  // Clean slate so removed decks don't linger.
  rmSync(outRoot, { recursive: true, force: true });
  mkdirSync(outRoot, { recursive: true });

  try {
    await runPool(decks, buildDeck, CONCURRENCY);
  } catch (err) {
    console.error('[slidev] build failed:', err.stderr || err.message);
    process.exit(1);
  }

  const manifest = {
    decks: decks.map(({ name, entry }) => ({
      name,
      title: readDeckTitle(entry, name),
      path: `/slides/${name}/`,
    })),
  };
  writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + '\n');

  console.log(`[slidev] done. Built ${decks.length} deck(s).`);
}

main();
