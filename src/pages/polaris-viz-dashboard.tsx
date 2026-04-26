import { max } from "d3-array";
import { scaleBand, scaleLinear, scalePoint } from "d3-scale";
import { area, curveMonotoneX, line } from "d3-shape";
import { useMemo, useState } from "react";
import {
  DashboardCard,
  DashboardSection,
  DashboardShell,
  SvgCanvas,
  TooltipCard,
  borrowingPowerData,
  cardStats,
  compactInt,
  dashboardColors,
  formatAxisK,
  formatMillions,
  formatRate,
  getD3ChartBox,
  legends,
  lvrData,
  rateVsMarketData,
  settlementsData,
  funnelData,
} from "../components/dashboard-comparison/shared";

const monoFont = '"SF Mono", "Fira Code", ui-monospace, monospace';

function AxisLabel({
  x,
  y,
  children,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fill={dashboardColors.subtle}
      fontSize={11}
      textAnchor={anchor}
      dominantBaseline="middle"
    >
      {children}
    </text>
  );
}

function BorrowingPowerSvg() {
  const [active, setActive] = useState<null | { x: number; y: number; lender: string; value: number; color: string }>(null);

  return (
    <SvgCanvas height={240}>
      {({ width, height }) => {
        const frame = getD3ChartBox(width, height, { top: 10, right: 30, bottom: 28, left: 102 });
        const x = scaleLinear().domain([780000, 940000]).range([0, frame.innerWidth]);
        const y = scaleBand()
          .domain(borrowingPowerData.map((item) => item.lender))
          .range([0, frame.innerHeight])
          .paddingInner(0.22);
        const ticks = x.ticks(4);

        return (
          <>
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" role="img" aria-label="Purchase power by lender">
              <g transform={`translate(${frame.margin.left},${frame.margin.top})`}>
                {ticks.map((tick) => (
                  <g key={tick} transform={`translate(${x(tick)},0)`}>
                    <line y1={0} y2={frame.innerHeight} stroke={dashboardColors.grid} strokeDasharray="3 3" />
                    <AxisLabel x={0} y={frame.innerHeight + 16}>
                      {formatAxisK(tick)}
                    </AxisLabel>
                  </g>
                ))}

                <line
                  x1={0}
                  x2={frame.innerWidth}
                  y1={frame.innerHeight}
                  y2={frame.innerHeight}
                  stroke={dashboardColors.axis}
                />

                {borrowingPowerData.map((item) => {
                  const top = y(item.lender) ?? 0;
                  const barHeight = y.bandwidth();
                  const barWidth = x(item.value);
                  return (
                    <g
                      key={item.lender}
                      onMouseEnter={() =>
                        setActive({
                          x: frame.margin.left + Math.min(barWidth + 10, frame.innerWidth - 90),
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
                        fillOpacity={0.85}
                      />
                      <text
                        x={frame.innerWidth + 6}
                        y={top + barHeight / 2}
                        textAnchor="end"
                        dominantBaseline="middle"
                        fill={dashboardColors.subtle}
                        fontSize={11}
                        fontFamily={monoFont}
                      >
                        {formatAxisK(item.value)}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
            {active ? (
              <TooltipCard
                title={active.lender}
                items={[{ label: "Purchase power", value: formatAxisK(active.value), color: active.color }]}
                style={{ position: "absolute", left: active.x, top: active.y, pointerEvents: "none" }}
              />
            ) : null}
          </>
        );
      }}
    </SvgCanvas>
  );
}

function RateVsMarketSvg() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <SvgCanvas height={214}>
      {({ width, height }) => {
        const frame = getD3ChartBox(width, height, { top: 12, right: 12, bottom: 28, left: 42 });
        const x = scalePoint()
          .domain(rateVsMarketData.map((item) => item.month))
          .range([0, frame.innerWidth]);
        const y = scaleLinear().domain([5.2, 6.7]).range([frame.innerHeight, 0]);
        const yTicks = [5.2, 5.6, 6.0, 6.4, 6.7];
        const bandPath = area<(typeof rateVsMarketData)[number]>()
          .x((d) => x(d.month) ?? 0)
          .y0((d) => y(d.market75))
          .y1((d) => y(d.market25))
          .curve(curveMonotoneX)(rateVsMarketData);
        const athenaPath = line<(typeof rateVsMarketData)[number]>()
          .x((d) => x(d.month) ?? 0)
          .y((d) => y(d.athena))
          .curve(curveMonotoneX)(rateVsMarketData);
        const medianPath = line<(typeof rateVsMarketData)[number]>()
          .x((d) => x(d.month) ?? 0)
          .y((d) => y(d.median))
          .curve(curveMonotoneX)(rateVsMarketData);
        const activeRow = activeIndex === null ? null : rateVsMarketData[activeIndex];
        const activeX = activeRow ? x(activeRow.month) ?? 0 : 0;

        return (
          <>
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" role="img" aria-label="Variable rate versus market">
              <g transform={`translate(${frame.margin.left},${frame.margin.top})`}>
                {yTicks.map((tick) => (
                  <g key={tick} transform={`translate(0,${y(tick)})`}>
                    <line x1={0} x2={frame.innerWidth} stroke={dashboardColors.grid} strokeDasharray="3 3" />
                    <AxisLabel x={-10} y={0} anchor="end">
                      {`${tick.toFixed(1)}%`}
                    </AxisLabel>
                  </g>
                ))}
                <line x1={0} x2={frame.innerWidth} y1={frame.innerHeight} y2={frame.innerHeight} stroke={dashboardColors.axis} />
                <line x1={0} x2={0} y1={0} y2={frame.innerHeight} stroke={dashboardColors.axis} />

                <path d={bandPath ?? ""} fill="rgba(139, 92, 246, 0.08)" />
                <path d={medianPath ?? ""} fill="none" stroke={dashboardColors.purple} strokeWidth={1.5} strokeDasharray="6 4" />
                <path d={athenaPath ?? ""} fill="none" stroke={dashboardColors.blue} strokeWidth={2.5} />

                {rateVsMarketData.map((item, index) => {
                  const pointX = x(item.month) ?? 0;
                  return (
                    <g key={item.month}>
                      <AxisLabel x={pointX} y={frame.innerHeight + 16}>
                        {item.month}
                      </AxisLabel>
                      <rect
                        x={pointX - 12}
                        y={0}
                        width={24}
                        height={frame.innerHeight}
                        fill="transparent"
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                      />
                    </g>
                  );
                })}

                {activeRow ? (
                  <>
                    <line x1={activeX} x2={activeX} y1={0} y2={frame.innerHeight} stroke="rgba(59, 130, 246, 0.16)" />
                    <circle cx={activeX} cy={y(activeRow.athena)} r={4} fill={dashboardColors.blue} stroke="#ffffff" strokeWidth={2} />
                  </>
                ) : null}
              </g>
            </svg>
            {activeRow ? (
              <TooltipCard
                title={activeRow.month}
                items={[
                  { label: "Athena", value: formatRate(activeRow.athena), color: dashboardColors.blue },
                  { label: "Median", value: formatRate(activeRow.median), color: dashboardColors.purple },
                  {
                    label: "25th-75th pctl",
                    value: `${formatRate(activeRow.market75)} - ${formatRate(activeRow.market25)}`,
                    color: "rgba(139, 92, 246, 0.14)",
                  },
                ]}
                style={{
                  position: "absolute",
                  left: frame.margin.left + activeX + 12,
                  top: 10,
                  pointerEvents: "none",
                }}
              />
            ) : null}
          </>
        );
      }}
    </SvgCanvas>
  );
}

function SettlementsSvg() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <SvgCanvas height={214}>
      {({ width, height }) => {
        const frame = getD3ChartBox(width, height, { top: 12, right: 48, bottom: 28, left: 40 });
        const x = scaleBand().domain(settlementsData.map((item) => item.month)).range([0, frame.innerWidth]).padding(0.22);
        const yLeft = scaleLinear().domain([0, 250]).range([frame.innerHeight, 0]);
        const yRight = scaleLinear().domain([0, 125]).range([frame.innerHeight, 0]);
        const yTicksLeft = [0, 60, 120, 180, 240];
        const yTicksRight = [0, 40, 80, 120];
        const areaPath = area<(typeof settlementsData)[number]>()
          .x((d) => (x(d.month) ?? 0) + x.bandwidth() / 2)
          .y0(frame.innerHeight)
          .y1((d) => yRight(d.value))
          .curve(curveMonotoneX)(settlementsData);
        const valuePath = line<(typeof settlementsData)[number]>()
          .x((d) => (x(d.month) ?? 0) + x.bandwidth() / 2)
          .y((d) => yRight(d.value))
          .curve(curveMonotoneX)(settlementsData);
        const activeRow = activeIndex === null ? null : settlementsData[activeIndex];
        const activeX = activeRow ? (x(activeRow.month) ?? 0) + x.bandwidth() / 2 : 0;

        return (
          <>
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" role="img" aria-label="Monthly settlements">
              <defs>
                <linearGradient id="d3-settlements-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
                </linearGradient>
              </defs>
              <g transform={`translate(${frame.margin.left},${frame.margin.top})`}>
                {yTicksLeft.map((tick) => (
                  <g key={tick} transform={`translate(0,${yLeft(tick)})`}>
                    <line x1={0} x2={frame.innerWidth} stroke={dashboardColors.grid} strokeDasharray="3 3" />
                    <AxisLabel x={-10} y={0} anchor="end">
                      {tick}
                    </AxisLabel>
                  </g>
                ))}
                <line x1={0} x2={frame.innerWidth} y1={frame.innerHeight} y2={frame.innerHeight} stroke={dashboardColors.axis} />
                <line x1={0} x2={0} y1={0} y2={frame.innerHeight} stroke={dashboardColors.axis} />

                <path d={areaPath ?? ""} fill="url(#d3-settlements-fill)" />
                <path d={valuePath ?? ""} fill="none" stroke={dashboardColors.blue} strokeWidth={2} />

                {settlementsData.map((item, index) => {
                  const barX = x(item.month) ?? 0;
                  const bandWidth = x.bandwidth();
                  const barWidth = Math.min(16, bandWidth);
                  const barLeft = barX + (bandWidth - barWidth) / 2;
                  return (
                    <g key={item.month}>
                      <rect
                        x={barLeft}
                        y={yLeft(item.volume)}
                        width={barWidth}
                        height={frame.innerHeight - yLeft(item.volume)}
                        rx={3}
                        fill="rgba(147, 187, 253, 0.35)"
                      />
                      <AxisLabel x={barX + bandWidth / 2} y={frame.innerHeight + 16}>
                        {item.month}
                      </AxisLabel>
                      <rect
                        x={barX}
                        y={0}
                        width={bandWidth}
                        height={frame.innerHeight}
                        fill="transparent"
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                      />
                    </g>
                  );
                })}

                {yTicksRight.map((tick) => (
                  <AxisLabel key={tick} x={frame.innerWidth + 8} y={yRight(tick)} anchor="start">
                    {`$${tick}M`}
                  </AxisLabel>
                ))}

                {activeRow ? <circle cx={activeX} cy={yRight(activeRow.value)} r={4} fill={dashboardColors.blue} /> : null}
              </g>
            </svg>
            {activeRow ? (
              <TooltipCard
                title={activeRow.month}
                items={[
                  { label: "Volume", value: compactInt(activeRow.volume), color: "rgba(59, 130, 246, 0.45)" },
                  { label: "Value", value: formatMillions(activeRow.value), color: dashboardColors.blue },
                ]}
                style={{ position: "absolute", left: frame.margin.left + activeX + 8, top: 10, pointerEvents: "none" }}
              />
            ) : null}
          </>
        );
      }}
    </SvgCanvas>
  );
}

function FunnelSvg() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <SvgCanvas height={214}>
      {({ width, height }) => {
        const frame = getD3ChartBox(width, height, { top: 12, right: 12, bottom: 44, left: 42 });
        const x = scaleBand().domain(funnelData.map((item) => item.stage)).range([0, frame.innerWidth]).padding(0.18);
        const y = scaleLinear().domain([0, 3000]).range([frame.innerHeight, 0]);
        const yTicks = [0, 800, 1600, 2400, 3000];
        const activeRow = activeIndex === null ? null : funnelData[activeIndex];
        const activeX = activeRow ? (x(activeRow.stage) ?? 0) + x.bandwidth() / 2 : 0;

        return (
          <>
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" role="img" aria-label="Application funnel">
              <g transform={`translate(${frame.margin.left},${frame.margin.top})`}>
                {yTicks.map((tick) => (
                  <g key={tick} transform={`translate(0,${y(tick)})`}>
                    <line x1={0} x2={frame.innerWidth} stroke={dashboardColors.grid} strokeDasharray="3 3" />
                    <AxisLabel x={-10} y={0} anchor="end">
                      {tick === 0 ? "0" : compactInt(tick)}
                    </AxisLabel>
                  </g>
                ))}
                <line x1={0} x2={frame.innerWidth} y1={frame.innerHeight} y2={frame.innerHeight} stroke={dashboardColors.axis} />
                <line x1={0} x2={0} y1={0} y2={frame.innerHeight} stroke={dashboardColors.axis} />

                {funnelData.map((item, index) => {
                  const barX = x(item.stage) ?? 0;
                  const bandWidth = x.bandwidth();
                  return (
                    <g key={item.stage}>
                      <rect
                        x={barX}
                        y={y(item.value)}
                        width={bandWidth}
                        height={frame.innerHeight - y(item.value)}
                        rx={3}
                        fill={dashboardColors.blue}
                        fillOpacity={item.opacity}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                      />
                      <text
                        x={barX + bandWidth / 2}
                        y={frame.innerHeight + 16}
                        fill={dashboardColors.subtle}
                        fontSize={9}
                        textAnchor="middle"
                      >
                        {splitLabel(item.stage).map((lineText, lineIndex) => (
                          <tspan key={lineText} x={barX + bandWidth / 2} dy={lineIndex === 0 ? 0 : 10}>
                            {lineText}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  );
                })}

                {activeRow ? <circle cx={activeX} cy={y(activeRow.value)} r={4} fill={dashboardColors.blue} /> : null}
              </g>
            </svg>
            {activeRow ? (
              <TooltipCard
                title={activeRow.stage}
                items={[{ label: "Applications", value: compactInt(activeRow.value), color: dashboardColors.blue }]}
                style={{ position: "absolute", left: frame.margin.left + activeX - 48, top: 8, pointerEvents: "none" }}
              />
            ) : null}
          </>
        );
      }}
    </SvgCanvas>
  );
}

function LvrSvg() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <SvgCanvas height={214}>
      {({ width, height }) => {
        const frame = getD3ChartBox(width, height, { top: 12, right: 12, bottom: 28, left: 42 });
        const x = scaleBand().domain(lvrData.map((item) => item.band)).range([0, frame.innerWidth]).padding(0.22);
        const y = scaleLinear().domain([0, 950]).range([frame.innerHeight, 0]);
        const yTicks = [0, 200, 400, 600, 800];
        const activeRow = activeIndex === null ? null : lvrData[activeIndex];
        const activeX = activeRow ? (x(activeRow.band) ?? 0) + x.bandwidth() / 2 : 0;

        return (
          <>
            <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" role="img" aria-label="LVR distribution">
              <g transform={`translate(${frame.margin.left},${frame.margin.top})`}>
                {yTicks.map((tick) => (
                  <g key={tick} transform={`translate(0,${y(tick)})`}>
                    <line x1={0} x2={frame.innerWidth} stroke={dashboardColors.grid} strokeDasharray="3 3" />
                    <AxisLabel x={-10} y={0} anchor="end">
                      {tick}
                    </AxisLabel>
                  </g>
                ))}
                <line x1={0} x2={frame.innerWidth} y1={frame.innerHeight} y2={frame.innerHeight} stroke={dashboardColors.axis} />
                <line x1={0} x2={0} y1={0} y2={frame.innerHeight} stroke={dashboardColors.axis} />

                {lvrData.map((item, index) => {
                  const barX = x(item.band) ?? 0;
                  return (
                    <g key={item.band}>
                      <rect
                        x={barX}
                        y={y(item.loans)}
                        width={x.bandwidth()}
                        height={frame.innerHeight - y(item.loans)}
                        rx={3}
                        fill={item.color}
                        fillOpacity={0.7}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                      />
                      <AxisLabel x={barX + x.bandwidth() / 2} y={frame.innerHeight + 16}>
                        {item.band}
                      </AxisLabel>
                    </g>
                  );
                })}

                {activeRow ? <circle cx={activeX} cy={y(activeRow.loans)} r={4} fill={activeRow.color} /> : null}
              </g>
            </svg>
            {activeRow ? (
              <TooltipCard
                title={activeRow.band}
                items={[{ label: "Loans", value: compactInt(activeRow.loans), color: activeRow.color }]}
                style={{ position: "absolute", left: frame.margin.left + activeX - 44, top: 8, pointerEvents: "none" }}
              />
            ) : null}
          </>
        );
      }}
    </SvgCanvas>
  );
}

function splitLabel(label: string) {
  const words = label.split(" ");
  if (words.length <= 1) return [label];
  if (words.length === 2) return words;
  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];
}

export default function PolarisVizDashboardPage() {
  const note = useMemo(() => {
    const tallestSettlement = max(settlementsData, (item) => item.value) ?? 0;
    return tallestSettlement > 0
      ? "Polaris Viz-style fallback implemented with D3 scales/shapes and raw SVG because Polaris Viz is archived and React 18-bound."
      : "";
  }, []);

  return (
    <DashboardSection library="Version B — D3 / raw SVG fallback" note={note}>
      <DashboardShell
        title="Lending Analytics"
        subtitle="Same dashboard recreated with D3 scales, D3 shape generators, and hand-rolled SVG for the higher customisation ceiling."
      >
        <DashboardCard title="Max Borrowing Power" stats={cardStats.borrowing} fullWidth>
          <BorrowingPowerSvg />
        </DashboardCard>

        <DashboardCard title="Variable Rate vs Market" stats={cardStats.rate} legend={legends.rate}>
          <RateVsMarketSvg />
        </DashboardCard>

        <DashboardCard title="Monthly Settlements" stats={cardStats.settlements} legend={legends.settlements}>
          <SettlementsSvg />
        </DashboardCard>

        <DashboardCard title="Application Funnel" stats={cardStats.funnel}>
          <FunnelSvg />
        </DashboardCard>

        <DashboardCard title="LVR Distribution" stats={cardStats.lvr} legend={legends.lvr}>
          <LvrSvg />
        </DashboardCard>
      </DashboardShell>
    </DashboardSection>
  );
}
