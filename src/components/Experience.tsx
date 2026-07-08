import { useLang } from '../i18n';
import Reveal from './Reveal';

export default function Experience() {
  const { c } = useLang();
  return (
    <section id="experience">
      <div className="section-title">{c.ui.experience.eyebrow}</div>
      <h2 className="section-heading">{c.ui.experience.heading}</h2>
      <p className="section-sub">{c.ui.experience.sub}</p>
      <div className="timeline">
        {c.timeline.map((t) => (
          <Reveal key={`${t.title}-${t.company}`} className="t-item">
            <div className="t-period">{t.period}</div>
            <h4>
              {t.title} · <span>{t.company}</span>
              {t.suffix ?? ''}
            </h4>
            <p>{t.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
