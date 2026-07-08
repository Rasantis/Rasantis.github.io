import { useLang } from '../i18n';
import Reveal from './Reveal';

export default function Skills() {
  const { c } = useLang();
  return (
    <section id="skills">
      <div className="section-title">{c.ui.skills.eyebrow}</div>
      <h2 className="section-heading">{c.ui.skills.heading}</h2>
      <p className="section-sub">{c.ui.skills.sub}</p>
      <div className="skills-grid">
        {c.skillGroups.map((g) => (
          <Reveal key={g.title} className="skill-card">
            <h4>{g.title}</h4>
            <div className="tags">
              {g.tags.map((t) => (
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
