// Spec: results-page-spec.md §7.2 (C2 hero)
import type { LenderResult } from "../engine/types";
import { fmtPrice } from "../lib/format";
import { copy } from "../lib/copy";

interface HeroProps {
  leader: LenderResult | null;
  asAt: string;
  loading?: boolean;
  onExplain: () => void;
}

export function Hero({ leader, asAt, loading = false, onExplain }: HeroProps) {
  const price = leader ? fmtPrice(leader.maxPrice) : "—";

  return (
    <section className="rp-hero" aria-labelledby="rp-hero-title">
      <div className="rp-eyebrow">{copy.hero.eyebrow}</div>
      <h1 id="rp-hero-title">{copy.hero.h1}</h1>
      <div className={`rp-hero-figure${loading ? " is-loading" : ""}`} aria-label={leader ? copy.hero.support(price) : copy.empty.hero}>
        {loading ? "" : price}
      </div>
      <p>{loading ? copy.loading.checking(8) : leader ? copy.hero.support(price) : copy.empty.hero}</p>
      <button type="button" className="rp-disclaimer" onClick={onExplain}>
        {copy.hero.disclaimer(asAt || "fixture date")}
      </button>
    </section>
  );
}
