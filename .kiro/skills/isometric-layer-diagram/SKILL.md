---
name: isometric-layer-diagram
description: Produce an isometric "painted floor" SVG diagram — a stack of exploded 2.5D slabs where each layer carries its own colour-coded component tiles, plus translucent walls for cross-cutting concerns. Use when asked for an isometric, 2.5D, exploded-layer or stacked-floor figure of a layered architecture (platform layers, network zones, tech stack, capability map), when redrawing a flat layered diagram in isometric style, or when authoring/regenerating a hand-built SVG illustration for a Docusaurus post in this repo.
metadata:
  author: fjudith
  version: '1.0'
compatibility: Requires python3. Visual verification requires node and a one-off `npm install --no-save @resvg/resvg-js` at the workspace root.
---

## What this produces

A single hand-generated SVG: N slabs in dimetric projection, stacked and exploded
vertically so every floor stays visible; each floor "painted" with tiles for its
components, coloured by nature (build / managed / infrastructure / open standard /
user surface / emerging); one or two translucent walls standing on the back edges
to carry cross-cutting concerns; a legend; per-layer titles in a right-hand column.

Canonical implementation, and the file to copy as a starting point:
`workspaces/docusaurus/scripts/gen-couches-iso-svg.py` → `workspaces/docusaurus/static/img/couches-plateformes-agentiques-iso.svg`

## Non-negotiables

1. **Generate the SVG from a script, never by hand.** Isometric coordinates are
   arithmetic; hand-written path data cannot be adjusted. One script per figure,
   self-contained, no shared library.
2. **Look at the rendered result before claiming it works.** Every mistake in this
   kind of figure is a visual one: text spilling out of a tile, two labels
   colliding, a slab hiding the one below. XML validity proves nothing.
3. **Content lives in a data table at the top of the script**, not inline in the
   drawing code, so the figure can be re-cut without touching geometry.

## Repo conventions

| Concern | Convention |
| --- | --- |
| Generator | `workspaces/docusaurus/scripts/gen-<topic>-svg.py`, French docstring stating projection, palette and output path |
| Output | `workspaces/docusaurus/static/img/<topic>.svg`, referenced in MDX as `/img/<topic>.svg` |
| Formatting | `**/*.svg` is in `.prettierignore`; the `.mdx` is not — run `npx prettier --check` on it |
| Palette | House palette and colour semantics: `references/palette.md` |
| Geometry | Projection, occlusion budget, text placement: `references/geometry.md` |

## Workflow

1. **Settle the content first.** List the layers bottom-to-top, and for each one at
   most 3 front tiles + 3 back tiles. Tile labels are ≤ 14 characters — budget them
   now, abbreviate deliberately (`Reg. modèles`, `Mém. session`), and put the full
   wording in the layer's right-hand caption instead.
2. **Copy the canonical generator** and replace the `LAYERS` table. Keep the
   geometry constants unless the layer count changes.
3. **Re-check the occlusion budget** if you change `STEP`, `SD`, or the row layout:
   `ROWS[1] + TILE_D ≤ STEP / (2 × S)`. Violate it and the top of each floor
   disappears under the next one. See `references/geometry.md`.
4. **Generate**: `python3 workspaces/docusaurus/scripts/gen-<topic>-svg.py`
5. **Verify** — all four steps, in order:
   ```bash
   python3 -c "import xml.dom.minidom as m; m.parse('workspaces/docusaurus/static/img/<topic>.svg')"
   npm install --no-save @resvg/resvg-js          # once per machine
   node .kiro/skills/isometric-layer-diagram/scripts/render-svg.mjs \
        workspaces/docusaurus/static/img/<topic>.svg /tmp/check.png 1400
   ```
   Then read `/tmp/check.png` and run the review checklist below.
6. **Wire it into the MDX** with alt text that carries the same substance as
   `<desc>`, and run `npx prettier --check` on the `.mdx`.
7. **Delete scratch artifacts** (`/tmp/check.png`, any throwaway renderer dir).

## Review checklist — read the PNG against this

- No tile label crosses its tile border, and none overlaps a neighbouring tile.
- Every layer shows its tiles; nothing is swallowed by the slab above.
- The two wall labels do not collide near the shared corner.
- Wall labels stay inside their wall: length ≤ footprint × C.
- Layer titles read as belonging to their own slab, not the one below — align each
  title on its slab's right tip and draw a dotted leader to it.
- Light fills carry dark ink, dark fills carry white ink.
- Nothing is clipped by the viewBox.

## Pitfalls that cost real time

- **Never use the CSS `font:` shorthand.** Browsers accept it; resvg and several
  other renderers drop the *entire rule*, so text falls back to black at default
  size and the figure silently breaks outside a browser. Use longhand
  `font-size` / `font-weight` / `fill`, plus one `text { font-family: … }` rule and
  a `.mono` class for monospace (class beats element selector).
- **Draw tiles as explicit screen-space polygons**, not as rects inside a
  transformed group. Group transforms scale stroke widths non-uniformly and drag
  pattern fills along with them.
- **Painter's algorithm, twice**: slabs bottom-to-top, and within a slab the back
  row before the front row. Walls are drawn before all slabs.
- **In-plane text is sheared, never squashed.** `matrix(C S 0 1 px py)` keeps full
  glyph height while the baseline follows the tile edge. A true in-plane matrix
  compresses letters to `S` of their height — illegible.
- **Text length is a hard constraint, not a hope.** Monospace ≈ 0.6 em per glyph
  plus letter-spacing; multiply by `C` for the sheared screen length. Compare
  against the available run computed in `references/geometry.md` before generating.
- Bright fills at 7 px with white text fall under 3:1. Flip the ink to dark rather
  than the fill to dark — it keeps the reference palette recognisable.

## Accessibility

`role="img"` plus `aria-labelledby` pointing at a `<title>` and a `<desc>`. The
`<desc>` is the only access a screen-reader user gets to the content: enumerate the
layers bottom-to-top, state what the colour coding means, and name the cross-cutting
walls. The MDX alt text repeats the same substance.
