import { links } from '../data';
import { useLang } from '../i18n';
import Reveal from './Reveal';

export default function Contact() {
  const { c } = useLang();
  return (
    <section id="contact">
      <Reveal className="contact-box">
        <h2>{c.ui.contact.heading}</h2>
        <p>{c.ui.contact.sub}</p>
        <div className="contact-ctas">
          <a className="btn btn-primary" href={`mailto:${links.email}`}>
            {links.email}
          </a>
          <a className="btn btn-ghost" href={links.cv} target="_blank" rel="noreferrer">
            {c.ui.contact.cv}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
