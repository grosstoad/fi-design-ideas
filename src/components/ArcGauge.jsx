import { useEffect, useRef, useState } from "react";

const TARGET_VALUE = 84.2;
const ANIMATION_DURATION_MS = 3000;

function easeOutPower2(t) {
  return 1 - (1 - t) * (1 - t);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function ArcGauge() {
  const frameRef = useRef(0);
  const [value, setValue] = useState(0);
  const [strokeWidth, setStrokeWidth] = useState(3);

  useEffect(() => {
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / ANIMATION_DURATION_MS, 1);
      const eased = easeOutPower2(progress);
      setValue(TARGET_VALUE * eased);

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
    setStrokeWidth(3 + x * 2);
  };

  const handleMouseLeave = () => {
    setStrokeWidth(3);
  };

  return (
    <div className="arc-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <svg viewBox="0 0 600 300" className="arc-svg" aria-hidden="true">
        <path className="arc-path-bg" d="M 50,250 A 250,250 0 0,1 550,250" />
        <path
          className="arc-path-active"
          d="M 50,250 A 250,250 0 0,1 550,250"
          style={{ strokeWidth }}
        />
        <circle cx="50" cy="250" r="4" fill="#8A8A8A" />
        <circle cx="550" cy="250" r="4" fill="#8A8A8A" />
        <g className="mono arc-labels" fill="#8A8A8A">
          <text x="40" y="275">
            MIN_CAPACITY
          </text>
          <text x="510" y="275">
            MAX_LIMIT
          </text>
        </g>
      </svg>
      <div className="arc-counter">
        <div className="mono arc-kicker">CURRENT AFFORDABILITY INDEX</div>
        <div className="arc-value">{value.toFixed(1)}</div>
      </div>
    </div>
  );
}

export default ArcGauge;
