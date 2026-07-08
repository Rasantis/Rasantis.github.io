import { links } from '../data';

export default function Footer() {
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
          CV (PDF)
        </a>
      </div>
      © {new Date().getFullYear()} Rafael De Santis — built with React + TypeScript + Vite, deployed on GitHub Pages.
    </footer>
  );
}
