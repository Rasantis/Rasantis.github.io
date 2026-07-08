import { links } from '../data';
import { useLang } from '../i18n';

export default function Footer() {
  const { c } = useLang();
  return (
    <footer>
      <div className="foot-links">
        <a href={links.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={links.cv} target="_blank" rel="noreferrer">
          {c.ui.footer.cv}
        </a>
      </div>
      © {new Date().getFullYear()} Rafael De Santis — {c.ui.footer.tagline}
    </footer>
  );
}
