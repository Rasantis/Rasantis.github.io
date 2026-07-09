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
  nav: { projects: string; demos: string; skills: string; experience: string; contact: string; cv: string };
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
    nav: { projects: 'Projects', demos: 'Demos', skills: 'Skills', experience: 'Experience', contact: 'Contact', cv: 'Download CV' },
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
      heading: 'Production systems in action',
      sub: 'Real output from shipped pipelines — weight estimation, retail theft detection, industrial inspection, and crowd / vehicle counting. Click any clip to play.',
    },
    skills: {
      eyebrow: 'Stack',
      heading: 'Tools I ship with',
      sub: 'Comfortable across the whole stack — from CUDA kernels at the edge to React dashboards in the browser. Heavy daily use of AI-augmented development (Claude Code, Codex, Cursor).',
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
    { num: '98.5%', label: 'accuracy on real-time weight estimation' },
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
      description: 'Solo full-stack and computer vision deliveries for early-stage clients.',
    },
  ],
};

const es: Content = {
  ui: {
    nav: { projects: 'Proyectos', demos: 'Demos', skills: 'Stack', experience: 'Experiencia', contact: 'Contacto', cv: 'Descargar CV' },
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
      heading: 'Sistemas de producción en acción',
      sub: 'Salida real de pipelines en producción — estimación de peso, detección de hurtos en retail, inspección industrial y conteo de multitudes / vehículos. Haz clic en cualquier clip para reproducirlo.',
    },
    skills: {
      eyebrow: 'Stack',
      heading: 'Herramientas con las que construyo',
      sub: 'Cómodo en todo el stack — de kernels CUDA en el edge a dashboards en React en el navegador. Uso diario intensivo de desarrollo asistido por IA (Claude Code, Codex, Cursor).',
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
    { num: '98,5%', label: 'precisión en estimación de peso en tiempo real' },
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
      description: 'Entregas full-stack y de visión computacional en solitario para clientes early-stage.',
    },
  ],
};

const pt: Content = {
  ui: {
    nav: { projects: 'Projetos', demos: 'Demos', skills: 'Stack', experience: 'Experiência', contact: 'Contato', cv: 'Baixar CV' },
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
      heading: 'Sistemas de produção em ação',
      sub: 'Saída real de pipelines em produção — estimativa de peso, detecção de furtos no varejo, inspeção industrial e contagem de multidões / veículos. Clique em qualquer clipe para reproduzir.',
    },
    skills: {
      eyebrow: 'Stack',
      heading: 'Ferramentas com que eu construo',
      sub: 'Confortável em toda a stack — de kernels CUDA no edge a dashboards React no navegador. Uso diário intensivo de desenvolvimento assistido por IA (Claude Code, Codex, Cursor).',
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
    { num: '98,5%', label: 'de acurácia na estimativa de peso em tempo real' },
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
      description: 'Entregas full-stack e de visão computacional solo para clientes early-stage.',
    },
  ],
};

export const content: Record<Lang, Content> = { en, es, pt };
