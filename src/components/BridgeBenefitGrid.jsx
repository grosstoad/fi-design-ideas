const cards = [
  {
    label: "FOR BUYERS",
    title: "Crystal Clarity",
    body: "Know exactly what you can afford before you tour a single home. No surprises, just grounded confidence."
  },
  {
    label: "FOR BROKERS",
    title: "Verified Prospects",
    body: "Engage with clients who are already pre-qualified and data-verified, reducing fall-out and closing faster."
  },
  {
    label: "THE DATA LAYER",
    title: "Intelligent Matching",
    body: "Our engine maps your unique financial profile against thousands of loan products in milliseconds."
  }
];

function BridgeBenefitGrid() {
  return (
    <div className="benefit-grid">
      {cards.map((card) => (
        <article className="benefit-card" key={card.title}>
          <div className="mono benefit-label">{card.label}</div>
          <h3>{card.title}</h3>
          <p>{card.body}</p>
        </article>
      ))}
    </div>
  );
}

export default BridgeBenefitGrid;
