const topLenders = [
  { name: "Macquarie Bank", short: "Macquarie", amountM: 2.52, brandColor: "#133C66" },
  { name: "Commonwealth Bank", short: "CBA", amountM: 2.44, brandColor: "#FFCC00" },
  { name: "National Australia Bank", short: "NAB", amountM: 2.34, brandColor: "#D71920" }
];

const marketSegments = [
  { label: "Entry homes (<A$700k)", percent: 61 },
  { label: "Family homes (A$700k - A$1.2M)", percent: 24 },
  { label: "Premium homes (>A$1.2M)", percent: 11 }
];

const stateName = "Victoria";
const reachablePercent = 27;

function formatMillions(value) {
  return `A$${value.toFixed(2)}M`;
}

function hexToRgb(hex) {
  const raw = hex.replace("#", "").trim();
  const normalized = raw.length === 3 ? raw.split("").map((char) => `${char}${char}`).join("") : raw;

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return { r: 13, g: 13, b: 13 };
  }

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16)
  };
}

function rgbToHex({ r, g, b }) {
  const toHex = (value) => value.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixHex(fromHex, toHex, ratio) {
  const from = hexToRgb(fromHex);
  const to = hexToRgb(toHex);

  return rgbToHex({
    r: Math.round(from.r + (to.r - from.r) * ratio),
    g: Math.round(from.g + (to.g - from.g) * ratio),
    b: Math.round(from.b + (to.b - from.b) * ratio)
  });
}

function getMutedBrandGradient(brandHex) {
  const start = mixHex(brandHex, "#7a7a73", 0.48);
  const end = mixHex(brandHex, "#0d0d0d", 0.7);
  return `linear-gradient(90deg, ${start} 0%, ${end} 100%)`;
}

function InstagramAffordabilityCard() {
  const maxBorrowingPowerM = topLenders[0].amountM;
  const maxLenderAmountM = Math.max(...topLenders.map((lender) => lender.amountM));

  return (
    <article className="instagram-card" aria-label="My homebuying reach card">
      <header className="instagram-card-header">
        <span className="mono instagram-card-tag">[ MY HOMEBUYING REACH ]</span>
        <span className="mono instagram-card-handle">@FUNDIQ.AI</span>
      </header>

      <section className="instagram-power-block">
        <div className="mono instagram-kicker">MAX BORROWING POWER</div>
        <h2>{formatMillions(maxBorrowingPowerM)}</h2>
        <p>
          Based on my current profile, I can target around <strong>{reachablePercent}%</strong> of active listings in{" "}
          {stateName}.
        </p>
      </section>

      <section className="instagram-panel">
        <div className="instagram-panel-head">
          <h3>Top 3 lenders likely to lend</h3>
        </div>
        <div className="instagram-lender-list">
          {topLenders.map((lender, index) => (
            <div className="instagram-lender-row" key={lender.name}>
              <div className="mono instagram-lender-meta">
                <span>
                  {index + 1}. {lender.short}
                </span>
                <span>{formatMillions(lender.amountM)}</span>
              </div>
              <div className="instagram-lender-track">
                <div
                  className="instagram-lender-fill"
                  style={{
                    width: `${(lender.amountM / maxLenderAmountM) * 100}%`,
                    background: getMutedBrandGradient(lender.brandColor)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="instagram-panel">
        <div className="instagram-panel-head">
          <h3>Property reach in {stateName}</h3>
          <span className="mono instagram-reach-pill">{reachablePercent}% within reach</span>
        </div>

        <div className="instagram-reach-track">
          <div className="instagram-reach-fill" style={{ width: `${reachablePercent}%` }} />
        </div>

        <div className="instagram-market-grid">
          {marketSegments.map((segment) => (
            <div className="instagram-market-row" key={segment.label}>
              <div className="mono instagram-market-meta">
                <span>{segment.label}</span>
                <span>{segment.percent}%</span>
              </div>
              <div className="instagram-market-track">
                <div className="instagram-market-fill" style={{ width: `${segment.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="instagram-card-footer">
        <span className="mono">Share snapshot format 4:5</span>
        <span className="mono">#HomebuyingReach #FundIQ</span>
      </footer>
    </article>
  );
}

export default InstagramAffordabilityCard;
