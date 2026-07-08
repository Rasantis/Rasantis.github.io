import { links } from '../data';
import { useLang } from '../i18n';

function FlagUS() {
  return (
    <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true">
      <rect width="15" height="10" fill="#B22234" />
      <g fill="#fff">
        <rect y="1.43" width="15" height="1.43" />
        <rect y="4.29" width="15" height="1.43" />
        <rect y="7.14" width="15" height="1.43" />
      </g>
      <rect width="6.5" height="5" fill="#3C3B6E" />
    </svg>
  );
}

function FlagES() {
  return (
    <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true">
      <rect width="15" height="10" fill="#AA151B" />
      <rect y="2.5" width="15" height="5" fill="#F1BF00" />
    </svg>
  );
}

export default function Nav() {
  const { lang, setLang, c } = useLang();

  return (
    <nav>
      <div className="nav-inner">
        <div className="nav-logo">
          Rafael <span>De Santis</span>
        </div>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#projects">{c.ui.nav.projects}</a>
            <a href="#demos">{c.ui.nav.demos}</a>
            <a href="#skills">{c.ui.nav.skills}</a>
            <a href="#experience">{c.ui.nav.experience}</a>
            <a href="#contact">{c.ui.nav.contact}</a>
          </div>
          <div className="lang-switch" role="group" aria-label="Language / Idioma">
            <button
              type="button"
              className={`lang-opt${lang === 'en' ? ' active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              aria-label="English"
            >
              <FlagUS />
              <span className="lang-txt">EN</span>
            </button>
            <button
              type="button"
              className={`lang-opt${lang === 'es' ? ' active' : ''}`}
              onClick={() => setLang('es')}
              aria-pressed={lang === 'es'}
              aria-label="Español"
            >
              <FlagES />
              <span className="lang-txt">ES</span>
            </button>
          </div>
          <a className="btn btn-primary btn-nav" href={links.cv} target="_blank" rel="noreferrer">
            {c.ui.nav.cv}
          </a>
        </div>
      </div>
    </nav>
  );
}
