import { CASES } from '../data';
import { useLang } from '../i18n';
import Blueprint from './Blueprint';
import Reveal from './Reveal';

/** One case per project: the story, the footage and the architecture together,
 *  so nothing is described twice in three different places. */
export default function Work() {
  const { c } = useLang();

  return (
    <section id="work">
      <div className="section-title">{c.ui.work.eyebrow}</div>
      <h2 className="section-heading">{c.ui.work.heading}</h2>
      <p className="section-sub">{c.ui.work.sub}</p>

      <div className="cases">
        {CASES.map((def) => {
          const p = c.projects[def.projectIdx];
          if (!p) return null;
          const videos = def.demoSrcs
            .map((src) => c.demos.find((d) => d.src === src))
            .filter((d): d is NonNullable<typeof d> => Boolean(d));
          const system = def.systemPrefix ? c.systems.find((s) => s.key.startsWith(def.systemPrefix!)) : undefined;

          return (
            <Reveal key={def.key} className="case">
              <div className="case-head">
                <span className="case-idx">{def.idx}</span>
                <div className="case-heading">
                  <h3>{p.title}</h3>
                  <div className="case-role">{p.role}</div>
                </div>
                <span className={`pill pill-${p.pill.type}`}>{p.pill.label}</span>
              </div>

              <p className="case-desc">{p.description}</p>
              <div className="impact">{p.impact}</div>

              <div className="tags case-tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>

              {videos.length > 0 && (
                <div className="case-block">
                  <div className="case-block-label">{c.ui.work.videos}</div>
                  <div className={`case-videos count-${videos.length}`}>
                    {videos.map((d) => (
                      <figure className="demo-card" key={d.src}>
                        <div className="demo-media">
                          <video controls muted playsInline preload="none" poster={d.poster} src={d.src} />
                        </div>
                        <figcaption className="demo-meta">
                          <strong>{d.title}</strong>
                          <span className="demo-caption">{d.caption}</span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {system && (
                <div className="case-block">
                  <div className="case-block-label">{c.ui.work.architecture}</div>
                  <Blueprint system={system} />
                  <div className="system-footer">{system.footer}</div>
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
