// Spec: results-page-spec.md §7.9 (C6 CTA row)
import { copy } from "../lib/copy";

interface CtaRowProps {
  submitted?: boolean;
  onBroker: () => void;
  onUpdate: () => void;
}

export function CtaRow({ submitted = false, onBroker, onUpdate }: CtaRowProps) {
  return (
    <div className="rp-cta-row">
      <button className="rp-primary-cta" type="button" disabled={submitted} onClick={onBroker}>
        {submitted ? copy.cta.done : copy.cta.primary}
      </button>
      <button className="rp-secondary-cta" type="button" onClick={onUpdate}>
        {copy.cta.secondary}
      </button>
    </div>
  );
}
