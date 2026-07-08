import { links } from '../data';

export default function Hero() {
  return (
    <header className="hero">
      <div>
        <div className="eyebrow">São Paulo, Brazil · Remote Worldwide</div>
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
          <span className="badge badge-eu">🇮🇹 Italian (EU) citizen · work-ready across the EU</span>
        </div>
      </div>
      <img src="./profile.png" alt="Rafael De Santis" className="hero-photo" />
    </header>
  );
}
