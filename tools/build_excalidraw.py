"""Excalidraw architecture boards for the portfolio.

Companion to build_diagrams.py. That file owns the tight SVG diagrams embedded
in the case pages; this one owns the *deep* boards — the ones you open in a
system-design interview and talk over for ten minutes.

Why a generator and not hand-written JSON: the coordinates are the design, and
they need to be re-runnable. Same reason build_diagrams.py exists.

Three rules carried over from build_diagrams.py, unchanged:
  1. A vendor name ONLY where the technology really is that vendor's.
  2. Every element survives a technical deep dive — no invented latencies,
     thresholds or components.
  3. Positions are ours. No auto-layout.

One rule added, because these are drawn in Excalidraw and not SVG:
  4. It should look like a person drew it. Real boards are not on a grid —
     boxes are different widths, things sit a few pixels off, and the useful
     parts have notes scrawled next to them. `jit()` does the drift; the
     annotations do the rest. A diagram where every box is the same size and
     every gap identical reads as machine output, and people discount it.

Output:  portfolio/public/diagrams/arch_shopguard.excalidraw
Render:  uv run python .agents/skills/excalidraw-diagram/references/render_excalidraw.py <file>
"""
from __future__ import annotations

import json
import os
import random

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
AI_BG   = '#231d33'   # LLM / model steps
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
    """Evidence artifact — a real pipeline string or a real payload."""
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


def band(x, label, sub=''):
    """Section header. Not boxed — typography carries the hierarchy."""
    note(x, 232, label, color=FAINT, size=13, font=MONO, w=460)
    if sub:
        note(x, 250, sub, color='#59626e', size=12, font=MONO, w=460)


# ═══════════════════════════════════════════════════════════════════════════
# ShopGuard AI — theft detection, edge to Google Cloud
#
# The argument: 4,500 concurrent 1080p streams cannot be shipped to a cloud.
# So inference happens in the store and only an event crosses the wire. Every
# other decision in this system falls out of that one constraint.
# ═══════════════════════════════════════════════════════════════════════════

note(60, 46, 'ShopGuard AI — real-time theft detection', color=INK, size=27,
     font=HAND, w=900)
note(62, 88, '150 stores  ·  ~30 cameras each  ·  4,500+ concurrent streams  ·  '
     'sub-second inference at the edge', color=MUTED, size=14, font=MONO, w=1000)

# Level 1 — the whole thing in one line, before any detail.
note(62, 132, 'camera  →  decode  →  detect  →  track  →  rule  →  event  →  '
     'GCP  →  operator acts  →  label  →  retrain', color=FAINT, size=13,
     font=MONO, w=1100)
hline(60, 2344, 172)

# ── A. store edge ──────────────────────────────────────────────────────────
band(60, 'STORE EDGE', 'one identical appliance per store, ×150')

# cameras: a stack seen edge-on, only the front one labelled
for i in range(2):
    _els.append(base(id=uid('b'), type='rectangle', x=66 + i * 13,
                     y=292 + i * 15, width=150, height=34,
                     strokeColor='#525c69', backgroundColor='#141a22',
                     strokeWidth=1.5, roundness={'type': 3}))
box(92, 322, 150, 34, 'IP camera', fill='#141a22', stroke='#6f7885', size=13,
    drift=2)
note(70, 384, '~30 per store\nRTSP · H.264 · 1080p', color=FAINT, size=12,
     font=MONO, w=220)

jetson = box(266, 292, 300, 60, 'NVIDIA Jetson', 'store appliance', size=16)
box(266, 380, 300, 46, 'GStreamer', 'hardware decode · 30 streams', size=14)
box(266, 442, 300, 52, 'YOLO11 + TensorRT', 'FP16 engine · sub-second', size=14,
    stroke=AMBER)
box(266, 510, 300, 46, 'ByteTrack', 'identity across frames', size=14)
box(266, 572, 300, 52, 'Rule engine', 'zone · dwell · concealment', size=14)

arrow([(246, 338), (262, 326)])
for y0, y1 in ((352, 378), (426, 440), (494, 508), (556, 570)):
    arrow([(416, y0), (416, y1)])

code(60, 650, 506, 132,
     'rtspsrc location=... latency=200\n'
     '  ! rtph264depay ! h264parse\n'
     '  ! nvv4l2decoder            # NVDEC, not CPU\n'
     '  ! nvvidconv ! video/x-raw(memory:NVMM)\n'
     '  ! appsink                  -> TensorRT engine',
     title='edge pipeline — decode never touches the CPU')

note(64, 800, 'detection is not an event.\nan event needs a zone, dwell time and\n'
     'a concealment sequence — otherwise\nyou page a human 400 times a night.',
     color=MUTED, size=13, font=HAND, w=420)

# ── the wall ───────────────────────────────────────────────────────────────
vline(620, 236, 900, color='#3d4757')
note(636, 300, 'video stops here', color=AMBER, size=15, font=HAND, w=260)
note(636, 328, '4,500 streams × 1080p ≈ 9 Gbps\nif you shipped the video. you don\'t.\n'
     'what crosses the wire is ~2 KB of JSON\nand one 6 s clip, only when something\nhappened.',
     color=MUTED, size=13, font=HAND, w=330)
note(636, 456, 'the clip is cut from a ring buffer —\nthe theft starts before\nthe alert does.',
     color=FAINT, size=12.5, font=HAND, w=280)

# ── B. GCP ingest ──────────────────────────────────────────────────────────
band(1010, 'GOOGLE CLOUD — INGEST', 'stateless, scales with event volume')

box(1010, 292, 250, 48, 'Cloud Load Balancing', 'TLS · regional', fill=GCP_BG,
    stroke=GCP_ST, size=14)
api = box(1010, 362, 250, 56, 'Cloud Run', 'FastAPI · auth + schema check',
          fill=GCP_BG, stroke=GCP_ST, size=14)
box(1010, 440, 250, 48, 'Pub/Sub', 'events topic', fill=GCP_BG, stroke=GCP_ST,
    size=14)
box(1010, 510, 250, 48, 'Cloud Storage', 'clip + evidence bucket', fill=GCP_BG,
    stroke=GCP_ST, size=14)

arrow([(566, 598), (978, 598), (978, 316), (1006, 316)], color='#5d6b7d')
note(640, 566, 'event + clip  ·  HTTPS, retried on the appliance', color=FAINT,
     size=12, font=MONO, w=420)
for y0, y1 in ((340, 360), (418, 438), (488, 508)):
    arrow([(1135, y0), (1135, y1)], color=GCP_ST)

code(1010, 590, 400, 196,
     '{\n'
     '  "store_id":   "SP-0117",\n'
     '  "camera_id":  "cam-14",\n'
     '  "ts":         "2025-11-03T21:14:07Z",\n'
     '  "track_id":   8321,\n'
     '  "rule":       "concealment",\n'
     '  "confidence": 0.83,\n'
     '  "clip":       "gs://sg-clips/SP-0117/..."\n'
     '}', title='what actually crosses the wire  (~2 KB)')

# ── C. GCP intelligence ────────────────────────────────────────────────────
band(1480, 'GOOGLE CLOUD — DECIDE', 'per-store policy, not a global threshold')

box(1480, 292, 262, 52, 'Cloud Run worker', 'Pub/Sub push subscriber',
    fill=GCP_BG, stroke=GCP_ST, size=14)
box(1480, 366, 262, 52, 'Context builder', 'store · camera · recent history',
    fill=GCP_BG, stroke=GCP_ST, size=14)
box(1480, 440, 262, 56, 'GPT-4 via LangChain', 'alert text + summary',
    fill=AI_BG, stroke=AI_ST, size=14)

_els.append(base(id=uid('d'), type='diamond', x=1512, y=520, width=196,
                 height=104, strokeColor=AMBER, backgroundColor='#2a2317',
                 strokeWidth=1.5))
note(1536, 556, 'severity?', color=INK, size=15, font=MONO, w=160)

box(1810, 366, 210, 52, 'Firestore', 'events · stores · cameras', fill=GCP_BG,
    stroke=GCP_ST, size=13)

arrow([(1266, 464), (1476, 318)], color=GCP_ST)
for y0, y1 in ((344, 364), (418, 438)):
    arrow([(1611, y0), (1611, y1)], color=GCP_ST)
arrow([(1611, 496), (1611, 518)], color=GCP_ST)
arrow([(1742, 392), (1806, 392)], color='#5d6b7d', head=None)

note(1484, 650, 'one store wants a siren,\nanother wants a silent log.\n'
     'the policy lives per store,\nnot in the model.', color=MUTED, size=13,
     font=HAND, w=300)

# ── D. delivery ────────────────────────────────────────────────────────────
band(2090, 'OPERATOR', 'the only human in the loop')

box(2090, 366, 240, 56, 'React dashboard', 'live alert + clip', size=14)
_els.append(base(id=uid('e'), type='ellipse', x=2110, y=470, width=200,
                 height=76, strokeColor=WIN_ST, backgroundColor=WIN_BG,
                 strokeWidth=1.5))
note(2136, 496, 'store operator', color=INK, size=14, font=MONO, w=180)

arrow([(1708, 572), (2210, 572), (2210, 550)], color=AMBER)
arrow([(2210, 424), (2210, 466)], color=EDGE_ST)
note(1740, 546, 'escalate now', color=AMBER, size=12.5, font=MONO, w=200)
note(1740, 606, 'batch to the shift digest', color=FAINT, size=12.5, font=MONO,
     w=240)
arrow([(1708, 600), (1980, 600)], color='#5d6b7d', dashed=True)

box(2076, 640, 268, 62, '90% fewer completed thefts',
    '80%+ accuracy on real failures', fill=WIN_BG, stroke=WIN_ST, size=14)
note(2080, 716, 'measured against the store\'s own\nloss numbers, not a benchmark set.',
     color=FAINT, size=12.5, font=HAND, w=300)

# ── E. the loop ────────────────────────────────────────────────────────────
hline(60, 2344, 890)
note(62, 900, 'MODEL LOOP', color=FAINT, size=13, font=MONO, w=300)
note(62, 918, 'the operator is the labeller — that is the whole data strategy',
     color='#59626e', size=12, font=MONO, w=620)

box(1990, 960, 300, 52, 'confirmed / rejected', 'one click on the alert',
    fill=WIN_BG, stroke=WIN_ST, size=14)
box(1590, 960, 300, 52, 'Cloud Storage', 'labelled clips → dataset',
    fill=GCP_BG, stroke=GCP_ST, size=14)
box(1180, 960, 300, 52, 'Vertex AI', 'retrain YOLO11', fill=GCP_BG,
    stroke=GCP_ST, size=14)
box(770, 960, 300, 56, 'Build TensorRT engine', 'one per GPU model',
    stroke=AMBER, size=14)
box(360, 960, 300, 52, 'Staged rollout', '10 stores → 150', size=14)

arrow([(2140, 1012), (2140, 1046), (1740, 1046), (1740, 1016)], color=WIN_ST)
for x0, x1 in ((1586, 1484), (1176, 1074), (766, 664)):
    arrow([(x0, 986), (x1, 986)], color='#5d6b7d')
# The loop closes in the left margin — a lane with nothing in it, so the wire
# never crosses a code block or a note. Lands on the engine, which is the thing
# that actually changes when a new model ships.
arrow([(356, 986), (38, 986), (38, 468), (262, 468)], color=EDGE_ST,
      dashed=True)
note(78, 1000, 'back to every appliance', color=FAINT, size=12.5, font=MONO,
     w=260)

note(766, 1040, 'an engine is built per GPU model.\nthere is no single binary that ships\n'
     'to all 150 stores — this cost us weeks\nbefore we accepted it.', color=MUTED,
     size=13, font=HAND, w=380, angle=-0.008)

note(1186, 1040, 'retraining is cheap.\ndeciding what to retrain ON is not —\n'
     'the operator clicks are the only\nground truth anyone ever gave us.',
     color=MUTED, size=13, font=HAND, w=380)

# ── footer ─────────────────────────────────────────────────────────────────
hline(60, 2344, 1140)
note(62, 1158, 'Rafael De Santis  ·  rasantis.github.io  ·  built and operated solo, '
     'edge to cloud', color='#59626e', size=12, font=MONO, w=800)


doc = {
    'type': 'excalidraw',
    'version': 2,
    'source': 'portfolio/tools/build_excalidraw.py',
    'elements': _els,
    'appState': {'gridSize': None, 'viewBackgroundColor': BG},
    'files': {},
}

os.makedirs(OUT, exist_ok=True)
path = os.path.join(OUT, 'arch_shopguard.excalidraw')
with open(path, 'w', encoding='utf-8') as fh:
    json.dump(doc, fh, indent=1)
print(f'{len(_els)} elements -> {path}')
