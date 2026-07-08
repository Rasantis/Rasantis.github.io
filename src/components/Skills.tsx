import { skillGroups } from '../data';
import Reveal from './Reveal';

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-title">Stack</div>
      <h2 className="section-heading">Tools I ship with</h2>
      <p className="section-sub">
        Comfortable across the whole stack — from CUDA kernels at the edge to React dashboards in the browser. Heavy
        daily use of AI-augmented development (Claude Code, Codex, Cursor).
      </p>
      <div className="skills-grid">
        {skillGroups.map((g) => (
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
