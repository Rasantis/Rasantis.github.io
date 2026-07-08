import { links } from '../data';
import { useLang } from '../i18n';

export default function Hero() {
  const { lang, c } = useLang();
  const h = c.ui.hero;

  return (
    <header className="hero">
      <div>
        <div className="eyebrow">{h.eyebrow}</div>
        <h1>
          {h.h1Pre}
          <em>{h.h1Em}</em>
          {h.h1Post}
        </h1>
        {lang === 'en' ? (
          <p className="lede">
            Full-stack AI engineer — today Senior AI Engineer III at <strong>Pix Force</strong>. Founder &amp; CTO of
            <strong> ShopGuard AI</strong> — a retail security platform I built solo and ran across 150 stores. Built
            the computer vision platform serving <strong>JBS and Marfrig</strong>, the world's two largest meat
            processors — real systems, real traffic, zero handoffs.
          </p>
        ) : (
          <p className="lede">
            Ingeniero de IA full-stack — hoy Senior AI Engineer III en <strong>Pix Force</strong>. Founder &amp; CTO de
            <strong> ShopGuard AI</strong>, una plataforma de seguridad para retail que construí solo y operé en 150
            tiendas. Construí la plataforma de visión computacional que atiende a <strong>JBS y Marfrig</strong>, los
            dos mayores procesadores de carne del mundo — sistemas reales, tráfico real, cero handoffs.
          </p>
        )}
        <div className="hero-ctas">
          <a className="btn btn-primary" href="#projects">
            {h.ctaProjects}
          </a>
          <a className="btn btn-ghost" href={links.cv} target="_blank" rel="noreferrer">
            {h.ctaCv}
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
            <span className="dot" /> {h.badgeAvailable}
          </span>
          <span className="badge badge-eu">
            <svg width="14" height="10" viewBox="0 0 15 10" aria-hidden="true" style={{ borderRadius: 2, flexShrink: 0 }}>
              <rect width="5" height="10" fill="#009246" />
              <rect x="5" width="5" height="10" fill="#f1f2f1" />
              <rect x="10" width="5" height="10" fill="#ce2b37" />
            </svg>
            {h.badgeEu}
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
