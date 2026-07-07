// Spec: results-page-spec.md §7.3a (sort control)
import { useId, useState } from "react";
import type { SortKey } from "../hooks/useResults";
import { copy } from "../lib/copy";

const OPTIONS: SortKey[] = ["maxPrice", "monthlyRepayment", "rate", "comparisonRate", "maxLoan", "lvr", "funds"];

interface SortControlProps {
  sortBy: SortKey;
  onChange: (sortBy: SortKey) => void;
}

export function sortLabel(sortBy: SortKey) {
  return copy.sort.options[sortBy].toLowerCase();
}

export function SortControl({ sortBy, onChange }: SortControlProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  return (
    <div className="rp-sort">
      <button className="rp-link-button" type="button" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
        {copy.list.sort}
      </button>
      {open ? (
        <>
          <button className="rp-sort-scrim" type="button" aria-label={copy.update.cancel} onClick={() => setOpen(false)} />
          <div className="rp-sort-popover" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <div className="rp-sheet-handle" aria-hidden="true" />
            <h2 id={titleId}>{copy.sort.title}</h2>
            <p>{copy.sort.caption}</p>
            <div role="radiogroup" aria-label={copy.sort.title} className="rp-sort-options">
              {OPTIONS.map((option) => (
                <button
                  className="rp-sort-option"
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={sortBy === option}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  <span>{copy.sort.options[option]}</span>
                  <span className="rp-radio" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
