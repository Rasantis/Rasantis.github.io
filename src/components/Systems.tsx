import { useLang } from '../i18n';
import Reveal from './Reveal';

export default function Systems() {
  const { c } = useLang();
  return (
    <section id="systems">
      <div className="section-title">{c.ui.systems.eyebrow}</div>
      <h2 className="section-heading">{c.ui.systems.heading}</h2>
      <p className="section-sub">{c.ui.systems.sub}</p>
      <div className="systems-grid">
        {c.systems.map((s) => (
          <Reveal key={s.key} className="system-card">
            <div className="system-head">
              <h3>{s.title}</h3>
              <span className={`pill sys-${s.badgeType}`}>{s.badge}</span>
            </div>
            <p className="system-desc">{s.desc}</p>
            <div className="flow" role="img" aria-label={`${s.title} — architecture`}>
              {s.nodes.map((n, i) => (
                <div className="flow-step" key={`${s.key}-${n.label}-${i}`}>
                  <div className={`flow-node node-${n.accent ?? 'agent'}`}>
                    <span className="flow-label">{n.label}</span>
                    <span className="flow-sub">{n.sub}</span>
                  </div>
                  {i < s.nodes.length - 1 && <span className="flow-arrow" aria-hidden="true" />}
                </div>
              ))}
            </div>
            <div className="system-footer">{s.footer}</div>
            <div className="tags">
              {s.tags.map((t) => (
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
