import { timeline } from '../data';
import Reveal from './Reveal';

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-title">Trajectory</div>
      <h2 className="section-heading">Experience</h2>
      <p className="section-sub">
        Freelance to founder to senior IC — every stop shipped to production, owned end to end.
      </p>
      <div className="timeline">
        {timeline.map((t) => (
          <Reveal key={t.period} className="t-item">
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
