import type { SystemFlow } from '../data';

/** Rack-style architecture blueprint: data bus, numbered stage lanes,
 *  the decision gate where it forks, and the rails that span everything. */
export default function Blueprint({ system }: { system: SystemFlow }) {
  return (
    <div className="blueprint">
      <div className="bp-bus" aria-hidden="true">
        <span className="bp-pulse" />
      </div>

      <div className="bp-lanes">
        {system.stages.map((st) => (
          <div className={`lane lane-${st.accent}`} key={`${system.key}-${st.idx}`}>
            <div className="lane-head">
              <span className="lane-idx">{st.idx}</span>
              <span className="lane-name">{st.name}</span>
            </div>
            <ul className="lane-chips">
              {st.chips.map((chip) => (
                <li className="lane-chip" key={chip}>
                  {chip}
                </li>
              ))}
            </ul>
            <div className="lane-note">{st.note}</div>
          </div>
        ))}
      </div>

      {system.gate && (
        <div className="bp-gate">
          <div className="gate-stem" aria-hidden="true" />
          <div className="gate-body">
            <span className="gate-label">{system.gate.label}</span>
            <div className="gate-paths">
              <span className="gate-path gate-auto">{system.gate.auto}</span>
              <span className="gate-path gate-human">{system.gate.human}</span>
            </div>
            <p className="gate-caption">{system.gate.caption}</p>
          </div>
        </div>
      )}

      <div className="bp-layers">
        {system.layers.map((l) => (
          <div className="bp-layer" key={`${system.key}-${l.label}`}>
            <span className="layer-label">{l.label}</span>
            <div className="layer-items">
              {l.items.map((item) => (
                <span className="layer-item" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
