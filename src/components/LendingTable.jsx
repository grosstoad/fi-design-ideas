const rows = [
  {
    tier: "INSTITUTIONAL_A+",
    rate: "6.12%",
    score: "760+",
    borrow: "$1.2M",
    speed: "48 HRS",
    confidenceLabel: "HIGH",
    confidenceWidth: 98,
    action: "GET PRE-APPROVED"
  },
  {
    tier: "RETAIL_NATIONWIDE",
    rate: "6.45%",
    score: "720+",
    borrow: "$950K",
    speed: "72 HRS",
    confidenceLabel: "STABLE",
    confidenceWidth: 82,
    action: "VIEW TERMS"
  },
  {
    tier: "CREDIT_UNION_LOCAL",
    rate: "5.98%",
    score: "740+",
    borrow: "$850K",
    speed: "10 DAYS",
    confidenceLabel: "MODERATE",
    confidenceWidth: 65,
    action: "LEARN MORE"
  }
];

function LendingTable() {
  return (
    <div className="terminal-shell">
      <div className="terminal-shell-top">
        <div className="mono terminal-shell-name">MORTGAGE_FLOW // ACTIVE_SCENARIOS</div>
        <div className="mono terminal-shell-time">REFRESHED: 2024-05-22_14:22:01</div>
      </div>
      <div className="terminal-scroll">
        <table className="terminal-table">
          <thead>
            <tr>
              <th>
                LENDER TIER <span className="mini-opaq">v</span>
              </th>
              <th>EST. RATE</th>
              <th>CREDIT SCORE</th>
              <th>MAX BORROW</th>
              <th>APPROVAL SPEED</th>
              <th>CONFIDENCE</th>
              <th className="align-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.tier}>
                <td>{row.tier}</td>
                <td className="table-strong">{row.rate}</td>
                <td>{row.score}</td>
                <td>{row.borrow}</td>
                <td>{row.speed}</td>
                <td>
                  <div className="confidence-meta">
                    <div className="confidence-track">
                      <div className="confidence-fill" style={{ width: `${row.confidenceWidth}%` }} />
                    </div>
                    <span>{row.confidenceLabel}</span>
                  </div>
                </td>
                <td className="align-right">
                  <span className="table-action">{row.action}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LendingTable;
