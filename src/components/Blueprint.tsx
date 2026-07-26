import type { SystemFlow } from '../data';
import { useLang } from '../i18n';

/** The architecture diagram itself — generated with mingrammer/diagrams +
 *  Graphviz (tools/build_diagrams.py), with real vendor icons. Opens full size,
 *  because on a phone the detail only survives at 1:1. */
export default function Blueprint({ system }: { system: SystemFlow }) {
  const { c } = useLang();
  return (
    <figure className="arch">
      <a className="arch-figure" href={system.image} target="_blank" rel="noreferrer">
        <img src={system.image} alt={system.alt} loading="lazy" />
      </a>
      <figcaption className="arch-zoom">↗ {c.ui.work.zoom}</figcaption>
    </figure>
  );
}
