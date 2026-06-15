import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const OUT_DIR = "/Users/sarah/Code/fi-design-ideas/output/imagegen/equal-size-icons-svg";
const SIZE = 1024;

mkdirSync(OUT_DIR, { recursive: true });

const colors = {
  slate: "#1F2A44",
  navy: "#20304F",
  steel: "#5C6F91",
  blue: "#8FA9D8",
  blueSoft: "#C7D5F1",
  sage: "#A8C9BF",
  sageSoft: "#D7E8E1",
  gold: "#D4B46C",
  goldSoft: "#EEDCB1",
  gray: "#B8C1CF",
  graySoft: "#DDE3EC",
  whiteSoft: "#F6F8FB",
};

function svg(body, extraDefs = "") {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" fill="none">
  <defs>
    <linearGradient id="blueBand" x1="96" y1="512" x2="928" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${colors.blueSoft}" stop-opacity="0.95"/>
      <stop offset="1" stop-color="${colors.blue}" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="blueRail" x1="128" y1="512" x2="896" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${colors.graySoft}" stop-opacity="0.95"/>
      <stop offset="1" stop-color="${colors.steel}" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="goldFlow" x1="120" y1="512" x2="900" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${colors.goldSoft}" stop-opacity="0.95"/>
      <stop offset="1" stop-color="${colors.gold}" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="sageFlow" x1="160" y1="512" x2="896" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${colors.sageSoft}" stop-opacity="0.95"/>
      <stop offset="1" stop-color="${colors.sage}" stop-opacity="1"/>
    </linearGradient>
    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    ${extraDefs}
  </defs>
  ${body}
</svg>`;
}

function line(x1, y1, x2, y2, stroke, width, extra = "") {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" ${extra}/>`;
}

function circle(cx, cy, r, fill, extra = "") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" ${extra}/>`;
}

function rect(x, y, width, height, rx, fill, extra = "") {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" fill="${fill}" ${extra}/>`;
}

function path(d, fill, extra = "") {
  return `<path d="${d}" fill="${fill}" ${extra}/>`;
}

function strokePath(d, stroke, width, extra = "") {
  return `<path d="${d}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" fill="none" ${extra}/>`;
}

function write(name, content) {
  writeFileSync(join(OUT_DIR, name), content, "utf8");
}

const icons = {
  "01-screenshot-inspired-taper.svg": svg(`
    ${strokePath("M118 268 C 318 268, 566 340, 746 470", colors.blueSoft, 6, 'stroke-dasharray="12 14" opacity="0.95"')}
    ${strokePath("M118 756 C 318 756, 566 684, 746 554", colors.blueSoft, 6, 'stroke-dasharray="12 14" opacity="0.95"')}
    ${path("M126 356 C 354 356, 558 380, 744 472 L 744 552 C 558 644, 354 668, 126 668 Z", "url(#blueBand)", 'opacity="0.94"')}
    ${rect(742, 470, 168, 84, 14, "url(#blueBand)", 'opacity="1"')}
    ${line(746, 406, 746, 620, colors.whiteSoft, 6, 'opacity="0.9"')}
    ${line(910, 406, 910, 620, colors.whiteSoft, 6, 'opacity="0.9"')}
  `),

  "02-pinch.svg": svg(`
    ${path("M144 402 C 332 402, 466 432, 548 490 C 560 499, 570 505, 578 512 C 570 519, 560 525, 548 534 C 466 592, 332 622, 144 622 Z", "url(#blueBand)", 'opacity="0.92"')}
    ${circle(590, 512, 18, colors.gold)}
    ${circle(590, 512, 8, colors.whiteSoft)}
  `),

  "03-bracketed-range.svg": svg(`
    ${line(182, 512, 842, 512, colors.graySoft, 22, 'opacity="0.72"')}
    ${line(384, 512, 640, 512, colors.blue, 30)}
    ${line(198, 452, 198, 572, colors.slate, 8)}
    ${line(198, 452, 244, 452, colors.slate, 8)}
    ${line(198, 572, 244, 572, colors.slate, 8)}
    ${line(826, 452, 826, 572, colors.slate, 8)}
    ${line(780, 452, 826, 452, colors.slate, 8)}
    ${line(780, 572, 826, 572, colors.slate, 8)}
    ${circle(512, 512, 48, colors.goldSoft, 'opacity="0.35" filter="url(#softGlow)"')}
  `),

  "04-converging-rails.svg": svg(`
    ${strokePath("M168 428 C 332 428, 468 444, 580 492 C 618 508, 654 512, 742 512", colors.blueSoft, 18, 'opacity="0.96"')}
    ${strokePath("M168 596 C 332 596, 468 580, 580 532 C 618 516, 654 512, 742 512", colors.steel, 18, 'opacity="0.92"')}
    ${line(742, 512, 858, 512, colors.navy, 14)}
    ${circle(878, 512, 16, colors.gold)}
  `),

  "05-twin-tracks.svg": svg(`
    ${line(152, 452, 804, 452, colors.graySoft, 18, 'opacity="0.88"')}
    ${line(152, 572, 804, 572, colors.sage, 18, 'opacity="0.92"')}
    ${circle(830, 452, 32, colors.steel)}
    ${circle(830, 572, 38, colors.gold)}
    ${circle(830, 572, 15, colors.whiteSoft)}
  `),

  "06-split-stream.svg": svg(`
    ${path("M138 470 C 272 470, 368 480, 448 500 C 474 506, 490 509, 512 512 C 490 515, 474 518, 448 524 C 368 544, 272 554, 138 554 Z", "url(#blueRail)", 'opacity="0.95"')}
    ${strokePath("M512 512 C 626 512, 690 470, 806 424", colors.blue, 18)}
    ${strokePath("M512 512 C 626 512, 690 554, 806 600", colors.sage, 18)}
    ${circle(836, 424, 28, colors.gold)}
    ${circle(836, 600, 28, colors.steel)}
  `),

  "07-aligned-outcomes.svg": svg(`
    ${line(168, 420, 678, 420, colors.graySoft, 16)}
    ${line(168, 512, 756, 512, colors.blue, 16)}
    ${line(168, 604, 848, 604, colors.sage, 16)}
    ${circle(708, 420, 20, colors.gray)}
    ${circle(786, 512, 24, colors.gold)}
    ${circle(878, 604, 28, colors.slate)}
  `),

  "08-golden-tributaries.svg": svg(`
    ${circle(190, 512, 54, "url(#goldFlow)")}
    ${strokePath("M250 512 C 418 512, 508 418, 708 344", colors.gold, 18)}
    ${strokePath("M250 512 C 432 512, 540 512, 742 512", colors.gold, 18)}
    ${strokePath("M250 512 C 418 512, 508 606, 708 680", colors.gold, 18)}
    ${circle(790, 344, 24, colors.steel)}
    ${circle(824, 512, 28, colors.blue)}
    ${circle(790, 680, 24, colors.sage)}
  `),

  "09-funding-prism.svg": svg(`
    ${line(132, 512, 404, 512, colors.gold, 30)}
    <polygon points="434,454 512,512 434,570" fill="${colors.slate}" opacity="0.95"/>
    ${strokePath("M512 512 C 600 476, 668 430, 792 380", colors.blue, 14)}
    ${strokePath("M512 512 C 622 512, 692 512, 804 512", colors.gold, 14)}
    ${strokePath("M512 512 C 600 548, 668 594, 792 644", colors.sage, 14)}
    ${circle(828, 380, 22, colors.blue)}
    ${circle(838, 512, 24, colors.gold)}
    ${circle(828, 644, 22, colors.sage)}
  `),

  "10-source-bloom.svg": svg(`
    ${circle(512, 512, 52, colors.gold)}
    ${strokePath("M512 460 C 512 380, 560 306, 656 236", colors.blue, 16)}
    ${strokePath("M564 512 C 668 512, 760 512, 856 512", colors.sage, 16)}
    ${strokePath("M512 564 C 512 644, 560 718, 656 788", colors.steel, 16)}
    ${circle(684, 216, 22, colors.blue)}
    ${circle(884, 512, 26, colors.sage)}
    ${circle(684, 808, 22, colors.steel)}
  `),
};

for (const [name, content] of Object.entries(icons)) {
  write(name, content);
}

console.log(`Wrote ${Object.keys(icons).length} SVG files to ${dirname(join(OUT_DIR, "x"))}`);
