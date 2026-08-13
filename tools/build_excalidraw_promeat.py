"""ProMeat AI — per-bird weight prediction. The deep architecture board.

Layout only. Palette, drawing verbs and the four rules live in tools/exca.py.

Output:  portfolio/public/diagrams/arch_promeat_weight.excalidraw
Preview: python tools/preview_excalidraw.py <file> <out.svg>
"""
from exca import *          # noqa: F403 — drawing verbs and palette
from exca import add, emit

# ═══════════════════════════════════════════════════════════════════════════
# ProMeat AI — weighing broilers with a camera instead of a hand
#
# The argument: the label is the bottleneck. Nobody can put 25,000 birds on a
# scale, so the ground truth is a few hundred (image, kg) pairs from the scale
# in the house. Every other decision — SAM3 instead of a box, splitting the
# dataset by lote, feeding age and line into the head — exists to make that
# small label set carry.
#
# Second argument, visible in the top row: the mask is the hard part. The kilo
# is a regression on a clean crop. Getting a clean crop of one bird out of a
# pen of identical, deformable, touching birds is the whole problem.
# ═══════════════════════════════════════════════════════════════════════════

note(60, 46, 'ProMeat AI — weighing broilers with a camera', color=INK, size=27,
     font=HAND, w=1000)
note(62, 88, 'Ross broilers  ·  a weight per individual bird, not per flock  ·  '
     "98.5% accuracy against the client's 95% requirement", color=MUTED, size=14,
     font=MONO, w=1100)
note(62, 132, 'frame  →  detect  →  SAM3 mask  →  masked crop  →  CNN + age  →  '
     'kg per bird  →  flock curve', color=FAINT, size=13, font=MONO, w=1200)
hline(60, 2344, 172)

# ── TOP REGISTER — what runs on a live house ───────────────────────────────
band(60, 'INFERENCE', 'overhead camera on a broiler house', w=620)

box(60, 300, 240, 60, 'Overhead camera', 'periodic capture', size=14)
box(340, 300, 240, 60, 'Detector', 'one proposal per bird', size=14)
box(620, 300, 240, 60, 'SAM3', 'mask per instance', size=15, fill=AI_BG,
    stroke=AI_ST)
box(900, 300, 240, 60, 'Masked crop', 'one bird, background gone', size=14)
box(1180, 300, 240, 60, 'CNN regressor', 'backbone + head', size=14, fill=AI_BG,
    stroke=AI_ST)
box(1460, 300, 240, 60, 'Weight per bird', '#124  ·  3.18 kg', size=14,
    stroke=AMBER)
box(1740, 300, 240, 60, 'Flock aggregate', 'mean · spread · uniformity', size=13)
box(2020, 300, 240, 60, 'Dashboard', 'weight curve per lote', size=14)

for x0 in (300, 580, 860, 1140, 1420, 1700, 1980):
    arrow([(x0, 330), (x0 + 36, 330)])

# age and line are inputs to the head, not a caption on the video
box(880, 442, 240, 54, 'Lote metadata', 'ROSS  ·  35 dias', size=14,
    stroke='#7fd8a4')
arrow([(1124, 462), (1176, 352)], color='#7fd8a4')
note(646, 524, 'a 35-day Ross and a 42-day Ross with the same\n'
     'silhouette are not the same animal. age and line\n'
     'go into the head as features — they are not a\ncaption on the video.',
     color='#7fd8a4', size=12.5, font=HAND, w=430)

note(566, 392, 'the mask is the hard part.\nthe kilo is the easy part.\n'
     'the birds are one colour, they\ndeform, and they lean on each other.',
     color=AI_ST, size=12.5, font=HAND, w=290)

note(1450, 392, 'birds the segmenter is not sure about\nare left out of the sample rather than\n'
     'guessed at. a biased sample is worse\nthan a smaller one.', color=MUTED,
     size=12.5, font=HAND, w=380)

code(60, 606, 500, 156,
     '{\n'
     '  "lote":        38,\n'
     '  "linhagem":    "ROSS",\n'
     '  "idade_dias":  35,\n'
     '  "bird_id":     124,\n'
     '  "peso_kg":     3.18,\n'
     '  "conf":        0.91\n'
     '}', title='one record per bird, per capture')

code(1620, 606, 500, 156,
     'crop  = mask * frame        # background zeroed\n'
     'feat  = backbone(crop)\n'
     'ctx   = [idade_dias, linhagem_onehot]\n'
     'kg    = head(concat(feat, ctx))\n'
     '\n'
     'loss  = MAE(kg, peso_balanca)',
     title='the head sees the bird and its age, nothing else')

note(64, 786, 'SAM3 per bird per frame is not free. it does not run at frame rate —\n'
     'a flock does not change in 33 ms, so capture is periodic and the cost\n'
     'is paid per sample, not per second.', color=FAINT, size=12.5, font=HAND,
     w=560)

# ── BOTTOM REGISTER — how the model got made ───────────────────────────────
hline(60, 2344, 850)
band(60, 'DATA & MODEL', 'the loop that produced the head above', y=868, w=620)

box(60, 940, 300, 60, 'Camera + scale', 'in the house, same bird', size=14)
box(440, 940, 280, 60, 'Pair by timestamp', '(masked crop, kg)', size=14)
box(800, 940, 280, 60, 'Dataset', 'split by LOTE', size=14)
box(1160, 940, 300, 60, 'Train + eval', 'MAE in kg  ·  gate at 95%', size=14,
    fill=AI_BG, stroke=AI_ST)
box(1540, 940, 280, 60, 'Ship the head', 'versioned with the lote', size=14)

for x0, x1 in ((364, 436), (724, 796), (1084, 1156), (1464, 1536)):
    arrow([(x0, 970), (x1, 970)], color='#5d6b7d')

# the loop closes into the live head
arrow([(1300, 936), (1300, 366)], color=AI_ST, dashed=True)
note(1312, 660, 'a trained head\nreplaces the live one', color=AI_ST, size=12,
     font=MONO, w=240)

note(64, 1030, 'nobody can put 25,000 birds on a scale.\nthe ground truth is a few hundred pairs from\n'
     'the scale in the house — and every other choice\nin this system exists to make those few hundred carry.',
     color=MUTED, size=13, font=HAND, w=520)

note(800, 1030, 'split by lote, never at random.\ntwo frames of the same bird on both\n'
     'sides of the split and the 98.5% is a\nnumber about yourself, not about the flock.',
     color=MUTED, size=12.5, font=HAND, w=420, angle=-0.006)

box(1540, 1040, 300, 62, '98.5% accuracy', "client's requirement was 95%",
    fill=WIN_BG, stroke=WIN_ST, size=14)
note(1544, 1116, 'measured on lotes the model\nnever saw during training.',
     color=FAINT, size=12.5, font=HAND, w=320)

# ── footer ─────────────────────────────────────────────────────────────────
hline(60, 2344, 1200)
note(62, 1218, 'Rafael De Santis  ·  rasantis.github.io  ·  Promeat AI, part of the '
     'Pix Force group', color='#59626e', size=12, font=MONO, w=900)

emit('arch_promeat_weight.excalidraw')
