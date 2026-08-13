import type { SystemFlow } from '../data';
import { useLang } from '../i18n';

/** The architecture diagram itself. Two generators feed this, both hand-laid —
 *  tools/build_diagrams.py for the tight SVGs with vendor icons, and
 *  tools/build_excalidraw_*.py for the deep boards. Opens full size, because on
 *  a phone the detail only survives at 1:1. */
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
