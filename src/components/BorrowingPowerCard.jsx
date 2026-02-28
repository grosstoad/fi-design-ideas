import { Link } from "react-router-dom";

const lenderRows = [
  { lender: "Macquarie Bank", value: 2520000, brandColor: "#133C66" },
  { lender: "Commonwealth Bank", value: 2435000, brandColor: "#FFCC00" },
  { lender: "National Australia Bank", value: 2340000, brandColor: "#D71920" },
  { lender: "Westpac", value: 2265000, brandColor: "#B5121B" }
];

const scenarioRows = [
  "Close card debt: +A$236K",
  "Increase annual income: +A$244K",
  "Boost deposit by A$20K: +A$75K"
];

const currency = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0
});

function formatCompact(value) {
  if (value >= 1_000_000) {
    return `A$${(value / 1_000_000).toFixed(2)}M`;
  }

  if (value >= 1_000) {
    return `A$${Math.round(value / 1_000)}K`;
  }

  return `A$${value}`;
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
  const start = mixHex(brandHex, "#6f6f68", 0.58);
  const end = mixHex(brandHex, "#0d0d0d", 0.72);
  return `linear-gradient(90deg, ${start} 0%, ${end} 100%)`;
}

function BorrowingPowerCard({ showAction = true }) {
  const maxValue = Math.max(...lenderRows.map((row) => row.value));

  return (
    <article className="borrowing-card" aria-label="Borrowing power example card">
      <header className="borrowing-card-head">
        <div>
          <p className="mono borrowing-kicker">BORROWING POWER // EXAMPLE</p>
          <h3>What your profile can unlock.</h3>
          <p className="borrowing-subtext">
            Updated lender spread from the original borrowing-power visualization, restyled to match FundIQ.
          </p>
        </div>
        <div className="borrowing-max">{currency.format(lenderRows[0].value)}</div>
      </header>

      <div className="borrow-list">
        {lenderRows.map((row) => (
          <div className="borrow-row" key={row.lender}>
            <div className="borrow-meta mono">
              <span>{row.lender}</span>
              <span>{formatCompact(row.value)}</span>
            </div>
            <div className="borrow-track">
              <div
                className="borrow-fill"
                style={{
                  width: `${(row.value / maxValue) * 100}%`,
                  background: getMutedBrandGradient(row.brandColor)
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="borrow-divider" />

      <div className="borrow-scenarios">
        {scenarioRows.map((scenario) => (
          <div key={scenario} className="mono borrow-scenario-row">
            <span>{scenario}</span>
          </div>
        ))}
      </div>

      {showAction ? (
        <Link to="/insights" className="btn-primary borrow-card-action">
          Open Full Borrowing Intelligence
        </Link>
      ) : null}
    </article>
  );
}

export default BorrowingPowerCard;
