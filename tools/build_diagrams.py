# Architecture diagrams for the portfolio — mingrammer/diagrams + Graphviz
# (the engine behind the AWS diagram tooling).
#
# Two rules this file follows:
#   1. Layered reference-architecture layout — tiers stacked top-to-bottom, each
#      holding its components side by side. It fits a screen and carries far more
#      detail than a left-to-right flow, which only ever gets wider and smaller.
#   2. A vendor icon ONLY where the technology really is that vendor's. Rafael's
#      own components are labelled boxes — borrowing a logo would imply a service
#      that isn't in the stack. Every element here survives a technical deep dive.
import os

from diagrams import Cluster, Diagram, Edge, Node
from diagrams.gcp.compute import GPU, ComputeEngine
from diagrams.gcp.storage import GCS
from diagrams.oci.compute import VMWhite as OracleCloud
from diagrams.onprem.container import Docker
from diagrams.onprem.database import PostgreSQL
from diagrams.programming.framework import FastAPI, React
from diagrams.programming.language import Cpp, Python

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'public', 'diagrams')
os.makedirs(OUT, exist_ok=True)

INK = '#eef1f6'
MUTED = '#aab4c2'
LINE = '#7d8899'
AMBER = '#ffb224'
GREEN = '#45d483'
BLUE = '#8fb4ff'
STEEL = '#9db2ce'

graph_attr = {
    'bgcolor': '#0f1319',
    'fontcolor': MUTED,
    'fontname': 'Segoe UI Semibold',
    'fontsize': '18',
    'pad': '0.5',
    'nodesep': '0.4',
    'ranksep': '0.8',
    'dpi': '130',
    'compound': 'true',
}
node_attr = {'fontcolor': INK, 'fontname': 'Segoe UI', 'fontsize': '13'}
edge_attr = {'color': LINE, 'fontcolor': MUTED, 'fontname': 'Consolas', 'fontsize': '11', 'penwidth': '1.3'}


def tier(accent=LINE):
    """A horizontal band of the architecture."""
    return {
        'bgcolor': '#141a22',
        'pencolor': accent,
        'penwidth': '1.3',
        'style': 'rounded',
        'fontcolor': accent,
        'fontname': 'Consolas',
        'fontsize': '13',
        'labeljust': 'l',
        'margin': '16',
    }


def box(label, accent=LINE, fill='#1b222c', ink=INK):
    """One of Rafael's own components — labelled, not badged with a borrowed logo."""
    return Node(
        label,
        shape='box',
        style='rounded,filled',
        fillcolor=fill,
        color=accent,
        penwidth='1.3',
        fontcolor=ink,
        fontname='Segoe UI',
        fontsize='13',
        width='2.0',
        height='0.8',
        margin='0.18,0.12',
    )


def actor(label):
    return box(label, GREEN, '#16241d', '#c9f2dd')


def gate(label):
    """A decision point, drawn as one."""
    return Node(
        label,
        shape='diamond',
        style='filled',
        fillcolor='#241d0c',
        color=AMBER,
        penwidth='1.5',
        fontcolor='#ffd98a',
        fontname='Segoe UI Semibold',
        fontsize='12',
        width='2.7',
        height='1.3',
    )


def diagram(name, filename):
    return Diagram(
        name,
        filename=os.path.join(OUT, filename),
        show=False,
        direction='TB',
        outformat='png',
        graph_attr=graph_attr,
        node_attr=node_attr,
        edge_attr=edge_attr,
    )


# Intra-tier links are drawn but must not push nodes onto new ranks, otherwise
# every tier grows downwards instead of sideways.
def side(color=LINE, label='', style=''):
    return Edge(color=color, label=label, style=style, constraint='false')


def down(color=LINE, label='', style=''):
    return Edge(color=color, label=label, style=style)


# ══════════════════════ 1. ShopGuard AI ══════════════════════
with diagram('ShopGuard AI  ·  retail vision platform, edge to operator', 'arch_shopguard'):
    with Cluster('1 · STORE EDGE   —   identical appliance per store', graph_attr=tier(BLUE)):
        cams = box('RTSP cameras\n~30 per store', BLUE)
        decode = box('GStreamer\nhardware decode', BLUE)
        detect = Cpp('YOLO11 + TensorRT\nsub-second inference')
        provisioning = box('Standardised provisioning\nsame stack every store', BLUE)
        cams >> side() >> decode >> side() >> detect
        detect >> side(style='dotted') >> provisioning

    with Cluster('2 · CLOUD INGEST   —   hybrid GCP / Oracle Cloud', graph_attr=tier(STEEL)):
        ingest = FastAPI('Event ingest API\nauth + validation')
        events = box('Detection event stream\nevent-driven services')
        clips = box('Clip extraction')
        ingest >> side() >> events >> side() >> clips

    with Cluster('3 · INTELLIGENCE   —   LangChain + AutoGen', graph_attr=tier(AMBER)):
        context = box('Context builder\nstore · camera · history', AMBER)
        llm = Python('GPT-4\nalert + summary')
        severity = gate('severity\nrouting')
        context >> side(AMBER) >> llm >> side(AMBER) >> severity

    with Cluster('4 · DELIVERY', graph_attr=tier(GREEN)):
        escalation = box('Escalation workflow', GREEN)
        dash = React('React operator dashboard\nlive alerts')
        integrations = box('Client integrations', GREEN)
        operator = actor('Store operator\nintervenes before the loss')
        escalation >> side(GREEN) >> dash >> side(GREEN) >> operator
        dash >> side(GREEN, style='dotted') >> integrations

    with Cluster('5 · DATA, MODEL LOOP & PLATFORM', graph_attr=tier(STEEL)):
        db = PostgreSQL('Events, stores,\nusers')
        storage = GCS('Clips & datasets')
        retrain = box('Failure-case retraining\nreal misses → training data')
        ci = Docker('Docker · CI/CD')
        gcp = ComputeEngine('GCP')
        oci = OracleCloud('Oracle Cloud')
        storage >> side(style='dashed') >> retrain
        ci >> side(style='dotted') >> gcp
        ci >> side(style='dotted') >> oci

    detect >> down(label='  detections') >> ingest
    events >> down(AMBER, label='  event') >> context
    severity >> down(GREEN, label='  escalate now') >> escalation
    severity >> down(AMBER, label='  batch to digest', style='dashed') >> dash
    clips >> down(style='dashed') >> storage
    events >> down(style='dotted') >> db
    retrain >> down(BLUE, label='  new model to every store', style='dashed') >> provisioning


# ══════════════════════ 2. Promeat AI ══════════════════════
with diagram('Promeat AI  ·  multi-agent decision engine (LangGraph)', 'arch_promeat'):
    with Cluster('1 · SOURCE SYSTEMS', graph_attr=tier(BLUE)):
        erp = box('Client ERP', BLUE)
        plant = box('Plant systems', BLUE)
        vision = box('Vision pipeline\n25k+ animals/day', BLUE)

    with Cluster('2 · INGEST   —   event-driven microservices', graph_attr=tier(STEEL)):
        api = FastAPI('Event API')
        bus = box('Event bus')
        schema = box('Schema normalisation\n+ validation')
        api >> side() >> bus >> side() >> schema

    with Cluster('3 · AGENT RUNTIME   —   LangGraph + AutoGen', graph_attr=tier(AMBER)):
        router = box('Graph router\nstate machine', AMBER)
        classify = Python('Classification\nagent')
        validate = Python('Validation\nagent')
        decide = Python('Decision\nagent')
        tools = box('Agent tools\nRAG · ERP queries', AMBER)
        router >> side(AMBER) >> classify >> side(AMBER) >> validate >> side(AMBER) >> decide
        validate >> side(style='dashed') >> tools

    with Cluster('4 · GUARDRAIL & ACTUATION', graph_attr=tier(GREEN)):
        conf = gate('confidence\ngate')
        writeback = box('Write-back\nto client systems', GREEN)
        review = actor('Plant operator\nhuman-in-the-loop')
        audit = box('Audit record', GREEN)
        writeback >> side(GREEN, style='dotted') >> audit

    with Cluster('5 · STATE, OBSERVABILITY & PLATFORM', graph_attr=tier(STEEL)):
        state = PostgreSQL('Agent state\n+ plant context')
        traces = box('Langfuse traces\nper node')
        evals = box('Eval pipelines\nregression gate')
        ci2 = Docker('Docker · CI/CD')
        cloud2 = ComputeEngine('GCP')
        traces >> side(style='dotted') >> evals
        ci2 >> side(style='dotted') >> cloud2

    erp >> down() >> api
    plant >> down() >> api
    vision >> down() >> api
    schema >> down(label='  high-frequency events') >> router
    decide >> down(AMBER) >> conf
    conf >> down(GREEN, label='  confident') >> writeback
    conf >> down(AMBER, label='  below threshold', style='dashed') >> review
    tools >> down(style='dashed') >> state
    decide >> down(style='dotted') >> traces
    review >> down(AMBER, label='  correction feeds evals', style='dotted') >> evals


# ══════════════════════ 3. Full-stack ══════════════════════
with diagram('Full-stack product architecture  ·  first commit to on-call', 'arch_fullstack'):
    with Cluster('1 · CLIENTS', graph_attr=tier(BLUE)):
        users = actor('Operators & clients')
        ui = React('React + TypeScript\noperator dashboards')
        users >> side(GREEN) >> ui

    with Cluster('2 · API EDGE', graph_attr=tier(AMBER)):
        rest = FastAPI('REST API\ntyped contracts')
        ws = box('WebSocket channels\nlive state', AMBER)
        auth = box('Auth & validation', AMBER)
        rest >> side(AMBER) >> ws >> side(AMBER) >> auth

    with Cluster('3 · SERVICES   —   event-driven, independently scaled', graph_attr=tier(AMBER)):
        ingestion = Python('Ingestion & processing')
        inference = GPU('GPU inference service')
        workers = box('Automation workers\nLLM + rules', AMBER)
        ingestion >> side() >> inference >> side() >> workers

    with Cluster('4 · DATA', graph_attr=tier(STEEL)):
        pg = PostgreSQL('PostgreSQL / Supabase')
        objects = GCS('Media & artifacts')
        models = box('Model artifacts\nversioned')
        objects >> side(style='dotted') >> models

    with Cluster('5 · PLATFORM & OPERATIONS', graph_attr=tier(GREEN)):
        docker = Docker('Docker')
        cicd = box('CI/CD pipeline\ndeploy on merge', GREEN)
        gcp3 = ComputeEngine('GCP')
        oci3 = OracleCloud('Oracle Cloud')
        obs = box('Logging, metrics\n& on-call', GREEN)
        docker >> side(GREEN) >> cicd >> side(GREEN) >> gcp3
        cicd >> side(GREEN, style='dotted') >> oci3

    ui >> down(label='  REST + live') >> rest
    auth >> down() >> ingestion
    ws >> down(GREEN, label='  push') >> workers
    ingestion >> down() >> pg
    inference >> down(style='dashed') >> objects
    workers >> down(style='dotted') >> pg
    cicd >> down(GREEN, label='  deploy', style='dashed') >> ingestion
    obs >> down(style='dotted') >> inference

print('diagrams written to', OUT)
