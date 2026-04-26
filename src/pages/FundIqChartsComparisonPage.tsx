import { scaleBand, scaleLinear } from "d3-scale";
import { Sankey, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ComparisonPageShell,
  DashboardCard,
  SvgCanvas,
  TooltipCard,
  compactInt,
  cx,
  dashboardColors,
  formatCompactMoney,
  fundIqPurchasePowerData,
  fundIqSourceLegend,
  fundIqUseLegend,
  fundIqWaterfallSources,
  fundIqWaterfallUses,
  getD3ChartBox,
} from "../components/dashboard-comparison/shared";

const axisStyle = { fontSize: 11, fill: dashboardColors.subtle };
const chartFont = '"Neue Montreal", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const totalFunds = fundIqWaterfallSources.reduce((sum, item) => sum + item.value, 0);

const purchasePowerStats = [
  { label: "Top lender", value: formatCompactMoney(fundIqPurchasePowerData[0].value), tone: fundIqPurchasePowerData[0].color },
  {
    label: "Range",
    value: `${formatCompactMoney(fundIqPurchasePowerData[fundIqPurchasePowerData.length - 1].value)} - ${formatCompactMoney(fundIqPurchasePowerData[0].value)}`,
  },
];

const waterfallStats = [
  { label: "Total funds", value: formatCompactMoney(totalFunds), tone: "#3C4653" },
  { label: "Sources", value: compactInt(fundIqWaterfallSources.length) },
  { label: "Uses", value: compactInt(fundIqWaterfallUses.length) },
];

const sankeyNodes = [
  ...fundIqWaterfallSources.map((item) => ({ ...item, name: item.label })),
  { key: "total", name: "Total funds", label: "Total funds", value: totalFunds, color: "#E7EBEF", group: "Total" },
  ...fundIqWaterfallUses.map((item) => ({ ...item, name: item.label })),
];

const totalIndex = fundIqWaterfallSources.length;
const sankeyLinks = [
  ...fundIqWaterfallSources.map((item, index) => ({
    source: index,
    target: totalIndex,
    value: item.value,
    color: item.color,
    label: item.label,
  })),
  ...fundIqWaterfallUses.map((item, index) => ({
    source: totalIndex,
    target: totalIndex + 1 + index,
    value: item.value,
    color: item.color,
    label: item.label,
  })),
];

function RechartsPurchaseTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="chart-tooltip-shell">
      <TooltipCard
        title={row.lender}
        items={[{ label: "Purchase power", value: formatCompactMoney(row.value), color: row.color }]}
      />
    </div>
  );
}

function RechartsWaterfallTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const entry = payload[0]?.payload ?? payload[0];
  if (entry?.source && entry?.target) {
    return (
      <div className="chart-tooltip-shell">
        <TooltipCard
          title={`${entry.source.name} → ${entry.target.name}`}
          items={[{ label: "Flow", value: formatCompactMoney(entry.value), color: entry.color ?? entry.target.color ?? entry.source.color ?? "#A8B7C5" }]}
        />
      </div>
    );
  }
  return null;
}

function RechartsPurchasePowerChart() {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart
        data={fundIqPurchasePowerData}
        layout="vertical"
        margin={{ top: 6, right: 18, bottom: 18, left: 18 }}
        barCategoryGap={12}
      >
        <CartesianGrid stroke={dashboardColors.grid} strokeDasharray="3 3" horizontal={false} />
        <XAxis
          type="number"
          domain={[1900000, 2600000]}
          tickFormatter={formatCompactMoney}
          tick={axisStyle}
          tickLine={false}
          axisLine={{ stroke: dashboardColors.axis }}
        />
        <YAxis
          type="category"
          dataKey="lender"
          width={94}
          tick={axisStyle}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip cursor={{ fill: "rgba(53, 92, 132, 0.04)" }} content={<RechartsPurchaseTooltip />} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={26}>
          {fundIqPurchasePowerData.map((entry) => (
            <Cell key={entry.lender} fill={entry.color} fillOpacity={0.9} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function RechartsWaterfallNode(props: any) {
  const { x, y, width, height, payload } = props;
  const isSource = payload.depth === 0;
  const isUse = payload.depth >= 2;
  const isTotal = payload.name === "Total funds";
  const fill = payload.color ?? "#D5D8DD";
  const labelValue = payload.name === "Total funds" ? formatCompactMoney(totalFunds) : `${formatCompactMoney(payload.value)} (${payload.percent ? `${payload.percent}%` : "<1%"})`;

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={isTotal ? 0 : 2} fill={isTotal ? "#E7EBEF" : fill} />
      {isSource ? (
        <text x={x - 10} y={y + height / 2} textAnchor="end" dominantBaseline="middle" fill={dashboardColors.text} fontSize={10.5}>
          <tspan>{payload.name}</tspan>
          <tspan x={x - 10} dy={12} fill={dashboardColors.subtle} fontFamily={chartFont}>
            {labelValue}
          </tspan>
        </text>
      ) : null}
      {isUse ? (
        <text x={x + width + 10} y={y + height / 2} textAnchor="start" dominantBaseline="middle" fill={dashboardColors.text} fontSize={10.5}>
          <tspan>{payload.name}</tspan>
          <tspan x={x + width + 10} dy={12} fill={dashboardColors.subtle} fontFamily={chartFont}>
            {labelValue}
          </tspan>
        </text>
      ) : null}
      {isTotal ? (
        <text x={x + width + 12} y={y - 8} textAnchor="start" fill={dashboardColors.text} fontSize={11}>
          <tspan>Total funds </tspan>
          <tspan fontFamily={chartFont}>{formatCompactMoney(totalFunds)}</tspan>
        </text>
      ) : null}
    </g>
  );
}

function RechartsWaterfallLink(props: any) {
  const { sourceX, targetX, sourceY, targetY, sourceControlX, targetControlX, linkWidth, payload } = props;
  const half = linkWidth / 2;
  const path = `
    M${sourceX},${sourceY - half}
    C${sourceControlX},${sourceY - half} ${targetControlX},${targetY - half} ${targetX},${targetY - half}
    L${targetX},${targetY + half}
    C${targetControlX},${targetY + half} ${sourceControlX},${sourceY + half} ${sourceX},${sourceY + half}
    Z
  `;

  return <path d={path} fill={payload.color ?? "#C8D0D9"} fillOpacity={0.68} stroke="none" />;
}

function RechartsWaterfallChart() {
  return (
    <>
      <div className="fundiq-legend-group" style={{ margin: "0 0 10px" }}>
        <span style={{ width: "100%", color: dashboardColors.subtle }}>Sources</span>
        {fundIqSourceLegend.map((item) => (
          <span key={item.label}>
            <i style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
      <div className="fundiq-legend-group" style={{ margin: "0 0 10px" }}>
        <span style={{ width: "100%", color: dashboardColors.subtle }}>Uses</span>
        {fundIqUseLegend.map((item) => (
          <span key={item.label}>
            <i style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <Sankey
          data={{ nodes: sankeyNodes, links: sankeyLinks }}
          nodePadding={18}
          nodeWidth={14}
          sort={false}
          align="justify"
          linkCurvature={0.42}
          margin={{ top: 26, right: 148, bottom: 12, left: 132 }}
          node={RechartsWaterfallNode}
          link={RechartsWaterfallLink}
        >
          <Tooltip content={<RechartsWaterfallTooltip />} />
        </Sankey>
      </ResponsiveContainer>
    </>
  );
}

function D3PurchasePowerChart() {
  const [active, setActive] = useState<null | { x: number; y: number; lender: string; value: number; color: string }>(null);

  return (
    <SvgCanvas height={230}>
      {({ width, height }) => {
        const frame = getD3ChartBox(width, height, { top: 6, right: 34, bottom: 28, left: 110 });
        const x = scaleLinear().domain([1900000, 2600000]).range([0, frame.innerWidth]);
        const y = scaleBand().domain(fundIqPurchasePowerData.map((item) => item.lender)).range([0, frame.innerHeight]).paddingInner(0.2);
        const ticks = [1900000, 2100000, 2300000, 2500000];

        return (
          <>
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" role="img" aria-label="Purchase power by lender, D3 implementation">
              <g transform={`translate(${frame.margin.left},${frame.margin.top})`}>
                {ticks.map((tick) => (
                  <g key={tick} transform={`translate(${x(tick)},0)`}>
                    <line y1={0} y2={frame.innerHeight} stroke={dashboardColors.grid} strokeDasharray="3 3" />
                    <text x={0} y={frame.innerHeight + 16} fill={dashboardColors.subtle} fontSize={11} textAnchor="middle">
                      {formatCompactMoney(tick)}
                    </text>
                  </g>
                ))}
                <line x1={0} x2={frame.innerWidth} y1={frame.innerHeight} y2={frame.innerHeight} stroke={dashboardColors.axis} />
                {fundIqPurchasePowerData.map((item) => {
                  const top = y(item.lender) ?? 0;
                  const barHeight = y.bandwidth();
                  const barWidth = x(item.value);
                  return (
                    <g
                      key={item.lender}
                      onMouseEnter={() =>
                        setActive({
                          x: frame.margin.left + Math.min(barWidth + 8, frame.innerWidth - 112),
                          y: frame.margin.top + top + barHeight / 2 - 34,
                          lender: item.lender,
                          value: item.value,
                          color: item.color,
                        })
                      }
                      onMouseLeave={() => setActive(null)}
                    >
                      <text x={-14} y={top + barHeight / 2} textAnchor="end" dominantBaseline="middle" fill={dashboardColors.subtle} fontSize={11}>
                        {item.lender}
                      </text>
                      <path
                        d={`M0 ${top} H${Math.max(barWidth - 4, 0)} a4 4 0 0 1 4 4 V${top + barHeight - 4} a4 4 0 0 1 -4 4 H0 Z`}
                        fill={item.color}
                        fillOpacity={0.9}
                      />
                      <text
                        x={frame.innerWidth + 8}
                        y={top + barHeight / 2}
                        textAnchor="end"
                        dominantBaseline="middle"
                        fill={dashboardColors.subtle}
                        fontSize={11}
                        fontFamily={chartFont}
                      >
                        {formatCompactMoney(item.value)}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
            {active ? (
              <TooltipCard
                title={active.lender}
                items={[{ label: "Purchase power", value: formatCompactMoney(active.value), color: active.color }]}
                style={{ position: "absolute", left: active.x, top: active.y, pointerEvents: "none" }}
              />
            ) : null}
          </>
        );
      }}
    </SvgCanvas>
  );
}

function makeFlowPath(x0: number, x1: number, y0Top: number, y0Bottom: number, y1Top: number, y1Bottom: number) {
  const curve = Math.max((x1 - x0) * 0.45, 24);
  return [
    `M ${x0} ${y0Top}`,
    `C ${x0 + curve} ${y0Top}, ${x1 - curve} ${y1Top}, ${x1} ${y1Top}`,
    `L ${x1} ${y1Bottom}`,
    `C ${x1 - curve} ${y1Bottom}, ${x0 + curve} ${y0Bottom}, ${x0} ${y0Bottom}`,
    "Z",
  ].join(" ");
}

function D3WaterfallChart() {
  const [active, setActive] = useState<null | { title: string; value: string; color: string; x: number; y: number }>(null);

  return (
    <>
      <div className="fundiq-legend-group">
        <span style={{ width: "100%", color: dashboardColors.subtle }}>Sources</span>
        {fundIqSourceLegend.map((item) => (
          <span key={item.label}>
            <i style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
      <div className="fundiq-legend-group">
        <span style={{ width: "100%", color: dashboardColors.subtle }}>Uses</span>
        {fundIqUseLegend.map((item) => (
          <span key={item.label}>
            <i style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
      <SvgCanvas height={252}>
        {({ width, height }) => {
          const frame = getD3ChartBox(width, height, { top: 28, right: 122, bottom: 12, left: 132 });
          const stackHeight = Math.min(frame.innerHeight - 18, 180);
          const offsetTop = 34;
          const sourceX = 18;
          const totalX = Math.max(frame.innerWidth * 0.45, 180);
          const totalWidth = 18;
          const useX = totalX + totalWidth + 88;
          let sourceCursor = offsetTop;
          let centerCursor = offsetTop;
          let useCursor = offsetTop;
          const sourceBands = fundIqWaterfallSources.map((item) => {
            const bandHeight = (item.value / totalFunds) * stackHeight;
            const band = {
              ...item,
              sourceTop: sourceCursor,
              sourceBottom: sourceCursor + bandHeight,
              centerTop: centerCursor,
              centerBottom: centerCursor + bandHeight,
            };
            sourceCursor += bandHeight;
            centerCursor += bandHeight;
            return band;
          });
          const useBands = fundIqWaterfallUses.map((item) => {
            const bandHeight = (item.value / totalFunds) * stackHeight;
            const band = {
              ...item,
              useTop: useCursor,
              useBottom: useCursor + bandHeight,
              centerTop: useCursor,
              centerBottom: useCursor + bandHeight,
            };
            useCursor += bandHeight;
            return band;
          });

          return (
            <>
              <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" role="img" aria-label="Funds waterfall, D3 implementation">
                <g transform={`translate(${frame.margin.left},${frame.margin.top})`}>
                  {sourceBands.map((item) => (
                    <g key={item.key}>
                      <path
                        d={makeFlowPath(sourceX, totalX, item.sourceTop, item.sourceBottom, item.centerTop, item.centerBottom)}
                        fill={item.color}
                        fillOpacity={0.78}
                        onMouseEnter={() =>
                          setActive({
                            title: item.label,
                            value: `${formatCompactMoney(item.value)} (${item.percent}%)`,
                            color: item.color,
                            x: frame.margin.left + totalX - 32,
                            y: frame.margin.top + item.centerTop - 18,
                          })
                        }
                        onMouseLeave={() => setActive(null)}
                      />
                      <text x={sourceX - 10} y={(item.sourceTop + item.sourceBottom) / 2 - 4} textAnchor="end" fill={dashboardColors.text} fontSize={10.5}>
                        {item.label}
                      </text>
                      <text x={sourceX - 10} y={(item.sourceTop + item.sourceBottom) / 2 + 9} textAnchor="end" fill={dashboardColors.subtle} fontSize={10.5} fontFamily={chartFont}>
                        {formatCompactMoney(item.value)} ({item.percent}%)
                      </text>
                    </g>
                  ))}

                  <rect x={totalX} y={offsetTop} width={totalWidth} height={stackHeight} fill="#E7EBEF" />
                  <text x={totalX + totalWidth + 12} y={offsetTop - 8} fill={dashboardColors.text} fontSize={11}>
                    <tspan>Total funds </tspan>
                    <tspan fontFamily={chartFont}>{formatCompactMoney(totalFunds)}</tspan>
                  </text>

                  {useBands.map((item) => (
                    <g key={item.key}>
                      <path
                        d={makeFlowPath(totalX + totalWidth, useX, item.centerTop, item.centerBottom, item.useTop, item.useBottom)}
                        fill={item.color}
                        fillOpacity={0.78}
                        onMouseEnter={() =>
                          setActive({
                            title: item.label,
                            value: `${formatCompactMoney(item.value)} (${item.percent < 1 ? "<1" : item.percent}%)`,
                            color: item.color,
                            x: frame.margin.left + useX - 24,
                            y: frame.margin.top + item.useTop - 18,
                          })
                        }
                        onMouseLeave={() => setActive(null)}
                      />
                      <text x={useX + 12} y={(item.useTop + item.useBottom) / 2 - 4} textAnchor="start" fill={dashboardColors.text} fontSize={10.5}>
                        {item.label}
                      </text>
                      <text x={useX + 12} y={(item.useTop + item.useBottom) / 2 + 9} textAnchor="start" fill={dashboardColors.subtle} fontSize={10.5} fontFamily={chartFont}>
                        {formatCompactMoney(item.value)} ({item.percent < 1 ? "<1" : item.percent}%)
                      </text>
                    </g>
                  ))}
                </g>
              </svg>
              {active ? (
                <TooltipCard
                  title={active.title}
                  items={[{ label: "Flow", value: active.value, color: active.color }]}
                  style={{ position: "absolute", left: active.x, top: active.y, pointerEvents: "none" }}
                />
              ) : null}
            </>
          );
        }}
      </SvgCanvas>
    </>
  );
}

function ChartMethodCard({
  method,
  title,
  stats,
  className,
  children,
}: {
  method: string;
  title: string;
  stats: Array<{ label: string; value: string; tone?: string }>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="fundiq-charts-page__card-label">{method}</div>
      <DashboardCard title={title} stats={stats} chartClassName={className}>
        {children}
      </DashboardCard>
    </div>
  );
}

function ChartsSection({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="fundiq-charts-page__section">
      <div className="fundiq-charts-page__section-header">
        <h2>{title}</h2>
        <p>{note}</p>
      </div>
      <div className="fundiq-charts-page__grid">{children}</div>
    </section>
  );
}

export default function FundIqChartsComparisonPage() {
  return (
    <ComparisonPageShell
      title="FundIQ Chart Comparison"
      subtitle="Purchase power by lender and funds waterfall, shown side by side in Recharts and D3/SVG so you can judge the visual and structural differences directly."
    >
      <div
        style={{
          maxWidth: 1080,
          margin: "0 auto 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
          FundIQ chart bakeoff. Same brief, same data, different rendering approach.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link
            to="/comparison/lending-analytics"
            style={{
              fontSize: 12,
              color: "#111827",
              textDecoration: "none",
              border: "1px solid #e8e8e8",
              borderRadius: 999,
              padding: "8px 12px",
              background: "#fff",
            }}
          >
            Full dashboard comparison
          </Link>
          <Link
            to="/"
            style={{
              fontSize: 12,
              color: "#111827",
              textDecoration: "none",
              border: "1px solid #e8e8e8",
              borderRadius: 999,
              padding: "8px 12px",
              background: "#fff",
            }}
          >
            Back to FundIQ
          </Link>
        </div>
      </div>

      <ChartsSection
        title="Purchase power by lender"
        note="Flat horizontal ranking rendered two ways so spacing, bar treatment, and tooltip behaviour are easy to compare."
      >
        <ChartMethodCard method="Recharts" title="Purchase power by lender" stats={purchasePowerStats} className="fundiq-borrowing-card">
          <RechartsPurchasePowerChart />
        </ChartMethodCard>
        <ChartMethodCard method="D3 / SVG" title="Purchase power by lender" stats={purchasePowerStats} className="fundiq-borrowing-card">
          <D3PurchasePowerChart />
        </ChartMethodCard>
      </ChartsSection>

      <ChartsSection
        title="Funds waterfall"
        note="Sources flow into the conserved total and split into uses, with both implementations shown side by side."
      >
        <ChartMethodCard method="Recharts" title="Funds waterfall" stats={waterfallStats} className={cx("fundiq-waterfall-card")}>
          <RechartsWaterfallChart />
        </ChartMethodCard>
        <ChartMethodCard method="D3 / SVG" title="Funds waterfall" stats={waterfallStats} className={cx("fundiq-waterfall-card")}>
          <D3WaterfallChart />
        </ChartMethodCard>
      </ChartsSection>
    </ComparisonPageShell>
  );
}
