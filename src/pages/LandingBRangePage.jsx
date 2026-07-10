// Landing Concept B — "The Range" (docs/landing-b-proposal.md).
// The hero is the product: a live lender-range module with one income slider.
// Drag = direct manipulation with rank frozen; release = FLIP re-rank.
// Entrance, wit line and thumb invite each run once per page load.
// Illustration slots read from public/landing-b/ and show placeholders
// until the generated assets land (docs/landing-b-goal-prompt.md part 2).
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../landing-b.css";

/* ---------------- illustrative model ---------------- */

// Per-lender coefficient curves: income × multiplier with a soft cap, so
// different incomes crown different lenders (crossovers around $160–175k).
// Directionally real, precision-free; the module's fine print carries the caveat.
const LENDERS = [
  { id: "macquarie", name: "Macquarie", color: "#6E9BC4", m: 6.7, cap: 1750000 },
  { id: "cba", name: "CBA", color: "#D9C34A", m: 6.9, cap: 1150000 },
  { id: "nab", name: "NAB", color: "#D98E7A", m: 6.3, cap: 1400000 },
  { id: "westpac", name: "Westpac", color: "#C2462C", m: 6.0, cap: 1500000 },
  { id: "anz", name: "ANZ", color: "#5E8FB5", m: 5.8, cap: 1300000 },
  { id: "ing", name: "ING", color: "#E59A3B", m: 6.5, cap: 1000000 },
];

export function estimate(income, lender) {
  const raw = income * lender.m;
  const soft = raw <= lender.cap ? raw : lender.cap + (raw - lender.cap) * 0.15;
  return Math.round(soft / 1000) * 1000;
}

function fmtPrice(v) {
  if (v >= 995000) return `$${(v / 1000000).toFixed(2)}M`;
  return `$${Math.round(v / 1000)}k`;
}

function fmtIncome(v) {
  return `$${v.toLocaleString("en-AU")}`;
}

const INCOME_MIN = 60000;
const INCOME_MAX = 300000;
const INCOME_STEP = 5000;
const INCOME_DEFAULT = 145000;

const rankOrder = (income) =>
  [...LENDERS].sort((a, b) => estimate(income, b) - estimate(income, a)).map((l) => l.id);

/* ---------------- hooks ---------------- */

function useInView(ref, rootMargin = "-80px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/* ---------------- illustration slot ---------------- */

function Art({ src, boilSrc, alt, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [failed, setFailed] = useState(false);
  const [frame, setFrame] = useState(src);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  // One line boil after the sticker-place settles: main → boil → main → boil → main.
  useEffect(() => {
    if (!inView || failed || !boilSrc || reduced) return undefined;
    const timers = [];
    const boil = new Image();
    boil.onload = () => {
      [400, 520, 640, 760].forEach((t, i) =>
        timers.push(setTimeout(() => setFrame(i % 2 === 0 ? boilSrc : src), t))
      );
    };
    boil.src = boilSrc;
    return () => timers.forEach(clearTimeout);
  }, [inView, failed, boilSrc, src, reduced]);

  return (
    <div ref={ref} className={`lpb-art is-placed ${inView ? "is-in" : ""} ${className}`}>
      {failed ? (
        <div className="lpb-art-placeholder">
          Illustration slot: {src.split("/").pop()}
          <br />
          (drop the generated PNG in public/landing-b/)
        </div>
      ) : (
        <img src={frame} alt={alt} onError={() => setFailed(true)} />
      )}
    </div>
  );
}

/* ---------------- range module ---------------- */

function RangeModule() {
  const moduleRef = useRef(null);
  const inView = useInView(moduleRef, "-40px");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isMobile = useMediaQuery("(max-width: 720px)");

  const [income, setIncome] = useState(INCOME_DEFAULT);
  const [order, setOrder] = useState(() => rankOrder(INCOME_DEFAULT));
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0); // entrance 0→1
  const [settled, setSettled] = useState(false); // entrance done: wit + invite
  const [announce, setAnnounce] = useState("");
  const settleTimer = useRef(null);

  const rowH = isMobile ? 32 : 38;
  const visible = isMobile ? 5 : 6;

  // Entrance: bars grow + prices count up, staggered, one run.
  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setProgress(1);
      setSettled(true);
      return undefined;
    }
    const start = performance.now();
    const total = 900 + (LENDERS.length - 1) * 60;
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / total, 1);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setSettled(true);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const prices = useMemo(() => {
    const map = {};
    LENDERS.forEach((l) => {
      map[l.id] = estimate(income, l);
    });
    return map;
  }, [income]);

  const max = Math.max(...Object.values(prices));
  const min = Math.min(...Object.values(prices));
  const scale = max * 1.08;

  // Rank is frozen while values change; it settles shortly after the last input.
  const onIncome = (v) => {
    setIncome(v);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      setDragging(false);
      setOrder(rankOrder(v));
      const m = {};
      LENDERS.forEach((l) => {
        m[l.id] = estimate(v, l);
      });
      const vals = Object.values(m);
      setAnnounce(`Range ${fmtPrice(Math.min(...vals))} to ${fmtPrice(Math.max(...vals))}`);
    }, 180);
  };

  useEffect(() => () => clearTimeout(settleTimer.current), []);

  const totalMs = 900 + (LENDERS.length - 1) * 60;
  const easedFor = (rankIdx) => {
    if (progress >= 1) return 1;
    const local = Math.min(Math.max((progress * totalMs - rankIdx * 60) / 900, 0), 1);
    return 1 - (1 - local) ** 3;
  };

  const sliderPct = ((income - INCOME_MIN) / (INCOME_MAX - INCOME_MIN)) * 100;

  return (
    <div
      ref={moduleRef}
      className={`lpb-module ${settled ? "is-invite" : ""}`}
      data-asset="range-module"
    >
      <div className="lpb-module-head">
        <p className="lpb-module-label" id="lpb-module-label">
          What each lender would offer you
        </p>
        <p className="lpb-module-range lpb-num">
          {fmtPrice(min)} – {fmtPrice(max)}
        </p>
      </div>

      <div
        className={`lpb-rows ${dragging ? "is-dragging" : ""}`}
        style={{ height: visible * rowH - 6 }}
        role="img"
        aria-labelledby="lpb-module-label"
        aria-description={LENDERS.map((l) => `${l.name} ${fmtPrice(prices[l.id])}`).join(", ")}
      >
        {LENDERS.map((lender) => {
          const rankIdx = order.indexOf(lender.id);
          const eased = easedFor(rankIdx);
          const price = prices[lender.id];
          const hidden = rankIdx >= visible;
          return (
            <div
              key={lender.id}
              className={`lpb-row ${rankIdx === 0 ? "is-leader" : ""}`}
              style={{
                transform: `translateY(${rankIdx * rowH}px)`,
                opacity: hidden ? 0 : 1,
                pointerEvents: "none",
              }}
              aria-hidden="true"
            >
              <span className="lpb-row-name">{lender.name}</span>
              <span className="lpb-row-track">
                <span
                  className="lpb-row-fill"
                  style={{
                    width: `${(price / scale) * 100 * eased}%`,
                    background: lender.color,
                  }}
                />
              </span>
              <span className="lpb-row-price lpb-num">{fmtPrice(price * eased)}</span>
            </div>
          );
        })}
      </div>

      <p className="lpb-overflow">+ 8 more in your results</p>

      <div className="lpb-slider">
        <div className="lpb-slider-head">
          <label htmlFor="lpb-income">Household income</label>
          <span className="lpb-slider-value lpb-num">{fmtIncome(income)}</span>
        </div>
        <input
          id="lpb-income"
          type="range"
          min={INCOME_MIN}
          max={INCOME_MAX}
          step={INCOME_STEP}
          value={income}
          style={{ "--lpb-slider-pct": `${sliderPct}%` }}
          onChange={(e) => onIncome(Number(e.target.value))}
          onPointerDown={() => setDragging(true)}
          onKeyDown={(e) => {
            if (e.shiftKey && (e.key === "ArrowLeft" || e.key === "ArrowDown")) {
              e.preventDefault();
              onIncome(Math.max(INCOME_MIN, income - 25000));
            } else if (e.shiftKey && (e.key === "ArrowRight" || e.key === "ArrowUp")) {
              e.preventDefault();
              onIncome(Math.min(INCOME_MAX, income + 25000));
            }
          }}
          aria-valuetext={`${fmtIncome(income)} a year`}
        />
        <p className="lpb-fineprint">Example numbers. Yours come from your details.</p>
      </div>

      <p className={`lpb-wit ${settled ? "is-in" : ""}`} aria-hidden="true">
        The biggest number isn&rsquo;t automatically the best one. We show you both.
      </p>

      <span className="lpb-sr" aria-live="polite">
        {announce}
      </span>
    </div>
  );
}

/* ---------------- sections ---------------- */

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className={`lpb-reveal ${inView ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function LandingBRangePage() {
  useEffect(() => {
    document.title = "Fundora — Find the home you can really afford";
  }, []);

  return (
    <div className="lpb-page">
      <header className="lpb-topbar">
        <div className="lpb-wrap lpb-topbar-row">
          <Link to="/landing-b" className="lpb-wordmark">
            Fundora
          </Link>
          <Link to="/assessment" className="lpb-btn lpb-btn--primary lpb-btn--small">
            Find my range
          </Link>
        </div>
      </header>

      <main>
        <section className="lpb-wrap lpb-hero" aria-label="Fundora">
          <div className="lpb-hero-head">
            <p className="lpb-eyebrow">For Australian property buyers</p>
            <h1 className="lpb-h1">Find the home you can really afford.</h1>
            <p className="lpb-subhead">
              Your borrowing power changes lender to lender. See all 14 numbers and search
              with a price range you trust.
            </p>
          </div>

          <div className="lpb-hero-module">
            <RangeModule />
          </div>

          <div className="lpb-hero-cta">
            <div className="lpb-cta-row">
              <Link to="/assessment" className="lpb-btn lpb-btn--primary">
                Find my range
              </Link>
              <a href="#ceiling" className="lpb-btn lpb-btn--quiet">
                See how it works
              </a>
            </div>
            <p className="lpb-trust">Free. No impact on your credit score.</p>
          </div>
        </section>

        <div className="lpb-wrap lpb-proof">The 14 lenders most Australians borrow from.</div>

        <section id="ceiling" className="lpb-section" aria-label="What you get">
          <div className="lpb-wrap">
            <Reveal>
              <p className="lpb-eyebrow">What you get</p>
              <h2 className="lpb-h2">The number you actually shop with.</h2>
            </Reveal>
            <div className="lpb-feature">
              <Reveal>
                <h3 className="lpb-feature-title">Your real price ceiling.</h3>
                <p className="lpb-feature-body">
                  The property price within reach, with your deposit, stamp duty, LMI and
                  each lender&rsquo;s policy already in it. The figure you type into the
                  price filter and trust.
                </p>
              </Reveal>
              <Art
                src="/landing-b/ceiling-scene.png"
                boilSrc="/landing-b/ceiling-scene-boil-1.png"
                alt="Illustration of a house with a price tag on its door"
              />
            </div>
          </div>
        </section>

        <section className="lpb-section" aria-label="Also included">
          <div className="lpb-wrap lpb-supports">
            <Reveal>
              <h3 className="lpb-support-title">Every lender, side by side.</h3>
              <p className="lpb-support-body">
                See who gives you the most room, and why they differ.
              </p>
            </Reveal>
            <Reveal>
              <h3 className="lpb-support-title">Suburbs and listings within reach.</h3>
              <p className="lpb-support-body">
                Know where you can actually buy before you fall for somewhere you
                can&rsquo;t.
              </p>
            </Reveal>
            <Reveal>
              <h3 className="lpb-support-title">Stress test any scenario.</h3>
              <p className="lpb-support-body">
                Model a rate rise, a new baby, a career change. Watch your range move.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="lpb-section lpb-closing" aria-label="Get started">
          <div className="lpb-wrap">
            <Art
              src="/landing-b/closing-keys.png"
              alt="Illustration of a house key with a paper tag"
            />
            <Reveal>
              <h2 className="lpb-h2">Find the home you can really afford.</h2>
              <p className="lpb-closing-sub">Your range is three minutes away.</p>
              <div className="lpb-cta-row">
                <Link to="/assessment" className="lpb-btn lpb-btn--primary">
                  Find my range
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="lpb-footer">
        <div className="lpb-wrap">
          <p>
            Fundora provides estimates based on the information you enter and current
            lender policy. Estimates are indicative only. They are not loan offers,
            pre-approval, or credit assistance. Lending criteria, fees and charges apply
            and are subject to change. Fundora Pty Ltd, Australian Credit Licence
            (placeholder, compliance to supply). <a href="#top">Privacy policy</a> ·{" "}
            <a href="#top">Credit guide</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
