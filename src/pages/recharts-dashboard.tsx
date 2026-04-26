import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  DashboardCard,
  DashboardSection,
  DashboardShell,
  TooltipCard,
  borrowingPowerData,
  cardStats,
  compactInt,
  dashboardColors,
  formatAxisK,
  formatMillions,
  formatRate,
  legends,
  lvrData,
  rateVsMarketData,
  settlementsData,
  funnelData,
} from "../components/dashboard-comparison/shared";

const axisStyle = { fontSize: 11, fill: dashboardColors.subtle };

function BorrowingTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="chart-tooltip-shell">
      <TooltipCard
        title={row.lender}
        items={[{ label: "Purchase power", value: formatAxisK(row.value), color: row.color }]}
      />
    </div>
  );
}

function RateTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="chart-tooltip-shell">
      <TooltipCard
        title={label}
        items={[
          { label: "Athena", value: formatRate(row.athena), color: dashboardColors.blue },
          { label: "Median", value: formatRate(row.median), color: dashboardColors.purple },
          {
            label: "25th-75th pctl",
            value: `${formatRate(row.market75)} - ${formatRate(row.market25)}`,
            color: "rgba(139, 92, 246, 0.2)",
          },
        ]}
      />
    </div>
  );
}

function SettlementsTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="chart-tooltip-shell">
      <TooltipCard
        title={label}
        items={[
          { label: "Volume", value: compactInt(row.volume), color: "rgba(59, 130, 246, 0.45)" },
          { label: "Value", value: formatMillions(row.value), color: dashboardColors.blue },
        ]}
      />
    </div>
  );
}

function FunnelTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="chart-tooltip-shell">
      <TooltipCard
        title={label}
        items={[{ label: "Applications", value: compactInt(row.value), color: dashboardColors.blue }]}
      />
    </div>
  );
}

function LvrTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className="chart-tooltip-shell">
      <TooltipCard
        title={label}
        items={[{ label: "Loans", value: compactInt(row.loans), color: row.color }]}
      />
    </div>
  );
}

export default function RechartsDashboardPage() {
  return (
    <DashboardSection
      library="Version A — Recharts"
      note="Latest stable Recharts with custom tooltips and ResponsiveContainer on every chart."
    >
      <DashboardShell
        title="Lending Analytics"
        subtitle="Reference implementation using Recharts with the requested layout, stats, and interaction patterns."
      >
        <DashboardCard title="Max Borrowing Power" stats={cardStats.borrowing} fullWidth>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={borrowingPowerData}
              layout="vertical"
              margin={{ top: 8, right: 8, bottom: 18, left: 18 }}
              barCategoryGap={14}
            >
              <CartesianGrid stroke={dashboardColors.grid} strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                domain={[780000, 940000]}
                tickFormatter={formatAxisK}
                tick={axisStyle}
                tickLine={false}
                axisLine={{ stroke: dashboardColors.axis }}
              />
              <YAxis
                type="category"
                dataKey="lender"
                width={88}
                tick={axisStyle}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip cursor={{ fill: "rgba(80, 70, 229, 0.04)" }} content={<BorrowingTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={26} fillOpacity={0.85}>
                {borrowingPowerData.map((entry) => (
                  <Cell key={entry.lender} fill={entry.color} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Variable Rate vs Market" stats={cardStats.rate} legend={legends.rate}>
          <ResponsiveContainer width="100%" height={214}>
            <ComposedChart data={rateVsMarketData} margin={{ top: 12, right: 8, bottom: 6, left: 4 }}>
              <defs>
                <linearGradient id="rate-band" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.08} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={dashboardColors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tick={axisStyle}
                tickLine={false}
                axisLine={{ stroke: dashboardColors.axis }}
              />
              <YAxis
                domain={[5.2, 6.7]}
                tickFormatter={(value) => `${value.toFixed(1)}%`}
                tick={axisStyle}
                tickLine={false}
                axisLine={{ stroke: dashboardColors.axis }}
                width={40}
              />
              <Tooltip content={<RateTooltip />} />
              <Area dataKey="market75" stackId="band" stroke="none" fillOpacity={0} isAnimationActive={false} />
              <Area
                dataKey="bandSize"
                stackId="band"
                stroke="none"
                fill="url(#rate-band)"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="athena"
                stroke={dashboardColors.blue}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, stroke: "#ffffff", strokeWidth: 2, fill: dashboardColors.blue }}
              />
              <Line
                type="monotone"
                dataKey="median"
                stroke={dashboardColors.purple}
                strokeWidth={1.5}
                dot={false}
                strokeDasharray="6 4"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Monthly Settlements" stats={cardStats.settlements} legend={legends.settlements}>
          <ResponsiveContainer width="100%" height={214}>
            <ComposedChart data={settlementsData} margin={{ top: 12, right: 8, bottom: 6, left: 4 }}>
              <defs>
                <linearGradient id="settlements-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={dashboardColors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tick={axisStyle}
                tickLine={false}
                axisLine={{ stroke: dashboardColors.axis }}
              />
              <YAxis
                yAxisId="left"
                tick={axisStyle}
                tickLine={false}
                axisLine={{ stroke: dashboardColors.axis }}
                width={36}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `$${value}M`}
                tick={axisStyle}
                tickLine={false}
                axisLine={false}
                width={52}
              />
              <Tooltip content={<SettlementsTooltip />} />
              <Bar
                yAxisId="left"
                dataKey="volume"
                fill="rgba(147, 187, 253, 0.35)"
                barSize={16}
                radius={[3, 3, 0, 0]}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="value"
                fill="url(#settlements-fill)"
                stroke="none"
              />
              <Line yAxisId="right" type="monotone" dataKey="value" stroke={dashboardColors.blue} strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="Application Funnel" stats={cardStats.funnel}>
          <ResponsiveContainer width="100%" height={214}>
            <BarChart data={funnelData} margin={{ top: 12, right: 8, bottom: 14, left: 4 }}>
              <CartesianGrid stroke={dashboardColors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="stage"
                interval={0}
                tick={{ ...axisStyle, fontSize: 9 }}
                tickLine={false}
                axisLine={{ stroke: dashboardColors.axis }}
              />
              <YAxis
                tick={axisStyle}
                tickLine={false}
                axisLine={{ stroke: dashboardColors.axis }}
                width={40}
              />
              <Tooltip content={<FunnelTooltip />} />
              <Bar dataKey="value" radius={[3, 3, 0, 0]} barSize={28}>
                {funnelData.map((entry) => (
                  <Cell key={entry.stage} fill={dashboardColors.blue} fillOpacity={entry.opacity} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard title="LVR Distribution" stats={cardStats.lvr} legend={legends.lvr}>
          <ResponsiveContainer width="100%" height={214}>
            <BarChart data={lvrData} margin={{ top: 12, right: 8, bottom: 14, left: 4 }}>
              <CartesianGrid stroke={dashboardColors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="band"
                tick={axisStyle}
                tickLine={false}
                axisLine={{ stroke: dashboardColors.axis }}
              />
              <YAxis
                tick={axisStyle}
                tickLine={false}
                axisLine={{ stroke: dashboardColors.axis }}
                width={40}
              />
              <Tooltip content={<LvrTooltip />} />
              <Bar dataKey="loans" radius={[3, 3, 0, 0]} barSize={30}>
                {lvrData.map((entry) => (
                  <Cell key={entry.band} fill={entry.color} fillOpacity={0.7} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </DashboardCard>
      </DashboardShell>
    </DashboardSection>
  );
}
