"""Offline preview of an .excalidraw file, as flat SVG.

The skill ships a Playwright renderer, but it pulls the Excalidraw bundle from
esm.sh and this machine has no egress to it. This is the fallback: it draws the
same geometry with straight strokes so layout can be checked — overlaps, text
spilling out of boxes, arrows landing in the wrong place.

It is NOT the final look. The hand-drawn stroke is Excalidraw's job; open the
.excalidraw at excalidraw.com and export from there.

    python tools/preview_excalidraw.py public/diagrams/arch_shopguard.excalidraw
"""
from __future__ import annotations

import json
import sys
from xml.sax.saxutils import escape

PAD = 40
MONO = "'Cascadia Code','Consolas','DejaVu Sans Mono',monospace"
HAND = "'Segoe Print','Comic Sans MS','Bradley Hand',cursive"
SANS = "'Segoe UI',Helvetica,Arial,sans-serif"
FAMILY = {1: HAND, 2: SANS, 3: MONO}
CHARW = {1: 0.52, 2: 0.52, 3: 0.60}   # advance width per font-size unit


def bounds(els):
    xs, ys, xe, ye = [], [], [], []
    for e in els:
        if e.get('isDeleted'):
            continue
        x, y = e['x'], e['y']
        w, h = e.get('width', 0), e.get('height', 0)
        if e['type'] in ('arrow', 'line'):
            pts = e.get('points') or [[0, 0]]
            xs.append(x + min(p[0] for p in pts)); xe.append(x + max(p[0] for p in pts))
            ys.append(y + min(p[1] for p in pts)); ye.append(y + max(p[1] for p in pts))
        else:
            xs.append(x); xe.append(x + w); ys.append(y); ye.append(y + h)
    return min(xs), min(ys), max(xe), max(ye)


def render(path: str) -> str:
    doc = json.load(open(path, encoding='utf-8'))
    els = [e for e in doc['elements'] if not e.get('isDeleted')]
    bg = doc.get('appState', {}).get('viewBackgroundColor', '#ffffff')
    x0, y0, x1, y1 = bounds(els)
    W, H = x1 - x0 + PAD * 2, y1 - y0 + PAD * 2
    containers = {e['id']: e for e in els if e['type'] not in ('text', 'arrow', 'line')}

    out = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" height="{H:.0f}" '
           f'viewBox="0 0 {W:.0f} {H:.0f}"><rect width="100%" height="100%" fill="{bg}"/>',
           f'<g transform="translate({PAD - x0:.1f},{PAD - y0:.1f})">']

    def stroke_attrs(e):
        d = f'stroke="{e.get("strokeColor", "#000")}" stroke-width="{e.get("strokeWidth", 1)}"'
        if e.get('strokeStyle') == 'dashed':
            d += ' stroke-dasharray="8 6"'
        elif e.get('strokeStyle') == 'dotted':
            d += ' stroke-dasharray="2 5"'
        return d

    # shapes first, text last (so labels are never covered)
    for e in els:
        t, x, y = e['type'], e['x'], e['y']
        w, h = e.get('width', 0), e.get('height', 0)
        fill = e.get('backgroundColor', 'transparent')
        if t == 'rectangle':
            r = 12 if e.get('roundness') else 0
            out.append(f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" '
                       f'rx="{r}" fill="{fill}" {stroke_attrs(e)}/>')
        elif t == 'ellipse':
            out.append(f'<ellipse cx="{x + w / 2:.1f}" cy="{y + h / 2:.1f}" rx="{w / 2:.1f}" '
                       f'ry="{h / 2:.1f}" fill="{fill}" {stroke_attrs(e)}/>')
        elif t == 'diamond':
            pts = f'{x + w / 2:.1f},{y:.1f} {x + w:.1f},{y + h / 2:.1f} ' \
                  f'{x + w / 2:.1f},{y + h:.1f} {x:.1f},{y + h / 2:.1f}'
            out.append(f'<polygon points="{pts}" fill="{fill}" {stroke_attrs(e)}/>')
        elif t in ('arrow', 'line'):
            pts = e.get('points') or []
            d = ' '.join(f'{"M" if i == 0 else "L"}{x + p[0]:.1f},{y + p[1]:.1f}'
                         for i, p in enumerate(pts))
            out.append(f'<path d="{d}" fill="none" {stroke_attrs(e)} stroke-linecap="round"/>')
            if t == 'arrow' and e.get('endArrowhead') and len(pts) >= 2:
                (ax, ay), (bx, by) = pts[-2], pts[-1]
                dx, dy = bx - ax, by - ay
                n = (dx * dx + dy * dy) ** .5 or 1
                dx, dy = dx / n, dy / n
                px, py = -dy, dx
                tipx, tipy = x + bx, y + by
                out.append(
                    f'<polygon points="{tipx:.1f},{tipy:.1f} '
                    f'{tipx - dx * 11 + px * 5:.1f},{tipy - dy * 11 + py * 5:.1f} '
                    f'{tipx - dx * 11 - px * 5:.1f},{tipy - dy * 11 - py * 5:.1f}" '
                    f'fill="{e.get("strokeColor", "#000")}"/>')

    for e in els:
        if e['type'] != 'text':
            continue
        fs = e.get('fontSize', 16)
        fam = FAMILY.get(e.get('fontFamily', 3), MONO)
        col = e.get('strokeColor', '#000')
        lines = e['text'].split('\n')
        lh = fs * e.get('lineHeight', 1.25)
        cid = e.get('containerId')
        if cid and cid in containers:            # bound text: centre in the box
            c = containers[cid]
            cx = c['x'] + c['width'] / 2
            top = c['y'] + (c['height'] - len(lines) * lh) / 2 + lh * 0.78
            anchor, tx = 'middle', cx
        else:
            anchor, tx = 'start', e['x']
            top = e['y'] + lh * 0.78
        for i, ln in enumerate(lines):
            out.append(f'<text x="{tx:.1f}" y="{top + i * lh:.1f}" font-family="{fam}" '
                       f'font-size="{fs}" fill="{col}" text-anchor="{anchor}" '
                       f'xml:space="preserve">{escape(ln)}</text>')

    out.append('</g></svg>')
    return '\n'.join(out)


if __name__ == '__main__':
    src = sys.argv[1]
    dst = sys.argv[2] if len(sys.argv) > 2 else src.rsplit('.', 1)[0] + '_preview.svg'
    svg = render(src)
    open(dst, 'w', encoding='utf-8').write(svg)
    print(f'{dst}  ({len(svg) // 1024} KB)')
