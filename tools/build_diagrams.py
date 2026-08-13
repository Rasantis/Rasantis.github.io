"""Architecture diagrams for the portfolio — hand-laid SVG on a fixed grid.

Why not Graphviz/mermaid: auto-layout decides the positions, and it decides
badly — tiers drift sideways, gaps open up, edges cross. Real architecture
diagrams (AWS reference architectures, a good Excalidraw board) are positioned
by hand. So this file owns the coordinates: every tier is a row, every component
sits on a column, and nothing moves unless we move it.

Output is SVG, which beats the PNG it replaces: text stays sharp at any zoom,
it scales to any container, and the files are a fraction of the size.

Two content rules:
  1. A vendor icon ONLY where the technology really is that vendor's. Rafael's
     own components are labelled boxes — borrowing a logo would imply a service
     that isn't in the stack.
  2. Every element survives a technical deep dive: no invented thresholds,
     latencies or components.

Icons are the official ones shipped with the `diagrams` package, embedded as
base64 so each SVG is self-contained. Regenerate with:  python tools/build_diagrams.py
"""
from __future__ import annotations

import base64
import io
import os
from dataclasses import dataclass, field
from xml.sax.saxutils import escape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'public', 'diagrams')
ICON_SRC = os.path.join(
    os.path.dirname(os.__file__), 'site-packages', 'resources'
)

# ── palette (mirrors the site theme) ────────────────────────────────────────
BG = '#0f1319'
TIER_BG = '#151b24'
BOX_BG = '#1b222c'
INK = '#eef1f6'
MUTED = '#9aa5b4'
FAINT = '#6f7885'
LINE = '#4d5866'
AMBER = '#ffb224'
GREEN = '#45d483'
BLUE = '#8fb4ff'
STEEL = '#9db2ce'

ICONS = {
    'react': 'programming/framework/react.png',
    'fastapi': 'programming/framework/fastapi.png',
    'python': 'programming/language/python.png',
    'cpp': 'programming/language/cpp.png',
    'postgresql': 'onprem/database/postgresql.png',
    'docker': 'onprem/container/docker.png',
    'gcp': 'gcp/compute/compute-engine.png',
    'gpu': 'gcp/compute/gpu.png',
    'gcs': 'gcp/storage/storage.png',
    'oracle': 'oci/compute/vm-white.png',
}

_icon_cache: dict[str, str] = {}


def icon_data(key: str) -> str | None:
    """Official vendor icon, normalised to 128px and embedded as base64."""
    if key in _icon_cache:
        return _icon_cache[key]
    rel = ICONS.get(key)
    if not rel:
        return None
    path = os.path.join(ICON_SRC, *rel.split('/'))
    if not os.path.exists(path):
        return None
    try:
        from PIL import Image
    except ImportError:
        return None
    im = Image.open(path).convert('RGBA')
    im.thumbnail((128, 128), Image.LANCZOS)
    canvas = Image.new('RGBA', (128, 128), (0, 0, 0, 0))
    canvas.paste(im, ((128 - im.width) // 2, (128 - im.height) // 2), im)
    buf = io.BytesIO()
    canvas.save(buf, format='PNG', optimize=True)
    _icon_cache[key] = base64.b64encode(buf.getvalue()).decode()
    return _icon_cache[key]


# ── grid ────────────────────────────────────────────────────────────────────
W = 1400                 # canvas width
PAD = 22                 # outer padding
GUTTER = 46              # side channels where tier-skipping links are routed
TIER_H = 150             # height of a tier band
TIER_GAP = 26            # vertical gap between tiers
TIER_LABEL_H = 30        # room for the tier caption inside the band
BOX_W = 200
BOX_H = 84
COL_GAP = 22


@dataclass
class Comp:
    """One component on the grid."""
    label: str
    sub: str = ''
    icon: str = ''
    accent: str = LINE
    kind: str = 'box'          # box | gate | actor
    span: int = 1


@dataclass
class Tier:
    num: str
    name: str
    note: str = ''
    accent: str = STEEL
    comps: list[Comp] = field(default_factory=list)


@dataclass
class Link:
    """A connection between components, addressed as (tier index, comp index)."""
    src: tuple[int, int]
    dst: tuple[int, int]
    label: str = ''
    color: str = LINE
    dashed: bool = False
    side: str = 'auto'         # auto | left | right — which way to route


class Canvas:
    def __init__(self, title: str, subtitle: str):
        self.title = title
        self.subtitle = subtitle
        self.parts: list[str] = []
        self.tiers: list[Tier] = []
        self.links: list[Link] = []
        self.boxes: dict[tuple[int, int], tuple[float, float, float, float]] = {}

    # geometry ------------------------------------------------------------
    def tier_y(self, i: int) -> float:
        return PAD + 58 + i * (TIER_H + TIER_GAP)

    def layout(self) -> None:
        for ti, tier in enumerate(self.tiers):
            y = self.tier_y(ti)
            units = sum(c.span for c in tier.comps)
            total_w = units * BOX_W + (len(tier.comps) - 1) * COL_GAP
            x = (W - total_w) / 2
            box_y = y + TIER_LABEL_H + (TIER_H - TIER_LABEL_H - BOX_H) / 2
            for ci, comp in enumerate(tier.comps):
                w = comp.span * BOX_W + (comp.span - 1) * COL_GAP
                self.boxes[(ti, ci)] = (x, box_y, w, BOX_H)
                x += w + COL_GAP

    def tier_bounds(self) -> tuple[float, float]:
        """Where the tier bands start and end — the gutters live outside them."""
        return PAD + GUTTER, W - PAD - GUTTER

    # drawing -------------------------------------------------------------
    def height(self) -> float:
        return self.tier_y(len(self.tiers) - 1) + TIER_H + PAD + 34

    def draw_tier(self, i: int, tier: Tier) -> None:
        y = self.tier_y(i)
        left, right = self.tier_bounds()
        self.parts.append(
            f'<rect x="{left}" y="{y}" width="{right - left}" height="{TIER_H}" rx="12" '
            f'fill="{TIER_BG}" stroke="{tier.accent}" stroke-opacity="0.5" stroke-width="1.2"/>'
        )
        self.parts.append(
            f'<text x="{left + 18}" y="{y + 21}" class="tier-num" fill="{tier.accent}">{escape(tier.num)}</text>'
        )
        self.parts.append(
            f'<text x="{left + 42}" y="{y + 21}" class="tier-name" fill="{tier.accent}">{escape(tier.name)}</text>'
        )
        if tier.note:
            off = left + 52 + len(tier.name) * 8.4
            self.parts.append(
                f'<text x="{off}" y="{y + 21}" class="tier-note" fill="{FAINT}">{escape(tier.note)}</text>'
            )

    def draw_comp(self, key: tuple[int, int], comp: Comp) -> None:
        x, y, w, h = self.boxes[key]
        if comp.kind == 'gate':
            cx, cy = x + w / 2, y + h / 2
            pts = f'{cx},{y - 6} {x + w + 4},{cy} {cx},{y + h + 6} {x - 4},{cy}'
            self.parts.append(
                f'<polygon points="{pts}" fill="#241d0c" stroke="{AMBER}" stroke-width="1.6"/>'
            )
        else:
            fill = '#16241d' if comp.kind == 'actor' else BOX_BG
            self.parts.append(
                f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="9" fill="{fill}" '
                f'stroke="{comp.accent}" stroke-opacity="0.75" stroke-width="1.3"/>'
            )

        data = icon_data(comp.icon) if comp.icon else None
        tx = x + w / 2
        if data:
            self.parts.append(
                f'<image href="data:image/png;base64,{data}" x="{x + 12}" y="{y + (h - 40) / 2}" '
                f'width="40" height="40"/>'
            )
            tx = x + 62
            anchor = 'start'
        else:
            anchor = 'middle'

        ink = '#c9f2dd' if comp.kind == 'actor' else ('#ffd98a' if comp.kind == 'gate' else INK)
        ty = y + h / 2 + (5 if not comp.sub else -4)
        self.parts.append(
            f'<text x="{tx}" y="{ty}" class="lbl" text-anchor="{anchor}" fill="{ink}">{escape(comp.label)}</text>'
        )
        if comp.sub:
            self.parts.append(
                f'<text x="{tx}" y="{ty + 16}" class="sub" text-anchor="{anchor}" fill="{FAINT}">{escape(comp.sub)}</text>'
            )

    def draw_link(self, link: Link) -> None:
        sx, sy, sw, sh = self.boxes[link.src]
        dx, dy, dw, dh = self.boxes[link.dst]
        dash = ' stroke-dasharray="6 5"' if link.dashed else ''
        mid = f'url(#arrow-{link.color.lstrip("#")})'

        if link.src[0] == link.dst[0]:                     # same tier → sideways
            y = sy + sh / 2
            x1, x2 = (sx + sw, dx) if dx > sx else (sx, dx + dw)
            # Arc when the line skips a component (so a fork never reads as a
            # chain) or when it carries a label (the 22px gap between boxes has
            # no room for text).
            jumps = abs(link.dst[1] - link.src[1]) > 1 or bool(link.label)
            if jumps:
                lift = sh / 2 + 26
                d = f'M {x1} {y} C {x1 + (x2 - x1) * 0.25} {y - lift}, {x1 + (x2 - x1) * 0.75} {y - lift}, {x2} {y}'
                ly = y - lift + 4
            else:
                d = f'M {x1} {y} L {x2} {y}'
                ly = y - 9
            self.parts.append(
                f'<path d="{d}" stroke="{link.color}" stroke-width="1.5" '
                f'fill="none" marker-end="{mid}"{dash}/>'
            )
            if link.label:
                self.parts.append(
                    f'<text x="{(x1 + x2) / 2}" y="{ly}" class="edge" text-anchor="middle" '
                    f'fill="{MUTED}">{escape(link.label)}</text>'
                )
            return

        if abs(link.dst[0] - link.src[0]) > 1:
            # Route around the tiers instead of cutting through them: leave
            # sideways, run down a gutter, come back in from the side.
            left, right = self.tier_bounds()
            use_right = link.side == 'right' or (link.side == 'auto' and (sx + sw / 2) > W / 2)
            gx = right + GUTTER / 2 if use_right else left - GUTTER / 2
            sx_edge = sx + sw if use_right else sx
            dx_edge = dx + dw if use_right else dx
            ys, yd = sy + sh / 2, dy + dh / 2
            d = f'M {sx_edge} {ys} L {gx} {ys} L {gx} {yd} L {dx_edge} {yd}'
            self.parts.append(
                f'<path d="{d}" stroke="{link.color}" stroke-width="1.5" fill="none" '
                f'marker-end="{mid}"{dash}/>'
            )
            if link.label:
                my = (ys + yd) / 2
                self.parts.append(
                    f'<text x="{gx}" y="{my}" class="edge" text-anchor="middle" fill="{MUTED}" '
                    f'transform="rotate(-90 {gx} {my})">{escape(link.label)}</text>'
                )
            return

        going_down = dy > sy
        y1 = sy + sh if going_down else sy
        y2 = dy if going_down else dy + dh
        x1, x2 = sx + sw / 2, dx + dw / 2

        if abs(x1 - x2) < 2:                               # straight drop
            d = f'M {x1} {y1} L {x2} {y2}'
        else:                                              # orthogonal elbow
            my = (y1 + y2) / 2
            d = f'M {x1} {y1} L {x1} {my} L {x2} {my} L {x2} {y2}'
        self.parts.append(
            f'<path d="{d}" stroke="{link.color}" stroke-width="1.5" fill="none" '
            f'marker-end="{mid}"{dash}/>'
        )
        if link.label:
            lx = (x1 + x2) / 2
            ly = (y1 + y2) / 2 - 6
            self.parts.append(
                f'<text x="{lx}" y="{ly}" class="edge" text-anchor="middle" fill="{MUTED}">{escape(link.label)}</text>'
            )

    def render(self) -> str:
        self.layout()
        h = self.height()
        colors = {LINE, AMBER, GREEN, BLUE, STEEL}
        markers = ''.join(
            f'<marker id="arrow-{c.lstrip("#")}" viewBox="0 0 10 10" refX="9" refY="5" '
            f'markerWidth="6" markerHeight="6" orient="auto-start-reverse">'
            f'<path d="M 0 0 L 10 5 L 0 10 z" fill="{c}"/></marker>'
            for c in colors
        )
        for ti, tier in enumerate(self.tiers):
            self.draw_tier(ti, tier)
        for link in self.links:
            self.draw_link(link)
        for ti, tier in enumerate(self.tiers):
            for ci, comp in enumerate(tier.comps):
                self.draw_comp((ti, ci), comp)

        body = '\n  '.join(self.parts)
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {h:.0f}" width="{W}" height="{h:.0f}" role="img">
  <style>
    text {{ font-family: 'Segoe UI', 'Inter', system-ui, sans-serif; }}
    .title {{ font-size: 19px; font-weight: 700; }}
    .subtitle {{ font-size: 13px; }}
    .tier-num {{ font-family: 'Consolas', monospace; font-size: 12px; font-weight: 700; }}
    .tier-name {{ font-family: 'Consolas', monospace; font-size: 12.5px; font-weight: 700; letter-spacing: .08em; }}
    .tier-note {{ font-family: 'Consolas', monospace; font-size: 11.5px; }}
    .lbl {{ font-size: 13.5px; font-weight: 600; }}
    .sub {{ font-size: 11.5px; }}
    .edge {{ font-family: 'Consolas', monospace; font-size: 11px; }}
  </style>
  <rect width="{W}" height="{h:.0f}" fill="{BG}"/>
  <defs>{markers}</defs>
  <text x="{PAD}" y="{PAD + 16}" class="title" fill="{INK}">{escape(self.title)}</text>
  <text x="{PAD}" y="{PAD + 38}" class="subtitle" fill="{MUTED}">{escape(self.subtitle)}</text>
  {body}
</svg>
'''


def write(canvas: Canvas, filename: str) -> None:
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, filename)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(canvas.render())
    print(f'{filename}: {os.path.getsize(path) // 1024} KB')


# ══════════════════════════ 1. ShopGuard AI ══════════════════════════
sg = Canvas('ShopGuard AI — retail vision platform', 'edge inference to operator action, 150 stores under 24/7 traffic')
sg.tiers = [
    Tier('1', 'STORE EDGE', '— identical appliance per store', BLUE, [
        Comp('RTSP cameras', '~30 per store', accent=BLUE),
        Comp('GStreamer', 'hardware decode', accent=BLUE),
        Comp('YOLO11 + TensorRT', 'sub-second inference', icon='cpp', accent=BLUE),
        Comp('Provisioning', 'same stack, every store', accent=BLUE),
    ]),
    Tier('2', 'CLOUD INGEST', '— hybrid GCP / Oracle Cloud', STEEL, [
        Comp('Event ingest API', 'auth + validation', icon='fastapi'),
        Comp('Event stream', 'event-driven services'),
        Comp('Clip extraction', 'evidence + datasets'),
    ]),
    Tier('3', 'INTELLIGENCE', '— LangChain + AutoGen', AMBER, [
        Comp('Context builder', 'store · camera · history', accent=AMBER),
        Comp('GPT-4', 'alert + summary', icon='python', accent=AMBER),
        Comp('severity routing', kind='gate', accent=AMBER),
    ]),
    Tier('4', 'DELIVERY', '', GREEN, [
        Comp('Escalation workflow', 'policy per store', accent=GREEN),
        Comp('Operator dashboard', 'live alerts', icon='react', accent=GREEN),
        Comp('Store operator', 'acts before the loss', kind='actor', accent=GREEN),
    ]),
    Tier('5', 'DATA, MODEL LOOP & PLATFORM', '', STEEL, [
        Comp('Events & stores', 'PostgreSQL', icon='postgresql'),
        Comp('Clips & datasets', 'object storage', icon='gcs'),
        Comp('Failure-case retraining', 'real misses → training data'),
        Comp('Docker · CI/CD', 'GCP + Oracle Cloud', icon='docker'),
    ]),
]
sg.links = [
    Link((0, 0), (0, 1)), Link((0, 1), (0, 2)),
    Link((0, 2), (1, 0), 'detections'),
    Link((1, 0), (1, 1)), Link((1, 1), (1, 2)),
    Link((1, 1), (2, 0), 'event', AMBER),
    Link((2, 0), (2, 1), color=AMBER), Link((2, 1), (2, 2), color=AMBER),
    Link((2, 2), (3, 0), 'escalate now', GREEN),
    Link((2, 2), (3, 1), 'batch to digest', AMBER, dashed=True),
    Link((3, 0), (3, 1), color=GREEN), Link((3, 1), (3, 2), color=GREEN),
    Link((1, 2), (4, 1), color=LINE, dashed=True),
    Link((1, 1), (4, 0), color=LINE, dashed=True),
    Link((4, 1), (4, 2), dashed=True),
    Link((4, 2), (0, 3), 'new model to every store', BLUE, dashed=True),
]
# SUPERSEDED (Aug 2026). The ShopGuard case now uses the deep Excalidraw board
# from tools/build_excalidraw.py — it carries the store-side RabbitMQ frame
# queue, the GKE orchestration layer, the VLM summary and the severity gate,
# none of which fit this five-tier SVG. The canvas above is left intact as a
# record of the earlier design; regenerating it would only create an orphan
# nobody links to, so the write is disabled rather than the definition deleted.
# write(sg, 'arch_shopguard.svg')


# ══════════════════════════ 2. Promeat AI ══════════════════════════
pm = Canvas('Promeat AI — multi-agent decision engine', 'LangGraph agents on live plant data, serving JBS and Marfrig')
pm.tiers = [
    Tier('1', 'SOURCE SYSTEMS', '', BLUE, [
        Comp('Client ERP', 'orders, lots, results', accent=BLUE),
        Comp('Plant systems', 'operational data', accent=BLUE),
        Comp('Vision pipeline', '25,000+ animals/day', accent=BLUE),
    ]),
    Tier('2', 'INGEST', '— event-driven microservices', STEEL, [
        Comp('Event API', 'FastAPI endpoints', icon='fastapi'),
        Comp('Event bus', 'high-frequency events'),
        Comp('Normalisation', 'one schema, many sources'),
    ]),
    Tier('3', 'AGENT RUNTIME', '— LangGraph + AutoGen', AMBER, [
        Comp('Graph router', 'state machine', accent=AMBER),
        Comp('Classification', 'agent', icon='python', accent=AMBER),
        Comp('Validation', 'agent', icon='python', accent=AMBER),
        Comp('Decision', 'agent', icon='python', accent=AMBER),
        Comp('Agent tools', 'RAG · ERP queries', accent=AMBER),
    ]),
    Tier('4', 'GUARDRAIL & ACTUATION', '', GREEN, [
        Comp('confidence gate', kind='gate', accent=AMBER),
        Comp('Write-back', 'to client systems', accent=GREEN),
        Comp('Plant operator', 'human-in-the-loop', kind='actor', accent=GREEN),
        Comp('Audit record', 'every decision', accent=GREEN),
    ]),
    Tier('5', 'STATE, OBSERVABILITY & PLATFORM', '', STEEL, [
        Comp('Agent state', 'PostgreSQL + context', icon='postgresql'),
        Comp('Langfuse traces', 'per node'),
        Comp('Eval pipelines', 'regression gate'),
        Comp('Docker · CI/CD', 'GCP', icon='docker'),
    ]),
]
pm.links = [
    Link((0, 0), (1, 0)), Link((0, 1), (1, 1)), Link((0, 2), (1, 2)),
    Link((1, 0), (1, 1)), Link((1, 1), (1, 2)),
    Link((1, 1), (2, 0), 'events'),
    Link((2, 0), (2, 1), color=AMBER), Link((2, 1), (2, 2), color=AMBER), Link((2, 2), (2, 3), color=AMBER),
    Link((2, 3), (2, 4), color=LINE, dashed=True),
    Link((2, 3), (3, 0), color=AMBER),
    Link((3, 0), (3, 1), 'confident', GREEN),
    Link((3, 0), (3, 2), 'below threshold', AMBER, dashed=True),
    Link((3, 1), (3, 3), color=GREEN, dashed=True),
    Link((2, 4), (4, 0), dashed=True),
    Link((2, 3), (4, 1), dashed=True),
    Link((3, 2), (4, 2), 'corrections feed evals', AMBER, dashed=True),
]
# SUPERSEDED (Aug 2026). The Promeat case now carries a single architecture —
# the per-bird weight board from tools/build_excalidraw_promeat.py — because the
# case's video is the weighing system and two diagrams on one case was one too
# many. The multi-agent engine still lives in the project copy ("multi-agent LLM
# automation") and in the Auspex and DocIntel cases. Canvas kept as a record of
# the design; only the write is disabled, so no orphan SVG is produced.
# write(pm, 'arch_promeat.svg')


# ══════════════════════════ 3. Full-stack ══════════════════════════
fs = Canvas('Full-stack product architecture', 'the stack I build around every model — first commit to on-call')
fs.tiers = [
    Tier('1', 'CLIENTS', '', BLUE, [
        Comp('Operators & clients', 'the people who act', kind='actor', accent=GREEN),
        Comp('Operator dashboards', 'React + TypeScript', icon='react', accent=BLUE),
    ]),
    Tier('2', 'API EDGE', '', AMBER, [
        Comp('REST API', 'typed contracts', icon='fastapi', accent=AMBER),
        Comp('WebSocket', 'live state', accent=AMBER),
        Comp('Auth & validation', 'per request', accent=AMBER),
    ]),
    Tier('3', 'SERVICES', '— event-driven, independently scaled', AMBER, [
        Comp('Ingestion & processing', 'pipelines', icon='python', accent=AMBER),
        Comp('GPU inference', 'model serving', icon='gpu', accent=AMBER),
        Comp('Automation workers', 'LLM + rules', accent=AMBER),
    ]),
    Tier('4', 'DATA', '', STEEL, [
        Comp('PostgreSQL', 'Supabase', icon='postgresql'),
        Comp('Media & artifacts', 'object storage', icon='gcs'),
        Comp('Model artifacts', 'versioned'),
    ]),
    Tier('5', 'PLATFORM & OPERATIONS', '', GREEN, [
        Comp('Docker', 'reproducible builds', icon='docker', accent=GREEN),
        Comp('CI/CD', 'deploy on merge', accent=GREEN),
        Comp('GCP', 'compute', icon='gcp', accent=GREEN),
        Comp('Oracle Cloud', 'hybrid', icon='oracle', accent=GREEN),
        Comp('Logging & on-call', 'metrics, alerts', accent=GREEN),
    ]),
]
fs.links = [
    Link((0, 0), (0, 1), color=GREEN),
    Link((0, 1), (1, 0), 'REST + live'),
    Link((1, 0), (1, 1), color=AMBER), Link((1, 1), (1, 2), color=AMBER),
    Link((1, 0), (2, 0)),
    Link((1, 1), (2, 2), 'push', GREEN),
    Link((2, 0), (2, 1)), Link((2, 1), (2, 2)),
    Link((2, 0), (3, 0)),
    Link((2, 1), (3, 1), dashed=True),
    Link((3, 1), (3, 2), dashed=True),
    Link((4, 1), (2, 0), 'deploy', GREEN, dashed=True),
    Link((4, 0), (4, 1), color=GREEN), Link((4, 1), (4, 2), color=GREEN), Link((4, 2), (4, 3), color=GREEN),
]
write(fs, 'arch_fullstack.svg')

print('done →', OUT)
