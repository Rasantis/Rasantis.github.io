"""Shared primitives for the Excalidraw architecture boards.

Extracted from build_excalidraw.py when the second board arrived. The boards
themselves live in build_excalidraw_<project>.py — this file owns only the
palette and the drawing verbs, so a new board is a layout file and nothing else.

Four rules the boards inherit:
  1. A vendor name ONLY where the technology really is that vendor's.
  2. Every element survives a technical deep dive — no invented latencies,
     thresholds or components.
  3. Positions are ours. No auto-layout.
  4. It should look like a person drew it. Real boards are not on a grid —
     boxes are different widths, things sit a few pixels off, and the useful
     parts have notes scrawled next to them. `jit()` does the drift; the
     annotations do the rest. A diagram where every box is the same size and
     every gap identical reads as machine output, and people discount it.
"""
from __future__ import annotations

import json
import os
import random
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'diagrams')

# ── palette ─────────────────────────────────────────────────────────────────
# Mirrors the site theme (see build_diagrams.py). Kept here rather than in the
# skill's color-palette.md because .agents/ is gitignored — a reinstall of the
# skill would wipe it.
BG      = '#0f1319'   # canvas
EDGE_BG = '#1b222c'   # our own components
EDGE_ST = '#9db2ce'
GCP_BG  = '#16202e'   # anything running on Google Cloud
GCP_ST  = '#8fb4ff'
AI_BG   = '#231d33'   # model steps
AI_ST   = '#b39cf5'
WIN_BG  = '#152b22'   # outcomes
WIN_ST  = '#45d483'
CODE_BG = '#0b0f14'   # evidence artifacts
INK     = '#eef1f6'
MUTED   = '#9aa5b4'
FAINT   = '#6f7885'
LINE    = '#4d5866'
AMBER   = '#ffb224'

HAND = 1   # Excalifont — annotations, titles
MONO = 3   # Cascadia   — anything technical

rng = random.Random(717)          # fixed: same drift on every rebuild
_ids: dict[str, int] = {}
_els: list[dict] = []


def uid(prefix: str) -> str:
    _ids[prefix] = _ids.get(prefix, 0) + 1
    return f'{prefix}{_ids[prefix]}'


def jit(n: int = 4) -> int:
    """Hand drift. Nothing lands exactly on the grid."""
    return rng.randint(-n, n)


def base(**kw) -> dict:
    el = {
        'id': kw.pop('id'),
        'x': kw.pop('x'), 'y': kw.pop('y'),
        'width': kw.pop('width', 0), 'height': kw.pop('height', 0),
        'angle': kw.pop('angle', 0),
        'strokeColor': kw.pop('strokeColor', LINE),
        'backgroundColor': kw.pop('backgroundColor', 'transparent'),
        'fillStyle': kw.pop('fillStyle', 'solid'),
        'strokeWidth': kw.pop('strokeWidth', 1),
        'strokeStyle': kw.pop('strokeStyle', 'solid'),
        'roughness': kw.pop('roughness', 1),
        'opacity': kw.pop('opacity', 100),
        'seed': rng.randint(1, 2 ** 31),
        'version': 1,
        'versionNonce': rng.randint(1, 2 ** 31),
        'isDeleted': False,
        'groupIds': [],
        'boundElements': kw.pop('boundElements', None),
        'link': None,
        'locked': False,
    }
    el.update(kw)
    return el


def add(el: dict) -> dict:
    _els.append(el)
    return el


def box(x, y, w, h, label, sub='', *, fill=EDGE_BG, stroke=EDGE_ST,
        font=MONO, size=15, drift=4, dashed=False, rounded=True) -> str:
    """Rectangle with bound text. Width is chosen by the caller per content —
    deliberately not uniform."""
    bid, tid = uid('b'), uid('t')
    x, y = x + jit(drift), y + jit(drift)
    text = f'{label}\n{sub}' if sub else label
    rect = base(id=bid, type='rectangle', x=x, y=y, width=w, height=h,
                strokeColor=stroke, backgroundColor=fill, strokeWidth=1.5,
                strokeStyle='dashed' if dashed else 'solid',
                boundElements=[{'id': tid, 'type': 'text'}])
    if rounded:
        rect['roundness'] = {'type': 3}
    _els.append(rect)
    lines = text.count('\n') + 1
    _els.append(base(
        id=tid, type='text', x=x + 10, y=y + (h - lines * size * 1.25) / 2,
        width=w - 20, height=lines * size * 1.25,
        text=text, originalText=text, fontSize=size, fontFamily=font,
        textAlign='center', verticalAlign='middle', strokeColor=INK,
        roughness=0, containerId=bid, lineHeight=1.25, autoResize=False))
    return bid


def note(x, y, text, *, color=MUTED, size=14, font=HAND, w=320, angle=0.0):
    """Free-floating text. Most labels should be this, not a box."""
    lines = text.count('\n') + 1
    _els.append(base(
        id=uid('n'), type='text', x=x + jit(3), y=y + jit(3), width=w,
        height=lines * size * 1.25, text=text, originalText=text,
        fontSize=size, fontFamily=font, textAlign='left', verticalAlign='top',
        strokeColor=color, roughness=0, containerId=None, lineHeight=1.25,
        angle=angle))


def code(x, y, w, h, text, *, title=''):
    """Evidence artifact — a real payload, a real command, a real shape."""
    _els.append(base(id=uid('c'), type='rectangle', x=x, y=y, width=w, height=h,
                     strokeColor='#2b3a4d', backgroundColor=CODE_BG,
                     strokeWidth=1, roughness=0, roundness={'type': 3}))
    if title:
        note(x + 12, y + 9, title, color=FAINT, size=11, font=MONO, w=w - 24)
    note(x + 12, y + (30 if title else 12), text, color='#7fd8a4', size=11.5,
         font=MONO, w=w - 24)


def arrow(pts, *, color=LINE, dashed=False, head='arrow', width=1.5):
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    _els.append(base(
        id=uid('a'), type='arrow', x=pts[0][0], y=pts[0][1],
        width=max(xs) - min(xs), height=max(ys) - min(ys),
        strokeColor=color, strokeWidth=width,
        strokeStyle='dashed' if dashed else 'solid',
        points=[[p[0] - pts[0][0], p[1] - pts[0][1]] for p in pts],
        startBinding=None, endBinding=None,
        startArrowhead=None, endArrowhead=head))


def vline(x, y1, y2, *, color=LINE, dashed=True, width=1.5):
    _els.append(base(id=uid('l'), type='line', x=x, y=y1, width=0,
                     height=y2 - y1, strokeColor=color, strokeWidth=width,
                     strokeStyle='dashed' if dashed else 'solid',
                     roughness=0, points=[[0, 0], [0, y2 - y1]]))


def hline(x1, x2, y, *, color='#2b3a4d', width=1.5):
    """Section rule. Separates the board into readable registers."""
    _els.append(base(id=uid('l'), type='line', x=x1, y=y, width=x2 - x1,
                     height=0, strokeColor=color, strokeWidth=width,
                     roughness=0, points=[[0, 0], [x2 - x1, 0]]))


def band(x, label, sub='', *, y=232, w=460):
    """Section header. Not boxed — typography carries the hierarchy."""
    note(x, y, label, color=FAINT, size=13, font=MONO, w=w)
    if sub:
        note(x, y + 18, sub, color='#59626e', size=12, font=MONO, w=w)


def boundary(x, y, w, h, label, sub='', *, color='#4a6fa8'):
    """A dashed enclosure — a cluster, a node pool, a trust boundary.
    Label sits at the top-left corner, the way a real infra drawing does it."""
    _els.append(base(id=uid('bd'), type='rectangle', x=x, y=y, width=w, height=h,
                     strokeColor=color, backgroundColor='#111a26',
                     strokeWidth=1.5, strokeStyle='dashed', roughness=0,
                     roundness={'type': 3}, opacity=70))
    note(x + 16, y + 12, label, color=color, size=12.5, font=MONO, w=w - 32)
    if sub:
        note(x + 16, y + 30, sub, color='#59626e', size=11.5, font=MONO, w=w - 32)


def emit(filename: str) -> None:
    doc = {
        'type': 'excalidraw',
        'version': 2,
        'source': 'portfolio/tools/' + os.path.basename(sys.argv[0]),
        'elements': _els,
        'appState': {'gridSize': None, 'viewBackgroundColor': BG},
        'files': {},
    }
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, filename)
    with open(path, 'w', encoding='utf-8') as fh:
        json.dump(doc, fh, indent=1)
    print(f'{len(_els)} elements -> {path}')
