# Real architecture diagrams for the portfolio, rendered with mingrammer/diagrams
# (the engine behind the AWS diagram tooling) + Graphviz.
# Vendor icons only where the technology really is that vendor's; Rafael's own
# components use neutral icons — the way an architect actually draws it.
import os

from diagrams import Cluster, Diagram, Edge, Node
from diagrams.gcp.compute import GPU, ComputeEngine
from diagrams.gcp.storage import GCS
from diagrams.onprem.container import Docker
from diagrams.onprem.database import PostgreSQL
from diagrams.oci.compute import VMWhite as VM
from diagrams.programming.framework import FastAPI, React
from diagrams.programming.language import Cpp, Python

OUT = r'D:\Users\rafa2\Downloads\curriculo_rafa\portfolio\public\diagrams'
os.makedirs(OUT, exist_ok=True)

BG = '#0f1319'          # slightly deeper than the card it sits on
INK = '#eef1f6'
MUTED = '#aab4c2'
LINE = '#7d8899'
AMBER = '#ffb224'
GREEN = '#45d483'
BLUE = '#8fb4ff'

graph_attr = {
    'bgcolor': BG,
    'fontcolor': MUTED,
    'fontname': 'Segoe UI Semibold',
    'fontsize': '17',
    'pad': '0.6',
    'nodesep': '0.45',
    'ranksep': '0.9',
    'dpi': '140',
    'splines': 'spline',
    'compound': 'true',
}
node_attr = {'fontcolor': INK, 'fontname': 'Segoe UI', 'fontsize': '14'}
edge_attr = {'color': LINE, 'fontcolor': MUTED, 'fontname': 'Consolas', 'fontsize': '12', 'penwidth': '1.4'}


def cluster(accent=LINE):
    return {
        'bgcolor': '#141a22',
        'pencolor': accent,
        'penwidth': '1.3',
        'style': 'rounded',
        'fontcolor': accent,
        'fontname': 'Consolas',
        'fontsize': '13',
        'margin': '20',
    }


def box(label, accent=LINE):
    """A component of Rafael's own, with no vendor logo to borrow honestly:
    drawn as a labelled box instead of a misleading third-party icon."""
    return Node(
        label,
        shape='box',
        style='rounded,filled',
        fillcolor='#1b222c',
        color=accent,
        penwidth='1.4',
        fontcolor=INK,
        fontname='Segoe UI',
        fontsize='14',
        width='1.9',
        height='0.85',
        margin='0.22,0.16',
    )


def actor(label):
    return Node(
        label,
        shape='box',
        style='rounded,filled',
        fillcolor='#16241d',
        color=GREEN,
        penwidth='1.4',
        fontcolor='#c9f2dd',
        fontname='Segoe UI',
        fontsize='14',
        width='1.9',
        height='0.85',
        margin='0.22,0.16',
    )


def diagram(name, filename):
    return Diagram(
        name,
        filename=os.path.join(OUT, filename),
        show=False,
        direction='LR',
        outformat='png',
        graph_attr=graph_attr,
        node_attr=node_attr,
        edge_attr=edge_attr,
    )


# ─────────────────────── 1. ShopGuard AI ───────────────────────
with diagram('ShopGuard AI  ·  real-time vision → operator action', 'arch_shopguard'):
    with Cluster('EDGE  ·  per store', graph_attr=cluster(BLUE)):
        cams = box('RTSP cameras\nmulti-camera', BLUE)
        detect = Cpp('YOLO11 + TensorRT\nGStreamer · sub-second')
        cams >> Edge(color=LINE) >> detect

    with Cluster('CLOUD  ·  hybrid', graph_attr=cluster(LINE)):
        ingest = FastAPI('Event ingest')
        cloud = ComputeEngine('GCP')
        oci = VM('Oracle Cloud')
        clips = GCS('Clips & datasets')

    with Cluster('LANGUAGE LAYER  ·  LangChain + AutoGen', graph_attr=cluster(AMBER)):
        llm = Python('Context + GPT-4\nalert & summary')
        routing = Python('Severity routing')
        llm >> Edge(color=AMBER) >> routing

    with Cluster('DELIVERY', graph_attr=cluster(GREEN)):
        dash = React('Operator dashboard')
        ops = actor('Store operator\nacts on the floor')
        dash >> Edge(label='intervene', color=GREEN) >> ops

    detect >> Edge(label='detection events', color=LINE) >> ingest
    ingest >> Edge(color=LINE, style='dotted') >> cloud
    ingest >> Edge(color=LINE, style='dotted') >> oci
    ingest >> Edge(label='clips', color=LINE, style='dashed') >> clips
    ingest >> Edge(label='event', color=AMBER) >> llm
    clips >> Edge(label='retraining loop', color=LINE, style='dotted') >> detect
    routing >> Edge(label='escalate now', color=GREEN) >> dash
    routing >> Edge(label='or batch to digest', color=AMBER, style='dashed') >> dash


# ─────────────────────── 2. Promeat AI ───────────────────────
with diagram('Promeat AI  ·  multi-agent decision engine (LangGraph)', 'arch_promeat'):
    with Cluster('SOURCES', graph_attr=cluster(BLUE)):
        erp = box('Client ERP', BLUE)
        plant = box('Plant systems', BLUE)
        vision = Python('Vision events\n25k+ animals/day')

    with Cluster('INGEST  ·  event-driven', graph_attr=cluster(LINE)):
        api = FastAPI('Event API')
        bus = box('Event bus\nnormalized schema')
        api >> Edge(color=LINE) >> bus

    with Cluster('AGENT GRAPH  ·  LangGraph + AutoGen', graph_attr=cluster(AMBER)):
        classify = Python('Classification')
        validate = Python('Validation')
        decide = Python('Decision')
        rag = PostgreSQL('Plant context\nRAG')
        classify >> Edge(color=AMBER) >> validate >> Edge(color=AMBER) >> decide
        validate >> Edge(label='retrieve', color=LINE, style='dashed') >> rag

    with Cluster('ACT', graph_attr=cluster(GREEN)):
        writeback = box('Write-back\nto client systems', GREEN)
        human = actor('Plant operator\nhuman-in-the-loop')

    traces = Python('Langfuse traces\n+ eval pipelines')

    erp >> Edge(color=LINE) >> api
    plant >> Edge(color=LINE) >> api
    vision >> Edge(color=LINE) >> api
    bus >> Edge(label='high-frequency events', color=LINE) >> classify
    decide >> Edge(label='confident → autonomous', color=GREEN) >> writeback
    decide >> Edge(label='below threshold → review', color=AMBER, style='dashed') >> human
    decide >> Edge(color=LINE, style='dotted') >> traces


# ─────────────────────── 3. Full-stack ───────────────────────
with diagram('Full-stack product architecture  ·  model to on-call', 'arch_fullstack'):
    people = actor('Operators & clients')

    with Cluster('CLIENT', graph_attr=cluster(BLUE)):
        ui = React('React + TypeScript\ndashboards')

    with Cluster('API', graph_attr=cluster(AMBER)):
        rest = FastAPI('REST + WebSocket\ntyped contracts')

    with Cluster('SERVICES  ·  event-driven', graph_attr=cluster(AMBER)):
        pipeline = Python('Ingestion & processing')
        infer = GPU('GPU inference')
        workers = Docker('Automation workers')

    with Cluster('DATA', graph_attr=cluster(LINE)):
        db = PostgreSQL('PostgreSQL / Supabase')
        blobs = GCS('Media & artifacts')

    with Cluster('PLATFORM', graph_attr=cluster(GREEN)):
        ci = Docker('Docker · CI/CD')
        gcp = ComputeEngine('GCP')
        oci2 = VM('Oracle Cloud')

    people >> Edge(color=LINE) >> ui >> Edge(label='REST + live', color=LINE) >> rest
    rest >> Edge(color=LINE) >> pipeline
    rest >> Edge(color=LINE) >> workers
    pipeline >> Edge(color=LINE) >> infer
    pipeline >> Edge(color=LINE) >> db
    infer >> Edge(color=LINE, style='dashed') >> blobs
    workers >> Edge(color=LINE, style='dashed') >> db
    ci >> Edge(label='deploy', color=GREEN, style='dashed') >> gcp
    ci >> Edge(color=GREEN, style='dashed') >> oci2

print('diagrams written to', OUT)
