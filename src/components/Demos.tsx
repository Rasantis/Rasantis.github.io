import { useLang } from '../i18n';
import Reveal from './Reveal';

export default function Demos() {
  const { c } = useLang();
  return (
    <section id="demos">
      <div className="section-title">{c.ui.demos.eyebrow}</div>
      <h2 className="section-heading">{c.ui.demos.heading}</h2>
      <p className="section-sub">{c.ui.demos.sub}</p>
      <div className="demo-grid">
        {c.demos.map((d) => (
          <Reveal key={d.src} className="demo-card">
            <div className="demo-media">
              <video controls muted playsInline preload="none" poster={d.poster} src={d.src} />
            </div>
            <div className="demo-meta">
              <div className="demo-title">
                <strong>{d.title}</strong>
                <span className="pill pill-neutral">{d.project}</span>
              </div>
              <div className="demo-caption">{d.caption}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
