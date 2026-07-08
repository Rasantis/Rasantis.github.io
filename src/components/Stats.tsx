import { stats } from '../data';
import Reveal from './Reveal';

export default function Stats() {
  return (
    <div className="stats">
      {stats.map((s) => (
        <Reveal key={s.num} className="stat">
          <div className="num">{s.num}</div>
          <div className="label">{s.label}</div>
        </Reveal>
      ))}
    </div>
  );
}
