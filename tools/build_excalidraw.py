"""ShopGuard AI — the deep architecture board.

Layout only. Palette, drawing verbs and the four rules live in tools/exca.py.

Output:  portfolio/public/diagrams/arch_shopguard.excalidraw
Preview: python tools/preview_excalidraw.py <file> <out.svg>
"""
from exca import *          # noqa: F403 — drawing verbs and palette
from exca import add, emit

# ═══════════════════════════════════════════════════════════════════════════
# ShopGuard AI — theft detection, store edge to Google Cloud
#
# The argument: 4,500 concurrent 1080p streams cannot be shipped to a cloud.
# Inference happens in the store, RabbitMQ absorbs the backpressure so no frame
# is dropped, and only an event crosses the wire. Everything downstream — a
# stateless GKE cluster that scales on burst, state pushed out to managed
# services — falls out of that one constraint.
# ═══════════════════════════════════════════════════════════════════════════

note(60, 46, 'ShopGuard AI — real-time theft detection', color=INK, size=27,
     font=HAND, w=900)
note(62, 88, '150 stores  ·  ~30 cameras each  ·  4,500+ concurrent streams  ·  '
     'sub-second inference at the edge', color=MUTED, size=14, font=MONO, w=1000)
note(62, 132, 'camera  →  decode  →  queue  →  detect  →  track  →  rule  →  '
     'event  →  GKE  →  operator acts  →  label  →  retrain', color=FAINT,
     size=13, font=MONO, w=1200)
hline(60, 2344, 172)

# ── A. store edge ──────────────────────────────────────────────────────────
band(60, 'STORE EDGE', 'one identical appliance per store, ×150')

for i in range(2):
    add(base(id=uid('b'), type='rectangle', x=66 + i * 13,
                     y=292 + i * 15, width=150, height=34,
                     strokeColor='#525c69', backgroundColor='#141a22',
                     strokeWidth=1.5, roundness={'type': 3}))
box(92, 322, 150, 34, 'IP camera', fill='#141a22', stroke='#6f7885', size=13,
    drift=2)
note(70, 380, '~30 per store\nRTSP · H.264 · 1080p', color=FAINT, size=12,
     font=MONO, w=220)

box(266, 292, 300, 56, 'NVIDIA Jetson', 'store appliance', size=16)
box(266, 368, 300, 46, 'GStreamer', 'NVDEC · 30 streams', size=14)
box(266, 434, 300, 54, 'RabbitMQ', 'frame queue', size=15, stroke='#e08a4a')
box(266, 508, 300, 54, 'YOLO11 + TensorRT', 'FP16 engine · sub-second', size=14,
    stroke=AMBER)
box(266, 582, 300, 44, 'ByteTrack', 'identity across frames', size=14)
box(266, 646, 300, 52, 'Rule engine', 'zone · dwell · concealment', size=14)

arrow([(246, 339), (262, 326)])
for y0, y1 in ((348, 366), (414, 432), (488, 506), (562, 580), (626, 644)):
    arrow([(416, y0), (416, y1)])

note(70, 446, 'the queue is\nthe whole point:\ncapture never\nwaits for\ninference',
     color='#e08a4a', size=12.5, font=HAND, w=190)

code(60, 722, 506, 132,
     'rtspsrc location=... latency=200\n'
     '  ! rtph264depay ! h264parse\n'
     '  ! nvv4l2decoder            # NVDEC, not CPU\n'
     '  ! nvvidconv ! video/x-raw(memory:NVMM)\n'
     '  ! appsink   -> amqp publish -> TensorRT',
     title='edge pipeline — decode never touches the CPU')

note(64, 872, 'detection is not an event.\nan event needs a zone, dwell time and a\n'
     'concealment sequence — otherwise you page\na human 400 times a night.',
     color=MUTED, size=13, font=HAND, w=470)

# ── the wall ───────────────────────────────────────────────────────────────
vline(590, 236, 940, color='#3d4757')
note(606, 300, 'video stops here', color=AMBER, size=15, font=HAND, w=200)
note(606, 328, '4,500 streams x 1080p ~ 9 Gbps\nif you shipped the video.\nyou do not.\n\n'
     'what crosses is ~2 KB of JSON\nand one 6 s clip, only when\nsomething happened.',
     color=MUTED, size=13, font=HAND, w=200)
note(606, 470, 'if inference stalls, the queue\ngrows — it does not drop\nframes. that is why RabbitMQ\n'
     'is in the store and not\nin the cloud.', color=FAINT, size=12.5, font=HAND, w=200)
note(606, 686, 'event + clip  ·  HTTPS, retried by the appliance', color=FAINT,
     size=12, font=MONO, w=440)

# ── B. Google Cloud — the cluster ──────────────────────────────────────────
band(900, 'GOOGLE CLOUD', 'stateless cluster, state pushed outside it')

boundary(900, 275, 860, 445, 'GKE cluster  ·  regional, 3 zones',
         'node pool: e2-standard  ·  cluster autoscaler')

box(930, 320, 240, 50, 'Ingress', 'Cloud Load Balancing', fill=GCP_BG,
    stroke=GCP_ST, size=14)
box(930, 400, 240, 56, 'api  Deployment', 'FastAPI · auth + schema', fill=GCP_BG,
    stroke=GCP_ST, size=14)
box(930, 486, 240, 56, 'worker  Deployment', 'clip + evidence handling',
    fill=GCP_BG, stroke=GCP_ST, size=14)
box(1240, 400, 264, 56, 'Context builder', 'store · camera · history',
    fill=GCP_BG, stroke=GCP_ST, size=14)
box(1240, 486, 264, 60, 'VLM summary', 'Gemini · GPT-4V · Qwen-VL',
    fill=AI_BG, stroke=AI_ST, size=14)

add(base(id=uid('d'), type='diamond', x=1282, y=576, width=180,
                 height=96, strokeColor=AMBER, backgroundColor='#2a2317',
                 strokeWidth=1.5))
note(1308, 612, 'severity?', color=INK, size=15, font=MONO, w=160)

arrow([(566, 672), (850, 672), (850, 316), (926, 316)], color='#5d6b7d')
arrow([(1050, 370), (1050, 398)], color=GCP_ST)
arrow([(1050, 456), (1050, 484)], color=GCP_ST)
arrow([(1170, 514), (1205, 514), (1205, 428), (1236, 428)], color=GCP_ST)
arrow([(1372, 456), (1372, 484)], color=GCP_ST)
arrow([(1372, 546), (1372, 574)], color=AI_ST)
note(1516, 490, 'the clip is the input,\nnot a caption of it —\nthe model watches\nwhat happened.',
     color=AI_ST, size=12.5, font=HAND, w=230)

note(936, 600, 'HPA scales on in-flight requests,\nnot CPU. the slow part is the LLM\n'
     'call, and a pod pegged at 8% CPU\ncan still be saturated.',
     color=MUTED, size=12.5, font=HAND, w=330)
note(936, 676, '150 stores do not fire evenly — closing time spikes.',
     color=FAINT, size=12, font=MONO, w=500)

# State lives outside the cluster. Postgres is ours, not Google's — so it does
# not get the GCP colour (rule 1).
box(2080, 300, 240, 50, 'Cloud Storage', 'clips + evidence', fill=GCP_BG,
    stroke=GCP_ST, size=13)
box(2080, 380, 240, 56, 'PostgreSQL', 'events · alerts · stores', size=14,
    stroke='#7fd8a4')
arrow([(1764, 325), (2076, 325)], color='#5d6b7d')
arrow([(1764, 408), (2076, 408)], color='#5d6b7d')
note(1786, 344, 'state lives outside the cluster —\npods are disposable, which is\n'
     'what makes the autoscaler safe.', color=FAINT, size=12.5, font=HAND, w=280)

# ── C. ship it ─────────────────────────────────────────────────────────────
box(930, 770, 220, 48, 'Artifact Registry', 'image per commit', fill=GCP_BG,
    stroke=GCP_ST, size=13)
box(1190, 770, 200, 48, 'Cloud Build', 'CI on merge', fill=GCP_BG,
    stroke=GCP_ST, size=13)
box(1430, 770, 210, 48, 'Rolling update', 'zero downtime', fill=GCP_BG,
    stroke=GCP_ST, size=13)
arrow([(1154, 794), (1186, 794)], color='#5d6b7d')
arrow([(1394, 794), (1426, 794)], color='#5d6b7d')
arrow([(1535, 766), (1535, 724)], color=GCP_ST, dashed=True)
note(932, 840, 'the cluster is cattle. the appliances are not — see the model loop.',
     color=FAINT, size=12.5, font=HAND, w=560)

# ── D. operator ────────────────────────────────────────────────────────────
band(2080, 'STATE  ·  DELIVERY', 'only HIGH severity reaches a person')

box(2080, 596, 240, 56, 'Alert platform', 'live alert + clip', size=14)
add(base(id=uid('e'), type='ellipse', x=2110, y=706, width=200,
                 height=76, strokeColor=WIN_ST, backgroundColor=WIN_BG,
                 strokeWidth=1.5))
note(2136, 732, 'store operator', color=INK, size=14, font=MONO, w=180)

# The one branch that leaves the cluster.
arrow([(1462, 624), (2076, 624)], color=AMBER)
note(1600, 598, 'severity = high', color=AMBER, size=13, font=MONO, w=220)
arrow([(2200, 436), (2200, 592)], color='#5d6b7d', dashed=True)
note(2222, 496, 'the platform reads\nthe alert row', color=FAINT, size=12,
     font=MONO, w=220)
arrow([(2200, 652), (2200, 702)], color=EDGE_ST)

note(1690, 744, 'everything else never leaves.\nit is already a row in Postgres,\n'
     'and it stays there for the shift digest —\nwhich is the only reason the operator\n'
     'still trusts the siren when it does fire.',
     color=MUTED, size=12.5, font=HAND, w=380)

box(2076, 852, 264, 62, '90% fewer completed thefts',
    '80%+ accuracy on real failures', fill=WIN_BG, stroke=WIN_ST, size=14)
note(2080, 928, "measured against the store's own\nloss numbers, not a benchmark set.",
     color=FAINT, size=12.5, font=HAND, w=300)

# ── E. the loop ────────────────────────────────────────────────────────────
hline(60, 2344, 950)
note(62, 960, 'MODEL LOOP', color=FAINT, size=13, font=MONO, w=300)
note(62, 978, 'the operator is the labeller — that is the whole data strategy',
     color='#59626e', size=12, font=MONO, w=620)

box(1990, 1020, 300, 52, 'confirmed / rejected', 'one click on the alert',
    fill=WIN_BG, stroke=WIN_ST, size=14)
box(1590, 1020, 300, 52, 'Cloud Storage', 'labelled clips → dataset',
    fill=GCP_BG, stroke=GCP_ST, size=14)
box(1180, 1020, 300, 52, 'Vertex AI', 'retrain YOLO11', fill=GCP_BG,
    stroke=GCP_ST, size=14)
box(770, 1020, 300, 56, 'Build TensorRT engine', 'one per GPU model',
    stroke=AMBER, size=14)
box(360, 1020, 300, 52, 'Staged rollout', '10 stores → 150', size=14)

arrow([(2140, 1072), (2140, 1104), (1740, 1104), (1740, 1076)], color=WIN_ST)
for x0, x1 in ((1586, 1484), (1176, 1074), (766, 664)):
    arrow([(x0, 1046), (x1, 1046)], color='#5d6b7d')

# The loop closes in the left margin — a lane with nothing in it, so the wire
# never crosses a code block or a note. It lands on the engine, the thing that
# actually changes when a new model ships.
arrow([(356, 1046), (38, 1046), (38, 534), (262, 534)], color=EDGE_ST,
      dashed=True)
note(78, 1060, 'back to every appliance', color=FAINT, size=12.5, font=MONO,
     w=260)

note(766, 1100, 'an engine is built per GPU model.\nthere is no single binary that ships\n'
     'to all 150 stores — this cost us weeks\nbefore we accepted it.', color=MUTED,
     size=13, font=HAND, w=380, angle=-0.008)
note(1186, 1100, 'retraining is cheap.\ndeciding what to retrain ON is not —\n'
     'the operator clicks are the only\nground truth anyone ever gave us.',
     color=MUTED, size=13, font=HAND, w=380)

# ── footer ─────────────────────────────────────────────────────────────────
hline(60, 2344, 1210)
note(62, 1228, 'Rafael De Santis  ·  rasantis.github.io  ·  built and operated solo, '
     'edge to cloud', color='#59626e', size=12, font=MONO, w=800)


emit('arch_shopguard.excalidraw')
