import { links } from '../data';
import { useLang } from '../i18n';

export default function Nav() {
  const { lang, setLang, c } = useLang();
  const other = lang === 'en' ? 'es' : 'en';

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
          <button
            type="button"
            className="lang-btn"
            onClick={() => setLang(other)}
            aria-label={other === 'es' ? 'Cambiar a español' : 'Switch to English'}
          >
            {other.toUpperCase()}
          </button>
          <a className="btn btn-primary btn-nav" href={links.cv} target="_blank" rel="noreferrer">
            {c.ui.nav.cv}
          </a>
        </div>
      </div>
    </nav>
  );
}
