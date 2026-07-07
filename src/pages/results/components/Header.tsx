// Spec: results-page-spec.md §7.1 (C1 header)
import { copy } from "../lib/copy";

interface HeaderProps {
  onSaveExit: () => void;
}

export function Header({ onSaveExit }: HeaderProps) {
  return (
    <header className="rp-header">
      <button className="rp-back-button" type="button" aria-label="Back">
        ‹
      </button>
      <div className="rp-wordmark">{copy.brand}</div>
      <button className="rp-save-exit" type="button" onClick={onSaveExit}>
        {copy.header.saveExit}
      </button>
      <div className="rp-progress" aria-hidden="true">
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </header>
  );
}
