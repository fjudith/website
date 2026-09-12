# Palette, colour semantics, typography

The palette comes from the enterprise application-landscape diagram used as the
house reference (dark navy canvas, flat colour-coded boxes, legend bottom-left).
Reuse it verbatim so figures across posts read as one family.

## Canvas and structure

| Role | Colour |
| --- | --- |
| Background | `#16253c` |
| Slab top face | `#1e3350` |
| Slab left face | `#172a44` |
| Slab right face | `#122238` |
| Slab / panel outline | `#2f4d78` |
| Legend panel | `#1a2c47` |
| Primary text | `#eaf2f8` |
| Secondary text | `#9fb4c7` |
| Layer numbers | `#5d7997` |

Two flat side-face tints rather than one: without the darker right face the slabs
lose their thickness at small sizes.

## Component tiles — the colour *means* something

Colour encodes the **nature** of the component, never the layer it belongs to.
That is what makes the figure diagnostic rather than decorative: a floor that is
all green is a floor you own, a floor that is all pale is a floor you rent.

| Nature | Fill | Outline | Ink |
| --- | --- | --- | --- |
| Differentiating brick (build) | `#3aae4a` | `#7fd88a` | `#07230c` |
| Managed service (buy) | `#b9d0e1` | `#dcebf5` | `#10202e` |
| Infrastructure | `#4d6d8b` | `#8aa7bf` | `#ffffff` |
| Open standard (MCP, A2A) | `url(#hatch)` teal `#17808f` + `#2ea3b0` | `#2ea3b0` | `#ffffff` |
| User surface | `#29a4e3` | `#9fd8f4` | `#04222f` |
| Emerging / low maturity | slab colour, dashed `3 2` | `#ffffff` | `#ffffff` |

Cross-cutting walls: `#17808f` at `fill-opacity .2` (near wall) and `.13` (far
wall), outline `#2ea3b0` at `.65`. The two opacities give the volume a readable
front/back.

Hatch pattern — screen space, so the angle stays constant across tiles:

```xml
<pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
  <rect width="6" height="6" fill="#17808f"/>
  <path d="M0 0v6" stroke="#2ea3b0" stroke-width="1.6"/>
</pattern>
```

## Contrast

The reference diagram puts white text on bright green and bright blue. At 7 px
that is roughly 2.8:1 — below AA. **Flip the ink, not the fill:** dark ink on the
light fills keeps the palette recognisable and lands above 4.5:1. White ink stays
on the two dark fills (infrastructure, hatched teal) and on the dashed emerging
tiles.

## Typography

Longhand properties only — see the SKILL for why the `font:` shorthand is a trap.

```css
text  { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
.mono { font-family: ui-monospace, SFMono-Regular, Menlo, 'DejaVu Sans Mono', monospace; }
.num  { font-size: 9.5px; font-weight: 600; }   /* layer number, mono */
.ttl  { font-size: 11.5px; font-weight: 600; }  /* layer title */
.meta { font-size: 7px; }                       /* layer caption, mono */
.tile { font-size: 7.2px; font-weight: 500; }   /* painted tile label */
.band { font-size: 7px; font-weight: 700; letter-spacing: .07em; }  /* wall label, mono */
.leg  { font-size: 7.5px; }
```

A `.mono` class beats the `text` element selector on specificity, so combine them:
`class="num mono"`.

Sizes assume a canvas around 700 px wide displayed at roughly the same width in
the post. Scaling the canvas up and the type with it changes nothing — judge
legibility from a 2× raster, not from the numbers.

## Legend

Bottom-left panel, `LÉGENDE` heading in mono with wide letter-spacing, then one
9 × 9 swatch per nature in two columns. Swatches reuse the exact tile fill,
outline and dash so the mapping is unambiguous — including the pattern fill for
the open-standard entry.

Diagrams in this repo are in French: labels, legend, `<title>`, `<desc>` and the
MDX alt text.
