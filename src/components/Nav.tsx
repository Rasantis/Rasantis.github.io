import type { MouseEvent } from 'react';
import { links, type Lang } from '../data';
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

function FlagBR() {
  return (
    <svg width="15" height="10" viewBox="0 0 15 10" aria-hidden="true">
      <rect width="15" height="10" fill="#009C3B" />
      <polygon points="7.5,0.9 13.6,5 7.5,9.1 1.4,5" fill="#FFDF00" />
      <circle cx="7.5" cy="5" r="2.1" fill="#002776" />
    </svg>
  );
}

const LANGS: { code: Lang; label: string; aria: string; Flag: () => JSX.Element }[] = [
  { code: 'en', label: 'EN', aria: 'English', Flag: FlagUS },
  { code: 'es', label: 'ES', aria: 'Español', Flag: FlagES },
  { code: 'pt', label: 'PT', aria: 'Português', Flag: FlagBR },
];

export default function Nav() {
  const { lang, setLang, c } = useLang();

  /* The dropdown is a native <details>: no menu state to manage, and it keeps
     working if hydration is slow. The only JS it needs is closing itself after
     a link is chosen — <details> has no idea navigation happened. */
  const closeMenu = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.closest('details')?.removeAttribute('open');
  };

  const anchors = (
    <>
      <a href="#work" onClick={closeMenu}>{c.ui.nav.work}</a>
      <a href="#architecture" onClick={closeMenu}>{c.ui.nav.architecture}</a>
      <a href="#skills" onClick={closeMenu}>{c.ui.nav.skills}</a>
      <a href="#experience" onClick={closeMenu}>{c.ui.nav.experience}</a>
      <a href="#contact" onClick={closeMenu}>{c.ui.nav.contact}</a>
    </>
  );

  return (
    <nav>
      <div className="nav-inner">
        <div className="nav-logo">
          Rafael <span>De Santis</span>
        </div>
        <div className="nav-right">
          <div className="nav-links">{anchors}</div>
          <div className="lang-switch" role="group" aria-label="Language / Idioma">
            {LANGS.map(({ code, label, aria, Flag }) => (
              <button
                key={code}
                type="button"
                className={`lang-opt${lang === code ? ' active' : ''}`}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                aria-label={aria}
              >
                <Flag />
                <span className="lang-txt">{label}</span>
              </button>
            ))}
          </div>
          <a className="btn btn-primary btn-nav" href={links.cv} target="_blank" rel="noreferrer">
            {c.ui.nav.cv}
          </a>
          <details className="nav-menu">
            <summary aria-label="Menu">
              <span className="nav-burger" aria-hidden="true" />
            </summary>
            <div className="nav-menu-panel">{anchors}</div>
          </details>
        </div>
      </div>
    </nav>
  );
}
