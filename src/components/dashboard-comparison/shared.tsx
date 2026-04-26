import { useEffect, useRef, useState } from "react";

export const dashboardColors = {
  page: "#fafafa",
  card: "#ffffff",
  border: "#e8e8e8",
  shadow: "0 1px 3px rgba(0,0,0,0.04)",
  title: "#111827",
  text: "#111827",
  muted: "#6b7280",
  subtle: "#9ca3af",
  grid: "#f0f0f0",
  axis: "#e8e8e8",
  athena: "#5046e5",
  blue: "#3b82f6",
  blueMid: "#93bbfd",
  purple: "#8b5cf6",
  green: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
};

export const borrowingPowerData = [
  { lender: "Athena", value: 920000, color: "#5046e5" },
  { lender: "Macquarie", value: 885000, color: "#111111" },
  { lender: "ING", value: 860000, color: "#ff6200" },
  { lender: "CBA", value: 845000, color: "#ffcc00" },
  { lender: "ANZ", value: 830000, color: "#003087" },
];

export const fundIqPurchasePowerData = [
  { lender: "Macquarie", value: 2520000, color: "#355C84" },
  { lender: "CBA", value: 2450000, color: "#DFC56F" },
  { lender: "NAB", value: 2385000, color: "#E28D90" },
  { lender: "Westpac", value: 2320000, color: "#D68588" },
  { lender: "ANZ", value: 2245000, color: "#8CB1D8" },
  { lender: "ING", value: 2120000, color: "#F2B187" },
];

export const fundIqWaterfallSources = [
  { key: "savings", label: "Savings", value: 380000, percent: 11, color: "#8FAED0", group: "Customer funds" },
  { key: "equity", label: "Existing equity", value: 540000, percent: 15, color: "#6E92BD", group: "Customer funds" },
  { key: "loan", label: "Loan amount", value: 2550000, percent: 72, color: "#86A98F", group: "Bank funding" },
  { key: "grant", label: "Government grant", value: 90000, percent: 2, color: "#D7BE7B", group: "Government support" },
];

export const fundIqWaterfallUses = [
  { key: "property", label: "Property price", value: 3100000, percent: 87, color: "#3C4653", group: "Property" },
  { key: "stamp", label: "Stamp duty", value: 140000, percent: 4, color: "#D7BE7B", group: "Government charges" },
  { key: "legal", label: "Transfer + legal fees", value: 18000, percent: 1, color: "#A8B7C5", group: "Other" },
  { key: "lender", label: "Lender fees + setup", value: 12000, percent: 0.3, color: "#8FB7AA", group: "Lender costs" },
  { key: "buffer", label: "Cash buffer", value: 290000, percent: 8, color: "#D5D8DD", group: "Other" },
];

export const fundIqSourceLegend = [
  { label: "Customer funds", color: "#7D9FC6" },
  { label: "Bank funding", color: "#86A98F" },
  { label: "Government support", color: "#D7BE7B" },
];

export const fundIqUseLegend = [
  { label: "Property", color: "#3C4653" },
  { label: "Government charges", color: "#D7BE7B" },
  { label: "Lender costs", color: "#8FB7AA" },
  { label: "Other", color: "#A8B7C5" },
];

export const rateVsMarketData = [
  { month: "Jan", athena: 5.89, median: 6.34, market25: 6.55, market75: 6.15 },
  { month: "Feb", athena: 5.84, median: 6.29, market25: 6.5, market75: 6.1 },
  { month: "Mar", athena: 5.79, median: 6.24, market25: 6.46, market75: 6.05 },
  { month: "Apr", athena: 5.74, median: 6.19, market25: 6.41, market75: 6.01 },
  { month: "May", athena: 5.69, median: 6.14, market25: 6.36, market75: 5.96 },
  { month: "Jun", athena: 5.65, median: 6.09, market25: 6.31, market75: 5.92 },
  { month: "Jul", athena: 5.61, median: 6.05, market25: 6.27, market75: 5.88 },
  { month: "Aug", athena: 5.56, median: 6.0, market25: 6.22, market75: 5.83 },
  { month: "Sep", athena: 5.52, median: 5.96, market25: 6.17, market75: 5.79 },
  { month: "Oct", athena: 5.48, median: 5.92, market25: 6.12, market75: 5.74 },
  { month: "Nov", athena: 5.44, median: 5.88, market25: 6.08, market75: 5.7 },
  { month: "Dec", athena: 5.39, median: 5.84, market25: 6.03, market75: 5.66 },
].map((point) => ({
  ...point,
  bandSize: Number((point.market25 - point.market75).toFixed(2)),
}));

export const settlementsData = [
  { month: "Jul", volume: 135, value: 63.8 },
  { month: "Aug", volume: 148, value: 68.4 },
  { month: "Sep", volume: 154, value: 72.1 },
  { month: "Oct", volume: 167, value: 79.8 },
  { month: "Nov", volume: 176, value: 84.2 },
  { month: "Dec", volume: 189, value: 91.4 },
  { month: "Jan", volume: 198, value: 96.8 },
  { month: "Feb", volume: 214, value: 101.7 },
  { month: "Mar", volume: 221, value: 106.2 },
  { month: "Apr", volume: 229, value: 111.5 },
  { month: "May", volume: 236, value: 116.1 },
  { month: "Jun", volume: 240, value: 118.6 },
];

export const funnelData = [
  { stage: "Applications", value: 2840, opacity: 1 },
  { stage: "Pre-approved", value: 2130, opacity: 0.87 },
  { stage: "Full Assessment", value: 1560, opacity: 0.74 },
  { stage: "Cond. Approved", value: 1190, opacity: 0.61 },
  { stage: "Uncond. Approved", value: 980, opacity: 0.48 },
  { stage: "Settled", value: 820, opacity: 0.35 },
];

export const lvrData = [
  { band: "0-60%", loans: 320, color: "#10b981", label: "Low" },
  { band: "60-70%", loans: 480, color: "#3b82f6", label: "Standard" },
  { band: "70-80%", loans: 890, color: "#93bbfd", label: "Standard" },
  { band: "80-85%", loans: 410, color: "#f59e0b", label: "Elevated" },
  { band: "85-90%", loans: 180, color: "#f43f5e", label: "High" },
  { band: "90%+", loans: 60, color: "#f43f5e", label: "High" },
];

export const cardStats = {
  borrowing: [
    { label: "Max Borrowing (Athena)", value: "$920k", tone: dashboardColors.athena },
    { label: "Range (Top 5)", value: "$830k - $920k" },
  ],
  rate: [
    { label: "Athena", value: "5.39%", tone: dashboardColors.blue },
    { label: "Market Median", value: "5.84%" },
  ],
  settlements: [
    { label: "Latest Volume", value: "240", tone: dashboardColors.blue },
    { label: "Latest Value", value: "$118.6M" },
  ],
  funnel: [
    { label: "Applications", value: "2,840", tone: dashboardColors.blue },
    { label: "Settled", value: "820" },
    { label: "Conversion", value: "28.9%" },
  ],
  lvr: [
    { label: "Weighted Avg", value: "72.4%", tone: dashboardColors.blue },
    { label: "Total Loans", value: "2,340" },
  ],
};

export const legends = {
  rate: [
    { label: "Athena", type: "line", color: dashboardColors.blue },
    { label: "Median", type: "dashed", color: dashboardColors.purple },
    { label: "25th-75th pctl", type: "square", color: "rgba(139, 92, 246, 0.14)" },
  ],
  settlements: [
    { label: "Volume", type: "square", color: "rgba(59, 130, 246, 0.35)" },
    { label: "Value", type: "square", color: dashboardColors.blue },
  ],
  lvr: [
    { label: "Low", type: "square", color: dashboardColors.green },
    { label: "Standard", type: "square", color: dashboardColors.blue },
    { label: "Elevated", type: "square", color: dashboardColors.amber },
    { label: "High", type: "square", color: dashboardColors.rose },
  ],
};

export function formatAxisK(value: number) {
  return `$${Math.round(value / 1000)}k`;
}

export function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-AU")}`;
}

export function formatMillions(value: number) {
  return `$${value.toFixed(1)}M`;
}

export function formatCompactMoney(value: number) {
  if (value >= 1000000) {
    const millions = value / 1000000;
    return `$${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(2)}M`;
  }

  if (value >= 1000) {
    const thousands = value / 1000;
    return `$${thousands % 1 === 0 ? thousands.toFixed(0) : thousands.toFixed(1)}K`;
  }

  return formatCurrency(value);
}

export function formatRate(value: number, digits = 2) {
  return `${value.toFixed(digits)}%`;
}

export function compactInt(value: number) {
  return value.toLocaleString("en-AU");
}

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

type StatItem = {
  label: string;
  value: string;
  tone?: string;
};

type LegendItem = {
  label: string;
  type: string;
  color: string;
};

export function DashboardSection({
  library,
  note,
  children,
}: {
  library: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="dashboard-comparison__section">
      <div className="dashboard-comparison__section-meta">
        <span className="dashboard-comparison__eyebrow">{library}</span>
        <p>{note}</p>
      </div>
      {children}
    </section>
  );
}

export function DashboardShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-shell">
      <div className="dashboard-shell__header">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="dashboard-shell__filters" aria-hidden="true">
          <FakeSelect label="Owner Occupied" />
          <FakeSelect label="Last 12 months" />
        </div>
      </div>
      <div className="dashboard-shell__grid">{children}</div>
    </div>
  );
}

function FakeSelect({ label }: { label: string }) {
  return (
    <div className="dashboard-shell__select">
      <span>{label}</span>
      <svg viewBox="0 0 12 12" aria-hidden="true">
        <path d="M2.25 4.5 6 8.25 9.75 4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function DashboardCard({
  title,
  stats,
  legend,
  fullWidth = false,
  chartClassName,
  children,
}: {
  title: string;
  stats: StatItem[];
  legend?: LegendItem[];
  fullWidth?: boolean;
  chartClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <article className={cx("dashboard-card", fullWidth && "dashboard-card--full")}>
      <header className="dashboard-card__header">
        <h3>{title}</h3>
      </header>
      <div className="dashboard-card__stats">
        {stats.map((stat) => (
          <div key={stat.label} className="dashboard-card__stat">
            <strong style={{ color: stat.tone ?? dashboardColors.text }}>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      <div className={cx("dashboard-card__chart", chartClassName)}>{children}</div>
      {legend ? <LegendRow items={legend} /> : null}
    </article>
  );
}

function LegendRow({ items }: { items: LegendItem[] }) {
  return (
    <div className="dashboard-card__legend">
      {items.map((item) => (
        <span key={item.label} className="dashboard-card__legend-item">
          {item.type === "line" ? <i className="legend-line" style={{ backgroundColor: item.color }} /> : null}
          {item.type === "dashed" ? <i className="legend-line legend-line--dashed" style={{ backgroundColor: item.color }} /> : null}
          {item.type === "square" ? <i className="legend-square" style={{ backgroundColor: item.color }} /> : null}
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function ComparisonPageShell({
  children,
  title = "Lending Analytics",
  subtitle = "Same layout, same data, same design target. Version A uses Recharts. Version B uses raw SVG with D3 scales and shapes as the practical fallback for Polaris Viz.",
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <main className="dashboard-comparison-page">
      <div className="dashboard-comparison-page__intro">
        <span className="dashboard-comparison-page__eyebrow">Library Comparison</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children}
    </main>
  );
}

export function useChartSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const nextWidth = element.clientWidth;
      const nextHeight = element.clientHeight;
      setSize((current) =>
        current.width === nextWidth && current.height === nextHeight
          ? current
          : { width: nextWidth, height: nextHeight },
      );
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, size };
}

export function SvgCanvas({
  height,
  children,
  className,
}: {
  height: number;
  children: (size: { width: number; height: number }) => React.ReactNode;
  className?: string;
}) {
  const { ref, size } = useChartSize<HTMLDivElement>();
  const ready = size.width > 0;

  return (
    <div ref={ref} className={cx("svg-canvas", className)} style={{ height }}>
      {ready ? children({ width: size.width, height }) : null}
    </div>
  );
}

export function TooltipCard({
  title,
  items,
  style,
}: {
  title: string;
  items: Array<{ label: string; value: string; color: string }>;
  style?: React.CSSProperties;
}) {
  return (
    <div className="dashboard-tooltip" style={style}>
      <div className="dashboard-tooltip__title">{title}</div>
      <div className="dashboard-tooltip__rows">
        {items.map((item) => (
          <div key={item.label} className="dashboard-tooltip__row">
            <span className="dashboard-tooltip__label">
              <i style={{ backgroundColor: item.color }} />
              {item.label}
            </span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export function getD3ChartBox(width: number, height: number, margin: { top: number; right: number; bottom: number; left: number }) {
  return {
    innerWidth: Math.max(width - margin.left - margin.right, 10),
    innerHeight: Math.max(height - margin.top - margin.bottom, 10),
    margin,
  };
}
