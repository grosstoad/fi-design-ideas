// Spec: results-page-spec.md §7.4 (C3 lender row)
import { useMemo, useRef, useState } from "react";
import type { LenderResult } from "../engine/types";
import type { SortKey } from "../hooks/useResults";
import { copy } from "../lib/copy";
import { fmtPrice } from "../lib/format";
import { SortControl, sortLabel } from "./SortControl";

interface LenderListProps {
  lenders: LenderResult[];
  leader: LenderResult | null;
  selectedId: string | null;
  sortBy: SortKey;
  isRecalculating?: boolean;
  partialFailures?: number;
  onSelect: (id: string) => void;
  onSortChange: (sortBy: SortKey) => void;
}

export function LenderList({
  lenders,
  leader,
  selectedId,
  sortBy,
  isRecalculating = false,
  partialFailures = 0,
  onSelect,
  onSortChange,
}: LenderListProps) {
  const [expanded, setExpanded] = useState(false);
  const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const visible = expanded ? lenders : lenders.slice(0, 6);
  const maxPrice = leader?.maxPrice ?? lenders[0]?.maxPrice ?? 1;
  const selectedRank = useMemo(() => lenders.findIndex((lender) => lender.id === selectedId) + 1, [lenders, selectedId]);
  const selectedOutside = selectedRank > 6 ? lenders[selectedRank - 1] : null;

  function moveSelection(index: number) {
    const next = lenders[Math.max(0, Math.min(lenders.length - 1, index))];
    if (!next) return;
    onSelect(next.id);
    requestAnimationFrame(() => rowRefs.current[next.id]?.focus());
  }

  return (
    <section className="rp-list-card" aria-labelledby="rp-list-title">
      <div className="rp-list-head">
        <h2 id="rp-list-title">{copy.list.title}</h2>
        <div className="rp-sort-row">
          <span>{copy.list.sortNote(sortLabel(sortBy))}</span>
          <SortControl sortBy={sortBy} onChange={onSortChange} />
        </div>
      </div>

      <div className="rp-listbox" role="listbox" aria-label={copy.list.ariaLabel}>
        {visible.map((lender, index) => {
          const rank = lenders.findIndex((item) => item.id === lender.id) + 1;
          const selected = lender.id === selectedId;
          const width = `${Math.min(100, (lender.maxPrice / (maxPrice * 1.08)) * 100)}%`;
          return (
            <button
              key={lender.id}
              ref={(node) => {
                rowRefs.current[lender.id] = node;
              }}
              type="button"
              className={`rp-lender-row${selected ? " is-selected" : ""}${isRecalculating ? " is-shimmering" : ""}`}
              role="option"
              aria-selected={selected}
              aria-label={`${rank}. ${lender.name}, max property price ${fmtPrice(lender.maxPrice)}`}
              onClick={() => onSelect(lender.id)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  moveSelection(rank);
                }
                if (event.key === "ArrowUp") {
                  event.preventDefault();
                  moveSelection(rank - 2);
                }
              }}
            >
              <span className="rp-rank">{rank}</span>
              <span className="rp-name">{lender.name}</span>
              <span className="rp-bar" aria-hidden="true">
                <i style={{ width, backgroundColor: lender.colour }} />
              </span>
              <strong>{fmtPrice(lender.maxPrice)}</strong>
              <span className="rp-chevron" aria-hidden="true">
                ›
              </span>
            </button>
          );
        })}
      </div>

      {lenders.length > 6 ? (
        <>
          <button className="rp-view-all" type="button" onClick={() => setExpanded((value) => !value)}>
            {expanded ? copy.list.viewFewer : copy.list.viewAll(lenders.length)}
          </button>
          {!expanded && selectedOutside ? <p className="rp-selected-note">{copy.list.selectedOutside(selectedOutside.name, selectedRank)}</p> : null}
        </>
      ) : null}

      {partialFailures > 0 ? <p className="rp-partial">{partialFailures} lenders couldn't be checked right now.</p> : null}
    </section>
  );
}
