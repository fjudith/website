# Geometry of the painted-floor isometric stack

Every formula below is used by
`workspaces/docusaurus/scripts/gen-couches-iso-svg.py`. Derivations are included
because the constants are interdependent: change one and something disappears.

## Projection

A dimetric (not strictly isometric) projection, flatter than 30° so more floors fit:

```
C = 0.92   S = 0.36        # ≈ 21.4°, floor-like rather than cube-like
x axis  ->  ( C,  S)       # right and down  (slab width,  SW units)
y axis  ->  ( C, -S)       # right and up    (slab depth,  SD units)

proj(x, y, level) = ( OX + (x + y)·C ,
                      OY1 - (level-1)·STEP + (x - y)·S )
```

`level` is 1 for the bottom slab. Floor units are arbitrary; only ratios matter.

One slab on screen:

```
width  = (SW + SD)·C
height = (SW + SD)·S
```

Corners, and which are "front":

| Floor point | Role | Screen position |
| --- | --- | --- |
| `(0, 0)` | left corner, label anchor | leftmost |
| `(SW, 0)` | front corner | lowest — screen y is `(x−y)·S`, maximal here |
| `(SW, SD)` | right corner, title anchor | rightmost |
| `(0, SD)` | back corner | highest |

The two edges meeting at `(SW, 0)` — the `y = 0` edge and the `x = SW` edge — are
the front faces: extrude them down by `THICK` to give the slab thickness. The
other two edges (`x = 0`, `y = SD`) are the back edges: that is where the
cross-cutting walls stand.

## Occlusion budget — the constant that matters most

Slab `level+1` is the same shape translated up the screen by `STEP`. A screen-
vertical translation of `+STEP` corresponds, in floor units, to

```
Δx = +STEP / (2·S)        Δy = -STEP / (2·S)        k = STEP / (2·S)
```

So a point `(x, y)` of a slab is hidden by the slab above **iff**

```
x ≤ SW - k   AND   y ≥ k
```

which is a wedge at the **back corner** only. Everything else stays visible —
this is why a 74 px step can carry a 144 px tall slab without burying it.

With `STEP = 74`, `S = 0.36`: `k = 102.8`. Hidden wedge: `x ≤ 147.2` and
`y ≥ 102.8`.

**Rule to enforce, every time:**

```
ROWS[last] + TILE_D  ≤  STEP / (2·S)
```

Currently `60 + 42 = 102 ≤ 102.8` — deliberately tight. Raising `STEP` reveals
more floor but makes the figure taller:

```
total height ≈ (N-1)·STEP + (SW + SD)·S + THICK + head room + legend
```

## Tile grid

```
COLS = (8, 89, 170)   TILE_W = 72     # 3·72 + 2·9 gaps = 234, margins of 8 in SW = 250
ROWS = (8, 60)        TILE_D = 42     # front row, back row
```

Constraints: `COLS[last] + TILE_W ≤ SW - margin`, and the occlusion rule above.

## In-plane text: shear, never squash

A true in-plane matrix (`matrix(C S C -S …)`) compresses glyphs to `S` of their
height — unreadable at these sizes. Use shear only:

```
transform="matrix(C S 0 1 px py)"      # (px, py) = proj of the tile's near-left corner
```

This frame maps local `(X, Y)` to screen `(px + C·X, py + S·X + Y)`. Therefore:

- local `X` advances along the tile's front edge (down-right, following the slab),
- local `Y` is pure screen-vertical, negative upwards,
- glyph height is untouched (the matrix `d` term is 1).

In that frame the tile is bounded by:

| Boundary | Equation |
| --- | --- |
| front edge | `Y = 0`, `X ∈ [0, TILE_W]` |
| back edge | `Y = -2·S·TILE_D` |
| left edge | `Y = -2·S·X` |
| right edge | `Y = -2·S·(X - TILE_W)` |

So at any fixed `X` inside the tile the usable vertical band is `2·S·TILE_D`
(30.2 px for `TILE_D = 42`) — twice what the tile's apparent thickness suggests,
because moving back also moves right.

Centred label:

```
baseline   Y = -(S·TILE_D) + capHeight/2     ≈ -12.5   for 7.2px type
centre     X = TILE_W/2 + |Y| / (2·S)        ≈  53.4
           text-anchor="middle"
```

`text-anchor="middle"` avoids needing font metrics. The horizontal run available
at that baseline is `TILE_W` local units → `TILE_W·C` screen px (66 px here),
i.e. **about 15 characters at 7.2 px**. Abbreviate labels to fit; put the full
wording in the layer caption.

## Cross-cutting walls

Vertical planes standing on the two back edges, spanning the whole stack:

```
top     = OY1 - (N-1)·STEP - HEAD          # HEAD = title band above the top slab, 46
wall A  = quad( proj(0,0,1), proj(0,SD,1), same two points at `top` )     # left-back edge
wall B  = quad( proj(0,SD,1), proj(SW,SD,1), same two points at `top` )   # right-back edge
```

Draw them **before** the slabs: they are geometrically behind. They still read as
large translucent panels because the slabs are pointy at their left and right
corners, so the walls show through around the stack.

Labels lie in the wall planes, shear only:

```
wall A (reads up-right)    matrix( C -S 0 1  x_left    y_top )
wall B (reads down-right)  matrix( C  S 0 1  x_corner  y_top )
```

Local `Y` is again screen-vertical, so a label at `Y = 20` sits 20 px below the
wall's top edge and must satisfy `Y + line height ≤ HEAD` to stay in the band
above the top slab. Maximum label length: `SD·C` for wall A, `SW·C` for wall B.

Both walls meet at the same corner, so start their labels far apart along their
own wall (`X ≈ 6` for A, `X ≈ 70` for B) or they collide in the render.

## Draw order

1. background
2. walls (behind everything)
3. slabs, `level` 1 → N: left face, right face, top face, then tiles — back row
   before front row
4. per-slab labels: number at the left corner, dotted leader from the right corner
   to the title column
5. wall labels
6. legend

Two painter's-algorithm passes: bottom-to-top across slabs, back-to-front within
a slab.
