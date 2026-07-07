// Spec: results-page-spec.md §10.6 (mobile docked CTA bar)
import { copy } from "../lib/copy";

interface DockProps {
  submitted?: boolean;
  empty?: boolean;
  hidden?: boolean;
  onBroker: () => void;
  onUpdate: () => void;
}

export function Dock({ submitted = false, empty = false, hidden = false, onBroker, onUpdate }: DockProps) {
  if (hidden) return null;
  return (
    <div className="rp-dock">
      <button className="rp-primary-cta" type="button" disabled={submitted} onClick={onBroker}>
        {submitted ? copy.cta.done : empty ? copy.cta.talk : copy.cta.primary}
      </button>
      <button className="rp-secondary-cta" type="button" onClick={onUpdate}>
        {copy.cta.secondary}
      </button>
    </div>
  );
}
