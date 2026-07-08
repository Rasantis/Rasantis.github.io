import { useLang } from '../i18n';
import Reveal from './Reveal';

export default function Stats() {
  const { c } = useLang();
  return (
    <div className="stats">
      {c.stats.map((s) => (
        <Reveal key={s.label} className="stat">
          <div className="num">{s.num}</div>
          <div className="label">{s.label}</div>
        </Reveal>
      ))}
    </div>
  );
}
