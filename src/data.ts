// Conteúdo trilíngue do site (EN padrão · ES · PT). ATENÇÃO: qualquer edição de
// conteúdo deve ser feita SEMPRE nos TRÊS idiomas — os fatos e números têm de bater.
export type Lang = 'en' | 'es' | 'pt';
export type PillType = 'flagship' | 'live' | 'gov';

export interface Project {
  title: string;
  role: string;
  pill: { label: string; type: PillType };
  description: string;
  impact: string;
  tags: string[];
  /** Public repository, when the work is open source. */
  repo?: string;
}

export interface Demo {
  src: string;
  poster: string;
  project: string;
  title: string;
  caption: string;
}

export interface SkillGroup {
  title: string;
  tags: string[];
}

/**
 * Architecture diagrams are rendered with mingrammer/diagrams + Graphviz
 * (see tools/build_diagrams.py) and exported to public/diagrams — real vendor
 * icons, not CSS boxes. The diagrams themselves stay in English, as engineering
 * documentation normally does; the caption around them is translated.
 */
export interface SystemFlow {
  key: string;
  badge: string;
  badgeType: 'agents' | 'auto' | 'fullstack' | 'vision';
  title: string;
  desc: string;
  image: string;
  alt: string;
  footer: string;
  tags: string[];
}

export interface TimelineItem {
  period: string;
  title: string;
  company: string;
  suffix?: string;
  description: string;
}

export interface Stat {
  num: string;
  label: string;
}

export interface UI {
  nav: { work: string; architecture: string; skills: string; experience: string; contact: string; cv: string };
  hero: {
    eyebrow: string;
    h1Pre: string;
    h1Em: string;
    h1Post: string;
    ctaProjects: string;
    ctaCv: string;
    badgeAvailable: string;
    badgeEu: string;
  };
  work: {
    eyebrow: string; heading: string; sub: string; videos: string; architecture: string; zoom: string;
    filters: { all: string; agents: string; vision: string; fullstack: string };
    archToggle: string;
  };
  arch: { eyebrow: string; heading: string; sub: string; also: string };
  skills: { eyebrow: string; heading: string; sub: string };
  experience: { eyebrow: string; heading: string; sub: string };
  contact: { heading: string; sub: string; cv: string };
  footer: { cv: string; tagline: string };
}

export interface Content {
  ui: UI;
  stats: Stat[];
  projects: Project[];
  demos: Demo[];
  systems: SystemFlow[];
  skillGroups: SkillGroup[];
  timeline: TimelineItem[];
}

export const links = {
  email: 'rafa25santis@gmail.com',
  github: 'https://github.com/Rasantis',
  linkedin: 'https://linkedin.com/in/rafael-santis-ab64b2177',
  cv: './Rafael_Santis_CV_EN.pdf',
};

/**
 * Each piece of work appears ONCE, as a self-contained case: the project card
 * plus its own footage and its own architecture. Grouping by project (instead
 * of by media type) is what keeps a visitor from meeting ShopGuard three times.
 *
 * Videos are matched by `src` and systems by key prefix — both language-independent.
 * `projectIdx` indexes `content[lang].projects`, which is ordered identically in
 * every language: keep the three arrays in sync when editing.
 */
export type Track = 'agents' | 'vision' | 'fullstack';

export interface CaseDef {
  key: string;
  idx: string;
  projectIdx: number;
  demoSrcs: string[];
  /** A case can carry more than one architecture: Promeat shipped both a
   *  weight-prediction pipeline and a multi-agent decision engine, and burying
   *  one of them inside the other would misrepresent the work. Rendered in the
   *  order given — put the one the case's video shows first. */
  systemPrefixes?: string[];
  /** Which lens this case answers to. A recruiter hiring for agents should not
   *  have to scroll past four vision projects to find the one that matters. */
  tracks: Track[];
}

/**
 * Order tells the employment story first (founder → client platform → current
 * role), then the self-built case studies, then breadth. A recruiter who stops
 * at case 03 has still met every employer on the CV.
 */
export const CASES: CaseDef[] = [
  {
    key: 'shopguard',
    idx: '01',
    projectIdx: 0,
    demoSrcs: ['./pharmacy_detection_demo.mp4', './furto_vd8_processado.mp4', './furto_vd15_processado.mp4'],
    systemPrefixes: ['auto'],
    tracks: ['vision', 'fullstack'],
  },
  {
    key: 'promeat',
    idx: '02',
    projectIdx: 2,
    demoSrcs: ['./weight_estimation_demo.mp4'],
    systemPrefixes: ['weight'],
    tracks: ['agents', 'vision'],
  },
  { key: 'pixsafety', idx: '03', projectIdx: 1, demoSrcs: [], tracks: ['vision', 'fullstack'] },
  { key: 'kairos', idx: '04', projectIdx: 8, demoSrcs: ['./kairos_demo.mp4'], tracks: ['fullstack'] },
  { key: 'auspex', idx: '05', projectIdx: 6, demoSrcs: ['./auspex_demo.mp4'], tracks: ['agents', 'fullstack'] },
  { key: 'autoinspect', idx: '06', projectIdx: 7, demoSrcs: ['./autoinspect_demo.mp4'], tracks: ['vision', 'fullstack'] },
  { key: 'docintel', idx: '07', projectIdx: 5, demoSrcs: ['./docintel_demo.mp4'], tracks: ['agents', 'fullstack'] },
  { key: 'pixforce', idx: '08', projectIdx: 3, demoSrcs: ['./pipe_monitoring.mp4', './crowd_counting_demo.mp4'], tracks: ['vision'] },
];

/** Work that has no case block of its own — shown compactly at the end.
 *  Soccer lives here deliberately: it is a personal build with no client and no
 *  outcome number, and sitting among the production cases it diluted them. */
export const EXTRA_PROJECT_IDX = [4];
export const EXTRA_DEMO_SRCS = ['./soccer_ai_demo.mp4'];
/** The full-stack blueprint is cross-cutting: it belongs to no single project. */
export const CROSS_SYSTEM_PREFIX = 'fullstack';

const en: Content = {
  ui: {
    nav: { work: 'Work', architecture: 'How I build', skills: 'Stack', experience: 'Experience', contact: 'Contact', cv: 'Download CV' },
    hero: {
      eyebrow: 'São Paulo, Brazil · Remote worldwide',
      h1Pre: 'I build ',
      h1Em: 'production AI systems',
      h1Post: ' — from edge vision to multi-agent platforms.',
      ctaProjects: 'View Projects',
      ctaCv: 'Download CV',
      badgeAvailable: 'Available — remote worldwide',
      badgeEu: 'Italian (EU) citizen · work-ready across the EU',
    },
    work: {
      eyebrow: 'Selected Work',
      heading: 'Every system, end to end',
      sub: 'Each block is one full case: what it does, what changed, footage of it running, and the architecture underneath. The client work ran in production for real users. Everything else is labeled for what it is — Case study, Open source, Personal build — and exists to show the parts client work cannot show publicly.',
      videos: 'See it running',
      architecture: 'Architecture',
      zoom: 'open full size',
      filters: { all: 'All work', agents: 'Agents & LLM', vision: 'Computer vision', fullstack: 'Full-stack & cloud' },
      archToggle: 'See the architecture',
    },
    arch: {
      eyebrow: 'How I Build',
      heading: 'The stack around every model',
      sub: 'Vision is where I started, but the product around it is mine too: typed React over FastAPI, event-driven services, GPU inference, and the deployment and on-call that keep it alive.',
      also: 'Also shipped',
    },
    skills: {
      eyebrow: 'Stack',
      heading: 'Tools I ship with',
      sub: 'Computer vision and LLM agents, the Python/FastAPI + React product around them, and the cloud they run on. Daily AI-augmented development with Claude Code, Codex and Cursor.',
    },
    experience: {
      eyebrow: 'Trajectory',
      heading: 'Experience',
      sub: 'Freelance to founder to senior IC. Every role put systems into production.',
    },
    contact: {
      heading: 'If it has to work in production, let\'s talk.',
      sub: 'Open to senior remote roles worldwide: AI engineering, computer vision, full-stack AI products. Italian (EU) citizen · fluent English · UTC−3, near-full overlap with US Eastern hours and EU afternoons.',
      cv: 'Download CV',
    },
    footer: { cv: 'CV (PDF)', tagline: 'built with React + TypeScript + Vite, deployed on GitHub Pages.' },
  },
  stats: [
    { num: '25,000+', label: 'animals counted daily — JBS & Marfrig plants' },
    { num: '150 stores', label: '4,500+ camera streams — ShopGuard AI' },
    { num: '98.5%', label: 'weight-estimation accuracy vs. plant scales — target was 95%' },
    { num: '−37%', label: 'cloud cost in month one — Pix Safety' },
  ],
  projects: [
    {
      title: 'ShopGuard AI — Retail Theft Detection',
      role: 'Founder & CTO · 2025',
      pill: { label: 'Production', type: 'live' },
      description:
        'Retail security platform built solo, edge to UI: YOLO11 with TensorRT at sub-second latency on in-store NVIDIA hardware, GStreamer ingestion of ~30 cameras per store, hybrid GCP / Oracle Cloud backend, React dashboards for floor operators. Accelerated by Oracle, Google and Antler programs.',
      impact: "150 stores · 4,500+ camera streams · ~90% fewer completed thefts vs. the stores' pre-deployment incident records",
      tags: ['YOLO11', 'TensorRT', 'GStreamer', 'FastAPI', 'React', 'GCP'],
    },
    {
      title: 'Pix Safety — Model & Cloud Optimization',
      role: 'Senior AI Engineer III · Pix Force · 2026–present',
      pill: { label: 'Current role', type: 'live' },
      description:
        'Ongoing ownership of the Pix Safety product: retrained its oversized models into smaller, better-tuned ones and rebuilt the serving stack with reserved instances, right-sized clusters and hot-path Python→C++ migrations. Also runs internal AI training and mentors junior and mid-level engineers.',
      impact: '+30% accuracy over the prior production models · 45% faster inference · cloud costs −37% in month one',
      tags: ['PyTorch', 'C++', 'TensorRT', 'MLOps', 'Cloud Cost'],
    },
    {
      title: 'Industrial CV Platform — Promeat AI',
      role: 'Full-Stack Engineer · 2026',
      pill: { label: 'Production', type: 'live' },
      description:
        'Computer vision platform serving JBS and Marfrig plants: FFmpeg ingestion across heterogeneous plant cameras, OpenCV preprocessing, event-driven microservices, React dashboards. The daily count is the record the plants operate on; there is no manual fallback.',
      impact: '25,000+ animals counted daily · 4 plants (2 JBS, 2 Marfrig) · weight estimation at 98.5% accuracy vs. plant scales (client target: 95%)',
      tags: ['Python', 'FFmpeg', 'OpenCV', 'PyTorch', 'Microservices'],
    },
    {
      title: 'Industrial Vision Products — Pix Force',
      role: 'Full-Stack AI Engineer · 2024',
      pill: { label: 'Production', type: 'live' },
      description:
        'Four AI products for large industrial clients: people counting (YOLOv8 + ByteTrack), employee performance, vehicle theft detection and dock dwell-time, plus automated pipe-threading inspection and a government drone contract for live crowd density. Edge inference on Jetson and Raspberry Pi.',
      impact: '4 products delivered · 5,000+ images annotated · drone crowd counts within a 5% margin of error',
      tags: ['YOLOv8', 'ByteTrack', 'Jetson', 'CNNs', 'FastAPI'],
    },
    {
      title: 'Contactless Heart-Rate Monitor (rPPG)',
      role: 'R&D Project',
      pill: { label: 'Research', type: 'live' },
      description:
        'Real-time heart-rate detection from a plain webcam via remote photoplethysmography (rPPG) — OpenCV video processing and signal analysis, no sensors or wearables. Served through a Flask interface.',
      impact: 'Medical-style vitals from video alone — telemedicine & fitness use cases',
      tags: ['OpenCV', 'Signal Processing', 'Python', 'Flask'],
    },
    {
      title: 'DocIntel — OCR Verification with Human-in-the-Loop',
      role: 'Applied AI · open source · 2026',
      pill: { label: 'Open source', type: 'live' },
      description:
        'The workflow a document-verification provider runs: read the document, prove where each value came from, decide alone only when confident, route the rest to a person. A local vision-language model (Qwen2.5-VL via Ollama) extracts the values, OCR anchors each one on the page, and cross-field validation catches what a confidence score cannot: an invoice whose subtotal and tax contradict its own total is blocked even when every number was read correctly.',
      impact: 'Discrepancies routed to human review · escaped errors measured (wrong AND auto-approved) · confidence calibration with a regression gate · runs on-device',
      tags: ['Qwen2.5-VL', 'Ollama', 'Pydantic', 'FastAPI', 'React', 'LLM Evals'],
      repo: 'https://github.com/Rasantis/docintel',
    },
    {
      title: 'Auspex — Multi-Agent Incident Command',
      role: 'Applied AI · agent systems · 2026',
      pill: { label: 'Case study', type: 'flagship' },
      description:
        'An alert fires at 3am. Four specialist agents investigate in parallel over metrics, logs, deploys and runbooks, each connected to a different MCP server I wrote and limited to the tools that server exposes. A commander names one root cause, a skeptic attacks it with the same tools, and only then does a planner propose a mitigation — which it cannot execute: every write stops at a LangGraph interrupt until a person approves it.',
      impact: '0 unsafe actions across the 7-incident eval · restraint held on every incident where acting is the mistake · correct mitigation on 4 of 7 · runs on one consumer GPU',
      tags: ['LangGraph', 'MCP', 'Multi-Agent', 'Human-in-the-Loop', 'Agent Evals', 'Prompt Injection', 'FastAPI', 'React'],
    },
    {
      title: 'AutoInspect AI — Automated Vehicle Condition Reporting',
      role: 'Computer vision · applied AI · 2026',
      pill: { label: 'Case study', type: 'flagship' },
      description:
        'A photo walk-around goes in; a priced damage report comes out. Two YOLO11-seg models, one for 23 body panels and one for 8 defect types, are intersected mask-to-mask, so the output is not "scratch, 0.81" but "scratch on the front left door" — the line item a body shop quotes. A quality gate refuses blurry or badly framed photos, repeat views of one dent merge into a single defect, and findings map to repair operations against an auditable rate card.',
      impact: 'mask mAP50 65% on 23 panels (3,156 training images) · 12% on 8 defect types (655 images, reported per class, including the two classes that did not learn) · borderline defects abstain to a human, never assigned inside a 2% margin',
      tags: ['YOLO11-seg', 'Instance Segmentation', 'PyTorch', 'Repair Estimating', 'FastAPI', 'WebSockets', 'React', 'OpenCV'],
    },
    {
      title: 'Kairos — Real-Time Ad Decision Engine',
      role: 'Ranking systems · applied ML · 2026',
      pill: { label: 'Case study', type: 'flagship' },
      description:
        'Someone is mid-session inside an AI app and something has to decide, in milliseconds, which sponsored experience to place — or that none should be. A two-tower model over an HNSW index narrows 7,583 campaigns to a short list, three gradient-boosted heads score it, and a policy layer prices the result against what it costs the session: engagement value credited, harm and fatigue debited, and a floor the balance has to clear before anything is served. The first measurement is why that layer exists — ranking on predicted clicks alone lifts engagement from 18% to 43% and doubles the rate at which users tell the product to stop.',
      impact: 'p50 17.4 ms end to end, p99 22.9 ms · +31% engagement and −65% negative feedback per 1,000 opportunities against random exposure, by replay on 1.19M uniformly randomised impressions · uncalibrated, the model would bid 1.61× over true value; isotonic calibration cuts expected calibration error 62% · cold-start retrieval failed and is reported as measured',
      tags: ['Two-Tower Retrieval', 'HNSW', 'LightGBM', 'Calibration', 'Off-Policy Evaluation', 'PyTorch', 'FastAPI', 'React'],
    },
  ],
  demos: [
    {
      src: './weight_estimation_demo.mp4',
      poster: './posters/weight_estimation_demo.jpg',
      project: 'Promeat AI',
      title: 'Real-time weight estimation — 98.5% vs. scale',
      caption: 'Instance segmentation and per-bird weight prediction on live barn footage, measured against plant scale weights. The client target was 95%.',
    },
    {
      src: './pharmacy_detection_demo.mp4',
      poster: './posters/pharmacy_detection_demo.jpg',
      project: 'ShopGuard AI',
      title: 'In-store tracking & re-identification',
      caption: 'Multi-person tracking, people counter and known / unknown re-ID on store CCTV.',
    },
    {
      src: './furto_vd8_processado.mp4',
      poster: './posters/furto_vd8_processado.jpg',
      project: 'ShopGuard AI',
      title: 'Theft detection — stream #1',
      caption: 'Real-time detection and tracking over retail CCTV footage.',
    },
    {
      src: './furto_vd15_processado.mp4',
      poster: './posters/furto_vd15_processado.jpg',
      project: 'ShopGuard AI',
      title: 'Theft detection — stream #2',
      caption: 'Behavioral pattern flagged under occlusion and motion.',
    },
    {
      src: './pipe_monitoring.mp4',
      poster: './posters/pipe_monitoring.jpg',
      project: 'Pix Force',
      title: 'Pipe-threading visual inspection',
      caption: 'Automated make-up inspection for oil & gas tubulars, with live evidence checklist.',
    },
    {
      src: './crowd_counting_demo.mp4',
      poster: './posters/crowd_counting_demo.jpg',
      project: 'Government Contract',
      title: 'Drone crowd counting',
      caption: 'Aerial line-crossing tally + per-frame headcount over dense crowds — 1,100+ people in frame at peak.',
    },
    {
      src: './soccer_ai_demo.mp4',
      poster: './posters/soccer_ai_demo.jpg',
      project: 'Sports Analytics',
      title: 'Match intelligence — World Cup 2026 broadcast',
      caption: 'Personal build on broadcast footage alone: both squads, referees and the ball tracked, per-player speed, live possession, and a tactical map that survives camera cuts.',
    },
    {
      src: './docintel_demo.mp4',
      poster: './posters/docintel_demo.jpg',
      project: 'DocIntel',
      title: 'Document verification with a confidence gate',
      caption: 'An invoice that does not add up: the model read every number correctly and the cross-field check blocked approval anyway. Hovering a field highlights where on the page it was read. Vantis Credit is a fictional client; the pipeline is real.',
    },
    {
      src: './auspex_demo.mp4',
      poster: './posters/auspex_demo.jpg',
      project: 'Auspex',
      title: 'Four agents investigating one production incident',
      caption: 'Replay of a real run at 6×. The agents fan out across five MCP servers, the skeptic challenges the conclusion, and the rollback waits for a human. Meridian is a fictional company; the run and the numbers are real.',
    },
    {
      src: './autoinspect_demo.mp4',
      poster: './posters/autoinspect_demo.jpg',
      project: 'AutoInspect AI',
      title: 'Damage attributed to the panel it sits on',
      caption: 'Masks trace onto the vehicle worst-finding-first, each carrying its own label. Clicking a line on the repair estimate zooms the camera onto the exact pixels that produced it. JEPO is a fictional operator; the inference and the numbers are real.',
    },
    {
      src: './kairos_demo.mp4',
      poster: './posters/kairos_demo.jpg',
      project: 'Kairos',
      title: 'One request, one answer — or none',
      caption: 'A live decision with its whole path: 7,583 campaigns narrowed by approximate nearest neighbours, 24 candidates scored and calibrated, then the ledger that prices engagement against harm. Raising the cost of a negative reaction re-decides the auction on camera; raising the floor makes the engine serve nothing at all. Bids are synthetic and labelled as such — every behavioural figure is measured on a randomised holdout.',
    },
  ],
  systems: [
    {
      key: 'weight-en',
      badge: 'Computer Vision',
      badgeType: 'vision',
      title: 'Per-Bird Weight Prediction — Promeat AI',
      desc: 'A weight for every individual bird, from a camera above the house. A detector proposes one bird, SAM3 cuts the mask, and a CNN reads the masked crop together with the flock\'s line and age. The label is the bottleneck: nobody can put 25,000 birds on a scale, so a few hundred paired samples from the scale in the house have to carry the whole model.',
      image: './diagrams/arch_promeat_weight.png',
      alt: 'Architecture board in two registers. Inference, top row: an overhead camera on a broiler house captures periodically; a detector proposes one region per bird; SAM3 produces a mask per instance; the mask is applied to the frame to give a masked crop of a single bird with the background removed; a CNN regressor built from a backbone and a regression head reads that crop together with lote metadata — the Ross line and the age in days — and returns a weight per bird, for example bird 124 at 3.18 kilograms; weights are aggregated into flock mean, spread and uniformity, and shown on a dashboard as a weight curve per lote. Birds the segmenter is not confident about are left out of the sample rather than guessed at, because a biased sample is worse than a smaller one. SAM3 does not run at frame rate: capture is periodic, so the cost is paid per sample rather than per second. Data and model, bottom row: a camera and a scale in the house record the same bird, the two records are paired by timestamp into masked-crop and kilogram pairs, the dataset is split by lote rather than at random so the same bird cannot appear on both sides of the split, training optimises mean absolute error in kilograms against a gate at the client\'s 95 percent requirement, and the trained head is shipped versioned with the lote and replaces the live head in the inference row. Result: 98.5 percent accuracy, measured on lotes the model never saw during training.',
      footer: '// 98.5% accuracy against a 95% requirement — measured on lotes the model never saw',
      tags: ['SAM3', 'Instance segmentation', 'CNN regression', 'PyTorch', 'MAE in kg'],
    },
    {
      key: 'auto-en',
      badge: 'Automation',
      badgeType: 'auto',
      title: 'LLM Automation Layer — ShopGuard AI',
      desc: 'Video never leaves the store — 4,500 streams would be 9 Gbps, so inference runs on the appliance and only the event crosses the wire. In the cloud a vision-language model watches the clip and writes what happened, and only high severity ever reaches a person.',
      image: './diagrams/arch_shopguard.png',
      alt: 'Architecture board in five registers. Store edge, one identical appliance per store across 150 stores: around 30 RTSP 1080p cameras feed GStreamer hardware decode on NVIDIA Jetson; frames queue through RabbitMQ so inference backpressure never drops a frame; then YOLO11 with a TensorRT FP16 engine at sub-second latency, ByteTrack for identity across frames, and a rule engine that requires zone, dwell time and a concealment sequence before it emits an event. A vertical boundary marks where video stops: 4,500 concurrent 1080p streams would be roughly 9 gigabits per second, so what crosses the wire is about 2 kilobytes of JSON and one 6-second clip, only when something happened. Google Cloud: a regional GKE cluster holding an Ingress on Cloud Load Balancing, an api Deployment running FastAPI, a worker Deployment for clip and evidence handling, a context builder, and a vision-language model summary using Gemini, GPT-4V and Qwen-VL that reads the clip itself rather than a caption of it. Horizontal pod autoscaling scales on in-flight requests rather than CPU, because the slow step is the model call. A severity gate lets only high severity leave the cluster. State lives outside the cluster: Cloud Storage for clips and evidence, PostgreSQL as the system of record for events, alerts and stores. Delivery: the alert platform reads the high-severity row and reaches the store operator; everything else stays a row in Postgres for the shift digest. Continuous delivery runs Artifact Registry to Cloud Build to a rolling update. Model loop: operator confirmations become labelled clips in Cloud Storage, Vertex AI retrains YOLO11, a TensorRT engine is built per GPU model, and a staged rollout ships it back to every appliance.',
      footer: '// ~90% fewer completed thefts vs. pre-deployment records — built and operated by one engineer',
      tags: ['RabbitMQ', 'YOLO11', 'TensorRT', 'GKE', 'Qwen-VL', 'PostgreSQL'],
    },
    {
      key: 'fullstack-en',
      badge: 'Full-Stack',
      badgeType: 'fullstack',
      title: 'Full-Stack Product Architecture',
      desc: 'The stack I build around every model. Typed React dashboards over FastAPI, event-driven services that scale on their own, GPU inference where it belongs, and the deployment and on-call that keep it alive.',
      image: './diagrams/arch_fullstack.svg',
      alt: 'Layered architecture in five tiers. 1 Clients: operators and clients on React and TypeScript dashboards. 2 API edge: REST API with typed contracts, WebSocket channels for live state, auth and validation. 3 Services, event-driven and independently scaled: ingestion and processing, GPU inference service, automation workers combining LLM and rules. 4 Data: PostgreSQL/Supabase, media and artifacts, versioned model artifacts. 5 Platform and operations: Docker, CI/CD pipeline deploying on merge to GCP and Oracle Cloud, plus logging, metrics and on-call.',
      footer: '// Same architecture shipped at ShopGuard, Promeat and Pix Force — from first commit to production support',
      tags: ['React', 'TypeScript', 'FastAPI', 'WebSockets', 'Docker', 'PostgreSQL', 'GCP'],
    },
  ],
  skillGroups: [
    {
      title: 'Computer Vision',
      tags: ['YOLO11 / YOLOv8', 'PyTorch', 'OpenCV', 'TensorRT', 'GStreamer', 'FFmpeg', 'MediaPipe', 'SAM', 'NVIDIA Jetson'],
    },
    {
      title: 'AI & LLM Agents',
      tags: ['LangGraph', 'LangChain', 'AutoGen', 'GPT-4', 'Claude', 'RAG', 'Langfuse', 'Eval Pipelines'],
    },
    {
      title: 'Multimodal & Model Adaptation',
      tags: ['VLMs', 'GPT-4V', 'LLaVA', 'Qwen-VL', 'SAM', 'LoRA fine-tuning', 'VLA (exploration)'],
    },
    {
      title: 'Backend & APIs',
      tags: ['Python', 'C++', 'FastAPI', 'Node.js', 'REST', 'Microservices', 'Event-Driven', 'WebSockets'],
    },
    {
      title: 'Frontend',
      tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      title: 'Cloud & DevOps',
      tags: ['GCP', 'AWS', 'Oracle Cloud', 'Docker', 'CI/CD', 'PostgreSQL', 'Supabase'],
    },
    {
      title: 'AI-Augmented Workflow',
      tags: ['Claude Code', 'Codex', 'Cursor', 'Agent-Driven Dev'],
    },
  ],
  timeline: [
    {
      period: 'Jul 2026 – Present',
      title: 'Senior AI Engineer III',
      company: 'Pix Force',
      description:
        'Internal move within the Pix Force group, from Promeat AI. Owner of the Pix Safety product: models retrained +30% accuracy over the prior versions and 45% faster, cloud costs down 37% in the first month. Runs internal AI training and mentors junior and mid-level engineers.',
    },
    {
      period: 'Jan 2026 – Jun 2026',
      title: 'Full-Stack Software Engineer',
      company: 'Promeat AI · Pix Force group',
      description:
        'CV platform for JBS & Marfrig: 25,000+ animals/day across 4 plants, event-driven microservices, multi-agent LLM automation, weight estimation at 98.5% accuracy vs. plant scales (client target: 95%).',
    },
    {
      period: 'Aug 2025 – Dec 2025',
      title: 'Founder & CTO',
      company: 'ShopGuard AI',
      description:
        'Retail theft-detection platform, built and operated solo: 150 stores, 4,500+ camera streams. Accelerated by Oracle, Google and Antler. The company remains active; in Jan 2026 I moved my full-time focus to the Pix Force group.',
    },
    {
      period: 'Jan 2024 – Jun 2025',
      title: 'Co-Founder & Tech Lead',
      company: 'Vision Labs',
      description:
        'Own AI & computer vision company, run in parallel with the roles alongside: CV products from pilot to production for enterprise B2B clients, GPT-4 + LangChain automation.',
    },
    {
      period: 'Jul 2024 – Feb 2025',
      title: 'Innovation Projects Lead & Technical PO',
      company: 'Link4Innovation',
      description: 'Led 5+ engineers hands-on across industry, logistics and agribusiness deliveries.',
    },
    {
      period: 'Jan 2024 – Jul 2024',
      title: 'Full-Stack AI Engineer',
      company: 'Pix Force',
      description:
        '4 industrial AI products: people counting, employee performance, vehicle theft, dock analytics, plus pipe-threading inspection.',
    },
    {
      period: '2021 – Dec 2023',
      title: 'Freelance Software Engineer',
      company: 'Independent',
      description:
        'Solo full-stack and computer vision deliveries, from player-performance analysis on match footage to drone-based solar-panel inspection.',
    },
    {
      period: '2021 – 2022',
      title: 'Associate Degree, Software Development & Innovation Analysis',
      company: 'FIAP',
      description:
        'Hands-on program: software fundamentals, full-stack development, APIs and security. Capstone: a contactless heart-rate monitor over webcam (rPPG).',
    },
  ],
};

const es: Content = {
  ui: {
    nav: { work: 'Trabajo', architecture: 'Cómo construyo', skills: 'Stack', experience: 'Experiencia', contact: 'Contacto', cv: 'Descargar CV' },
    hero: {
      eyebrow: 'São Paulo, Brasil · Remoto para todo el mundo',
      h1Pre: 'Construyo ',
      h1Em: 'sistemas de IA en producción',
      h1Post: ' — de la visión en el edge a plataformas multiagente.',
      ctaProjects: 'Ver proyectos',
      ctaCv: 'Descargar CV',
      badgeAvailable: 'Disponible — remoto en todo el mundo',
      badgeEu: 'Ciudadano italiano (UE) · autorizado a trabajar en toda la UE',
    },
    work: {
      eyebrow: 'Trabajo seleccionado',
      heading: 'Cada sistema, de punta a punta',
      sub: 'Cada bloque es un caso completo: qué hace, qué cambió, el video de eso corriendo y la arquitectura por debajo. El trabajo para clientes corrió en producción con usuarios reales. Todo lo demás está etiquetado como lo que es — Caso de estudio, Código abierto, Proyecto personal — y existe para mostrar lo que el trabajo para clientes no puede mostrar en público.',
      videos: 'Míralo funcionando',
      architecture: 'Arquitectura',
      zoom: 'abrir en tamaño real',
      filters: { all: 'Todo', agents: 'Agentes y LLM', vision: 'Visión computacional', fullstack: 'Full-stack y cloud' },
      archToggle: 'Ver la arquitectura',
    },
    arch: {
      eyebrow: 'Cómo lo construyo',
      heading: 'El stack alrededor de cada modelo',
      sub: 'La visión fue mi punto de partida, pero el producto a su alrededor también es mío: React tipado sobre FastAPI, servicios event-driven, inferencia GPU y el despliegue y on-call que lo mantienen vivo.',
      also: 'También entregado',
    },
    skills: {
      eyebrow: 'Stack',
      heading: 'Herramientas con las que construyo',
      sub: 'Visión computacional y agentes LLM, el producto Python/FastAPI + React que los rodea, y la nube donde corren. Desarrollo asistido por IA a diario, con Claude Code, Codex y Cursor.',
    },
    experience: {
      eyebrow: 'Trayectoria',
      heading: 'Experiencia',
      sub: 'De freelance a founder a senior IC. Cada rol puso sistemas en producción.',
    },
    contact: {
      heading: 'Si tiene que funcionar en producción, hablemos.',
      sub: 'Abierto a roles senior remotos en todo el mundo: ingeniería de IA, visión computacional y productos de IA full-stack. Ciudadano italiano (UE) · inglés fluido · UTC−3, solapamiento casi total con el horario del este de EE. UU. y las tardes de Europa.',
      cv: 'Descargar CV',
    },
    footer: { cv: 'CV (PDF)', tagline: 'hecho con React + TypeScript + Vite, desplegado en GitHub Pages.' },
  },
  stats: [
    { num: '25.000+', label: 'animales contados al día — plantas de JBS y Marfrig' },
    { num: '150 tiendas', label: '4.500+ streams de cámara — ShopGuard AI' },
    { num: '98,5%', label: 'precisión en estimación de peso vs. balanzas — la meta era 95%' },
    { num: '−37%', label: 'de costo cloud en el primer mes — Pix Safety' },
  ],
  projects: [
    {
      title: 'ShopGuard AI — Detección de hurtos en retail',
      role: 'Founder & CTO · 2025',
      pill: { label: 'Producción', type: 'live' },
      description:
        'Plataforma de seguridad para retail construida en solitario, del edge a la UI: YOLO11 con TensorRT a latencia sub-segundo en hardware NVIDIA dentro de la tienda, ingesta GStreamer de ~30 cámaras por tienda, backend híbrido GCP / Oracle Cloud y dashboards React para los operadores de piso. Acelerada por los programas de Oracle, Google y Antler.',
      impact: '150 tiendas · 4.500+ streams de cámara · ~90% menos hurtos consumados vs. los registros previos al despliegue de las propias tiendas',
      tags: ['YOLO11', 'TensorRT', 'GStreamer', 'FastAPI', 'React', 'GCP'],
    },
    {
      title: 'Pix Safety — Optimización de modelos y cloud',
      role: 'Senior AI Engineer III · Pix Force · 2026–presente',
      pill: { label: 'Rol actual', type: 'live' },
      description:
        'Ownership continuo del producto Pix Safety: re-entrené sus modelos sobredimensionados en modelos más pequeños y mejor ajustados, y rehíce el serving con instancias reservadas, clusters redimensionados y migraciones Python→C++ en los hot paths. Además dicta formación interna de IA y mentorea a ingenieros junior y semi-senior.',
      impact: '+30% de precisión sobre los modelos previos en producción · inferencia 45% más rápida · costos cloud −37% en el primer mes',
      tags: ['PyTorch', 'C++', 'TensorRT', 'MLOps', 'Cloud Cost'],
    },
    {
      title: 'Plataforma industrial de visión — Promeat AI',
      role: 'Full-Stack Engineer · 2026',
      pill: { label: 'Producción', type: 'live' },
      description:
        'Plataforma de visión computacional para plantas de JBS y Marfrig: ingesta FFmpeg sobre cámaras heterogéneas, preprocesamiento con OpenCV, microservicios event-driven y dashboards React. El conteo diario es el registro con el que operan las plantas; no hay fallback manual.',
      impact: '25.000+ animales contados al día · 4 plantas (2 JBS, 2 Marfrig) · estimación de peso al 98,5% de precisión vs. balanzas de planta (meta del cliente: 95%)',
      tags: ['Python', 'FFmpeg', 'OpenCV', 'PyTorch', 'Microservices'],
    },
    {
      title: 'Productos industriales de visión — Pix Force',
      role: 'Full-Stack AI Engineer · 2024',
      pill: { label: 'Producción', type: 'live' },
      description:
        'Cuatro productos de IA para grandes clientes industriales: conteo de personas (YOLOv8 + ByteTrack), desempeño de empleados, detección de robo de vehículos y tiempo de permanencia en muelles, más inspección automatizada de roscado de tubos y un contrato gubernamental de densidad de multitudes por dron. Inferencia edge en Jetson y Raspberry Pi.',
      impact: '4 productos entregados · 5.000+ imágenes anotadas · conteo de multitudes por dron con margen de error inferior al 5%',
      tags: ['YOLOv8', 'ByteTrack', 'Jetson', 'CNNs', 'FastAPI'],
    },
    {
      title: 'Monitor de frecuencia cardíaca sin contacto (rPPG)',
      role: 'Proyecto de I+D',
      pill: { label: 'I+D', type: 'live' },
      description:
        'Detección de frecuencia cardíaca en tiempo real con una webcam común mediante fotopletismografía remota (rPPG) — procesamiento de video con OpenCV y análisis de señal, sin sensores ni wearables. Servido a través de una interfaz Flask.',
      impact: 'Signos vitales desde video — casos de uso en telemedicina y fitness',
      tags: ['OpenCV', 'Signal Processing', 'Python', 'Flask'],
    },
    {
      title: 'DocIntel — Verificación de Documentos con Revisión Humana',
      role: 'IA aplicada · código abierto · 2026',
      pill: { label: 'Código abierto', type: 'live' },
      description:
        'El flujo que corre un proveedor de verificación documental: leer el documento, probar de dónde salió cada valor, decidir solo cuando hay certeza y mandar el resto a una persona. Un modelo de visión-lenguaje local (Qwen2.5-VL con Ollama) extrae los valores, OCR ancla cada uno en la página, y la validación cruzada detecta lo que un score de confianza no puede: una factura cuyo subtotal e impuesto contradicen su propio total queda bloqueada aunque cada número se haya leído correctamente.',
      impact: 'Discrepancias enrutadas a revisión humana · escaped errors medidos (equivocados Y auto-aprobados) · calibración de confianza con gate de regresión · corre on-device',
      tags: ['Qwen2.5-VL', 'Ollama', 'Pydantic', 'FastAPI', 'React', 'LLM Evals'],
      repo: 'https://github.com/Rasantis/docintel',
    },
    {
      title: 'Auspex — Comando de Incidentes Multiagente',
      role: 'IA aplicada · sistemas de agentes · 2026',
      pill: { label: 'Caso de estudio', type: 'flagship' },
      description:
        'Suena una alerta a las 3am. Cuatro agentes especialistas investigan en paralelo sobre métricas, logs, deploys y runbooks, cada uno conectado a un servidor MCP distinto que escribí y limitado a las herramientas que ese servidor expone. Un comandante nombra una causa raíz, un escéptico la ataca con las mismas herramientas, y recién entonces un planificador propone una mitigación — que no puede ejecutar: toda escritura se detiene en un interrupt de LangGraph hasta que una persona la aprueba.',
      impact: '0 acciones inseguras en el eval de 7 incidentes · contención sostenida en cada incidente donde actuar es el error · mitigación correcta en 4 de 7 · corre en una GPU de consumo',
      tags: ['LangGraph', 'MCP', 'Multiagente', 'Human-in-the-Loop', 'Evals de Agentes', 'Prompt Injection', 'FastAPI', 'React'],
    },
    {
      title: 'AutoInspect AI — Informe Automatizado de Estado del Vehículo',
      role: 'Visión computacional · IA aplicada · 2026',
      pill: { label: 'Caso de estudio', type: 'flagship' },
      description:
        'Entra una vuelta de fotos al vehículo; sale un informe de daños con presupuesto. Dos modelos YOLO11-seg, uno para 23 piezas de carrocería y otro para 8 tipos de daño, se intersectan máscara con máscara, así la salida no es "rayón, 0.81" sino "rayón en la puerta delantera izquierda" — la línea que un taller presupuesta. Un filtro de calidad rechaza fotos borrosas o mal encuadradas, varias vistas del mismo golpe se fusionan en un solo defecto, y los hallazgos se convierten en operaciones de reparación contra una tarifa auditable.',
      impact: 'mask mAP50 65% en 23 piezas (3.156 imágenes de entrenamiento) · 12% en 8 tipos de daño (655 imágenes, reportado por clase, incluidas las dos que no aprendieron) · los defectos al borde de dos piezas se abstienen hacia un humano, nunca se asignan dentro de un margen del 2%',
      tags: ['YOLO11-seg', 'Segmentación de Instancias', 'PyTorch', 'Presupuestos de Reparación', 'FastAPI', 'WebSockets', 'React', 'OpenCV'],
    },
    {
      title: 'Kairos — Motor de Decisión Publicitaria en Tiempo Real',
      role: 'Sistemas de ranking · ML aplicado · 2026',
      pill: { label: 'Caso de estudio', type: 'flagship' },
      description:
        'Alguien está en medio de una sesión dentro de una app de IA y algo tiene que decidir, en milisegundos, qué experiencia patrocinada colocar — o que no se coloque ninguna. Un modelo de dos torres sobre un índice HNSW reduce 7.583 campañas a una lista corta, tres modelos de gradient boosting la puntúan, y una capa de política le pone precio al resultado contra lo que le cuesta a la sesión: valor de engagement acreditado, daño y fatiga debitados, y un piso que el saldo tiene que superar antes de servir algo. La primera medición explica por qué existe esa capa: ordenar solo por clic previsto sube el engagement de 18% a 43% y duplica la tasa a la que los usuarios piden que pare.',
      impact: 'p50 17,4 ms de punta a punta, p99 22,9 ms · +31% de engagement y −65% de feedback negativo por cada 1.000 oportunidades frente a exposición aleatoria, por replay sobre 1,19M de impresiones uniformemente aleatorizadas · sin calibrar, el modelo ofertaría 1,61× por encima del valor real; la calibración isotónica reduce el error de calibración 62% · el arranque en frío del retrieval falló y se reporta como fue medido',
      tags: ['Retrieval de Dos Torres', 'HNSW', 'LightGBM', 'Calibración', 'Evaluación Off-Policy', 'PyTorch', 'FastAPI', 'React'],
    },
  ],
  demos: [
    {
      src: './weight_estimation_demo.mp4',
      poster: './posters/weight_estimation_demo.jpg',
      project: 'Promeat AI',
      title: 'Estimación de peso en tiempo real — 98,5% vs. balanza',
      caption: 'Segmentación de instancias y predicción de peso por ave sobre video en vivo del galpón, medida contra las balanzas de la planta. La meta del cliente era 95%.',
    },
    {
      src: './pharmacy_detection_demo.mp4',
      poster: './posters/pharmacy_detection_demo.jpg',
      project: 'ShopGuard AI',
      title: 'Tracking y re-identificación en tienda',
      caption: 'Tracking multipersona, contador de personas y re-ID conocido / desconocido sobre CCTV de tienda.',
    },
    {
      src: './furto_vd8_processado.mp4',
      poster: './posters/furto_vd8_processado.jpg',
      project: 'ShopGuard AI',
      title: 'Detección de hurto — stream #1',
      caption: 'Detección y tracking en tiempo real sobre CCTV de retail.',
    },
    {
      src: './furto_vd15_processado.mp4',
      poster: './posters/furto_vd15_processado.jpg',
      project: 'ShopGuard AI',
      title: 'Detección de hurto — stream #2',
      caption: 'Patrón de conducta marcado bajo oclusión y movimiento.',
    },
    {
      src: './pipe_monitoring.mp4',
      poster: './posters/pipe_monitoring.jpg',
      project: 'Pix Force',
      title: 'Inspección visual de roscado de tubos',
      caption: 'Inspección automatizada de conexión para tubulares de oil & gas, con checklist de evidencias en vivo.',
    },
    {
      src: './crowd_counting_demo.mp4',
      poster: './posters/crowd_counting_demo.jpg',
      project: 'Contrato gubernamental',
      title: 'Conteo de multitudes por dron',
      caption: 'Conteo aéreo por cruce de línea + personas por cuadro en multitudes densas — pico de 1.100+ personas en cuadro.',
    },
    {
      src: './soccer_ai_demo.mp4',
      poster: './posters/soccer_ai_demo.jpg',
      project: 'Analítica deportiva',
      title: 'Match intelligence — transmisión del Mundial 2026',
      caption: 'Proyecto personal solo sobre la transmisión: ambos equipos, árbitros y balón rastreados, velocidad por jugador, posesión en vivo y un mapa táctico que sobrevive a los cortes de cámara.',
    },
    {
      src: './docintel_demo.mp4',
      poster: './posters/docintel_demo.jpg',
      project: 'DocIntel',
      title: 'Verificación documental con umbral de confianza',
      caption: 'Una factura que no cuadra: el modelo leyó cada número correctamente y la validación cruzada bloqueó la aprobación igual. Pasar el mouse por un campo resalta de dónde salió. Vantis Credit es un cliente ficticio; el pipeline es real.',
    },
    {
      src: './auspex_demo.mp4',
      poster: './posters/auspex_demo.jpg',
      project: 'Auspex',
      title: 'Cuatro agentes investigando un incidente en producción',
      caption: 'Replay de una corrida real a 6×. Los agentes se abren sobre cinco servidores MCP, el escéptico cuestiona la conclusión, y el rollback espera a una persona. Meridian es una empresa ficticia; la corrida y los números son reales.',
    },
    {
      src: './autoinspect_demo.mp4',
      poster: './posters/autoinspect_demo.jpg',
      project: 'AutoInspect AI',
      title: 'Daño atribuido a la pieza sobre la que está',
      caption: 'Las máscaras se dibujan sobre el vehículo empezando por el hallazgo más grave, cada una con su etiqueta. Hacer clic en una línea del presupuesto acerca la cámara a los píxeles exactos que la produjeron. JEPO es un operador ficticio; la inferencia y los números son reales.',
    },
    {
      src: './kairos_demo.mp4',
      poster: './posters/kairos_demo.jpg',
      project: 'Kairos',
      title: 'Una petición, una respuesta — o ninguna',
      caption: 'Una decisión en vivo con todo su recorrido: 7.583 campañas reducidas por vecinos más cercanos aproximados, 24 candidatos puntuados y calibrados, y luego el libro mayor que pone el engagement contra el daño. Subir el costo de una reacción negativa vuelve a decidir la subasta en cámara; subir el piso hace que el motor no sirva nada. Las pujas son sintéticas y están etiquetadas como tales — cada cifra de comportamiento está medida sobre un holdout aleatorizado.',
    },
  ],
  systems: [
    {
      key: 'weight-es',
      badge: 'Visión Computacional',
      badgeType: 'vision',
      title: 'Predicción de Peso por Ave — Promeat AI',
      desc: 'Un peso para cada ave individual, desde una cámara sobre el galpón. Un detector propone un ave, SAM3 recorta la máscara, y una CNN lee el recorte enmascarado junto con la línea y la edad del lote. La etiqueta es el cuello de botella: nadie puede poner 25.000 aves en una balanza, así que unas pocas centenas de pares tomados de la balanza del galpón tienen que sostener todo el modelo.',
      image: './diagrams/arch_promeat_weight.png',
      alt: 'Diagrama de arquitectura en dos registros. Inferencia, fila superior: una cámara cenital sobre el galpón captura periódicamente; un detector propone una región por ave; SAM3 genera una máscara por instancia; la máscara se aplica al frame para obtener un recorte enmascarado de un ave sola, sin fondo; un regresor CNN formado por un backbone y una cabeza de regresión lee ese recorte junto con los metadatos del lote — la línea Ross y la edad en días — y devuelve un peso por ave, por ejemplo el ave 124 con 3,18 kilogramos; los pesos se agregan en media, dispersión y uniformidad del lote, y se muestran en un dashboard como curva de peso por lote. Las aves sobre las que el segmentador no tiene confianza quedan fuera de la muestra en lugar de ser adivinadas, porque una muestra sesgada es peor que una muestra menor. SAM3 no corre a velocidad de frame: la captura es periódica, así que el costo se paga por muestra y no por segundo. Datos y modelo, fila inferior: una cámara y una balanza en el galpón registran la misma ave, los dos registros se emparejan por marca de tiempo formando pares de recorte enmascarado y kilogramos, el dataset se divide por lote y no al azar para que la misma ave no aparezca a ambos lados de la división, el entrenamiento optimiza el error absoluto medio en kilogramos contra la exigencia del cliente del 95 por ciento, y la cabeza entrenada se despliega versionada con el lote y reemplaza a la cabeza en producción. Resultado: 98,5 por ciento de precisión, medido sobre lotes que el modelo nunca vio durante el entrenamiento.',
      footer: '// 98,5% de precisión contra una exigencia de 95% — medido sobre lotes que el modelo nunca vio',
      tags: ['SAM3', 'Segmentación de instancias', 'Regresión CNN', 'PyTorch', 'MAE en kg'],
    },
    {
      key: 'auto-es',
      badge: 'Automatización',
      badgeType: 'auto',
      title: 'Capa de Automatización LLM — ShopGuard AI',
      desc: 'El video nunca sale de la tienda — 4.500 streams serían 9 Gbps, así que la inferencia corre en el appliance y solo el evento cruza el cable. En la nube un modelo visión-lenguaje mira el clip y escribe qué pasó, y solo la severidad alta llega a una persona.',
      image: './diagrams/arch_shopguard.png',
      alt: 'Diagrama de arquitectura en cinco registros. Edge de tienda, un appliance idéntico por tienda en 150 tiendas: unas 30 cámaras RTSP 1080p alimentan decodificación por hardware con GStreamer sobre NVIDIA Jetson; los frames pasan por una cola RabbitMQ para que la contrapresión de la inferencia nunca descarte un frame; luego YOLO11 con un engine TensorRT FP16 con latencia sub-segundo, ByteTrack para mantener identidad entre frames, y un motor de reglas que exige zona, tiempo de permanencia y una secuencia de ocultamiento antes de emitir un evento. Un límite vertical marca dónde se detiene el video: 4.500 streams 1080p simultáneos serían unos 9 gigabits por segundo, así que lo que cruza son unos 2 kilobytes de JSON y un clip de 6 segundos, solo cuando pasó algo. Google Cloud: un clúster GKE regional con Ingress sobre Cloud Load Balancing, un Deployment api con FastAPI, un Deployment worker para clips y evidencia, un constructor de contexto, y un resumen con modelos visión-lenguaje usando Gemini, GPT-4V y Qwen-VL que leen el clip en sí. El autoescalado de pods responde a solicitudes en vuelo y no a CPU, porque el paso lento es la llamada al modelo. Una compuerta de severidad deja salir del clúster solo la severidad alta. El estado vive fuera del clúster: Cloud Storage para clips y evidencia, PostgreSQL como sistema de registro de eventos, alertas y tiendas. Entrega: la plataforma de alertas lee la fila de severidad alta y llega al operador de tienda; todo lo demás queda como fila en Postgres para el resumen de turno. La entrega continua va de Artifact Registry a Cloud Build a un rolling update. Ciclo de modelo: las confirmaciones del operador se vuelven clips etiquetados en Cloud Storage, Vertex AI reentrena YOLO11, se compila un engine TensorRT por modelo de GPU, y un despliegue escalonado lo lleva de vuelta a cada appliance.',
      footer: '// ~90% menos hurtos consumados vs. registros pre-despliegue — construido y operado por un solo ingeniero',
      tags: ['RabbitMQ', 'YOLO11', 'TensorRT', 'GKE', 'Qwen-VL', 'PostgreSQL'],
    },
    {
      key: 'fullstack-es',
      badge: 'Full-Stack',
      badgeType: 'fullstack',
      title: 'Arquitectura de Producto Full-Stack',
      desc: 'El stack que construyo alrededor de cada modelo. Dashboards React tipados sobre FastAPI, servicios event-driven que escalan solos, inferencia GPU donde corresponde, y el despliegue y on-call que lo mantienen vivo.',
      image: './diagrams/arch_fullstack.svg',
      alt: 'Arquitectura: operadores y clientes usan dashboards en React y TypeScript; una capa FastAPI expone REST y WebSocket con contratos tipados; servicios event-driven manejan ingesta y procesamiento, inferencia GPU y workers de automatización; los datos viven en PostgreSQL/Supabase más almacenamiento de media y artefactos; Docker y CI/CD lo despliegan en GCP y Oracle Cloud.',
      footer: '// La misma arquitectura entregada en ShopGuard, Promeat y Pix Force — del primer commit al soporte en producción',
      tags: ['React', 'TypeScript', 'FastAPI', 'WebSockets', 'Docker', 'PostgreSQL', 'GCP'],
    },
  ],
  skillGroups: [
    {
      title: 'Visión Computacional',
      tags: ['YOLO11 / YOLOv8', 'PyTorch', 'OpenCV', 'TensorRT', 'GStreamer', 'FFmpeg', 'MediaPipe', 'SAM', 'NVIDIA Jetson'],
    },
    {
      title: 'IA y Agentes LLM',
      tags: ['LangGraph', 'LangChain', 'AutoGen', 'GPT-4', 'Claude', 'RAG', 'Langfuse', 'Eval Pipelines'],
    },
    {
      title: 'Multimodal y Adaptación de Modelos',
      tags: ['VLMs', 'GPT-4V', 'LLaVA', 'Qwen-VL', 'SAM', 'fine-tuning LoRA', 'VLA (exploración)'],
    },
    {
      title: 'Backend y APIs',
      tags: ['Python', 'C++', 'FastAPI', 'Node.js', 'REST', 'Microservices', 'Event-Driven', 'WebSockets'],
    },
    {
      title: 'Frontend',
      tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      title: 'Cloud y DevOps',
      tags: ['GCP', 'AWS', 'Oracle Cloud', 'Docker', 'CI/CD', 'PostgreSQL', 'Supabase'],
    },
    {
      title: 'Flujo de trabajo con IA',
      tags: ['Claude Code', 'Codex', 'Cursor', 'Agent-Driven Dev'],
    },
  ],
  timeline: [
    {
      period: 'Jul 2026 – Actualidad',
      title: 'Senior AI Engineer III',
      company: 'Pix Force',
      description:
        'Movimiento interno dentro del grupo Pix Force, desde Promeat AI. Owner del producto Pix Safety: modelos re-entrenados +30% de precisión sobre las versiones previas y 45% más rápidos, costos cloud −37% en el primer mes. Dicta formación interna de IA y mentorea a ingenieros junior y semi-senior.',
    },
    {
      period: 'Ene 2026 – Jun 2026',
      title: 'Full-Stack Software Engineer',
      company: 'Promeat AI · grupo Pix Force',
      description:
        'Plataforma de visión para JBS y Marfrig: 25.000+ animales/día en 4 plantas, microservicios event-driven, automatización LLM multiagente, estimación de peso al 98,5% de precisión vs. balanzas de planta (meta del cliente: 95%).',
    },
    {
      period: 'Ago 2025 – Dic 2025',
      title: 'Founder & CTO',
      company: 'ShopGuard AI',
      description:
        'Plataforma de detección de hurtos en retail, construida y operada en solitario: 150 tiendas, 4.500+ streams de cámara. Acelerada por Oracle, Google y Antler. La empresa sigue activa; en enero de 2026 moví mi foco full-time al grupo Pix Force.',
    },
    {
      period: 'Ene 2024 – Jun 2025',
      title: 'Co-Founder & Tech Lead',
      company: 'Vision Labs',
      description:
        'Empresa propia de IA y visión computacional, en paralelo con los roles vecinos: productos de visión de piloto a producción para clientes B2B enterprise, automatización GPT-4 + LangChain.',
    },
    {
      period: 'Jul 2024 – Feb 2025',
      title: 'Innovation Projects Lead & Technical PO',
      company: 'Link4Innovation',
      description: 'Lideré 5+ ingenieros, hands-on, en entregas de industria, logística y agronegocio.',
    },
    {
      period: 'Ene 2024 – Jul 2024',
      title: 'Full-Stack AI Engineer',
      company: 'Pix Force',
      description:
        '4 productos industriales de IA: conteo de personas, desempeño de empleados, robo de vehículos, analítica de muelles, más inspección de roscado de tubos.',
    },
    {
      period: '2021 – Dic 2023',
      title: 'Freelance Software Engineer',
      company: 'Independent',
      description:
        'Entregas full-stack y de visión computacional en solitario, del análisis de rendimiento de jugadores en video de partidos a la inspección de paneles solares con drones.',
    },
    {
      period: '2021 – 2022',
      title: 'Tecnólogo, Software Development & Innovation Analysis',
      company: 'FIAP',
      description:
        'Programa hands-on: fundamentos de software, desarrollo full-stack, APIs y seguridad. Proyecto final: monitor de frecuencia cardíaca sin contacto por webcam (rPPG).',
    },
  ],
};

const pt: Content = {
  ui: {
    nav: { work: 'Trabalho', architecture: 'Como construo', skills: 'Stack', experience: 'Experiência', contact: 'Contato', cv: 'Baixar CV' },
    hero: {
      eyebrow: 'São Paulo, Brasil · Remoto para o mundo todo',
      h1Pre: 'Eu construo ',
      h1Em: 'sistemas de IA em produção',
      h1Post: ' — da visão no edge a plataformas multiagente.',
      ctaProjects: 'Ver projetos',
      ctaCv: 'Baixar CV',
      badgeAvailable: 'Disponível — remoto no mundo todo',
      badgeEu: 'Cidadão italiano (UE) · autorizado a trabalhar em toda a UE',
    },
    work: {
      eyebrow: 'Trabalhos selecionados',
      heading: 'Cada sistema, de ponta a ponta',
      sub: 'Cada bloco é um caso completo: o que faz, o que mudou, o vídeo dele rodando e a arquitetura por baixo. O trabalho para clientes rodou em produção com usuários reais. Todo o resto está rotulado pelo que é — Estudo de caso, Código aberto, Projeto pessoal — e existe para mostrar o que o trabalho para clientes não pode mostrar em público.',
      videos: 'Veja funcionando',
      architecture: 'Arquitetura',
      zoom: 'abrir em tamanho real',
      filters: { all: 'Tudo', agents: 'Agentes e LLM', vision: 'Visão computacional', fullstack: 'Full-stack e cloud' },
      archToggle: 'Ver a arquitetura',
    },
    arch: {
      eyebrow: 'Como eu construo',
      heading: 'A stack em volta de cada modelo',
      sub: 'A visão foi meu ponto de partida, mas o produto em volta dela também é meu: React tipado sobre FastAPI, serviços event-driven, inferência em GPU e o deploy e o on-call que mantêm tudo de pé.',
      also: 'Também entregue',
    },
    skills: {
      eyebrow: 'Stack',
      heading: 'Ferramentas com que eu construo',
      sub: 'Visão computacional e agentes LLM, o produto Python/FastAPI + React em volta deles, e a nuvem onde rodam. Desenvolvimento assistido por IA no dia a dia, com Claude Code, Codex e Cursor.',
    },
    experience: {
      eyebrow: 'Trajetória',
      heading: 'Experiência',
      sub: 'De freelancer a founder a sênior IC. Cada posição colocou sistemas em produção.',
    },
    contact: {
      heading: 'Se tem que funcionar em produção, vamos conversar.',
      sub: 'Aberto a posições sênior remotas no mundo todo: engenharia de IA, visão computacional e produtos de IA full-stack. Cidadão italiano (UE) · inglês fluente · UTC−3, sobreposição quase total com o horário do leste dos EUA e as tardes da Europa.',
      cv: 'Baixar CV',
    },
    footer: { cv: 'CV (PDF)', tagline: 'feito com React + TypeScript + Vite, hospedado no GitHub Pages.' },
  },
  stats: [
    { num: '25.000+', label: 'animais contados por dia — plantas da JBS e Marfrig' },
    { num: '150 lojas', label: '4.500+ streams de câmera — ShopGuard AI' },
    { num: '98,5%', label: 'acurácia na estimativa de peso vs. balanças — a meta era 95%' },
    { num: '−37%', label: 'de custo cloud no primeiro mês — Pix Safety' },
  ],
  projects: [
    {
      title: 'ShopGuard AI — Detecção de Furtos no Varejo',
      role: 'Founder & CTO · 2025',
      pill: { label: 'Produção', type: 'live' },
      description:
        'Plataforma de segurança para o varejo construída solo, do edge à UI: YOLO11 com TensorRT a latência sub-segundo em hardware NVIDIA dentro da loja, ingestão GStreamer de ~30 câmeras por loja, backend híbrido GCP / Oracle Cloud e dashboards React para os operadores de loja. Acelerada pelos programas da Oracle, do Google e da Antler.',
      impact: '150 lojas · 4.500+ streams de câmera · ~90% menos furtos consumados vs. os registros pré-implantação das próprias lojas',
      tags: ['YOLO11', 'TensorRT', 'GStreamer', 'FastAPI', 'React', 'GCP'],
    },
    {
      title: 'Pix Safety — Otimização de Modelos e Cloud',
      role: 'Senior AI Engineer III · Pix Force · 2026–atual',
      pill: { label: 'Posição atual', type: 'live' },
      description:
        'Ownership contínuo do produto Pix Safety: re-treinei os modelos superdimensionados em modelos menores e mais bem ajustados, e refiz o serving com reserved instances, clusters redimensionados e migrações Python→C++ nos hot paths. Também conduz treinamentos internos de IA e mentora engenheiros júnior e pleno.',
      impact: '+30% de acurácia sobre os modelos anteriores em produção · inferência 45% mais rápida · custos de cloud −37% no primeiro mês',
      tags: ['PyTorch', 'C++', 'TensorRT', 'MLOps', 'Cloud Cost'],
    },
    {
      title: 'Plataforma Industrial de Visão — Promeat AI',
      role: 'Full-Stack Engineer · 2026',
      pill: { label: 'Produção', type: 'live' },
      description:
        'Plataforma de visão computacional para plantas da JBS e Marfrig: ingestão FFmpeg sobre câmeras heterogêneas, pré-processamento com OpenCV, microsserviços orientados a eventos e dashboards React. A contagem diária é o registro com que as plantas operam; não há fallback manual.',
      impact: '25.000+ animais contados por dia · 4 plantas (2 JBS, 2 Marfrig) · estimativa de peso com 98,5% de acurácia vs. balanças da planta (meta do cliente: 95%)',
      tags: ['Python', 'FFmpeg', 'OpenCV', 'PyTorch', 'Microservices'],
    },
    {
      title: 'Produtos Industriais de Visão — Pix Force',
      role: 'Full-Stack AI Engineer · 2024',
      pill: { label: 'Produção', type: 'live' },
      description:
        'Quatro produtos de IA para grandes clientes industriais: contagem de pessoas (YOLOv8 + ByteTrack), performance de funcionários, detecção de furto de veículos e tempo de permanência em docas, além de inspeção automatizada de rosqueamento de tubos e um contrato governamental de densidade de multidões por drone. Inferência edge em Jetson e Raspberry Pi.',
      impact: '4 produtos entregues · 5.000+ imagens anotadas · contagem de multidões por drone com margem de erro inferior a 5%',
      tags: ['YOLOv8', 'ByteTrack', 'Jetson', 'CNNs', 'FastAPI'],
    },
    {
      title: 'Monitor de Frequência Cardíaca sem Contato (rPPG)',
      role: 'Projeto de P&D',
      pill: { label: 'P&D', type: 'live' },
      description:
        'Detecção de frequência cardíaca em tempo real com uma webcam comum via fotopletismografia remota (rPPG) — processamento de vídeo com OpenCV e análise de sinal, sem sensores ou wearables. Servido por uma interface Flask.',
      impact: 'Sinais vitais a partir de vídeo — casos de uso em telemedicina e fitness',
      tags: ['OpenCV', 'Signal Processing', 'Python', 'Flask'],
    },
    {
      title: 'DocIntel — Verificação de Documentos com Revisão Humana',
      role: 'IA aplicada · código aberto · 2026',
      pill: { label: 'Código aberto', type: 'live' },
      description:
        'O fluxo que um provedor de verificação documental roda: ler o documento, provar de onde saiu cada valor, decidir sozinho só quando tem certeza e mandar o resto para uma pessoa. Um modelo de visão-linguagem local (Qwen2.5-VL via Ollama) extrai os valores, o OCR ancora cada um na página, e a validação cruzada pega o que um score de confiança não pega: uma nota cujo subtotal e imposto contradizem o próprio total fica bloqueada mesmo que cada número tenha sido lido corretamente.',
      impact: 'Discrepâncias roteadas para revisão humana · escaped errors medidos (errados E auto-aprovados) · calibração de confiança com gate de regressão · roda on-device',
      tags: ['Qwen2.5-VL', 'Ollama', 'Pydantic', 'FastAPI', 'React', 'LLM Evals'],
      repo: 'https://github.com/Rasantis/docintel',
    },
    {
      title: 'Auspex — Comando de Incidentes Multiagente',
      role: 'IA aplicada · sistemas de agentes · 2026',
      pill: { label: 'Estudo de caso', type: 'flagship' },
      description:
        'Um alerta dispara às 3 da manhã. Quatro agentes especialistas investigam em paralelo sobre métricas, logs, deploys e runbooks, cada um conectado a um servidor MCP diferente que eu escrevi e limitado às tools que aquele servidor expõe. Um comandante aponta uma causa-raiz, um cético a ataca com as mesmas ferramentas, e só então um planejador propõe uma mitigação — que ele não consegue executar: toda escrita para num interrupt do LangGraph até uma pessoa aprovar.',
      impact: '0 ações inseguras no eval de 7 incidentes · contenção mantida em cada incidente onde agir é o erro · mitigação correta em 4 de 7 · roda numa GPU de consumo',
      tags: ['LangGraph', 'MCP', 'Multiagente', 'Human-in-the-Loop', 'Evals de Agentes', 'Prompt Injection', 'FastAPI', 'React'],
    },
    {
      title: 'AutoInspect AI — Laudo Automatizado de Estado do Veículo',
      role: 'Visão computacional · IA aplicada · 2026',
      pill: { label: 'Estudo de caso', type: 'flagship' },
      description:
        'Entra uma volta de fotos ao redor do carro; sai um laudo de avarias com orçamento. Dois modelos YOLO11-seg, um para 23 peças de lataria e outro para 8 tipos de dano, são intersectados máscara a máscara, então a saída não é "risco, 0.81" e sim "risco na porta dianteira esquerda" — o item que uma oficina orça. Um filtro de qualidade recusa fotos desfocadas ou mal enquadradas, várias vistas do mesmo amassado viram um defeito só, e os achados são convertidos em operações de reparo contra uma tabela de preços auditável.',
      impact: 'mask mAP50 65% em 23 peças (3.156 imagens de treino) · 12% em 8 tipos de dano (655 imagens, reportado por classe, incluindo as duas que não aprenderam) · defeito na divisa entre duas peças se abstém para um humano, nunca é atribuído dentro de 2% de margem',
      tags: ['YOLO11-seg', 'Segmentação de Instâncias', 'PyTorch', 'Orçamento de Reparo', 'FastAPI', 'WebSockets', 'React', 'OpenCV'],
    },
    {
      title: 'Kairos — Motor de Decisão de Anúncios em Tempo Real',
      role: 'Sistemas de ranking · ML aplicado · 2026',
      pill: { label: 'Estudo de caso', type: 'flagship' },
      description:
        'Alguém está no meio de uma sessão dentro de um app de IA e algo precisa decidir, em milissegundos, qual experiência patrocinada entra — ou que nenhuma deve entrar. Um modelo de duas torres sobre um índice HNSW reduz 7.583 campanhas a uma lista curta, três modelos de gradient boosting pontuam essa lista, e uma camada de política precifica o resultado contra o que ele custa à sessão: valor de engajamento creditado, dano e fadiga debitados, e um piso que o saldo precisa limpar antes de qualquer coisa ser servida. A primeira medição explica por que essa camada existe: ordenar só por clique previsto leva o engajamento de 18% para 43% e dobra a taxa em que os usuários pedem para o produto parar.',
      impact: 'p50 17,4 ms de ponta a ponta, p99 22,9 ms · +31% de engajamento e −65% de feedback negativo por 1.000 oportunidades contra exposição aleatória, por replay sobre 1,19M de impressões uniformemente aleatorizadas · sem calibração, o modelo daria lance 1,61× acima do valor real; a calibração isotônica corta o erro de calibração em 62% · o cold-start do retrieval falhou e está reportado como foi medido',
      tags: ['Retrieval de Duas Torres', 'HNSW', 'LightGBM', 'Calibração', 'Avaliação Off-Policy', 'PyTorch', 'FastAPI', 'React'],
    },
  ],
  demos: [
    {
      src: './weight_estimation_demo.mp4',
      poster: './posters/weight_estimation_demo.jpg',
      project: 'Promeat AI',
      title: 'Estimativa de peso em tempo real — 98,5% vs. balança',
      caption: 'Segmentação de instâncias e previsão de peso por ave em vídeo ao vivo do galpão, medida contra as balanças da planta. A meta do cliente era 95%.',
    },
    {
      src: './pharmacy_detection_demo.mp4',
      poster: './posters/pharmacy_detection_demo.jpg',
      project: 'ShopGuard AI',
      title: 'Tracking e reidentificação em loja',
      caption: 'Tracking multipessoa, contador de pessoas e re-ID conhecido / desconhecido em CCTV de loja.',
    },
    {
      src: './furto_vd8_processado.mp4',
      poster: './posters/furto_vd8_processado.jpg',
      project: 'ShopGuard AI',
      title: 'Detecção de furto — stream #1',
      caption: 'Detecção e tracking em tempo real sobre CCTV de varejo.',
    },
    {
      src: './furto_vd15_processado.mp4',
      poster: './posters/furto_vd15_processado.jpg',
      project: 'ShopGuard AI',
      title: 'Detecção de furto — stream #2',
      caption: 'Padrão de comportamento sinalizado sob oclusão e movimento.',
    },
    {
      src: './pipe_monitoring.mp4',
      poster: './posters/pipe_monitoring.jpg',
      project: 'Pix Force',
      title: 'Inspeção visual de rosqueamento de tubos',
      caption: 'Inspeção automatizada de conexão para tubulares de óleo e gás, com checklist de evidências ao vivo.',
    },
    {
      src: './crowd_counting_demo.mp4',
      poster: './posters/crowd_counting_demo.jpg',
      project: 'Contrato governamental',
      title: 'Contagem de multidões por drone',
      caption: 'Contagem aérea por cruzamento de linha + pessoas por quadro em multidões densas — pico de 1.100+ pessoas em quadro.',
    },
    {
      src: './soccer_ai_demo.mp4',
      poster: './posters/soccer_ai_demo.jpg',
      project: 'Analytics esportivo',
      title: 'Match intelligence — transmissão da Copa 2026',
      caption: 'Projeto pessoal só sobre a transmissão: os dois times, árbitros e bola rastreados, velocidade por jogador, posse ao vivo e um mapa tático que sobrevive aos cortes de câmera.',
    },
    {
      src: './docintel_demo.mp4',
      poster: './posters/docintel_demo.jpg',
      project: 'DocIntel',
      title: 'Verificação documental com limiar de confiança',
      caption: 'Uma nota que não fecha: o modelo leu cada número corretamente e a validação cruzada bloqueou a aprovação mesmo assim. Passar o mouse num campo destaca de onde ele saiu. Vantis Credit é um cliente fictício; o pipeline é real.',
    },
    {
      src: './auspex_demo.mp4',
      poster: './posters/auspex_demo.jpg',
      project: 'Auspex',
      title: 'Quatro agentes investigando um incidente em produção',
      caption: 'Replay de um run real a 6×. Os agentes se abrem sobre cinco servidores MCP, o cético contesta a conclusão, e o rollback espera uma pessoa. Meridian é uma empresa fictícia; o run e os números são reais.',
    },
    {
      src: './autoinspect_demo.mp4',
      poster: './posters/autoinspect_demo.jpg',
      project: 'AutoInspect AI',
      title: 'Dano atribuído à peça em que ele está',
      caption: 'As máscaras se desenham sobre o veículo começando pelo achado mais grave, cada uma com o próprio rótulo. Clicar numa linha do orçamento aproxima a câmera dos pixels exatos que a geraram. JEPO é um operador fictício; a inferência e os números são reais.',
    },
    {
      src: './kairos_demo.mp4',
      poster: './posters/kairos_demo.jpg',
      project: 'Kairos',
      title: 'Uma requisição, uma resposta — ou nenhuma',
      caption: 'Uma decisão ao vivo com o caminho inteiro: 7.583 campanhas reduzidas por vizinhos mais próximos aproximados, 24 candidatos pontuados e calibrados, e então o razão que põe engajamento contra dano. Subir o custo de uma reação negativa redecide o leilão na câmera; subir o piso faz o motor não servir nada. Os lances são sintéticos e estão rotulados como tais — todo número de comportamento é medido sobre um holdout aleatorizado.',
    },
  ],
  systems: [
    {
      key: 'weight-pt',
      badge: 'Visão Computacional',
      badgeType: 'vision',
      title: 'Previsão de Peso por Ave — Promeat AI',
      desc: 'Um peso para cada ave individual, a partir de uma câmera sobre o galpão. Um detector propõe uma ave, o SAM3 recorta a máscara, e uma CNN lê o recorte mascarado junto com a linhagem e a idade do lote. O rótulo é o gargalo: ninguém põe 25.000 aves numa balança, então algumas centenas de pares tirados da balança do galpão precisam sustentar o modelo inteiro.',
      image: './diagrams/arch_promeat_weight.png',
      alt: 'Quadro de arquitetura em dois registros. Inferência, linha de cima: uma câmera cenital sobre o galpão captura periodicamente; um detector propõe uma região por ave; o SAM3 gera uma máscara por instância; a máscara é aplicada ao frame para dar um recorte mascarado de uma ave só, sem fundo; um regressor CNN formado por um backbone e uma cabeça de regressão lê esse recorte junto com os metadados do lote — a linhagem Ross e a idade em dias — e devolve um peso por ave, por exemplo a ave 124 com 3,18 quilos; os pesos são agregados em média, dispersão e uniformidade do lote, e mostrados num dashboard como curva de peso por lote. As aves sobre as quais o segmentador não tem confiança ficam de fora da amostra em vez de serem chutadas, porque amostra enviesada é pior que amostra menor. O SAM3 não roda na taxa de quadros: a captura é periódica, então o custo é pago por amostra e não por segundo. Dados e modelo, linha de baixo: uma câmera e uma balança no galpão registram a mesma ave, os dois registros são pareados por marca de tempo formando pares de recorte mascarado e quilos, o dataset é dividido por lote e não aleatoriamente para que a mesma ave não apareça dos dois lados da divisão, o treino otimiza o erro absoluto médio em quilos contra a exigência do cliente de 95 por cento, e a cabeça treinada é publicada versionada com o lote e substitui a cabeça em produção. Resultado: 98,5 por cento de acurácia, medido em lotes que o modelo nunca viu durante o treino.',
      footer: '// 98,5% de acurácia contra uma exigência de 95% — medido em lotes que o modelo nunca viu',
      tags: ['SAM3', 'Segmentação de instâncias', 'Regressão CNN', 'PyTorch', 'MAE em kg'],
    },
    {
      key: 'auto-pt',
      badge: 'Automação',
      badgeType: 'auto',
      title: 'Camada de Automação LLM — ShopGuard AI',
      desc: 'O vídeo nunca sai da loja — 4.500 streams seriam 9 Gbps, então a inferência roda no appliance e só o evento cruza o fio. Na nuvem um modelo visão-linguagem assiste ao clipe e escreve o que aconteceu, e só severidade alta chega a uma pessoa.',
      image: './diagrams/arch_shopguard.png',
      alt: 'Quadro de arquitetura em cinco registros. Edge da loja, um appliance idêntico por loja em 150 lojas: cerca de 30 câmeras RTSP 1080p alimentam decodificação por hardware com GStreamer sobre NVIDIA Jetson; os frames passam por uma fila RabbitMQ para que a contrapressão da inferência nunca descarte um frame; em seguida YOLO11 com engine TensorRT FP16 em latência sub-segundo, ByteTrack para manter identidade entre frames, e um motor de regras que exige zona, tempo de permanência e uma sequência de ocultação antes de emitir um evento. Um limite vertical marca onde o vídeo para: 4.500 streams 1080p simultâneos seriam cerca de 9 gigabits por segundo, então o que cruza o fio são uns 2 kilobytes de JSON e um clipe de 6 segundos, apenas quando algo aconteceu. Google Cloud: um cluster GKE regional com Ingress sobre Cloud Load Balancing, um Deployment api com FastAPI, um Deployment worker para clipes e evidências, um construtor de contexto, e um resumo com modelos visão-linguagem usando Gemini, GPT-4V e Qwen-VL que leem o próprio clipe, não uma legenda dele. O autoescalonamento de pods responde a requisições em voo e não a CPU, porque o passo lento é a chamada ao modelo. Um portão de severidade deixa sair do cluster apenas a severidade alta. O estado vive fora do cluster: Cloud Storage para clipes e evidências, PostgreSQL como sistema de registro de eventos, alertas e lojas. Entrega: a plataforma de alertas lê a linha de severidade alta e chega ao operador da loja; todo o resto permanece como linha no Postgres para o resumo do turno. A entrega contínua vai de Artifact Registry para Cloud Build para um rolling update. Ciclo do modelo: as confirmações do operador viram clipes rotulados no Cloud Storage, o Vertex AI re-treina o YOLO11, um engine TensorRT é compilado por modelo de GPU, e um rollout escalonado leva de volta para cada appliance.',
      footer: '// ~90% menos furtos consumados vs. registros pré-implantação — construído e operado por um engenheiro só',
      tags: ['RabbitMQ', 'YOLO11', 'TensorRT', 'GKE', 'Qwen-VL', 'PostgreSQL'],
    },
    {
      key: 'fullstack-pt',
      badge: 'Full-Stack',
      badgeType: 'fullstack',
      title: 'Arquitetura de Produto Full-Stack',
      desc: 'A stack que eu construo em volta de cada modelo. Dashboards React tipados sobre FastAPI, serviços event-driven que escalam sozinhos, inferência em GPU onde é devido, e o deploy e o on-call que mantêm tudo de pé.',
      image: './diagrams/arch_fullstack.svg',
      alt: 'Arquitetura: operadores e clientes usam dashboards em React e TypeScript; uma camada FastAPI expõe REST e WebSocket com contratos tipados; serviços event-driven cuidam de ingestão e processamento, inferência em GPU e workers de automação; os dados ficam em PostgreSQL/Supabase mais armazenamento de mídia e artefatos; Docker e CI/CD sobem tudo em GCP e Oracle Cloud.',
      footer: '// A mesma arquitetura entregue na ShopGuard, Promeat e Pix Force — do primeiro commit ao suporte em produção',
      tags: ['React', 'TypeScript', 'FastAPI', 'WebSockets', 'Docker', 'PostgreSQL', 'GCP'],
    },
  ],
  skillGroups: [
    {
      title: 'Visão Computacional',
      tags: ['YOLO11 / YOLOv8', 'PyTorch', 'OpenCV', 'TensorRT', 'GStreamer', 'FFmpeg', 'MediaPipe', 'SAM', 'NVIDIA Jetson'],
    },
    {
      title: 'IA e Agentes LLM',
      tags: ['LangGraph', 'LangChain', 'AutoGen', 'GPT-4', 'Claude', 'RAG', 'Langfuse', 'Eval Pipelines'],
    },
    {
      title: 'Multimodal e Adaptação de Modelos',
      tags: ['VLMs', 'GPT-4V', 'LLaVA', 'Qwen-VL', 'SAM', 'fine-tuning LoRA', 'VLA (exploração)'],
    },
    {
      title: 'Backend e APIs',
      tags: ['Python', 'C++', 'FastAPI', 'Node.js', 'REST', 'Microservices', 'Event-Driven', 'WebSockets'],
    },
    {
      title: 'Frontend',
      tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      title: 'Cloud e DevOps',
      tags: ['GCP', 'AWS', 'Oracle Cloud', 'Docker', 'CI/CD', 'PostgreSQL', 'Supabase'],
    },
    {
      title: 'Fluxo de Trabalho com IA',
      tags: ['Claude Code', 'Codex', 'Cursor', 'Agent-Driven Dev'],
    },
  ],
  timeline: [
    {
      period: 'Jul 2026 – Atual',
      title: 'Senior AI Engineer III',
      company: 'Pix Force',
      description:
        'Movimento interno dentro do grupo Pix Force, vindo da Promeat AI. Dono do produto Pix Safety: modelos re-treinados com +30% de acurácia sobre as versões anteriores e 45% mais rápidos, custos de cloud −37% no primeiro mês. Conduz treinamentos internos de IA e mentora engenheiros júnior e pleno.',
    },
    {
      period: 'Jan 2026 – Jun 2026',
      title: 'Full-Stack Software Engineer',
      company: 'Promeat AI · grupo Pix Force',
      description:
        'Plataforma de visão para JBS e Marfrig: 25.000+ animais/dia em 4 plantas, microsserviços orientados a eventos, automação LLM multiagente, estimativa de peso com 98,5% de acurácia vs. balanças da planta (meta do cliente: 95%).',
    },
    {
      period: 'Ago 2025 – Dez 2025',
      title: 'Founder & CTO',
      company: 'ShopGuard AI',
      description:
        'Plataforma de detecção de furtos no varejo, construída e operada solo: 150 lojas, 4.500+ streams de câmera. Acelerada por Oracle, Google e Antler. A empresa segue ativa; em janeiro de 2026 movi meu foco full-time para o grupo Pix Force.',
    },
    {
      period: 'Jan 2024 – Jun 2025',
      title: 'Co-Founder & Tech Lead',
      company: 'Vision Labs',
      description:
        'Empresa própria de IA e visão computacional, tocada em paralelo com as posições vizinhas: produtos de visão do piloto à produção para clientes B2B enterprise, automação GPT-4 + LangChain.',
    },
    {
      period: 'Jul 2024 – Fev 2025',
      title: 'Innovation Projects Lead & Technical PO',
      company: 'Link4Innovation',
      description: 'Liderei 5+ engenheiros, mão na massa, em entregas para indústria, logística e agronegócio.',
    },
    {
      period: 'Jan 2024 – Jul 2024',
      title: 'Full-Stack AI Engineer',
      company: 'Pix Force',
      description:
        '4 produtos industriais de IA: contagem de pessoas, performance de funcionários, furto de veículos, analítica de docas, além de inspeção de rosqueamento de tubos.',
    },
    {
      period: '2021 – Dez 2023',
      title: 'Freelance Software Engineer',
      company: 'Independent',
      description:
        'Entregas full-stack e de visão computacional solo, da análise de desempenho de jogadores em vídeos de partidas à inspeção de painéis solares com drones.',
    },
    {
      period: '2021 – 2022',
      title: 'Tecnólogo, Software Development & Innovation Analysis',
      company: 'FIAP',
      description:
        'Programa mão na massa: fundamentos de software, desenvolvimento full-stack, APIs e segurança. Projeto de conclusão: monitor de frequência cardíaca sem contato via webcam (rPPG).',
    },
  ],
};

export const content: Record<Lang, Content> = { en, es, pt };
