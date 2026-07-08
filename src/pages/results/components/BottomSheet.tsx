// Spec: results-page-spec.md §10.4 (mobile bottom sheet)
import { useEffect } from "react";
import type { ReactNode } from "react";
import { copy } from "../lib/copy";

interface BottomSheetProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function BottomSheet({ title, children, onClose }: BottomSheetProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("rp-scroll-locked");
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("rp-scroll-locked");
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="rp-mobile-sheet" role="dialog" aria-modal="true" aria-label={`${copy.card.selected}: ${title}`}>
      <button type="button" className="rp-mobile-scrim" aria-label={copy.update.cancel} onClick={onClose} />
      <div className="rp-mobile-sheet-panel">
        <div className="rp-sheet-handle" aria-hidden="true" />
        <button className="rp-close-button" type="button" aria-label={copy.update.cancel} onClick={onClose}>
          ×
        </button>
        <div className="rp-eyebrow">{copy.card.selected}</div>
        {children}
      </div>
    </div>
  );
}
