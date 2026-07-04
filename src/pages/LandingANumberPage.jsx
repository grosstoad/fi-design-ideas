// Landing Concept A — "The Number" (docs/landing-page-concepts.md §3).
// Answer-first, product-led landing built on the results-page design system.
// Scroll interactions: IntersectionObserver reveals, in-view bar fills and
// count-ups — transform/opacity only, fully disabled under reduced motion.
// Asset placeholders carry data-asset ids mapped in docs/landing-a-assets.md.
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../landing-a.css";

/* ---------------- data (illustrative example scenario) ---------------- */

const EXAMPLE_LENDERS = [
  { name: "Macquarie", price: 1140000, label: "$1.14M", color: "#6E9BC4", rate: "6.09%", repay: "$4,980/mo" },
  { name: "CBA", price: 1065000, label: "$1.07M", color: "#E3B23C" },
  { name: "NAB", price: 1010000, label: "$1.01M", color: "#D98E63" },
  { name: "Westpac", price: 956000, label: "$956k", color: "#5E8FB5" },
  { name: "ING", price: 902000, label: "$902k", color: "#7FA37A" },
];
const EXAMPLE_MAX = EXAMPLE_LENDERS[0].price * 1.08;

const PILLARS = [
  {
    asset: "pillar-price",
    title: "A price, not a loan figure",
    body: "Your top purchase price with deposit, stamp duty and buying costs already taken out. The number you can actually shop with.",
  },
  {
    asset: "pillar-lenders",
    title: "Every lender, ranked",
    body: "See who'd stretch furthest for your situation — and who wouldn't. No favourites, no ads.",
  },
  {
    asset: "pillar-sliders",
    title: "Move the sliders, watch it move",
    body: "Change your deposit, spending or loan setup and see your price shift live.",
  },
  {
    asset: "pillar-settle",
    title: "Cash-to-settle, spelled out",
    body: "Exactly what you'll need on the day: deposit, stamp duty, fees — and what's left over.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Answer a few questions",
    body: "Income, spending, savings. About 3 minutes, no documents, no sign-up wall.",
  },
  {
    n: "2",
    title: "We run every lender's rules",
    body: "The real serviceability maths lenders use, not a one-size formula.",
  },
  {
    n: "3",
    title: "Get your number — and keep it",
    body: "Your ranked lender list, your price, saved to revisit as things change.",
  },
];

const TRUST_FACTS = [
  {
    q: "Will this affect my credit score?",
    a: "No — we never run a credit check.",
  },
  {
    q: "Is this a loan application?",
    a: "No — nothing goes to any lender.",
  },
  {
    q: "What does it cost?",
    a: "Nothing. If you later choose to talk to a broker, they're paid by lenders, not you.",
  },
  {
    q: "How accurate is it?",
    a: "A realistic estimate built on each lender's published rules — indicative, not an approval.",
  },
];

const LENDER_NAMES = ["Macquarie", "CBA", "NAB", "Westpac", "ANZ", "ING", "Bankwest", "Suncorp"];

/* ---------------- scroll/motion utilities ---------------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Adds `is-in` once when the element enters the viewport. With reduced motion
// the class is applied immediately so content never depends on scrolling.
function useReveal(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// Eased count-up that starts when `run` flips true; instant under reduced motion.
function useCountUp(target, run, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    if (prefersReducedMotion()) {
      setVal(target);
      return undefined;
    }
    let raf;
    let start;
    const tick = (t) => {
      if (start == null) start = t;
      const p = Math.min(1, (t - start) / duration);
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
}

/* ---------------- shared bits ---------------- */

function TrustChips({ compact }) {
  const chips = ["Free", "No credit check", "Not a loan application", "~3 minutes"];
  return (
    <ul className={`lpa-chips ${compact ? "lpa-chips-compact" : ""}`} aria-label="What to expect">
      {chips.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
}

function CtaButton({ children, sub }) {
  return (
    <div className="lpa-cta-group">
      <Link to="/assessment" className="lpa-cta">
        {children}
        <svg aria-hidden="true" viewBox="0 0 18 18">
          <path d="M4 9h9" />
          <path d="m10 5 4 4-4 4" />
        </svg>
      </Link>
      {sub && <p className="lpa-cta-sub">{sub}</p>}
    </div>
  );
}

function Reveal({ as: Tag = "div", className = "", children, threshold }) {
  const [ref, inView] = useReveal(threshold);
  return (
    <Tag ref={ref} className={`lpa-reveal ${inView ? "is-in" : ""} ${className}`}>
      {children}
    </Tag>
  );
}

/* ---------------- sections ---------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`lpa-nav ${scrolled ? "is-scrolled" : ""}`}>
      <Link to="/" className="lpa-logo" aria-label="FundIQ home">
        <span className="lpa-logo-mark" aria-hidden="true" />
        fundiq
      </Link>
      <nav className="lpa-nav-links" aria-label="Primary">
        <a href="#how-it-works">How it works</a>
        <a href="#trust">FAQ</a>
        <Link to="/assessment" className="lpa-nav-cta">
          Show me my number
        </Link>
      </nav>
    </header>
  );
}

// The proof visual: a faithful miniature of the results component.
// Bars fill and the hero figure counts up when it scrolls into view.
function ProofCard() {
  const [ref, inView] = useReveal(0.35);
  const hero = useCountUp(1.14, inView, 900);
  return (
    <div ref={ref} className={`lpa-proof ${inView ? "is-in" : ""}`} data-asset="hero-proof-frame">
      <div className="lpa-proof-head">
        <span className="lpa-proof-eyebrow">Your results</span>
        <span className="lpa-proof-figure" aria-hidden="true">
          ${hero.toFixed(2)}M
        </span>
        <span className="lpa-sr-only">Example top price $1.14M</span>
        <span className="lpa-proof-sub">Top price across 30+ lenders</span>
      </div>
      <ul className="lpa-proof-list">
        {EXAMPLE_LENDERS.map((l, i) => (
          <li key={l.name} className={i === 0 ? "is-top" : ""}>
            <span className="lpa-proof-rank">{i + 1}</span>
            <span className="lpa-proof-name">{l.name}</span>
            <span className="lpa-proof-bar">
              <i
                style={{
                  width: inView ? `${Math.round((l.price / EXAMPLE_MAX) * 100)}%` : "0%",
                  backgroundColor: l.color,
                  transitionDelay: `${i * 70}ms`,
                }}
              />
            </span>
            <strong className="lpa-proof-price">{l.label}</strong>
          </li>
        ))}
      </ul>
      <div className="lpa-proof-detail">
        <span className="lpa-proof-dot" style={{ backgroundColor: EXAMPLE_LENDERS[0].color }} />
        <span>
          <strong>Macquarie</strong> · {EXAMPLE_LENDERS[0].rate} p.a. · {EXAMPLE_LENDERS[0].repay}
        </span>
      </div>
      <p className="lpa-proof-caption">Example — Sydney couple, $160k income, $120k saved</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="lpa-hero">
      <div className="lpa-hero-copy">
        <TrustChips />
        <h1>Know the most you can spend on a home.</h1>
        <p className="lpa-subhead">
          FundIQ runs your numbers through 30+ lenders&rsquo; actual rules and shows your top price —
          deposit, stamp duty and costs included.
        </p>
        <CtaButton sub="Private. Nothing is shared unless you ask.">Show me my number</CtaButton>
      </div>
      <ProofCard />
    </section>
  );
}

function Credibility() {
  return (
    <Reveal as="section" className="lpa-cred" threshold={0.4}>
      <p>Modelled on the lending rules of 30+ Australian lenders</p>
      <ul aria-label="Lenders modelled">
        {LENDER_NAMES.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </Reveal>
  );
}

function Gap() {
  const [ref, inView] = useReveal(0.4);
  return (
    <section className="lpa-gap" ref={ref}>
      <Reveal className="lpa-gap-copy">
        <h2>The bank&rsquo;s calculator only tells you the bank&rsquo;s answer.</h2>
        <p>
          Every lender sizes you up differently — same income, same deposit, answers up to{" "}
          <strong>$184,000 apart</strong>. If you&rsquo;ve only checked one calculator, you&rsquo;ve
          seen one lender&rsquo;s opinion.
        </p>
      </Reveal>
      <div className={`lpa-gap-chart ${inView ? "is-in" : ""}`} role="img"
        aria-label="Chart: for the same buyer, lender A offers $712,000 and lender F offers $896,000 — a gap of $184,000">
        <div className="lpa-gap-row">
          <span className="lpa-gap-k">Lender A</span>
          <span className="lpa-gap-track"><i className="lpa-gap-low" /></span>
          <strong>$712k</strong>
        </div>
        <div className="lpa-gap-row">
          <span className="lpa-gap-k">Lender F</span>
          <span className="lpa-gap-track"><i className="lpa-gap-high" /></span>
          <strong>$896k</strong>
        </div>
        <div className="lpa-gap-bracket" aria-hidden="true">
          <span>$184k gap — same buyer</span>
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="lpa-pillars">
      <Reveal>
        <h2>What you walk away with</h2>
      </Reveal>
      <div className="lpa-pillar-grid">
        {PILLARS.map((p, i) => (
          <Reveal as="article" key={p.asset} className="lpa-pillar" threshold={0.2}>
            <div className="lpa-pillar-art" data-asset={p.asset} aria-hidden="true">
              <span className="lpa-pillar-art-mark">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function How() {
  return (
    <section className="lpa-how" id="how-it-works">
      <Reveal>
        <h2>Three minutes, start to number</h2>
      </Reveal>
      <ol className="lpa-steps">
        {STEPS.map((s) => (
          <Reveal as="li" key={s.n} threshold={0.3}>
            <span className="lpa-step-n" aria-hidden="true">{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Trust() {
  return (
    <section className="lpa-trust" id="trust">
      <Reveal>
        <h2>The questions everyone asks first</h2>
      </Reveal>
      <div className="lpa-trust-grid">
        {TRUST_FACTS.map((t) => (
          <Reveal as="div" key={t.q} className="lpa-trust-tile" threshold={0.25}>
            <h3>{t.q}</h3>
            <p>{t.a}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <Reveal as="section" className="lpa-final" threshold={0.35}>
      <div className="lpa-final-art" data-asset="final-band-suburb" aria-hidden="true" />
      <div className="lpa-final-inner">
        <h2>Three minutes. Thirty-plus lenders. One honest number.</h2>
        <CtaButton>Show me my number</CtaButton>
        <TrustChips compact />
      </div>
    </Reveal>
  );
}

function Footer() {
  return (
    <footer className="lpa-foot">
      <div className="lpa-foot-row">
        <Link to="/" className="lpa-foot-brand">fundiq</Link>
        <nav aria-label="Legal">
          <a href="#privacy">Privacy policy</a>
          <a href="#terms">Terms</a>
          <a href="#credit-guide">Credit guide</a>
        </nav>
      </div>
      <p>
        Estimates are indicative only and are not a credit offer, quote or approval. fundiq Pty Ltd
        (ACN 000 000 000) operates under Australian Credit Licence 000000. Eligibility is subject to
        lender approval and credit assessment. Read our credit guide before relying on any figure
        shown.
      </p>
    </footer>
  );
}

function LandingANumberPage() {
  return (
    <div className="lpa-page">
      <Nav />
      <main>
        <Hero />
        <Credibility />
        <Gap />
        <Pillars />
        <How />
        <Trust />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

export default LandingANumberPage;
