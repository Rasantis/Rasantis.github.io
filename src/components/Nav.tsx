import { links } from '../data';

export default function Nav() {
  return (
    <nav>
      <div className="nav-inner">
        <div className="nav-logo">
          Rafael <span>De Santis</span>
        </div>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#projects">Projects</a>
            <a href="#demos">Demos</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="btn btn-primary btn-nav" href={links.cv} target="_blank" rel="noreferrer">
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
}
