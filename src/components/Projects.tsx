import { projects } from '../data';
import Reveal from './Reveal';

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-title">Selected Work</div>
      <h2 className="section-heading">Projects that run in production</h2>
      <p className="section-sub">
        Not demos. Every system below shipped to real users and ran — or still runs — under 24/7 production traffic.
      </p>
      <div className="projects-grid">
        {projects.map((p) => (
          <Reveal key={p.title} className="project">
            <div className="project-top">
              <div>
                <h3>{p.title}</h3>
                <div className="role">{p.role}</div>
              </div>
              <span className={`pill pill-${p.pill.type}`}>{p.pill.label}</span>
            </div>
            <p>{p.description}</p>
            <div className="impact">{p.impact}</div>
            <div className="tags">
              {p.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
