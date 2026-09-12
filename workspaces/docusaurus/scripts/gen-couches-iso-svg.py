#!/usr/bin/env python3
"""
Génère le diagramme isométrique « à plancher peint » des sept couches d'une
plateforme agentique.

Différence avec gen-couches-svg.py : chaque dalle ne se contente pas d'être
colorée en bloc, elle porte ses composants types « peints » au sol, colorés
selon leur nature (build / managé / infrastructure / standard ouvert /
surface / émergent). C'est la lecture du diagramme de paysage applicatif de
référence, transposée en isométrie.

Projection dimétrique (x → (C, S), y → (C, -S)) : chaque couche est une dalle
dont la face supérieure est un losange, avec deux faces latérales qui donnent
l'épaisseur. Les deux préoccupations transverses sont deux parois translucides
dressées sur les arêtes arrière, sur toute la hauteur de la pile.

Palette reprise du diagramme de paysage applicatif de référence :
  vert       #3aae4a  brique différenciante (build)
  bleu pâle  #b9d0e1  service managé (buy)
  ardoise    #4d6d8b  infrastructure
  teal       #17808f  standard ouvert (hachuré) et préoccupations transverses
  bleu vif   #29a4e3  surface utilisateur
  fond       #16253c

Le texte des pastilles claires est sombre (et non blanc comme sur le diagramme
de référence) : à 7 px, le contraste blanc-sur-vert n'est pas lisible.

Sortie : static/img/couches-plateformes-agentiques-iso.svg
"""

from pathlib import Path

# --- Palette ---------------------------------------------------------------
BG = '#16253c'
SLAB_TOP = '#1e3350'
SLAB_LEFT = '#172a44'
SLAB_RIGHT = '#122238'
SLAB_EDGE = '#2f4d78'
TEXT = '#eaf2f8'
MUTED = '#9fb4c7'
DIM = '#5d7997'
TEAL, TEAL_LINE = '#17808f', '#2ea3b0'
PANEL = '#1a2c47'

# nature du composant → (remplissage, contour, couleur du texte, pointillé)
KIND = {
    'build': ('#3aae4a', '#7fd88a', '#07230c', None),
    'buy': ('#b9d0e1', '#dcebf5', '#10202e', None),
    'infra': ('#4d6d8b', '#8aa7bf', '#ffffff', None),
    'std': ('url(#hatch)', TEAL_LINE, '#ffffff', None),
    'surface': ('#29a4e3', '#9fd8f4', '#04222f', None),
    'next': (SLAB_TOP, '#ffffff', '#ffffff', '3 2'),
}

# --- Géométrie isométrique -------------------------------------------------
C, S = 0.92, 0.36  # projection : x → (C, S), y → (C, -S)
OX, OY1 = 50, 560  # coin gauche de la dalle 01
STEP = 74  # décalage vertical entre deux dalles
SW, SD = 250, 150  # dimensions de la dalle, en unités « plancher »
THICK = 9  # épaisseur de la dalle
HEAD = 46  # hauteur de la bande de titre des parois, au-dessus de la dalle 07

# grille de peinture : 3 colonnes × 2 rangées (avant / arrière)
COLS = (8, 89, 170)
TILE_W = 72
ROWS = (8, 60)
TILE_D = 42

# Centrage du texte dans le repère cisaillé de la pastille (cf. la skill
# isometric-layer-diagram, references/geometry.md) : à hauteur constante, la
# bande utile de la pastille mesure 2·S·TILE_D, son milieu est à −S·TILE_D, et
# le bord gauche s'y trouve décalé de |dy| / (2·S).
TEXT_DY = -(S * TILE_D) + 2.6  # ligne de base, remontée d'une demi-hauteur de capitale
TEXT_CX = TILE_W / 2 + abs(TEXT_DY) / (2 * S)

W, H = 700, 764

# --- Contenu (de la couche 01 en bas à 07 en haut) -------------------------
# front = rangée avant (3 pastilles max), back = rangée arrière
LAYERS = [
    (
        '01',
        'Compute & inférence',
        'Accélérateurs · serving · gateway · routing',
        [('GPU / TPU', 'infra'), ('Serving', 'infra'), ('Model gateway', 'build')],
        [('Routing', 'build'), ('Quotas & coûts', 'buy')],
    ),
    (
        '02',
        'Modèles',
        'Foundation · fine-tunes · SLM spécialisés',
        [('Foundation', 'buy'), ('Fine-tunes', 'build'), ('SLM', 'buy')],
        [('Reg. modèles', 'build')],
    ),
    (
        '03',
        'Orchestration / runtime',
        'Boucle act-observe-verify · planning · état',
        [('Boucle agent', 'build'), ('Planning', 'build'), ("Gestion d'état", 'build')],
        [('Mém. session', 'build'), ('Reprise ctx', 'next')],
    ),
    (
        '04',
        'Outils & intégrations',
        'Function calling · MCP · connecteurs · sandbox',
        [('Function call', 'buy'), ('MCP', 'std'), ('Sandbox', 'infra')],
        [('Connecteurs', 'build'), ('Reg. outils', 'build')],
    ),
    (
        '05',
        'Mémoire & connaissance',
        'RAG · vector store · KG · mémoire durable',
        [('RAG', 'buy'), ('Vector store', 'buy'), ('Graphe (KG)', 'buy')],
        [('Mém. durable', 'build'), ('Rétention', 'build')],
    ),
    (
        '06',
        'Coordination multi-agents',
        'Orchestrateur/workers · délégation · A2A',
        [('Orchestrateur', 'build'), ('Sous-agents', 'build'), ('Délégation', 'build')],
        [('A2A', 'std'), ('Arbitrage', 'next')],
    ),
    (
        '07',
        'Interface & surfaces',
        'Chat · IDE · dashboard · cron · webhook',
        [('Chat', 'surface'), ('IDE', 'surface'), ('Dashboard', 'surface')],
        [('Cron', 'buy'), ('Webhook', 'buy'), ('API interne', 'build')],
    ),
]

LEGEND = [
    ('build', 'Brique différenciante (build)'),
    ('buy', 'Service managé (buy)'),
    ('infra', 'Infrastructure'),
    ('std', 'Standard ouvert (MCP, A2A)'),
    ('surface', 'Surface utilisateur'),
    ('next', 'Émergent · maturité faible'),
    ('wall', 'Préoccupation transverse'),
]


def esc(s: str) -> str:
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def pts(seq) -> str:
    return ' '.join(f'{x:.1f},{y:.1f}' for x, y in seq)


def proj(x: float, y: float, level: int):
    """Projette un point du plancher de la dalle `level` (1 = en bas)."""
    return (OX + (x + y) * C, OY1 - (level - 1) * STEP + (x - y) * S)


def down(p, dy: float):
    return (p[0], p[1] + dy)


def slab(level: int, front, back) -> list:
    """Une dalle : deux faces latérales, la face supérieure, puis la peinture."""
    a = proj(0, 0, level)  # coin gauche
    b = proj(SW, 0, level)  # coin avant (le plus bas)
    d = proj(SW, SD, level)  # coin droit
    e = proj(0, SD, level)  # coin arrière (le plus haut)
    o = ['  <g>']
    o.append(f'    <polygon points="{pts([a, b, down(b, THICK), down(a, THICK)])}" fill="{SLAB_LEFT}" stroke="{SLAB_EDGE}" stroke-opacity=".7"/>')
    o.append(f'    <polygon points="{pts([b, d, down(d, THICK), down(b, THICK)])}" fill="{SLAB_RIGHT}" stroke="{SLAB_EDGE}" stroke-opacity=".7"/>')
    o.append(f'    <polygon points="{pts([a, b, d, e])}" fill="{SLAB_TOP}" stroke="{SLAB_EDGE}"/>')

    # Peinture : rangée arrière d'abord (algorithme du peintre, du fond vers l'avant)
    for row, tiles in ((ROWS[1], back), (ROWS[0], front)):
        for i, (label, kind) in enumerate(tiles):
            fill, stroke, ink, dash = KIND[kind]
            x0 = COLS[i]
            quad = [
                proj(x0, row, level),
                proj(x0 + TILE_W, row, level),
                proj(x0 + TILE_W, row + TILE_D, level),
                proj(x0, row + TILE_D, level),
            ]
            da = f' stroke-dasharray="{dash}"' if dash else ''
            o.append(f'    <polygon points="{pts(quad)}" fill="{fill}" stroke="{stroke}" stroke-width=".9"{da}/>')
            # Le texte suit l'arête avant de la pastille : cisaillement seul,
            # sans écrasement vertical, sinon il devient illisible.
            px, py = quad[0]
            o.append(
                f'    <text class="tile" fill="{ink}" text-anchor="middle" '
                f'transform="matrix({C} {S} 0 1 {px:.1f} {py:.1f})" '
                f'x="{TEXT_CX:.1f}" y="{TEXT_DY:.1f}">{esc(label)}</text>'
            )
    o.append('  </g>')
    return o


def build() -> str:
    o = []
    o.append(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
        f'width="{W}" height="{H}" role="img" aria-labelledby="ti de">'
    )
    o.append("  <title id=\"ti\">Les sept couches d'une plateforme agentique, vue isométrique</title>")
    o.append(
        '  <desc id="de">Sept dalles isométriques empilées, de 01 Compute et inférence '
        'en bas à 07 Interface et surfaces en haut. Chaque dalle porte ses composants '
        'types, colorés selon leur nature : brique différenciante à construire, service '
        'managé, infrastructure, standard ouvert, surface utilisateur, composant '
        'émergent. Deux parois translucides longent la pile sur toute sa hauteur : '
        'A Sécurité et gouvernance, B Observabilité et évaluation.</desc>'
    )
    o.append('  <defs>')
    o.append('    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">')
    o.append(f'      <rect width="6" height="6" fill="{TEAL}"/>')
    o.append(f'      <path d="M0 0v6" stroke="{TEAL_LINE}" stroke-width="1.6"/>')
    o.append('    </pattern>')
    o.append('  </defs>')
    o.append(f'''  <style>
    text {{ font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }}
    .mono {{ font-family: ui-monospace, SFMono-Regular, Menlo, 'DejaVu Sans Mono', monospace; }}
    .num {{ font-size: 9.5px; font-weight: 600; fill: {DIM}; }}
    .ttl {{ font-size: 11.5px; font-weight: 600; fill: {TEXT}; }}
    .meta {{ font-size: 7px; fill: {MUTED}; letter-spacing: .02em; }}
    .tile {{ font-size: 7.2px; font-weight: 500; }}
    .band {{ font-size: 7px; font-weight: 700; fill: #d9f2f5; letter-spacing: .07em; }}
    .bmeta {{ font-size: 6.6px; fill: #a8d5db; }}
    .legh {{ font-size: 7px; font-weight: 700; fill: {MUTED}; letter-spacing: .12em; }}
    .leg {{ font-size: 7.5px; fill: {TEXT}; }}
  </style>''')
    o.append(f'  <rect x=".5" y=".5" width="{W - 1}" height="{H - 1}" fill="{BG}" stroke="{SLAB_EDGE}"/>')

    # --- Parois transverses, derrière la pile ------------------------------
    top = OY1 - 6 * STEP - HEAD
    a_bot, a_top = (OX, OY1), (OX, top)
    corner_bot, corner_top = (OX + SD * C, OY1 - SD * S), (OX + SD * C, top - SD * S)
    right_bot = (OX + (SW + SD) * C, OY1 + (SW - SD) * S)
    right_top = (OX + (SW + SD) * C, top + (SW - SD) * S)
    o.append('  <!-- Paroi transverse A · sécurité & gouvernance -->')
    o.append(f'  <polygon points="{pts([a_bot, corner_bot, corner_top, a_top])}" fill="{TEAL}" fill-opacity=".2" stroke="{TEAL_LINE}" stroke-opacity=".65"/>')
    o.append('  <!-- Paroi transverse B · observabilité & évaluation -->')
    o.append(f'  <polygon points="{pts([corner_bot, right_bot, right_top, corner_top])}" fill="{TEAL}" fill-opacity=".13" stroke="{TEAL_LINE}" stroke-opacity=".65"/>')

    # --- Dalles ------------------------------------------------------------
    title_x = OX + (SW + SD) * C + 22
    for num, title, meta, front, back in LAYERS:
        level = int(num)
        o.append(f'  <!-- Couche {num} · {title} -->')
        o.extend(slab(level, front, back))
        oy = OY1 - (level - 1) * STEP
        right = proj(SW, SD, level)
        o.append(f'  <text class="num mono" x="{OX - 12}" y="{oy + 4}" text-anchor="end">{num}</text>')
        o.append(f'  <path d="M{right[0]:.1f} {right[1]:.1f}H{title_x - 8:.1f}" stroke="{SLAB_EDGE}" stroke-dasharray="2 2"/>')
        o.append(f'  <text class="ttl" x="{title_x:.1f}" y="{oy + 33}">{esc(title)}</text>')
        o.append(f'  <text class="meta mono" x="{title_x:.1f}" y="{oy + 46}">{esc(meta)}</text>')

    # --- Libellés des parois (texte cisaillé dans le plan de la paroi) -----
    wall_a = f'matrix({C} {-S} 0 1 {OX} {top})'
    wall_b = f'matrix({C} {S} 0 1 {corner_top[0]:.1f} {corner_top[1]:.1f})'
    o.append('  <!-- Libellés transverses -->')
    o.append(f'  <text class="band mono" transform="{wall_a}" x="6" y="20">A · SÉCURITÉ &amp; GOUVERNANCE</text>')
    o.append(f'  <text class="bmeta mono" transform="{wall_a}" x="6" y="31">Permissions · approbation · audit</text>')
    o.append(f'  <text class="band mono" transform="{wall_b}" x="70" y="18">B · OBSERVABILITÉ &amp; ÉVALUATION</text>')
    o.append(f'  <text class="bmeta mono" transform="{wall_b}" x="70" y="29">Traces · coût/token · evals · closed-loop</text>')

    # --- Légende -----------------------------------------------------------
    lx, ly, lw, lh = 30, 668, 420, 84
    o.append('  <!-- Légende -->')
    o.append(f'  <rect x="{lx}" y="{ly}" width="{lw}" height="{lh}" fill="{PANEL}" stroke="{SLAB_EDGE}"/>')
    o.append(f'  <text class="legh mono" x="{lx + 14}" y="{ly + 17}">LÉGENDE</text>')
    for i, (kind, label) in enumerate(LEGEND):
        col, row = (0, i) if i < 4 else (1, i - 4)
        x = lx + 14 + col * 205
        y = ly + 33 + row * 14
        if kind == 'wall':
            o.append(f'  <rect x="{x}" y="{y - 7}" width="9" height="9" fill="{TEAL}" fill-opacity=".45" stroke="{TEAL_LINE}"/>')
        else:
            fill, stroke, _, dash = KIND[kind]
            da = f' stroke-dasharray="{dash}"' if dash else ''
            o.append(f'  <rect x="{x}" y="{y - 7}" width="9" height="9" fill="{fill}" stroke="{stroke}"{da}/>')
        o.append(f'  <text class="leg" x="{x + 15}" y="{y}">{esc(label)}</text>')

    o.append('</svg>')
    return '\n'.join(o) + '\n'


if __name__ == '__main__':
    out = Path(__file__).resolve().parent.parent / 'static' / 'img' / 'couches-plateformes-agentiques-iso.svg'
    out.write_text(build(), encoding='utf-8')
    print(f'écrit : {out.relative_to(out.parents[2])}')
