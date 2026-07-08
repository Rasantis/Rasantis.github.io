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

export const stats = [
  { num: '25,000+', label: 'animals counted daily — JBS & Marfrig plants' },
  { num: '150 stores', label: '4,500+ camera streams — ShopGuard AI footprint' },
  { num: '90%', label: 'fewer completed thefts at deployed stores' },
  { num: '98.5%', label: 'accuracy on real-time weight estimation' },
];

export const projects: Project[] = [
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
];

export const demos: Demo[] = [
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
    caption: 'Aerial line-crossing tally + per-frame headcount over dense crowds (440+ peak).',
  },
  {
    src: './vehicle_counting_demo.mp4',
    poster: './posters/vehicle_counting_demo.jpg',
    project: 'Traffic Analytics',
    title: 'Vehicle counting & traffic flow',
    caption: 'Multi-zone in / out vehicle tallies and tracking on a live traffic camera.',
  },
];

export const skillGroups: SkillGroup[] = [
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
    tags: ['Python', 'FastAPI', 'Node.js', 'REST', 'Microservices', 'Event-Driven', 'WebSockets'],
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
];

export const timeline: TimelineItem[] = [
  {
    period: 'Jul 2026 – Present',
    title: 'Senior AI Engineer III',
    company: 'Pix Force',
    description:
      'Internal move within the Pix Force group, from Promeat AI — senior-level, end-to-end computer vision and applied-AI products for industrial clients (PyTorch, YOLO, edge inference).',
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
    period: 'Jul 2024 – Jun 2025',
    title: 'Tech Lead & Senior AI Engineer',
    company: 'Vision Labs',
    description:
      'CV products from pilot to production for enterprise B2B clients; GPT-4 + LangChain automation in production.',
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
    period: 'Jan 2023 – Dec 2023',
    title: 'Freelance Software Engineer',
    company: 'Independent',
    description: 'Solo full-stack and computer vision deliveries for early-stage clients.',
  },
];

export const links = {
  email: 'rafa25santis@gmail.com',
  github: 'https://github.com/Rasantis',
  linkedin: 'https://linkedin.com/in/rafael-santis-ab64b2177',
  cv: './Rafael_Santis_CV_EN.pdf',
};
