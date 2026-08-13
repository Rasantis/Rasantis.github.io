import { useMemo, useState } from 'react';
import { CASES, type Track } from '../data';
import { useLang } from '../i18n';
import Blueprint from './Blueprint';
import Reveal from './Reveal';

const TRACKS: (Track | 'all')[] = ['all', 'agents', 'vision', 'fullstack'];

/** One case per project: the story, the footage and the architecture together,
 *  so nothing is described twice in three different places.
 *
 *  The filter exists because this section is most of the page. Somebody hiring
 *  for agent work should not have to scroll past four computer-vision projects
 *  to find out whether the agent experience is real — one click and the page is
 *  only the evidence they came for. Nothing is hidden by default; "All work"
 *  is the initial state and the counts are always visible.
 */
export default function Work() {
  const { c } = useLang();
  const [track, setTrack] = useState<Track | 'all'>('all');

  const counts = useMemo(() => {
    const out: Record<string, number> = { all: CASES.length };
    for (const t of ['agents', 'vision', 'fullstack'] as Track[]) {
      out[t] = CASES.filter((d) => d.tracks.includes(t)).length;
    }
    return out;
  }, []);

  const shown = track === 'all' ? CASES : CASES.filter((d) => d.tracks.includes(track));

  return (
    <section id="work">
      <div className="section-title">{c.ui.work.eyebrow}</div>
      <h2 className="section-heading">{c.ui.work.heading}</h2>
      <p className="section-sub">{c.ui.work.sub}</p>

      <div className="track-filter" role="tablist" aria-label={c.ui.work.eyebrow}>
        {TRACKS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={track === t}
            className={`track-chip ${track === t ? 'on' : ''}`}
            onClick={() => setTrack(t)}
          >
            {c.ui.work.filters[t]}
            <span className="track-count">{counts[t]}</span>
          </button>
        ))}
      </div>

      <div className="cases">
        {shown.map((def) => {
          const p = c.projects[def.projectIdx];
          if (!p) return null;
          const videos = def.demoSrcs
            .map((src) => c.demos.find((d) => d.src === src))
            .filter((d): d is NonNullable<typeof d> => Boolean(d));
          const systems = (def.systemPrefixes ?? [])
            .map((prefix) => c.systems.find((s) => s.key.startsWith(prefix)))
            .filter((s): s is NonNullable<typeof s> => Boolean(s));

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
                {p.repo && (
                  <a className="tag tag-repo" href={p.repo} target="_blank" rel="noreferrer">
                    ↗ source on GitHub
                  </a>
                )}
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

              {/* The diagram is 700px tall — half a case block — and it sits at the
                  bottom, which is exactly where a skimming reader has already
                  stopped. Folded away it costs one line; the people who want it
                  are the ones who will open it. Native <details> so it works with
                  a keyboard, survives Ctrl+F, and needs no state of its own. */}
              {systems.map((system) => (
                <details className="arch-disclose" key={system.key}>
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
              ))}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
