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
  badgeType: 'agents' | 'auto' | 'fullstack';
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
  work: { eyebrow: string; heading: string; sub: string; videos: string; architecture: string; zoom: string };
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
export interface CaseDef {
  key: string;
  idx: string;
  projectIdx: number;
  demoSrcs: string[];
  systemPrefix?: 'agents' | 'auto';
}

export const CASES: CaseDef[] = [
  {
    key: 'shopguard',
    idx: '01',
    projectIdx: 0,
    demoSrcs: ['./pharmacy_detection_demo.mp4', './furto_vd8_processado.mp4', './furto_vd15_processado.mp4'],
    systemPrefix: 'auto',
  },
  { key: 'soccer', idx: '02', projectIdx: 5, demoSrcs: ['./soccer_ai_demo.mp4'] },
  { key: 'promeat', idx: '03', projectIdx: 2, demoSrcs: ['./weight_estimation_demo.mp4'], systemPrefix: 'agents' },
  { key: 'pixsafety', idx: '04', projectIdx: 1, demoSrcs: [] },
  { key: 'pixforce', idx: '05', projectIdx: 3, demoSrcs: ['./pipe_monitoring.mp4', './crowd_counting_demo.mp4'] },
  { key: 'docintel', idx: '06', projectIdx: 6, demoSrcs: ['./docintel_demo.mp4'] },
];

/** Work that has no case block of its own — shown compactly at the end. */
export const EXTRA_PROJECT_IDX = [4];
export const EXTRA_DEMO_SRCS = ['./vehicle_counting_demo.mp4'];
/** The full-stack blueprint is cross-cutting: it belongs to no single project. */
export const CROSS_SYSTEM_PREFIX = 'fullstack';

const en: Content = {
  ui: {
    nav: { work: 'Work', architecture: 'Architecture', skills: 'Stack', experience: 'Experience', contact: 'Contact', cv: 'Download CV' },
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
      sub: 'Each block is one full case — what it does, what it changed, footage of it running, and the architecture underneath. All of it shipped to real users under production traffic.',
      videos: 'See it running',
      architecture: 'Architecture',
      zoom: 'open full size',
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
      sub: 'End to end across the stack — computer vision and LLM agents, the Python/FastAPI + React product around them, and the cloud they run on. Heavy daily use of AI-augmented development (Claude Code, Codex, Cursor).',
    },
    experience: {
      eyebrow: 'Trajectory',
      heading: 'Experience',
      sub: 'Freelance to founder to senior IC — every stop shipped to production, owned end to end.',
    },
    contact: {
      heading: "Let's build something that ships.",
      sub: 'Open to remote roles worldwide — AI engineering, computer vision, full-stack AI products. Italian (EU) citizen, fluent English, fully async-ready.',
      cv: 'Download CV',
    },
    footer: { cv: 'CV (PDF)', tagline: 'built with React + TypeScript + Vite, deployed on GitHub Pages.' },
  },
  stats: [
    { num: '25,000+', label: 'animals counted daily — JBS & Marfrig plants' },
    { num: '150 stores', label: '4,500+ camera streams — ShopGuard AI footprint' },
    { num: '90%', label: 'fewer completed thefts at deployed stores' },
    { num: '−37%', label: 'cloud cost cut in month one — Pix Safety' },
  ],
  projects: [
    {
      title: 'ShopGuard AI — Retail Theft Detection',
      role: 'Founder & CTO · 2025',
      pill: { label: '150 stores', type: 'flagship' },
      description:
        'AI-native retail security platform, built solo from edge to UI: YOLO11 + GStreamer + TensorRT at sub-second latency on NVIDIA edge hardware, hybrid GCP / Oracle Cloud backend, React operator dashboards. Oracle / Google / Antler accelerated.',
      impact: '150 stores · 4,500+ camera streams · 90% fewer completed thefts',
      tags: ['YOLO11', 'TensorRT', 'GStreamer', 'FastAPI', 'React', 'GCP'],
    },
    {
      title: 'Pix Safety — Model & Cloud Optimization',
      role: 'Senior AI Engineer III · Pix Force · 2026–present',
      pill: { label: '+30% accuracy', type: 'live' },
      description:
        'Ongoing ownership of Pix Safety refinement: retrained oversized models into smaller, better-tuned ones, and rebuilt the serving economics — reserved instances, right-sized clusters, hot-path Python→C++ migrations.',
      impact: '30% more accurate · 45% faster inference · cloud costs −37% in month one',
      tags: ['PyTorch', 'C++', 'TensorRT', 'MLOps', 'Cloud Cost'],
    },
    {
      title: 'Industrial CV Platform — Promeat AI',
      role: 'Full-Stack Engineer · 2026',
      pill: { label: 'In production', type: 'live' },
      description:
        "Computer vision platform serving JBS and Marfrig. FFmpeg ingestion over heterogeneous plant cameras, OpenCV preprocessing, event-driven microservices and React dashboards — the plant's operational source of truth, zero manual fallback.",
      impact: '25,000+ animals counted daily · 4 plants (2 JBS, 2 Marfrig)',
      tags: ['Python', 'FFmpeg', 'OpenCV', 'PyTorch', 'Microservices'],
    },
    {
      title: 'Industrial Vision Products — Pix Force',
      role: 'Full-Stack AI Engineer · 2024',
      pill: { label: '4 products', type: 'live' },
      description:
        'Four production AI products for large industrial clients — people counting (YOLOv8 + ByteTrack), employee performance, vehicle theft detection, dock dwell-time — plus automated pipe-threading inspection and a government drone contract for real-time crowd density. Edge inference on Jetson / Raspberry Pi.',
      impact: '5,000+ annotated images · 4 products shipped · crowd counting within 5% margin of error',
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
      title: 'Soccer AI — Match Intelligence',
      role: 'Computer Vision · World Cup 2026 footage',
      pill: { label: 'Sports analytics', type: 'live' },
      description:
        'Tactical analysis from broadcast football footage alone: both squads, referees and the ball tracked frame by frame, each player labelled with live speed, possession computed on the fly, and every position projected onto a 2D tactical map that re-solves itself when the broadcast cuts to a new camera angle.',
      impact: 'Players · referees · ball tracked · per-player km/h · live possession · homography-projected tactical map',
      tags: ['YOLO', 'Multi-Object Tracking', 'Homography', 'OpenCV', 'PyTorch', 'Team Classification'],
    },
    {
      title: 'DocIntel — OCR Verification with Human-in-the-Loop',
      role: 'Applied AI · open source · 2026',
      pill: { label: 'Open source', type: 'live' },
      description:
        'The workflow a document-verification provider runs: read the document, prove where each value came from, decide alone only when confident, and route the rest to a person. A local vision-language model (Qwen2.5-VL via Ollama) extracts the values, OCR anchors each one on the page, and cross-field validation catches what a confidence score cannot — an invoice whose subtotal and tax contradict its own total is blocked even when the model read all three numbers perfectly.',
      impact: 'Discrepancies routed to human review · escaped errors measured (wrong AND auto-approved) · confidence calibration and a regression gate · runs on-device, no per-document cost',
      tags: ['Qwen2.5-VL', 'Ollama', 'Pydantic', 'FastAPI', 'React', 'LLM Evals'],
      repo: 'https://github.com/Rasantis/docintel',
    },
  ],
  demos: [
    {
      src: './weight_estimation_demo.mp4',
      poster: './posters/weight_estimation_demo.jpg',
      project: 'Promeat AI',
      title: 'Real-time weight estimation — 98.5%',
      caption: 'Instance segmentation + per-bird weight prediction on live barn footage.',
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
      src: './vehicle_counting_demo.mp4',
      poster: './posters/vehicle_counting_demo.jpg',
      project: 'Traffic Analytics',
      title: 'Vehicle counting & traffic flow',
      caption: 'Multi-zone in / out vehicle tallies and tracking on a live traffic camera.',
    },
    {
      src: './soccer_ai_demo.mp4',
      poster: './posters/soccer_ai_demo.jpg',
      project: 'Sports Analytics',
      title: 'Match intelligence — World Cup 2026',
      caption: 'Both squads, referees and ball tracked from broadcast footage — speed per player, live possession, and a tactical map that survives camera cuts.',
    },
    {
      src: './docintel_demo.mp4',
      poster: './posters/docintel_demo.jpg',
      project: 'DocIntel',
      title: 'Document verification with a confidence gate',
      caption: 'An invoice that does not add up: the model read every number correctly and the cross-field check blocked approval anyway. Hover a field to see where it was read.',
    },
  ],
  systems: [
    {
      key: 'agents-en',
      badge: 'LLM Agents',
      badgeType: 'agents',
      title: 'Multi-Agent Decision Engine — Promeat AI',
      desc: 'Agents that read the plant floor and act on it. Live ERP and operational data flows into a LangGraph state machine, gets classified, validated and decided by specialized agents, and either writes back autonomously or lands in a human queue — every step traced.',
      image: './diagrams/arch_promeat.svg',
      alt: 'Layered architecture in five tiers. 1 Source systems: client ERP, plant systems, vision pipeline counting 25,000+ animals per day. 2 Ingest over event-driven microservices: event API, event bus, schema normalisation and validation. 3 Agent runtime on LangGraph and AutoGen: graph router state machine, classification agent, validation agent, decision agent, and agent tools for RAG and ERP queries. 4 Guardrail and actuation: a confidence gate sends confident decisions to write-back into client systems and low-confidence ones to a plant operator for human-in-the-loop review, with an audit record. 5 State, observability and platform: PostgreSQL agent state and plant context, Langfuse traces per node, eval pipelines acting as a regression gate fed by operator corrections, Docker CI/CD on GCP.',
      footer: '// Runs under JBS & Marfrig plant traffic — 25,000+ animals counted daily, zero manual fallback',
      tags: ['LangGraph', 'AutoGen', 'RAG', 'Langfuse', 'FastAPI', 'PostgreSQL'],
    },
    {
      key: 'auto-en',
      badge: 'Automation',
      badgeType: 'auto',
      title: 'LLM Automation Layer — ShopGuard AI',
      desc: 'The language layer on top of real-time vision. Edge detections arrive as events, get assembled into context, and come out as an alert a store operator can act on in seconds — or as a summary that can wait.',
      image: './diagrams/arch_shopguard.svg',
      alt: 'Layered architecture in five tiers. 1 Store edge, an identical appliance per store: around 30 RTSP cameras, GStreamer hardware decode, YOLO11 + TensorRT at sub-second latency, standardised provisioning. 2 Cloud ingest on hybrid GCP and Oracle Cloud: FastAPI ingest API with auth and validation, detection event stream over event-driven services, clip extraction. 3 Intelligence with LangChain and AutoGen: context builder, GPT-4 alert and summary, severity routing gate. 4 Delivery: escalation workflow, React operator dashboard with live alerts, client integrations, store operator. 5 Data, model loop and platform: PostgreSQL, clip and dataset storage, failure-case retraining that ships a new model back to every store, Docker CI/CD on GCP and Oracle Cloud.',
      footer: '// 90% fewer completed thefts in production — built and operated by one engineer',
      tags: ['LangChain', 'AutoGen', 'GPT-4', 'YOLO11', 'TensorRT', 'FastAPI'],
    },
    {
      key: 'fullstack-en',
      badge: 'Full-Stack',
      badgeType: 'fullstack',
      title: 'Full-Stack Product Architecture',
      desc: 'The stack I build around every model. Typed React dashboards over FastAPI, event-driven services that scale on their own, GPU inference where it belongs, and the deployment and on-call that keep it alive — one engineer, no handoffs.',
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
        'Internal move within the Pix Force group, from Promeat AI. Owner of Pix Safety refinement — models retrained 30% more accurate and 45% faster; cloud costs down 37% in the first month (reserved instances, Python→C++, right-sized clusters).',
    },
    {
      period: 'Jan 2026 – Jun 2026',
      title: 'Full-Stack Software Engineer',
      company: 'Promeat AI · Pix Force group',
      description:
        'CV platform for JBS & Marfrig — 25,000+ animals/day across 4 plants, event-driven microservices, multi-agent LLM automation, real-time weight estimation at 98.5%.',
    },
    {
      period: 'Aug 2025 – Dec 2025',
      title: 'Founder & CTO',
      company: 'ShopGuard AI',
      description:
        'Retail theft-detection platform: 150 stores, 4,500+ camera streams, 90% fewer completed thefts. Oracle / Google / Antler accelerated. Sole engineer, zero handoffs.',
    },
    {
      period: 'Jan 2024 – Jun 2025',
      title: 'Co-Founder & Tech Lead',
      company: 'Vision Labs',
      description:
        'Co-founded an AI & computer vision company — CV products from pilot to production for enterprise B2B clients; GPT-4 + LangChain automation in production.',
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
        '4 industrial AI products — people counting, employee performance, vehicle theft, dock analytics — plus pipe-threading inspection.',
    },
    {
      period: '2021 – Dec 2023',
      title: 'Freelance Software Engineer',
      company: 'Independent',
      description:
        'Solo full-stack and computer vision deliveries — from player-performance analysis on match footage to drone-based solar-panel inspection.',
    },
  ],
};

const es: Content = {
  ui: {
    nav: { work: 'Trabajo', architecture: 'Arquitectura', skills: 'Stack', experience: 'Experiencia', contact: 'Contacto', cv: 'Descargar CV' },
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
      sub: 'Cada bloque es un caso completo — qué hace, qué cambió, el video de eso corriendo y la arquitectura por debajo. Todo llegó a usuarios reales, bajo tráfico de producción.',
      videos: 'Míralo funcionando',
      architecture: 'Arquitectura',
      zoom: 'abrir en tamaño real',
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
      sub: 'De punta a punta en todo el stack — visión computacional y agentes LLM, el producto Python/FastAPI + React que los rodea, y la nube donde corren. Uso diario intensivo de desarrollo asistido por IA (Claude Code, Codex, Cursor).',
    },
    experience: {
      eyebrow: 'Trayectoria',
      heading: 'Experiencia',
      sub: 'De freelance a founder a senior IC — cada etapa llegó a producción, con ownership de punta a punta.',
    },
    contact: {
      heading: 'Construyamos algo que llegue a producción.',
      sub: 'Abierto a roles remotos en todo el mundo — ingeniería de IA, visión computacional y productos de IA full-stack. Ciudadano italiano (UE), inglés fluido, listo para trabajo 100% async.',
      cv: 'Descargar CV',
    },
    footer: { cv: 'CV (PDF)', tagline: 'hecho con React + TypeScript + Vite, desplegado en GitHub Pages.' },
  },
  stats: [
    { num: '25.000+', label: 'animales contados al día — plantas de JBS y Marfrig' },
    { num: '150 tiendas', label: '4.500+ streams de cámara — huella de ShopGuard AI' },
    { num: '90%', label: 'menos hurtos consumados en las tiendas desplegadas' },
    { num: '−37%', label: 'de costo cloud en el primer mes — Pix Safety' },
  ],
  projects: [
    {
      title: 'ShopGuard AI — Detección de hurtos en retail',
      role: 'Founder & CTO · 2025',
      pill: { label: '150 tiendas', type: 'flagship' },
      description:
        'Plataforma de seguridad para retail nativa de IA, construida en solitario del edge a la UI: YOLO11 + GStreamer + TensorRT con latencia sub-segundo en hardware edge NVIDIA, backend híbrido GCP / Oracle Cloud y dashboards de operador en React. Acelerada por Oracle / Google / Antler.',
      impact: '150 tiendas · 4.500+ streams de cámara · 90% menos hurtos consumados',
      tags: ['YOLO11', 'TensorRT', 'GStreamer', 'FastAPI', 'React', 'GCP'],
    },
    {
      title: 'Pix Safety — Optimización de modelos y cloud',
      role: 'Senior AI Engineer III · Pix Force · 2026–presente',
      pill: { label: '+30% precisión', type: 'live' },
      description:
        'Ownership continuo del refinamiento de Pix Safety: re-entrené modelos sobredimensionados en modelos más pequeños y mejor ajustados, y rehíce la economía del serving — instancias reservadas, clusters redimensionados y migraciones Python→C++ en los hot paths.',
      impact: '30% más preciso · inferencia 45% más rápida · costos cloud −37% en el primer mes',
      tags: ['PyTorch', 'C++', 'TensorRT', 'MLOps', 'Cloud Cost'],
    },
    {
      title: 'Plataforma industrial de visión — Promeat AI',
      role: 'Full-Stack Engineer · 2026',
      pill: { label: 'En producción', type: 'live' },
      description:
        'Plataforma de visión computacional para JBS y Marfrig. Ingesta FFmpeg sobre cámaras heterogéneas de planta, preprocesamiento con OpenCV, microservicios event-driven y dashboards en React — la fuente de verdad operativa de la planta, sin fallback manual.',
      impact: '25.000+ animales contados al día · 4 plantas (2 JBS, 2 Marfrig)',
      tags: ['Python', 'FFmpeg', 'OpenCV', 'PyTorch', 'Microservices'],
    },
    {
      title: 'Productos industriales de visión — Pix Force',
      role: 'Full-Stack AI Engineer · 2024',
      pill: { label: '4 productos', type: 'live' },
      description:
        'Cuatro productos de IA en producción para grandes clientes industriales — conteo de personas (YOLOv8 + ByteTrack), desempeño de empleados, detección de robo de vehículos, tiempo de permanencia en muelles — más inspección automatizada de roscado de tubos y un contrato gubernamental de conteo de multitudes por dron. Inferencia edge en Jetson / Raspberry Pi.',
      impact: '5.000+ imágenes anotadas · 4 productos entregados · conteo de multitudes con margen de error inferior al 5%',
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
      title: 'Soccer AI — Match Intelligence',
      role: 'Visión computacional · imágenes del Mundial 2026',
      pill: { label: 'Analítica deportiva', type: 'live' },
      description:
        'Análisis táctico solo a partir de la transmisión de un partido: ambos equipos, árbitros y el balón rastreados cuadro a cuadro, cada jugador con su velocidad en vivo, posesión calculada al vuelo y cada posición proyectada sobre un mapa táctico 2D que se recalcula cuando la transmisión cambia de cámara.',
      impact: 'Jugadores · árbitros · balón rastreados · km/h por jugador · posesión en vivo · mapa táctico por homografía',
      tags: ['YOLO', 'Multi-Object Tracking', 'Homografía', 'OpenCV', 'PyTorch', 'Clasificación de equipos'],
    },
    {
      title: 'DocIntel — Verificación de Documentos con Revisión Humana',
      role: 'IA aplicada · código abierto · 2026',
      pill: { label: 'Código abierto', type: 'live' },
      description:
        'El flujo que corre un proveedor de verificación documental: leer el documento, probar de dónde salió cada valor, decidir solo cuando hay certeza y mandar el resto a una persona. Un modelo de visión-lenguaje local (Qwen2.5-VL con Ollama) extrae los valores, OCR ancla cada uno en la página, y la validación cruzada detecta lo que un score de confianza no puede: una factura cuyo subtotal e impuesto contradicen su propio total queda bloqueada aunque el modelo haya leído los tres números perfectamente.',
      impact: 'Discrepancias enrutadas a revisión humana · escaped errors medidos (equivocados Y auto-aprobados) · calibración de confianza y gate de regresión · corre on-device, sin costo por documento',
      tags: ['Qwen2.5-VL', 'Ollama', 'Pydantic', 'FastAPI', 'React', 'LLM Evals'],
      repo: 'https://github.com/Rasantis/docintel',
    },
  ],
  demos: [
    {
      src: './weight_estimation_demo.mp4',
      poster: './posters/weight_estimation_demo.jpg',
      project: 'Promeat AI',
      title: 'Estimación de peso en tiempo real — 98,5%',
      caption: 'Segmentación de instancias + predicción de peso por ave sobre video en vivo del galpón.',
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
      src: './vehicle_counting_demo.mp4',
      poster: './posters/vehicle_counting_demo.jpg',
      project: 'Analítica de tráfico',
      title: 'Conteo de vehículos y flujo de tráfico',
      caption: 'Conteos de entrada / salida multizona y tracking sobre una cámara de tráfico en vivo.',
    },
    {
      src: './soccer_ai_demo.mp4',
      poster: './posters/soccer_ai_demo.jpg',
      project: 'Analítica deportiva',
      title: 'Match intelligence — Mundial 2026',
      caption: 'Ambos equipos, árbitros y balón rastreados desde la transmisión — velocidad por jugador, posesión en vivo y un mapa táctico que sobrevive a los cortes de cámara.',
    },
    {
      src: './docintel_demo.mp4',
      poster: './posters/docintel_demo.jpg',
      project: 'DocIntel',
      title: 'Verificación documental con umbral de confianza',
      caption: 'Una factura que no cuadra: el modelo leyó cada número correctamente y la validación cruzada bloqueó la aprobación igual. Pasa el mouse por un campo para ver de dónde salió.',
    },
  ],
  systems: [
    {
      key: 'agents-es',
      badge: 'Agentes LLM',
      badgeType: 'agents',
      title: 'Motor de Decisiones Multiagente — Promeat AI',
      desc: 'Agentes que leen la planta y actúan sobre ella. Los datos vivos del ERP y de operación entran en una máquina de estados LangGraph, pasan por agentes de clasificación, validación y decisión, y se escriben de vuelta solos o caen en una cola humana — con traza en cada paso.',
      image: './diagrams/arch_promeat.svg',
      alt: 'Arquitectura: el ERP del cliente, los sistemas de planta y los eventos de visión alimentan una API de eventos en FastAPI y un event bus; un grafo de agentes LangGraph ejecuta clasificación, validación y decisión con recuperación RAG sobre PostgreSQL; las decisiones con confianza alta se escriben solas en los sistemas del cliente y las de baja confianza van a un operador de planta; trazas Langfuse y pipelines de evals observan cada nodo.',
      footer: '// Corre bajo el tráfico de plantas de JBS y Marfrig — 25.000+ animales contados al día, sin fallback manual',
      tags: ['LangGraph', 'AutoGen', 'RAG', 'Langfuse', 'FastAPI', 'PostgreSQL'],
    },
    {
      key: 'auto-es',
      badge: 'Automatización',
      badgeType: 'auto',
      title: 'Capa de Automatización LLM — ShopGuard AI',
      desc: 'La capa de lenguaje sobre la visión en tiempo real. Las detecciones del edge llegan como eventos, se arman en contexto y salen como una alerta sobre la que un operador puede actuar en segundos — o como un resumen que puede esperar.',
      image: './diagrams/arch_shopguard.svg',
      alt: 'Arquitectura: cámaras RTSP por tienda alimentan YOLO11 + TensorRT con GStreamer en hardware edge NVIDIA con latencia sub-segundo; las detecciones llegan a una ingesta FastAPI sobre GCP y Oracle Cloud híbridos, guardando clips para el ciclo de reentrenamiento; una capa de lenguaje con LangChain y AutoGen arma el contexto y GPT-4 escribe la alerta y el resumen; el enrutamiento por severidad escala de inmediato o agrupa en un resumen para el dashboard React del operador.',
      footer: '// 90% menos hurtos consumados en producción — construido y operado por un solo ingeniero',
      tags: ['LangChain', 'AutoGen', 'GPT-4', 'YOLO11', 'TensorRT', 'FastAPI'],
    },
    {
      key: 'fullstack-es',
      badge: 'Full-Stack',
      badgeType: 'fullstack',
      title: 'Arquitectura de Producto Full-Stack',
      desc: 'El stack que construyo alrededor de cada modelo. Dashboards React tipados sobre FastAPI, servicios event-driven que escalan solos, inferencia GPU donde corresponde, y el despliegue y on-call que lo mantienen vivo — un ingeniero, sin handoffs.',
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
        'Movimiento interno dentro del grupo Pix Force, desde Promeat AI. Owner del refinamiento de Pix Safety — modelos re-entrenados 30% más precisos y 45% más rápidos; costos cloud −37% en el primer mes (instancias reservadas, Python→C++, clusters redimensionados).',
    },
    {
      period: 'Ene 2026 – Jun 2026',
      title: 'Full-Stack Software Engineer',
      company: 'Promeat AI · grupo Pix Force',
      description:
        'Plataforma de visión para JBS y Marfrig — 25.000+ animales/día en 4 plantas, microservicios event-driven, automatización LLM multiagente, estimación de peso en tiempo real al 98,5%.',
    },
    {
      period: 'Ago 2025 – Dic 2025',
      title: 'Founder & CTO',
      company: 'ShopGuard AI',
      description:
        'Plataforma de detección de hurtos en retail: 150 tiendas, 4.500+ streams de cámara, 90% menos hurtos consumados. Acelerada por Oracle / Google / Antler. Único ingeniero, cero handoffs.',
    },
    {
      period: 'Ene 2024 – Jun 2025',
      title: 'Co-Founder & Tech Lead',
      company: 'Vision Labs',
      description:
        'Co-fundé una empresa de IA y visión computacional — productos de visión de piloto a producción para clientes B2B enterprise; automatización GPT-4 + LangChain en producción.',
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
        '4 productos industriales de IA — conteo de personas, desempeño de empleados, robo de vehículos, analítica de muelles — más inspección de roscado de tubos.',
    },
    {
      period: '2021 – Dic 2023',
      title: 'Freelance Software Engineer',
      company: 'Independent',
      description:
        'Entregas full-stack y de visión computacional en solitario — del análisis de rendimiento de jugadores en video de partidos a la inspección de paneles solares con drones.',
    },
  ],
};

const pt: Content = {
  ui: {
    nav: { work: 'Trabalho', architecture: 'Arquitetura', skills: 'Stack', experience: 'Experiência', contact: 'Contato', cv: 'Baixar CV' },
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
      sub: 'Cada bloco é um caso completo — o que faz, o que mudou, o vídeo dele rodando e a arquitetura por baixo. Tudo chegou a usuários reais, sob tráfego de produção.',
      videos: 'Veja funcionando',
      architecture: 'Arquitetura',
      zoom: 'abrir em tamanho real',
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
      sub: 'De ponta a ponta em toda a stack — visão computacional e agentes LLM, o produto Python/FastAPI + React em volta deles, e a nuvem onde rodam. Uso diário intensivo de desenvolvimento assistido por IA (Claude Code, Codex, Cursor).',
    },
    experience: {
      eyebrow: 'Trajetória',
      heading: 'Experiência',
      sub: 'De freelancer a founder a sênior IC — cada etapa chegou à produção, com ownership de ponta a ponta.',
    },
    contact: {
      heading: 'Vamos construir algo que chegue à produção.',
      sub: 'Aberto a posições remotas no mundo todo — engenharia de IA, visão computacional e produtos de IA full-stack. Cidadão italiano (UE), inglês fluente, pronto para trabalho 100% async.',
      cv: 'Baixar CV',
    },
    footer: { cv: 'CV (PDF)', tagline: 'feito com React + TypeScript + Vite, hospedado no GitHub Pages.' },
  },
  stats: [
    { num: '25.000+', label: 'animais contados por dia — plantas da JBS e Marfrig' },
    { num: '150 lojas', label: '4.500+ streams de câmera — footprint da ShopGuard AI' },
    { num: '90%', label: 'menos furtos consumados nas lojas atendidas' },
    { num: '−37%', label: 'de custo cloud no primeiro mês — Pix Safety' },
  ],
  projects: [
    {
      title: 'ShopGuard AI — Detecção de Furtos no Varejo',
      role: 'Founder & CTO · 2025',
      pill: { label: '150 lojas', type: 'flagship' },
      description:
        'Plataforma de segurança para o varejo nativa de IA, construída solo do edge à UI: YOLO11 + GStreamer + TensorRT com latência sub-segundo em hardware edge NVIDIA, backend híbrido GCP / Oracle Cloud e dashboards de operador em React. Acelerada por Oracle / Google / Antler.',
      impact: '150 lojas · 4.500+ streams de câmera · 90% menos furtos consumados',
      tags: ['YOLO11', 'TensorRT', 'GStreamer', 'FastAPI', 'React', 'GCP'],
    },
    {
      title: 'Pix Safety — Otimização de Modelos e Cloud',
      role: 'Senior AI Engineer III · Pix Force · 2026–atual',
      pill: { label: '+30% acurácia', type: 'live' },
      description:
        'Ownership contínuo do refinamento do Pix Safety: re-treinei modelos superdimensionados em modelos menores e mais bem ajustados, e refiz a economia do serving — reserved instances, clusters redimensionados e migrações Python→C++ nos hot paths.',
      impact: '30% mais preciso · inferência 45% mais rápida · custos de cloud −37% no primeiro mês',
      tags: ['PyTorch', 'C++', 'TensorRT', 'MLOps', 'Cloud Cost'],
    },
    {
      title: 'Plataforma Industrial de Visão — Promeat AI',
      role: 'Full-Stack Engineer · 2026',
      pill: { label: 'Em produção', type: 'live' },
      description:
        'Plataforma de visão computacional para JBS e Marfrig. Ingestão FFmpeg sobre câmeras heterogêneas de planta, pré-processamento com OpenCV, microsserviços orientados a eventos e dashboards React — a fonte de verdade operacional da planta, sem fallback manual.',
      impact: '25.000+ animais contados por dia · 4 plantas (2 JBS, 2 Marfrig)',
      tags: ['Python', 'FFmpeg', 'OpenCV', 'PyTorch', 'Microservices'],
    },
    {
      title: 'Produtos Industriais de Visão — Pix Force',
      role: 'Full-Stack AI Engineer · 2024',
      pill: { label: '4 produtos', type: 'live' },
      description:
        'Quatro produtos de IA em produção para grandes clientes industriais — contagem de pessoas (YOLOv8 + ByteTrack), performance de funcionários, detecção de furto de veículos, tempo de permanência em docas — além de inspeção automatizada de rosqueamento de tubos e um contrato governamental de contagem de multidões por drone. Inferência edge em Jetson / Raspberry Pi.',
      impact: '5.000+ imagens anotadas · 4 produtos entregues · contagem de multidões com margem de erro inferior a 5%',
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
      title: 'Soccer AI — Match Intelligence',
      role: 'Visão computacional · imagens da Copa do Mundo 2026',
      pill: { label: 'Analytics esportivo', type: 'live' },
      description:
        'Análise tática só a partir da transmissão do jogo: os dois times, os árbitros e a bola rastreados quadro a quadro, cada jogador com sua velocidade ao vivo, posse de bola calculada em tempo real e cada posição projetada num mapa tático 2D que se recalcula quando a transmissão troca de câmera.',
      impact: 'Jogadores · árbitros · bola rastreados · km/h por jogador · posse ao vivo · mapa tático por homografia',
      tags: ['YOLO', 'Multi-Object Tracking', 'Homografia', 'OpenCV', 'PyTorch', 'Classificação de times'],
    },
    {
      title: 'DocIntel — Verificação de Documentos com Revisão Humana',
      role: 'IA aplicada · código aberto · 2026',
      pill: { label: 'Código aberto', type: 'live' },
      description:
        'O fluxo que um provedor de verificação documental roda: ler o documento, provar de onde saiu cada valor, decidir sozinho só quando tem certeza e mandar o resto para uma pessoa. Um modelo de visão-linguagem local (Qwen2.5-VL via Ollama) extrai os valores, o OCR ancora cada um na página, e a validação cruzada pega o que um score de confiança não pega: uma nota cujo subtotal e imposto contradizem o próprio total fica bloqueada mesmo que o modelo tenha lido os três números perfeitamente.',
      impact: 'Discrepâncias roteadas para revisão humana · escaped errors medidos (errados E auto-aprovados) · calibração de confiança e gate de regressão · roda on-device, sem custo por documento',
      tags: ['Qwen2.5-VL', 'Ollama', 'Pydantic', 'FastAPI', 'React', 'LLM Evals'],
      repo: 'https://github.com/Rasantis/docintel',
    },
  ],
  demos: [
    {
      src: './weight_estimation_demo.mp4',
      poster: './posters/weight_estimation_demo.jpg',
      project: 'Promeat AI',
      title: 'Estimativa de peso em tempo real — 98,5%',
      caption: 'Segmentação de instâncias + previsão de peso por ave em vídeo ao vivo do galpão.',
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
      src: './vehicle_counting_demo.mp4',
      poster: './posters/vehicle_counting_demo.jpg',
      project: 'Analítica de tráfego',
      title: 'Contagem de veículos e fluxo de tráfego',
      caption: 'Contagens de entrada / saída multizona e tracking em uma câmera de tráfego ao vivo.',
    },
    {
      src: './soccer_ai_demo.mp4',
      poster: './posters/soccer_ai_demo.jpg',
      project: 'Analytics esportivo',
      title: 'Match intelligence — Copa do Mundo 2026',
      caption: 'Os dois times, árbitros e bola rastreados a partir da transmissão — velocidade por jogador, posse ao vivo e um mapa tático que sobrevive aos cortes de câmera.',
    },
    {
      src: './docintel_demo.mp4',
      poster: './posters/docintel_demo.jpg',
      project: 'DocIntel',
      title: 'Verificação documental com limiar de confiança',
      caption: 'Uma nota que não fecha: o modelo leu cada número corretamente e a validação cruzada bloqueou a aprovação mesmo assim. Passe o mouse num campo para ver de onde ele saiu.',
    },
  ],
  systems: [
    {
      key: 'agents-pt',
      badge: 'Agentes LLM',
      badgeType: 'agents',
      title: 'Motor de Decisões Multiagente — Promeat AI',
      desc: 'Agentes que leem o chão de fábrica e agem sobre ele. Dados vivos do ERP e da operação entram numa máquina de estados LangGraph, passam por agentes de classificação, validação e decisão, e voltam escritos sozinhos ou caem numa fila humana — com trace em cada passo.',
      image: './diagrams/arch_promeat.svg',
      alt: 'Arquitetura: ERP do cliente, sistemas da planta e eventos de visão alimentam uma API de eventos em FastAPI e um event bus; um grafo de agentes LangGraph roda classificação, validação e decisão com recuperação RAG sobre PostgreSQL; decisões com confiança alta são escritas sozinhas nos sistemas do cliente e as de baixa confiança vão para um operador da planta; traces Langfuse e pipelines de eval observam cada nó.',
      footer: '// Roda sob o tráfego das plantas da JBS e Marfrig — 25.000+ animais contados por dia, sem fallback manual',
      tags: ['LangGraph', 'AutoGen', 'RAG', 'Langfuse', 'FastAPI', 'PostgreSQL'],
    },
    {
      key: 'auto-pt',
      badge: 'Automação',
      badgeType: 'auto',
      title: 'Camada de Automação LLM — ShopGuard AI',
      desc: 'A camada de linguagem sobre a visão em tempo real. Detecções do edge chegam como eventos, são montadas em contexto e saem como um alerta sobre o qual o operador age em segundos — ou como um resumo que pode esperar.',
      image: './diagrams/arch_shopguard.svg',
      alt: 'Arquitetura: câmeras RTSP por loja alimentam YOLO11 + TensorRT com GStreamer em hardware edge NVIDIA com latência sub-segundo; as detecções chegam a uma ingestão FastAPI sobre GCP e Oracle Cloud híbridos, guardando clipes para o ciclo de re-treino; uma camada de linguagem com LangChain e AutoGen monta o contexto e o GPT-4 escreve o alerta e o resumo; o roteamento por severidade escala na hora ou agrupa num resumo para o dashboard React do operador.',
      footer: '// 90% menos furtos consumados em produção — construído e operado por um engenheiro só',
      tags: ['LangChain', 'AutoGen', 'GPT-4', 'YOLO11', 'TensorRT', 'FastAPI'],
    },
    {
      key: 'fullstack-pt',
      badge: 'Full-Stack',
      badgeType: 'fullstack',
      title: 'Arquitetura de Produto Full-Stack',
      desc: 'A stack que eu construo em volta de cada modelo. Dashboards React tipados sobre FastAPI, serviços event-driven que escalam sozinhos, inferência em GPU onde é devido, e o deploy e o on-call que mantêm tudo de pé — um engenheiro, sem handoffs.',
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
        'Movimento interno dentro do grupo Pix Force, vindo da Promeat AI. Dono do refinamento do Pix Safety — modelos re-treinados 30% mais precisos e 45% mais rápidos; custos de cloud −37% no primeiro mês (reserved instances, Python→C++, clusters redimensionados).',
    },
    {
      period: 'Jan 2026 – Jun 2026',
      title: 'Full-Stack Software Engineer',
      company: 'Promeat AI · grupo Pix Force',
      description:
        'Plataforma de visão para JBS e Marfrig — 25.000+ animais/dia em 4 plantas, microsserviços orientados a eventos, automação LLM multiagente, estimativa de peso em tempo real a 98,5%.',
    },
    {
      period: 'Ago 2025 – Dez 2025',
      title: 'Founder & CTO',
      company: 'ShopGuard AI',
      description:
        'Plataforma de detecção de furtos no varejo: 150 lojas, 4.500+ streams de câmera, 90% menos furtos consumados. Acelerada por Oracle / Google / Antler. Único engenheiro, zero handoffs.',
    },
    {
      period: 'Jan 2024 – Jun 2025',
      title: 'Co-Founder & Tech Lead',
      company: 'Vision Labs',
      description:
        'Co-fundei uma empresa de IA e visão computacional — produtos de visão do piloto à produção para clientes B2B enterprise; automação GPT-4 + LangChain em produção.',
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
        '4 produtos industriais de IA — contagem de pessoas, performance de funcionários, furto de veículos, analítica de docas — além de inspeção de rosqueamento de tubos.',
    },
    {
      period: '2021 – Dez 2023',
      title: 'Freelance Software Engineer',
      company: 'Independent',
      description:
        'Entregas full-stack e de visão computacional solo — da análise de desempenho de jogadores em vídeos de partidas à inspeção de painéis solares com drones.',
    },
  ],
};

export const content: Record<Lang, Content> = { en, es, pt };
