import { CROSS_SYSTEM_PREFIX, EXTRA_DEMO_SRCS, EXTRA_PROJECT_IDX } from '../data';
import { useLang } from '../i18n';
import Blueprint from './Blueprint';
import Reveal from './Reveal';

/** The product architecture that carries every project — plus the work that
 *  doesn't need a case block of its own. */
export default function Architecture() {
  const { c } = useLang();
  const system = c.systems.find((s) => s.key.startsWith(CROSS_SYSTEM_PREFIX));
  const extraProjects = EXTRA_PROJECT_IDX.map((i) => c.projects[i]).filter(Boolean);
  const extraDemos = EXTRA_DEMO_SRCS.map((src) => c.demos.find((d) => d.src === src)).filter(
    (d): d is NonNullable<typeof d> => Boolean(d),
  );

  return (
    <section id="architecture">
      <div className="section-title">{c.ui.arch.eyebrow}</div>
      <h2 className="section-heading">{c.ui.arch.heading}</h2>
      <p className="section-sub">{c.ui.arch.sub}</p>

      {system && (
        <Reveal className="case case-arch">
          {/* Same folded-by-default treatment as the per-case diagrams: the
              900px blueprint is for the reader who wants it, not a toll for
              the one scrolling to Experience. */}
          <details className="arch-disclose arch-disclose-bare">
            <summary>
              <span className="arch-disclose-label">{c.ui.work.architecture}</span>
              <span className="arch-disclose-title">{system.title}</span>
              <span className="arch-disclose-cta">{c.ui.work.archToggle}</span>
              <span className="arch-disclose-chevron" aria-hidden="true" />
            </summary>
            <div className="arch-disclose-body">
              <Blueprint system={system} />
              <div className="system-footer">{system.footer}</div>
            </div>
          </details>
          <div className="tags case-tags">
            {system.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      )}

      {(extraProjects.length > 0 || extraDemos.length > 0) && (
        <Reveal className="also">
          <div className="case-block-label">{c.ui.arch.also}</div>
          <div className="also-grid">
            {extraProjects.map((p) => (
              <div className="also-item" key={p.title}>
                <h4>{p.title}</h4>
                <p>{p.description}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {extraDemos.map((d) => (
              <figure className="also-item also-demo" key={d.src}>
                <div className="demo-media">
                  <video controls muted playsInline preload="none" poster={d.poster} src={d.src} />
                </div>
                <figcaption>
                  <h4>{d.title}</h4>
                  <p>{d.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      )}
    </section>
  );
}
