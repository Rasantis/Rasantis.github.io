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

            <div className="blueprint">
              <div className="bp-bus" aria-hidden="true">
                <span className="bp-pulse" />
              </div>

              <div className="bp-lanes">
                {s.stages.map((st) => (
                  <div className={`lane lane-${st.accent}`} key={`${s.key}-${st.idx}`}>
                    <div className="lane-head">
                      <span className="lane-idx">{st.idx}</span>
                      <span className="lane-name">{st.name}</span>
                    </div>
                    <ul className="lane-chips">
                      {st.chips.map((chip) => (
                        <li className="lane-chip" key={chip}>
                          {chip}
                        </li>
                      ))}
                    </ul>
                    <div className="lane-note">{st.note}</div>
                  </div>
                ))}
              </div>

              {s.gate && (
                <div className="bp-gate">
                  <div className="gate-stem" aria-hidden="true" />
                  <div className="gate-body">
                    <span className="gate-label">{s.gate.label}</span>
                    <div className="gate-paths">
                      <span className="gate-path gate-auto">{s.gate.auto}</span>
                      <span className="gate-path gate-human">{s.gate.human}</span>
                    </div>
                    <p className="gate-caption">{s.gate.caption}</p>
                  </div>
                </div>
              )}

              <div className="bp-layers">
                {s.layers.map((l) => (
                  <div className="bp-layer" key={`${s.key}-${l.label}`}>
                    <span className="layer-label">{l.label}</span>
                    <div className="layer-items">
                      {l.items.map((item) => (
                        <span className="layer-item" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
