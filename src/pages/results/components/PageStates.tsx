// Spec: results-page-spec.md §9 (C8 page states)
import { copy } from "../lib/copy";

export function ListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <section className="rp-list-card" aria-label={copy.loading.checking(count)}>
      <div className="rp-list-head">
        <h2>{copy.list.title}</h2>
      </div>
      <p className="rp-state-caption">{copy.loading.checking(count)}</p>
      <div className="rp-listbox">
        {Array.from({ length: 6 }, (_, index) => (
          <div className="rp-skeleton-row" key={index}>
            <span />
            <span />
            <span />
          </div>
        ))}
      </div>
    </section>
  );
}

export function StatePanel({ kind, onRetry, onUpdate }: { kind: "empty" | "error"; onRetry?: () => void; onUpdate: () => void }) {
  const title = kind === "empty" ? copy.empty.title : copy.error.title;
  const body = kind === "empty" ? copy.empty.body : copy.error.body;

  return (
    <section className="rp-list-card rp-state-panel" aria-labelledby={`rp-${kind}-title`}>
      <h2 id={`rp-${kind}-title`}>{title}</h2>
      <p>{body}</p>
      <div className="rp-state-actions">
        {kind === "error" ? (
          <button type="button" className="rp-primary-small" onClick={onRetry}>
            {copy.error.retry}
          </button>
        ) : (
          <button type="button" className="rp-primary-small" onClick={onUpdate}>
            {copy.cta.secondary}
          </button>
        )}
        <button type="button" className="rp-link-button" onClick={onUpdate}>
          {kind === "empty" ? copy.empty.broker : copy.cta.secondary}
        </button>
      </div>
    </section>
  );
}
