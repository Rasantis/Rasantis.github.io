import { demos } from '../data';
import Reveal from './Reveal';

export default function Demos() {
  return (
    <section id="demos">
      <div className="section-title">See It Running</div>
      <h2 className="section-heading">Production systems in action</h2>
      <p className="section-sub">
        Real output from shipped pipelines — weight estimation, retail theft detection, industrial inspection, and
        crowd / vehicle counting. Click any clip to play.
      </p>
      <div className="demo-grid">
        {demos.map((d) => (
          <Reveal key={d.src} className="demo-card">
            <div className="demo-media">
              <video controls muted playsInline preload="none" poster={d.poster} src={d.src} />
            </div>
            <div className="demo-meta">
              <div className="demo-title">
                <strong>{d.title}</strong>
                <span className="pill pill-live">{d.project}</span>
              </div>
              <div className="demo-caption">{d.caption}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
