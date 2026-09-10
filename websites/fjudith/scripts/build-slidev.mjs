#!/usr/bin/env node
/**
 * Build step for Slidev decks.
 *
 * Each `slides/<name>.md` deck is built to a self-contained static app under
 * `static/slides/<name>/`. Docusaurus serves everything in `static/` verbatim,
 * so the deck is reachable at `/slides/<name>/` and can be embedded via an
 * <iframe> (see src/components/Slides).
 *
 * We use:
 *   --base /slides/<name>/   so assets resolve under the subdirectory
 *   --router-mode hash       so client-side routing works without server rewrites
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const slidesDir = join(root, 'slides');
const outRoot = join(root, 'static', 'slides');
const slidevBin = join(root, 'node_modules', '.bin', 'slidev');

// Docusaurus baseUrl prefix (e.g. "/website/" on GitHub Pages, "/" locally).
// Slidev assets must resolve under the same prefix the site is served from.
const siteBase = (process.env.DOCUSAURUS_BASE_URL || '/').replace(/\/+$/, '');

let decks = [];
try {
  decks = readdirSync(slidesDir).filter(
    (f) => f.endsWith('.md') && statSync(join(slidesDir, f)).isFile(),
  );
} catch {
  console.log('[slidev] no slides/ directory found, skipping.');
  process.exit(0);
}

if (decks.length === 0) {
  console.log('[slidev] no *.md decks found, skipping.');
  process.exit(0);
}

// Start from a clean slate so removed decks don't linger.
rmSync(outRoot, { recursive: true, force: true });
mkdirSync(outRoot, { recursive: true });

for (const deck of decks) {
  const name = basename(deck, '.md');
  const entry = join(slidesDir, deck);
  const base = `${siteBase}/slides/${name}/`;
  const out = join(outRoot, name);

  console.log(`[slidev] building ${deck} -> static/slides/${name}/`);
  execFileSync(
    slidevBin,
    ['build', entry, '--out', out, '--base', base, '--router-mode', 'hash'],
    { stdio: 'inherit', cwd: root },
  );
}

console.log('[slidev] done.');
