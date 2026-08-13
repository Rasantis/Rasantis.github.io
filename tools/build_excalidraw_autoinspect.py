"""AutoInspect AI — a photo walk-around becomes a priced repair. Deep board.

Layout only. Palette, drawing verbs and the four rules live in tools/exca.py.

Output:  portfolio/public/diagrams/arch_autoinspect.excalidraw
Preview: python tools/preview_excalidraw.py <file> <out.svg>
"""
from exca import *          # noqa: F403 — drawing verbs and palette
from exca import add, emit

# ═══════════════════════════════════════════════════════════════════════════
# The argument, and it is an uncomfortable one to put on a portfolio:
#
#   the defect model scores 0.12 mask mAP50 on eight classes, from 655 images.
#   two of the eight did not learn at all.
#
# Everything else on this board exists because that number is what it is. The
# quality gate, the intersection against a second and much stronger model, the
# view merge, the 2% abstain margin, the human queue — none of it is decoration.
# A system built around a weak model is a different system from one built around
# a strong one, and this is what the difference looks like.
#
# The second argument is smaller and lives in the middle of the top row: a
# detection is not a line item. "scratch, 0.81" cannot be quoted. "scratch on
# the front left door" can.
#
# Shape: photos go in at the top left, the report comes back out at the bottom
# left. The board is a loop because the product is one.
# ═══════════════════════════════════════════════════════════════════════════

note(60, 46, 'AutoInspect AI — a walk-around becomes a priced repair',
     color=INK, size=27, font=HAND, w=1200)
note(62, 88, 'two YOLO11-seg models intersected mask to mask  ·  a defect that '
     'cannot be placed on a panel is not a line item', color=MUTED, size=14,
     font=MONO, w=1200)
note(62, 112, 'portfolio project — built to be taken apart, not a client deployment',
     color='#59626e', size=12, font=MONO, w=700)
note(62, 142, 'photos  →  quality gate  →  panels ∩ defects  →  merge views  →  '
     'abstain or assign  →  operations  →  priced report', color=FAINT, size=13,
     font=MONO, w=1300)
hline(60, 2404, 182)

# ── ROW A — perception ─────────────────────────────────────────────────────
band(60, 'PERCEPTION', 'two models, and the intersection between them', w=680)

box(60, 322, 250, 60, 'Walk-around photos', 'one pass around the car', size=14)
box(380, 322, 240, 60, 'Quality gate', 'blur · framing · coverage', size=14,
    stroke='#e08a4a')
box(700, 262, 290, 56, 'YOLO11-seg — panels', '23 body panels', size=14,
    fill=AI_BG, stroke=AI_ST)
box(700, 386, 290, 56, 'YOLO11-seg — defects', '8 defect types', size=14,
    fill=AI_BG, stroke=AI_ST)
box(1090, 322, 230, 60, 'Mask ∩ mask', 'IoU, defect to panel', size=14)
box(1420, 322, 300, 60, 'A defect on a panel', 'scratch · front left door',
    size=14, stroke=AMBER)
box(1820, 322, 270, 60, 'Merge repeat views', 'one dent, three photos', size=14)

arrow([(314, 352), (376, 352)])
arrow([(624, 352), (696, 292)])
arrow([(624, 352), (696, 416)])
arrow([(994, 292), (1086, 342)], color=AI_ST)
arrow([(994, 416), (1086, 366)], color=AI_ST)
arrow([(1324, 352), (1416, 352)])
arrow([(1724, 352), (1816, 352)], color=AMBER)

note(384, 396, 'a photo the model cannot read\nis rejected at the door, not\n'
     'guessed at downstream.', color='#e08a4a', size=12.5, font=HAND, w=290)

note(1092, 400, '"scratch, 0.81" cannot be quoted.\n"scratch on the front left door"\n'
     'can. that sentence is the product.', color=AMBER, size=13, font=HAND, w=340)

note(1824, 396, 'the same dent from three angles\nis one dent. without this the\n'
     'estimate triples itself.', color=FAINT, size=12.5, font=HAND, w=300)

code(60, 486, 520, 152,
     'for d in defect_masks:\n'
     '    p = argmax(panel_masks, key=lambda p: iou(d, p))\n'
     '    if iou(d, p) < MIN_OVERLAP:\n'
     '        abstain(d)        # cannot place it -> not a line item\n'
     '    else:\n'
     '        finding(defect=d.cls, panel=p.cls, conf=d.conf)',
     title='the intersection — a defect belongs to exactly one panel')

# ── the turn ───────────────────────────────────────────────────────────────
# Enters the gate on its right vertex, leaves on the left, abstains downward.
arrow([(2094, 352), (2270, 352), (2270, 798), (2186, 798)], color=AMBER)

# ── ROW B — decision and pricing, running back right to left ───────────────
band(60, 'DECISION & PRICING', 'the report comes back to the person who took the photos',
     y=690, w=900)

add(base(id=uid('d'), type='diamond', x=1980, y=746, width=200, height=104,
         strokeColor=AMBER, backgroundColor='#2a2317', strokeWidth=1.5))
note(2018, 786, 'assign?', color=INK, size=15, font=MONO, w=160)

box(1620, 768, 280, 60, 'Repair operations', 'finding → operation', size=14)
box(1280, 768, 280, 60, 'Rate card', 'auditable · versioned', size=14,
    stroke='#7fd8a4')
box(940, 768, 280, 60, 'Priced report', 'line items + total', size=14,
    fill=WIN_BG, stroke=WIN_ST)
box(600, 768, 280, 60, 'Delivered live', 'FastAPI · WebSockets · React', size=13)

arrow([(1976, 798), (1904, 798)], color=AMBER)
for x0, x1 in ((1616, 1564), (1276, 1224), (936, 884)):
    arrow([(x0, 798), (x1, 798)], color='#5d6b7d')
# Closes in the left margin so the wire never crosses the code block.
arrow([(596, 798), (28, 798), (28, 352), (56, 352)], color=WIN_ST, dashed=True)
note(64, 812, 'back to the person who walked around the car',
     color=FAINT, size=12.5, font=MONO, w=460)

box(1960, 900, 240, 60, 'Human review', 'the borderline queue', size=14,
    stroke='#e08a4a')
arrow([(2080, 854), (2080, 896)], color='#e08a4a', dashed=True)
note(1530, 906, 'inside a 2% margin the system refuses\nto choose a panel and hands the finding\n'
     'to a person. nothing is assigned on a\ncoin flip.',
     color='#e08a4a', size=12.5, font=HAND, w=400)

code(940, 486, 520, 152,
     '{\n'
     '  "defect":      "scratch",\n'
     '  "panel":       "front_left_door",\n'
     '  "iou_panel":   0.62,\n'
     '  "merged_from": ["img_03", "img_07"],\n'
     '  "operation":   "<rate card lookup>"\n'
     '}', title='one finding — what a body shop can actually quote')

# ── the honest register ────────────────────────────────────────────────────
hline(60, 2404, 1010)
band(60, 'WHAT THE MODELS ACTUALLY SCORE',
     'reported here because the architecture above is a consequence of it',
     y=1028, w=900)

code(60, 1090, 700, 148,
     'panels    mask mAP50  0.65     23 classes    3,156 images\n'
     'defects   mask mAP50  0.12      8 classes      655 images\n'
     '\n'
     '          reported per class — including the two of the\n'
     '          eight that did not learn at all.',
     title='measured, not rounded up')

note(810, 1090, 'a 0.12 model does not get to decide.',
     color=AMBER, size=16, font=HAND, w=520)
note(812, 1122, 'every box in the top half is there because of that number.\n'
     'the quality gate, the intersection against a model that is five times\n'
     'stronger, the view merge, the 2% margin, the human queue — none of it\n'
     'is decoration. a system built around a weak model is a different system\n'
     'from one built around a strong one, and this is what the difference\nlooks like.',
     color=MUTED, size=13, font=HAND, w=760)

note(1620, 1090, 'the honest way to read this board:\nthe panel model is good, the defect\n'
     'model is not, and the product works\nanyway because the weak one is never\n'
     'asked a question it cannot answer.',
     color=FAINT, size=12.5, font=HAND, w=400, angle=-0.006)

# ── footer ─────────────────────────────────────────────────────────────────
hline(60, 2404, 1300)
note(62, 1318, 'Rafael De Santis  ·  rasantis.github.io  ·  YOLO11-seg · PyTorch · '
     'OpenCV · FastAPI · WebSockets · React', color='#59626e', size=12, font=MONO,
     w=1000)

emit('arch_autoinspect.excalidraw')
