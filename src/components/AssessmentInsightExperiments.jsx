const rateSensitivity = [
  { label: "-1.0%", value: 2.86 },
  { label: "-0.5%", value: 2.68 },
  { label: "Current", value: 2.52 },
  { label: "+0.5%", value: 2.33 },
  { label: "+1.0%", value: 2.16 },
  { label: "+1.5%", value: 2.01 }
];

const depositLadder = [
  { label: "10%", value: 2.12, reach: 18 },
  { label: "15%", value: 2.32, reach: 23 },
  { label: "20%", value: 2.52, reach: 27 },
  { label: "25%", value: 2.66, reach: 31 }
];

const leverageMoves = [
  { label: "Close revolving debt", delta: 236000, probability: "HIGH" },
  { label: "Increase annual income", delta: 244000, probability: "MEDIUM" },
  { label: "Add A$20k to deposit", delta: 75000, probability: "HIGH" },
  { label: "Extend loan term to 30 years", delta: 118000, probability: "MEDIUM" }
];

const confidenceTrajectory = [
  { month: "APR", value: 2.34 },
  { month: "MAY", value: 2.39 },
  { month: "JUN", value: 2.43 },
  { month: "JUL", value: 2.45 },
  { month: "AUG", value: 2.48 },
  { month: "SEP", value: 2.52 },
  { month: "OCT", value: 2.55 },
  { month: "NOV", value: 2.57 }
];

const formatMillions = (value) => `A$${value.toFixed(2)}M`;

const formatDelta = (value) => `+A$${Math.round(value / 1000)}K`;

function linePoints(values, width, height, padding) {
  const min = Math.min(...values.map((item) => item.value));
  const max = Math.max(...values.map((item) => item.value));
  const xStep = (width - padding * 2) / (values.length - 1);
  const range = max - min || 1;

  return values.map((item, index) => {
    const x = padding + index * xStep;
    const normalized = (item.value - min) / range;
    const y = height - padding - normalized * (height - padding * 2);
    return { ...item, x, y };
  });
}

function pointsToPath(points) {
  if (!points.length) {
    return "";
  }

  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
}

function gridTicks(min, max, count) {
  const step = (max - min) / (count - 1);
  return Array.from({ length: count }, (_, index) => min + step * index);
}

function AssessmentInsightExperiments() {
  const curveWidth = 520;
  const curveHeight = 220;
  const curvePadding = 22;
  const curvePoints = linePoints(rateSensitivity, curveWidth, curveHeight, curvePadding);
  const curvePath = pointsToPath(curvePoints);

  const trajectoryWidth = 520;
  const trajectoryHeight = 220;
  const trajectoryPadding = 22;
  const trajectoryPoints = linePoints(confidenceTrajectory, trajectoryWidth, trajectoryHeight, trajectoryPadding);
  const trajectoryPath = pointsToPath(trajectoryPoints);
  const areaPath = `${trajectoryPath} L ${trajectoryWidth - trajectoryPadding} ${trajectoryHeight - trajectoryPadding} L ${trajectoryPadding} ${trajectoryHeight - trajectoryPadding} Z`;

  const ladderMax = Math.max(...depositLadder.map((item) => item.value));
  const moveMax = Math.max(...leverageMoves.map((item) => item.delta));
  const rateMin = Math.min(...rateSensitivity.map((item) => item.value));
  const rateMax = Math.max(...rateSensitivity.map((item) => item.value));
  const trajectoryMin = Math.min(...confidenceTrajectory.map((item) => item.value));
  const trajectoryMax = Math.max(...confidenceTrajectory.map((item) => item.value));

  return (
    <div className="assessment-chart-grid">
      <article className="assessment-chart-card">
        <header className="assessment-chart-head">
          <p className="mono assessment-chart-tag">RATE SENSITIVITY CURVE</p>
          <h3>Borrowing power vs. rate shocks.</h3>
          <p>Line model showing how approval headroom decays as rates move away from today&apos;s baseline.</p>
        </header>

        <svg viewBox={`0 0 ${curveWidth} ${curveHeight}`} className="assessment-svg" aria-label="Rate sensitivity line chart">
          {gridTicks(rateMin, rateMax, 4).map((tick) => {
            const y = curveHeight - curvePadding - ((tick - rateMin) / (rateMax - rateMin || 1)) * (curveHeight - curvePadding * 2);
            return (
              <g key={tick}>
                <line x1={curvePadding} y1={y} x2={curveWidth - curvePadding} y2={y} className="assessment-grid-line" />
                <text x={curveWidth - 2} y={y + 4} className="mono assessment-axis-label" textAnchor="end">
                  {formatMillions(tick)}
                </text>
              </g>
            );
          })}

          <path d={curvePath} className="assessment-line-path" />
          {curvePoints.map((point) => (
            <g key={point.label}>
              <circle cx={point.x} cy={point.y} r={point.label === "Current" ? 4.8 : 3.4} className="assessment-line-dot" />
              <text x={point.x} y={curveHeight - 4} className="mono assessment-axis-label" textAnchor="middle">
                {point.label}
              </text>
            </g>
          ))}
        </svg>
      </article>

      <article className="assessment-chart-card">
        <header className="assessment-chart-head">
          <p className="mono assessment-chart-tag">DEPOSIT LADDER</p>
          <h3>Step-change as deposit increases.</h3>
          <p>Vertical bars compare borrowing power and reachable listings at each deposit tier.</p>
        </header>

        <div className="assessment-ladder-chart" role="img" aria-label="Deposit ladder bar chart">
          {depositLadder.map((item) => {
            const heightPct = (item.value / ladderMax) * 100;
            return (
              <div key={item.label} className="assessment-ladder-col">
                <div className="mono assessment-ladder-value">{formatMillions(item.value)}</div>
                <div className="assessment-ladder-track">
                  <div className="assessment-ladder-fill" style={{ height: `${heightPct}%` }} />
                </div>
                <div className="mono assessment-ladder-label">{item.label} deposit</div>
                <div className="assessment-ladder-meta">{item.reach}% listings in range</div>
              </div>
            );
          })}
        </div>
      </article>

      <article className="assessment-chart-card">
        <header className="assessment-chart-head">
          <p className="mono assessment-chart-tag">LEVERAGE IMPACT BOARD</p>
          <h3>Which action moves the needle most.</h3>
          <p>Horizontal impact bars prioritize practical actions by expected borrowing uplift.</p>
        </header>

        <div className="assessment-impact-list" role="img" aria-label="Action impact horizontal bar chart">
          {leverageMoves.map((move) => (
            <div className="assessment-impact-row" key={move.label}>
              <div className="assessment-impact-meta">
                <span>{move.label}</span>
                <span className="mono">{formatDelta(move.delta)}</span>
              </div>
              <div className="assessment-impact-track">
                <div
                  className="assessment-impact-fill"
                  style={{ width: `${(move.delta / moveMax) * 100}%` }}
                />
              </div>
              <div className="mono assessment-impact-prob">LIKELIHOOD // {move.probability}</div>
            </div>
          ))}
        </div>
      </article>

      <article className="assessment-chart-card">
        <header className="assessment-chart-head">
          <p className="mono assessment-chart-tag">CONFIDENCE TRAJECTORY</p>
          <h3>Serviceability drift over time.</h3>
          <p>Area + line chart showing monthly confidence momentum as profile signals improve.</p>
        </header>

        <svg
          viewBox={`0 0 ${trajectoryWidth} ${trajectoryHeight}`}
          className="assessment-svg"
          aria-label="Confidence trajectory line chart"
        >
          {gridTicks(trajectoryMin, trajectoryMax, 4).map((tick) => {
            const y =
              trajectoryHeight -
              trajectoryPadding -
              ((tick - trajectoryMin) / (trajectoryMax - trajectoryMin || 1)) * (trajectoryHeight - trajectoryPadding * 2);

            return (
              <g key={tick}>
                <line
                  x1={trajectoryPadding}
                  y1={y}
                  x2={trajectoryWidth - trajectoryPadding}
                  y2={y}
                  className="assessment-grid-line"
                />
                <text x={trajectoryWidth - 2} y={y + 4} className="mono assessment-axis-label" textAnchor="end">
                  {formatMillions(tick)}
                </text>
              </g>
            );
          })}

          <path d={areaPath} className="assessment-area-path" />
          <path d={trajectoryPath} className="assessment-line-path alt" />

          {trajectoryPoints.map((point, index) => (
            <g key={point.month}>
              <circle cx={point.x} cy={point.y} r={index === trajectoryPoints.length - 1 ? 4.8 : 3.2} className="assessment-line-dot alt" />
              <text x={point.x} y={trajectoryHeight - 4} className="mono assessment-axis-label" textAnchor="middle">
                {point.month}
              </text>
            </g>
          ))}
        </svg>
      </article>
    </div>
  );
}

export default AssessmentInsightExperiments;
