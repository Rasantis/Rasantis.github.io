import { useLang } from '../i18n';
import Reveal from './Reveal';

export default function Projects() {
  const { c } = useLang();
  return (
    <section id="projects">
      <div className="section-title">{c.ui.projects.eyebrow}</div>
      <h2 className="section-heading">{c.ui.projects.heading}</h2>
      <p className="section-sub">{c.ui.projects.sub}</p>
      <div className="projects-grid">
        {c.projects.map((p) => (
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
