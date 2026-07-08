import { links } from '../data';

export default function Hero() {
  return (
    <header className="hero">
      <div>
        <div className="eyebrow">São Paulo, Brazil · Remote worldwide</div>
        <h1>
          I build <em>production AI systems</em> — from edge vision to multi-agent platforms.
        </h1>
        <p className="lede">
          Full-stack AI engineer — today Senior AI Engineer III at <strong>Pix Force</strong>. Founder &amp; CTO of
          <strong> ShopGuard AI</strong> — a retail security platform I built solo and ran across 150 stores. Built
          the computer vision platform serving <strong>JBS and Marfrig</strong>, the world's two largest meat
          processors — real systems, real traffic, zero handoffs.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-primary" href="#projects">
            View Projects
          </a>
          <a className="btn btn-ghost" href={links.cv} target="_blank" rel="noreferrer">
            Download CV
          </a>
        </div>
        <div className="hero-links">
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${links.email}`}>{links.email}</a>
        </div>
        <div className="hero-badges">
          <span className="badge badge-available">
            <span className="dot" /> Available — remote worldwide
          </span>
          <span className="badge badge-eu">
            <svg width="14" height="10" viewBox="0 0 15 10" aria-hidden="true" style={{ borderRadius: 2, flexShrink: 0 }}>
              <rect width="5" height="10" fill="#009246" />
              <rect x="5" width="5" height="10" fill="#f1f2f1" />
              <rect x="10" width="5" height="10" fill="#ce2b37" />
            </svg>
            Italian (EU) citizen · work-ready across the EU
          </span>
        </div>
      </div>
      <figure className="feed" aria-label="Rafael De Santis, framed as a camera feed with a detection overlay">
        <img src="./profile.png" alt="Rafael De Santis" />
        <span className="feed-corner tl" aria-hidden="true" />
        <span className="feed-corner tr" aria-hidden="true" />
        <span className="feed-corner bl" aria-hidden="true" />
        <span className="feed-corner br" aria-hidden="true" />
        <span className="feed-label" aria-hidden="true">
          ID 01 · ENGINEER · 0.99
        </span>
        <span className="feed-rec" aria-hidden="true">
          <i /> REC
        </span>
        <span className="feed-cam" aria-hidden="true">
          CAM 01 · SÃO PAULO · 24/7
        </span>
      </figure>
    </header>
  );
}
