import { links } from '../data';
import Reveal from './Reveal';

export default function Contact() {
  return (
    <section id="contact">
      <Reveal className="contact-box">
        <h2>Let's build something that ships.</h2>
        <p>
          Open to remote roles worldwide — AI engineering, computer vision, full-stack AI products. Italian (EU)
          citizen, fluent English, fully async-ready.
        </p>
        <a className="btn btn-primary" href={`mailto:${links.email}`}>
          {links.email}
        </a>
      </Reveal>
    </section>
  );
}
