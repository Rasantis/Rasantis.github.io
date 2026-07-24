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

export type FlowAccent = 'in' | 'agent' | 'exec' | 'ui' | 'store';

/** One lane of the architecture blueprint — a real pipeline stage with its components. */
export interface FlowStage {
  idx: string;
  name: string;
  chips: string[];
  note: string;
  accent: FlowAccent;
}

/** The decision fork: where the system chooses between acting alone and asking a human. */
export interface FlowGate {
  label: string;
  auto: string;
  human: string;
  caption: string;
}

/** Concerns that span every stage (observability, state, runtime). */
export interface CrossLayer {
  label: string;
  items: string[];
}

export interface SystemFlow {
  key: string;
  badge: string;
  badgeType: 'agents' | 'auto' | 'fullstack';
  title: string;
  desc: string;
  stages: FlowStage[];
  gate?: FlowGate;
  layers: CrossLayer[];
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
  nav: { projects: string; demos: string; systems: string; skills: string; experience: string; contact: string; cv: string };
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
  projects: { eyebrow: string; heading: string; sub: string };
  demos: { eyebrow: string; heading: string; sub: string };
  systems: { eyebrow: string; heading: string; sub: string };
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

const en: Content = {
  ui: {
    nav: { projects: 'Projects', demos: 'Demos', systems: 'Systems', skills: 'Skills', experience: 'Experience', contact: 'Contact', cv: 'Download CV' },
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
    projects: {
      eyebrow: 'Selected Work',
      heading: 'Projects that run in production',
      sub: 'Not demos. Every system below shipped to real users and ran — or still runs — under 24/7 production traffic.',
    },
    demos: {
      eyebrow: 'See It Running',
      heading: 'Computer vision, live',
      sub: 'Real output from shipped vision pipelines — weight estimation, retail theft detection, industrial inspection, and crowd / vehicle counting. Click any clip to play.',
    },
    systems: {
      eyebrow: 'Beyond Vision',
      heading: 'Agents, automation & full-stack',
      sub: 'Vision is where I started — but I ship the whole product around it: LLM agents that make autonomous decisions, automation layers, and the React + FastAPI stack underneath. Real architectures, in production.',
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
      title: 'Real-Time Weight Estimation',
      role: 'Computer Vision · Promeat client project',
      pill: { label: '98.5% accuracy', type: 'live' },
      description:
        'Vision-based regression over live camera streams predicting animal weight in real time, integrated into the production platform. Shipped above the client’s 95% accuracy requirement.',
      impact: '98.5% accuracy in real time — beat the 95% client target',
      tags: ['PyTorch', 'YOLO11', 'OpenCV', 'Real-Time Inference'],
    },
    {
      title: 'Multi-Agent Decision Engine',
      role: 'Applied AI · Promeat AI',
      pill: { label: 'LLM Agents', type: 'live' },
      description:
        'LangGraph multi-agent system pulling live ERP/plant data, routing it through classification / validation / decision sub-agents, and executing or escalating to a human on confidence. Full Langfuse trace observability.',
      impact: 'Autonomous decisions on production-critical workflows, with HITL + eval-driven iteration',
      tags: ['LangGraph', 'AutoGen', 'Langfuse', 'RAG', 'FastAPI'],
    },
    {
      title: 'Drone Crowd Density Monitoring',
      role: 'Computer Vision · Government Contract',
      pill: { label: 'Government', type: 'gov' },
      description:
        'Real-time crowd counting from aerial drone footage at large public events — detection tuned for aerial views, motion blur and variable lighting, under hard latency and reliability constraints.',
      impact: 'Thousands counted simultaneously · margin of error under 5%',
      tags: ['PyTorch', 'CNNs', 'OpenCV', 'Edge GPU'],
    },
    {
      title: 'Industrial Vision Products — Pix Force',
      role: 'Full-Stack AI Engineer · 2024',
      pill: { label: '4 products', type: 'live' },
      description:
        'Four production AI products for large industrial clients — people counting (YOLOv8 + ByteTrack), employee performance, vehicle theft detection, dock dwell-time — plus automated pipe-threading inspection. Edge inference on Jetson / Raspberry Pi.',
      impact: '5,000+ annotated images · 4 products shipped · on-site delivery',
      tags: ['YOLOv8', 'ByteTrack', 'Jetson', 'FastAPI'],
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
  ],
  systems: [
    {
      key: 'agents-en',
      badge: 'LLM Agents',
      badgeType: 'agents',
      title: 'Multi-Agent Decision Engine — Promeat AI',
      desc: 'Agents that read the plant floor and act on it. Live ERP and operational data flows into a LangGraph state machine, gets classified, validated and decided by specialized agents, and either writes back autonomously or lands in a human queue — every step traced.',
      stages: [
        {
          idx: '01',
          name: 'Sources',
          chips: ['Client ERP', 'Plant operational systems', 'Vision event stream'],
          note: 'high-frequency events, no manual entry',
          accent: 'in',
        },
        {
          idx: '02',
          name: 'Ingest',
          chips: ['FastAPI endpoints', 'Event-driven microservices', 'Schema normalization'],
          note: 'one contract for heterogeneous sources',
          accent: 'in',
        },
        {
          idx: '03',
          name: 'Agent graph',
          chips: ['LangGraph orchestration', 'Classification agent', 'Validation agent', 'Decision agent', 'RAG over plant context'],
          note: 'AutoGen multi-agent · prompt + eval iteration',
          accent: 'agent',
        },
        {
          idx: '04',
          name: 'Act',
          chips: ['Write-back to client systems', 'Operator notification', 'Audit record'],
          note: 'autonomous when the agents agree',
          accent: 'exec',
        },
      ],
      gate: {
        label: 'confidence gate',
        auto: 'execute autonomously',
        human: 'human-in-the-loop review',
        caption: 'Below threshold, the decision goes to a person instead of to production.',
      },
      layers: [
        { label: 'Observability', items: ['Langfuse traces per node', 'multi-step agent state', 'eval pipelines on regressions'] },
        { label: 'Serving & state', items: ['FastAPI services', 'PostgreSQL', 'Docker · GCP'] },
      ],
      footer: '// Runs under JBS & Marfrig plant traffic — 25,000+ animals counted daily, zero manual fallback',
      tags: ['LangGraph', 'AutoGen', 'RAG', 'Langfuse', 'FastAPI', 'PostgreSQL'],
    },
    {
      key: 'auto-en',
      badge: 'Automation',
      badgeType: 'auto',
      title: 'LLM Automation Layer — ShopGuard AI',
      desc: 'The language layer on top of real-time vision. Edge detections arrive as events, get assembled into context, and come out as an alert a store operator can act on in seconds — or as a summary that can wait.',
      stages: [
        {
          idx: '01',
          name: 'Edge',
          chips: ['YOLO11 + TensorRT', 'GStreamer multi-camera', 'NVIDIA edge hardware'],
          note: 'sub-second latency, per store',
          accent: 'in',
        },
        {
          idx: '02',
          name: 'Event layer',
          chips: ['Detection events → cloud', 'FastAPI ingest', 'Hybrid GCP / Oracle Cloud'],
          note: '24/7 production traffic',
          accent: 'in',
        },
        {
          idx: '03',
          name: 'Language layer',
          chips: ['Context assembly', 'LangChain + AutoGen', 'GPT-4 alert & summary'],
          note: 'what happened, where, how sure',
          accent: 'agent',
        },
        {
          idx: '04',
          name: 'Delivery',
          chips: ['Escalation workflow', 'React operator dashboard', 'Client integrations'],
          note: 'operator intervenes before the loss',
          accent: 'ui',
        },
      ],
      gate: {
        label: 'severity routing',
        auto: 'escalate now',
        human: 'batch into summary',
        caption: 'Not every detection deserves an interruption — routing decides which ones do.',
      },
      layers: [
        { label: 'Runtime', items: ['150 stores · 4,500+ camera streams', 'hybrid edge/cloud', 'remote debugging'] },
        { label: 'Product', items: ['FastAPI services', 'React dashboards', 'model retraining loop'] },
      ],
      footer: '// 90% fewer completed thefts in production — built and operated by one engineer',
      tags: ['LangChain', 'AutoGen', 'GPT-4', 'YOLO11', 'TensorRT', 'FastAPI'],
    },
    {
      key: 'fullstack-en',
      badge: 'Full-Stack',
      badgeType: 'fullstack',
      title: 'Full-Stack Product Architecture',
      desc: 'The stack I build around every model. Typed React dashboards over FastAPI, event-driven services that scale on their own, GPU inference where it belongs, and the deployment and on-call that keep it alive — one engineer, no handoffs.',
      stages: [
        {
          idx: '01',
          name: 'Client',
          chips: ['React + TypeScript', 'Operator dashboards', 'Live WebSocket updates'],
          note: 'built for people watching a floor, not a report',
          accent: 'ui',
        },
        {
          idx: '02',
          name: 'API',
          chips: ['FastAPI (REST)', 'WebSocket channels', 'Auth & validation'],
          note: 'typed contracts between every layer',
          accent: 'agent',
        },
        {
          idx: '03',
          name: 'Services',
          chips: ['Event-driven microservices', 'GPU inference service', 'Automation workers'],
          note: 'modular — each scales on its own',
          accent: 'agent',
        },
        {
          idx: '04',
          name: 'Data & platform',
          chips: ['PostgreSQL / Supabase', 'Media & artifact storage', 'Docker · CI/CD', 'GCP · AWS · Oracle Cloud'],
          note: 'deploy, observe, stay on call',
          accent: 'store',
        },
      ],
      layers: [
        { label: 'Cross-cutting', items: ['logging & observability', 'CI/CD on every merge', 'cost and latency tuning'] },
      ],
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
    nav: { projects: 'Proyectos', demos: 'Demos', systems: 'Sistemas', skills: 'Stack', experience: 'Experiencia', contact: 'Contacto', cv: 'Descargar CV' },
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
    projects: {
      eyebrow: 'Trabajo seleccionado',
      heading: 'Proyectos que corren en producción',
      sub: 'No son demos: cada sistema de esta lista llegó a usuarios reales y corrió — o sigue corriendo — bajo tráfico de producción 24/7.',
    },
    demos: {
      eyebrow: 'Míralo funcionando',
      heading: 'Visión computacional, en vivo',
      sub: 'Salida real de pipelines de visión en producción — estimación de peso, detección de hurtos en retail, inspección industrial y conteo de multitudes / vehículos. Haz clic en cualquier clip para reproducirlo.',
    },
    systems: {
      eyebrow: 'Más allá de la visión',
      heading: 'Agentes, automatización y full-stack',
      sub: 'La visión fue mi punto de partida — pero construyo todo el producto a su alrededor: agentes LLM que toman decisiones autónomas, capas de automatización y el stack React + FastAPI por debajo. Arquitecturas reales, en producción.',
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
      title: 'Estimación de peso en tiempo real',
      role: 'Visión computacional · proyecto para cliente de Promeat',
      pill: { label: '98,5% precisión', type: 'live' },
      description:
        'Regresión basada en visión sobre streams de cámara en vivo que predice el peso del animal en tiempo real, integrada en la plataforma de producción. Entregada por encima del requisito de 95% del cliente.',
      impact: '98,5% de precisión en tiempo real — superó la meta de 95% del cliente',
      tags: ['PyTorch', 'YOLO11', 'OpenCV', 'Real-Time Inference'],
    },
    {
      title: 'Motor de decisiones multiagente',
      role: 'IA aplicada · Promeat AI',
      pill: { label: 'Agentes LLM', type: 'live' },
      description:
        'Sistema multiagente en LangGraph que consume datos vivos de ERP/planta, los enruta por subagentes de clasificación / validación / decisión y ejecuta o escala a un humano según la confianza. Observabilidad total con trazas en Langfuse.',
      impact: 'Decisiones autónomas en flujos críticos de producción, con HITL e iteración guiada por evals',
      tags: ['LangGraph', 'AutoGen', 'Langfuse', 'RAG', 'FastAPI'],
    },
    {
      title: 'Conteo de multitudes por dron',
      role: 'Visión computacional · contrato gubernamental',
      pill: { label: 'Gobierno', type: 'gov' },
      description:
        'Conteo de personas en tiempo real desde video aéreo de dron en grandes eventos públicos — detección ajustada a vistas aéreas, motion blur e iluminación variable, bajo restricciones duras de latencia y confiabilidad.',
      impact: 'Miles contados simultáneamente · margen de error inferior al 5%',
      tags: ['PyTorch', 'CNNs', 'OpenCV', 'Edge GPU'],
    },
    {
      title: 'Productos industriales de visión — Pix Force',
      role: 'Full-Stack AI Engineer · 2024',
      pill: { label: '4 productos', type: 'live' },
      description:
        'Cuatro productos de IA en producción para grandes clientes industriales — conteo de personas (YOLOv8 + ByteTrack), desempeño de empleados, detección de robo de vehículos, tiempo de permanencia en muelles — más inspección automatizada de roscado de tubos. Inferencia edge en Jetson / Raspberry Pi.',
      impact: '5.000+ imágenes anotadas · 4 productos entregados · delivery on-site',
      tags: ['YOLOv8', 'ByteTrack', 'Jetson', 'FastAPI'],
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
  ],
  systems: [
    {
      key: 'agents-es',
      badge: 'Agentes LLM',
      badgeType: 'agents',
      title: 'Motor de Decisiones Multiagente — Promeat AI',
      desc: 'Agentes que leen la planta y actúan sobre ella. Los datos vivos del ERP y de operación entran en una máquina de estados LangGraph, pasan por agentes de clasificación, validación y decisión, y se escriben de vuelta solos o caen en una cola humana — con traza en cada paso.',
      stages: [
        {
          idx: '01',
          name: 'Fuentes',
          chips: ['ERP del cliente', 'Sistemas de planta', 'Eventos de visión'],
          note: 'eventos de alta frecuencia, sin carga manual',
          accent: 'in',
        },
        {
          idx: '02',
          name: 'Ingesta',
          chips: ['Endpoints FastAPI', 'Microservicios event-driven', 'Normalización de esquema'],
          note: 'un contrato para fuentes heterogéneas',
          accent: 'in',
        },
        {
          idx: '03',
          name: 'Grafo de agentes',
          chips: ['Orquestación LangGraph', 'Agente de clasificación', 'Agente de validación', 'Agente de decisión', 'RAG sobre contexto de planta'],
          note: 'multiagente AutoGen · iteración de prompts y evals',
          accent: 'agent',
        },
        {
          idx: '04',
          name: 'Actuar',
          chips: ['Escritura en sistemas del cliente', 'Notificación al operador', 'Registro de auditoría'],
          note: 'autónomo cuando los agentes coinciden',
          accent: 'exec',
        },
      ],
      gate: {
        label: 'umbral de confianza',
        auto: 'ejecutar de forma autónoma',
        human: 'revisión human-in-the-loop',
        caption: 'Por debajo del umbral, la decisión va a una persona en vez de a producción.',
      },
      layers: [
        { label: 'Observabilidad', items: ['trazas Langfuse por nodo', 'estado multi-paso del agente', 'evals ante regresiones'] },
        { label: 'Serving y estado', items: ['servicios FastAPI', 'PostgreSQL', 'Docker · GCP'] },
      ],
      footer: '// Corre bajo el tráfico de plantas de JBS y Marfrig — 25.000+ animales contados al día, sin fallback manual',
      tags: ['LangGraph', 'AutoGen', 'RAG', 'Langfuse', 'FastAPI', 'PostgreSQL'],
    },
    {
      key: 'auto-es',
      badge: 'Automatización',
      badgeType: 'auto',
      title: 'Capa de Automatización LLM — ShopGuard AI',
      desc: 'La capa de lenguaje sobre la visión en tiempo real. Las detecciones del edge llegan como eventos, se arman en contexto y salen como una alerta sobre la que un operador puede actuar en segundos — o como un resumen que puede esperar.',
      stages: [
        {
          idx: '01',
          name: 'Edge',
          chips: ['YOLO11 + TensorRT', 'GStreamer multi-cámara', 'Hardware edge NVIDIA'],
          note: 'latencia sub-segundo, por tienda',
          accent: 'in',
        },
        {
          idx: '02',
          name: 'Capa de eventos',
          chips: ['Detecciones → nube', 'Ingesta FastAPI', 'Híbrido GCP / Oracle Cloud'],
          note: 'tráfico de producción 24/7',
          accent: 'in',
        },
        {
          idx: '03',
          name: 'Capa de lenguaje',
          chips: ['Armado de contexto', 'LangChain + AutoGen', 'Alerta y resumen GPT-4'],
          note: 'qué pasó, dónde, con cuánta certeza',
          accent: 'agent',
        },
        {
          idx: '04',
          name: 'Entrega',
          chips: ['Flujo de escalamiento', 'Dashboard React de operador', 'Integraciones con el cliente'],
          note: 'el operador interviene antes de la pérdida',
          accent: 'ui',
        },
      ],
      gate: {
        label: 'enrutamiento por severidad',
        auto: 'escalar ahora',
        human: 'agrupar en resumen',
        caption: 'No toda detección merece una interrupción — el enrutamiento decide cuáles sí.',
      },
      layers: [
        { label: 'Runtime', items: ['150 tiendas · 4.500+ streams', 'edge/nube híbrido', 'depuración remota'] },
        { label: 'Producto', items: ['servicios FastAPI', 'dashboards React', 'ciclo de reentrenamiento'] },
      ],
      footer: '// 90% menos hurtos consumados en producción — construido y operado por un solo ingeniero',
      tags: ['LangChain', 'AutoGen', 'GPT-4', 'YOLO11', 'TensorRT', 'FastAPI'],
    },
    {
      key: 'fullstack-es',
      badge: 'Full-Stack',
      badgeType: 'fullstack',
      title: 'Arquitectura de Producto Full-Stack',
      desc: 'El stack que construyo alrededor de cada modelo. Dashboards React tipados sobre FastAPI, servicios event-driven que escalan solos, inferencia GPU donde corresponde, y el despliegue y on-call que lo mantienen vivo — un ingeniero, sin handoffs.',
      stages: [
        {
          idx: '01',
          name: 'Cliente',
          chips: ['React + TypeScript', 'Dashboards de operador', 'Actualizaciones WebSocket'],
          note: 'para gente que mira una operación, no un reporte',
          accent: 'ui',
        },
        {
          idx: '02',
          name: 'API',
          chips: ['FastAPI (REST)', 'Canales WebSocket', 'Auth y validación'],
          note: 'contratos tipados entre cada capa',
          accent: 'agent',
        },
        {
          idx: '03',
          name: 'Servicios',
          chips: ['Microservicios event-driven', 'Servicio de inferencia GPU', 'Workers de automatización'],
          note: 'modular — cada uno escala por su cuenta',
          accent: 'agent',
        },
        {
          idx: '04',
          name: 'Datos y plataforma',
          chips: ['PostgreSQL / Supabase', 'Almacenamiento de media', 'Docker · CI/CD', 'GCP · AWS · Oracle Cloud'],
          note: 'desplegar, observar, seguir de guardia',
          accent: 'store',
        },
      ],
      layers: [
        { label: 'Transversal', items: ['logging y observabilidad', 'CI/CD en cada merge', 'ajuste de costo y latencia'] },
      ],
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
    nav: { projects: 'Projetos', demos: 'Demos', systems: 'Sistemas', skills: 'Stack', experience: 'Experiência', contact: 'Contato', cv: 'Baixar CV' },
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
    projects: {
      eyebrow: 'Trabalhos selecionados',
      heading: 'Projetos que rodam em produção',
      sub: 'Não são demos: cada sistema desta lista chegou a usuários reais e rodou — ou ainda roda — sob tráfego de produção 24/7.',
    },
    demos: {
      eyebrow: 'Veja funcionando',
      heading: 'Visão computacional, ao vivo',
      sub: 'Saída real de pipelines de visão em produção — estimativa de peso, detecção de furtos no varejo, inspeção industrial e contagem de multidões / veículos. Clique em qualquer clipe para reproduzir.',
    },
    systems: {
      eyebrow: 'Além da visão',
      heading: 'Agentes, automação e full-stack',
      sub: 'A visão foi meu ponto de partida — mas eu construo o produto inteiro em volta dela: agentes LLM que tomam decisões autônomas, camadas de automação e a stack React + FastAPI por baixo. Arquiteturas reais, em produção.',
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
      title: 'Estimativa de Peso em Tempo Real',
      role: 'Visão computacional · projeto para cliente da Promeat',
      pill: { label: '98,5% acurácia', type: 'live' },
      description:
        'Regressão baseada em visão sobre streams de câmera ao vivo prevendo o peso do animal em tempo real, integrada à plataforma de produção. Entregue acima do requisito de 95% do cliente.',
      impact: '98,5% de acurácia em tempo real — superou a meta de 95% do cliente',
      tags: ['PyTorch', 'YOLO11', 'OpenCV', 'Real-Time Inference'],
    },
    {
      title: 'Motor de Decisões Multiagente',
      role: 'IA aplicada · Promeat AI',
      pill: { label: 'Agentes LLM', type: 'live' },
      description:
        'Sistema multiagente em LangGraph que consome dados vivos de ERP/planta, roteia por subagentes de classificação / validação / decisão e executa ou escala para um humano conforme a confiança. Observabilidade total com traces no Langfuse.',
      impact: 'Decisões autônomas em fluxos críticos de produção, com HITL e iteração guiada por evals',
      tags: ['LangGraph', 'AutoGen', 'Langfuse', 'RAG', 'FastAPI'],
    },
    {
      title: 'Contagem de Multidões por Drone',
      role: 'Visão computacional · Contrato governamental',
      pill: { label: 'Governo', type: 'gov' },
      description:
        'Contagem de pessoas em tempo real a partir de vídeo aéreo de drone em grandes eventos públicos — detecção ajustada para vistas aéreas, motion blur e iluminação variável, sob restrições duras de latência e confiabilidade.',
      impact: 'Milhares contados simultaneamente · margem de erro inferior a 5%',
      tags: ['PyTorch', 'CNNs', 'OpenCV', 'Edge GPU'],
    },
    {
      title: 'Produtos Industriais de Visão — Pix Force',
      role: 'Full-Stack AI Engineer · 2024',
      pill: { label: '4 produtos', type: 'live' },
      description:
        'Quatro produtos de IA em produção para grandes clientes industriais — contagem de pessoas (YOLOv8 + ByteTrack), performance de funcionários, detecção de furto de veículos, tempo de permanência em docas — além de inspeção automatizada de rosqueamento de tubos. Inferência edge em Jetson / Raspberry Pi.',
      impact: '5.000+ imagens anotadas · 4 produtos entregues · delivery on-site',
      tags: ['YOLOv8', 'ByteTrack', 'Jetson', 'FastAPI'],
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
  ],
  systems: [
    {
      key: 'agents-pt',
      badge: 'Agentes LLM',
      badgeType: 'agents',
      title: 'Motor de Decisões Multiagente — Promeat AI',
      desc: 'Agentes que leem o chão de fábrica e agem sobre ele. Dados vivos do ERP e da operação entram numa máquina de estados LangGraph, passam por agentes de classificação, validação e decisão, e voltam escritos sozinhos ou caem numa fila humana — com trace em cada passo.',
      stages: [
        {
          idx: '01',
          name: 'Fontes',
          chips: ['ERP do cliente', 'Sistemas da planta', 'Eventos de visão'],
          note: 'eventos de alta frequência, sem digitação manual',
          accent: 'in',
        },
        {
          idx: '02',
          name: 'Ingestão',
          chips: ['Endpoints FastAPI', 'Microsserviços event-driven', 'Normalização de schema'],
          note: 'um contrato para fontes heterogêneas',
          accent: 'in',
        },
        {
          idx: '03',
          name: 'Grafo de agentes',
          chips: ['Orquestração LangGraph', 'Agente de classificação', 'Agente de validação', 'Agente de decisão', 'RAG sobre contexto da planta'],
          note: 'multiagente AutoGen · iteração de prompts e evals',
          accent: 'agent',
        },
        {
          idx: '04',
          name: 'Agir',
          chips: ['Escrita nos sistemas do cliente', 'Notificação ao operador', 'Registro de auditoria'],
          note: 'autônomo quando os agentes concordam',
          accent: 'exec',
        },
      ],
      gate: {
        label: 'limiar de confiança',
        auto: 'executar de forma autônoma',
        human: 'revisão human-in-the-loop',
        caption: 'Abaixo do limiar, a decisão vai para uma pessoa em vez de ir para produção.',
      },
      layers: [
        { label: 'Observabilidade', items: ['traces Langfuse por nó', 'estado multi-passo do agente', 'evals em regressões'] },
        { label: 'Serving e estado', items: ['serviços FastAPI', 'PostgreSQL', 'Docker · GCP'] },
      ],
      footer: '// Roda sob o tráfego das plantas da JBS e Marfrig — 25.000+ animais contados por dia, sem fallback manual',
      tags: ['LangGraph', 'AutoGen', 'RAG', 'Langfuse', 'FastAPI', 'PostgreSQL'],
    },
    {
      key: 'auto-pt',
      badge: 'Automação',
      badgeType: 'auto',
      title: 'Camada de Automação LLM — ShopGuard AI',
      desc: 'A camada de linguagem sobre a visão em tempo real. Detecções do edge chegam como eventos, são montadas em contexto e saem como um alerta sobre o qual o operador age em segundos — ou como um resumo que pode esperar.',
      stages: [
        {
          idx: '01',
          name: 'Edge',
          chips: ['YOLO11 + TensorRT', 'GStreamer multi-câmera', 'Hardware edge NVIDIA'],
          note: 'latência sub-segundo, por loja',
          accent: 'in',
        },
        {
          idx: '02',
          name: 'Camada de eventos',
          chips: ['Detecções → nuvem', 'Ingestão FastAPI', 'Híbrido GCP / Oracle Cloud'],
          note: 'tráfego de produção 24/7',
          accent: 'in',
        },
        {
          idx: '03',
          name: 'Camada de linguagem',
          chips: ['Montagem de contexto', 'LangChain + AutoGen', 'Alerta e resumo GPT-4'],
          note: 'o que aconteceu, onde, com que certeza',
          accent: 'agent',
        },
        {
          idx: '04',
          name: 'Entrega',
          chips: ['Fluxo de escalonamento', 'Dashboard React do operador', 'Integrações com o cliente'],
          note: 'o operador intervém antes da perda',
          accent: 'ui',
        },
      ],
      gate: {
        label: 'roteamento por severidade',
        auto: 'escalar agora',
        human: 'agrupar em resumo',
        caption: 'Nem toda detecção merece uma interrupção — o roteamento decide quais merecem.',
      },
      layers: [
        { label: 'Runtime', items: ['150 lojas · 4.500+ streams', 'edge/nuvem híbrido', 'debug remoto'] },
        { label: 'Produto', items: ['serviços FastAPI', 'dashboards React', 'ciclo de re-treino'] },
      ],
      footer: '// 90% menos furtos consumados em produção — construído e operado por um engenheiro só',
      tags: ['LangChain', 'AutoGen', 'GPT-4', 'YOLO11', 'TensorRT', 'FastAPI'],
    },
    {
      key: 'fullstack-pt',
      badge: 'Full-Stack',
      badgeType: 'fullstack',
      title: 'Arquitetura de Produto Full-Stack',
      desc: 'A stack que eu construo em volta de cada modelo. Dashboards React tipados sobre FastAPI, serviços event-driven que escalam sozinhos, inferência em GPU onde é devido, e o deploy e o on-call que mantêm tudo de pé — um engenheiro, sem handoffs.',
      stages: [
        {
          idx: '01',
          name: 'Cliente',
          chips: ['React + TypeScript', 'Dashboards de operador', 'Atualizações via WebSocket'],
          note: 'para quem olha uma operação, não um relatório',
          accent: 'ui',
        },
        {
          idx: '02',
          name: 'API',
          chips: ['FastAPI (REST)', 'Canais WebSocket', 'Auth e validação'],
          note: 'contratos tipados entre cada camada',
          accent: 'agent',
        },
        {
          idx: '03',
          name: 'Serviços',
          chips: ['Microsserviços event-driven', 'Serviço de inferência GPU', 'Workers de automação'],
          note: 'modular — cada um escala por conta própria',
          accent: 'agent',
        },
        {
          idx: '04',
          name: 'Dados e plataforma',
          chips: ['PostgreSQL / Supabase', 'Armazenamento de mídia', 'Docker · CI/CD', 'GCP · AWS · Oracle Cloud'],
          note: 'subir, observar, ficar de plantão',
          accent: 'store',
        },
      ],
      layers: [
        { label: 'Transversal', items: ['logging e observabilidade', 'CI/CD a cada merge', 'ajuste de custo e latência'] },
      ],
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
