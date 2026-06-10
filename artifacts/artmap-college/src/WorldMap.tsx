// Equirectangular projection: x=(lon+180)*2.5, y=(90-lat)*2.778
// ViewBox: 0 0 900 500

export const COUNTRY_NODES = [
  { id: "Italy",          x: 481, y: 134, color: "#D4AF37" },
  { id: "France",         x: 453, y: 117, color: "#87CEEB" },
  { id: "Netherlands",    x: 462, y: 105, color: "#FF8C00" },
  { id: "Japan",          x: 800, y: 151, color: "#E05C5C" },
  { id: "China",          x: 741, y: 139, color: "#FFD700" },
  { id: "Egypt",          x: 528, y: 166, color: "#DAA520" },
  { id: "United Kingdom", x: 450, y: 107, color: "#4169E1" },
  { id: "United States",  x: 215, y: 140, color: "#FF6B35" },
];

// Continent path data
const CONTINENTS = [
  {
    id: "north-america",
    fill: "rgba(25,45,75,0.9)",
    stroke: "rgba(80,130,200,0.4)",
    // Simplified but recognizable NA outline
    d: `M 30,100 L 20,88 L 22,75 L 35,65 L 55,55 L 70,50
        L 90,46 L 115,42 L 148,40 L 178,40 L 210,44
        L 242,52 L 268,62 L 288,76 L 305,90
        L 315,102 L 318,112 L 310,118 L 298,114
        L 292,120 L 292,128 L 288,136 L 280,142
        L 270,136 L 265,142 L 263,152 L 262,162
        L 260,170 L 258,178 L 255,183 L 252,192
        L 250,200 L 245,208 L 238,215 L 228,222
        L 222,228 L 212,232 L 205,228 L 200,218
        L 195,210 L 188,204 L 180,202 L 170,206
        L 158,215 L 148,224 L 138,230 L 128,228
        L 118,222 L 108,212 L 100,200 L 95,188
        L 92,175 L 90,162 L 88,150 L 82,138
        L 74,126 L 62,114 L 50,106 L 38,100 Z`,
  },
  {
    id: "alaska-peninsula",
    fill: "rgba(25,45,75,0.85)",
    stroke: "rgba(80,130,200,0.3)",
    d: `M 30,100 L 22,105 L 15,108 L 10,112 L 5,110
        L 8,104 L 18,98 L 28,96 Z`,
  },
  {
    id: "florida",
    fill: "rgba(25,45,75,0.9)",
    stroke: "rgba(80,130,200,0.3)",
    d: `M 255,172 L 258,178 L 260,185 L 258,192 L 254,198
        L 250,202 L 248,198 L 246,190 L 248,182 L 252,175 Z`,
  },
  {
    id: "baja-california",
    fill: "rgba(25,45,75,0.85)",
    stroke: "rgba(80,130,200,0.25)",
    d: `M 160,162 L 162,170 L 164,180 L 165,190 L 163,196
        L 158,192 L 155,182 L 155,172 L 158,164 Z`,
  },
  {
    id: "central-america",
    fill: "rgba(25,45,75,0.85)",
    stroke: "rgba(80,130,200,0.2)",
    d: `M 210,232 L 220,235 L 230,238 L 240,242 L 248,248
        L 255,252 L 255,258 L 248,260 L 238,256 L 228,250
        L 218,244 L 210,238 Z`,
  },
  {
    id: "south-america",
    fill: "rgba(25,52,40,0.9)",
    stroke: "rgba(70,150,90,0.4)",
    d: `M 255,260 L 268,258 L 285,262 L 302,270 L 316,282
        L 326,298 L 332,315 L 333,332 L 330,348 L 322,365
        L 312,380 L 300,394 L 286,406 L 272,412 L 260,408
        L 248,398 L 240,384 L 235,368 L 232,350 L 230,332
        L 228,312 L 225,292 L 222,272 L 225,262 L 235,258
        L 246,256 Z`,
  },
  {
    id: "europe-main",
    fill: "rgba(45,32,72,0.9)",
    stroke: "rgba(130,90,200,0.45)",
    d: `M 430,105 L 440,98 L 450,94 L 460,92 L 470,93
        L 480,96 L 490,100 L 498,106 L 504,114 L 506,122
        L 502,130 L 496,136 L 490,140 L 484,144 L 478,148
        L 484,152 L 488,158 L 488,164 L 484,170 L 478,175
        L 472,178 L 465,178 L 458,175 L 452,172 L 448,178
        L 450,186 L 450,194 L 446,200 L 438,202 L 430,200
        L 424,194 L 422,185 L 425,176 L 428,166 L 428,156
        L 426,144 L 424,132 L 425,118 Z`,
  },
  {
    id: "scandinavia",
    fill: "rgba(45,32,72,0.88)",
    stroke: "rgba(130,90,200,0.35)",
    d: `M 448,94 L 452,85 L 456,78 L 462,74 L 468,74
        L 474,78 L 478,84 L 480,92 L 478,98 L 470,102
        L 460,104 L 452,102 Z`,
  },
  {
    id: "iberian-peninsula",
    fill: "rgba(45,32,72,0.88)",
    stroke: "rgba(130,90,200,0.3)",
    d: `M 424,132 L 418,138 L 414,148 L 414,158 L 416,168
        L 420,176 L 422,185 L 425,176 L 428,166 L 428,156 Z`,
  },
  {
    id: "italy-peninsula",
    fill: "rgba(45,32,72,0.85)",
    stroke: "rgba(130,90,200,0.3)",
    d: `M 478,148 L 482,155 L 485,162 L 485,170 L 482,178
        L 478,183 L 474,180 L 472,172 L 472,163 L 474,155 Z`,
  },
  {
    id: "british-isles",
    fill: "rgba(42,30,78,0.88)",
    stroke: "rgba(120,80,200,0.4)",
    d: `M 440,98 L 444,92 L 448,88 L 452,85 L 454,88
        L 454,94 L 452,100 L 446,103 L 440,102 Z`,
  },
  {
    id: "ireland",
    fill: "rgba(42,30,78,0.85)",
    stroke: "rgba(120,80,200,0.3)",
    d: `M 433,103 L 436,100 L 439,100 L 440,104 L 437,107
        L 433,107 Z`,
  },
  {
    id: "africa",
    fill: "rgba(58,42,18,0.9)",
    stroke: "rgba(170,120,45,0.45)",
    d: `M 428,175 L 440,170 L 452,166 L 464,165 L 478,165
        L 492,168 L 505,172 L 516,180 L 525,190 L 528,200
        L 530,212 L 529,225 L 526,238 L 522,252 L 516,268
        L 510,284 L 505,300 L 500,316 L 495,332 L 490,345
        L 484,358 L 476,368 L 466,375 L 454,378 L 442,376
        L 432,370 L 422,358 L 415,344 L 410,328 L 408,310
        L 407,292 L 408,275 L 410,258 L 413,242 L 416,226
        L 418,210 L 420,196 L 422,184 Z`,
  },
  {
    id: "madagascar",
    fill: "rgba(58,42,18,0.8)",
    stroke: "rgba(170,120,45,0.3)",
    d: `M 532,310 L 536,305 L 540,308 L 542,318 L 540,330
        L 536,338 L 530,338 L 528,330 L 528,318 Z`,
  },
  {
    id: "middle-east",
    fill: "rgba(72,52,18,0.85)",
    stroke: "rgba(190,140,55,0.35)",
    d: `M 530,160 L 545,155 L 560,153 L 578,155 L 594,162
        L 602,172 L 600,182 L 590,192 L 578,198 L 565,202
        L 552,200 L 540,194 L 532,184 L 528,172 Z`,
  },
  {
    id: "arabian-peninsula",
    fill: "rgba(72,52,18,0.82)",
    stroke: "rgba(190,140,55,0.28)",
    d: `M 540,194 L 552,200 L 558,210 L 560,222 L 556,234
        L 548,242 L 538,246 L 528,242 L 520,234 L 518,222
        L 520,210 L 528,202 Z`,
  },
  {
    id: "russia",
    fill: "rgba(32,42,58,0.9)",
    stroke: "rgba(90,120,170,0.35)",
    d: `M 448,94 L 454,88 L 464,82 L 480,76 L 498,70
        L 520,64 L 548,60 L 580,57 L 615,56 L 650,58
        L 682,62 L 712,68 L 738,76 L 755,85 L 762,96
        L 758,108 L 748,116 L 732,122 L 712,126 L 690,128
        L 666,128 L 642,126 L 618,125 L 595,124 L 572,124
        L 550,126 L 530,128 L 514,130 L 502,128 L 492,122
        L 484,114 L 478,106 L 470,101 L 460,98 Z`,
  },
  {
    id: "central-asia",
    fill: "rgba(38,48,30,0.82)",
    stroke: "rgba(100,130,70,0.28)",
    d: `M 572,124 L 595,124 L 618,125 L 642,126 L 666,128
        L 690,128 L 712,126 L 712,136 L 702,146 L 688,154
        L 670,158 L 650,160 L 630,158 L 610,158 L 592,162
        L 578,155 L 564,148 L 555,140 L 550,132 L 558,126 Z`,
  },
  {
    id: "india",
    fill: "rgba(42,50,25,0.88)",
    stroke: "rgba(115,145,65,0.35)",
    d: `M 592,162 L 610,158 L 630,158 L 640,164 L 648,174
        L 652,186 L 648,200 L 638,214 L 625,225 L 612,232
        L 602,228 L 594,214 L 590,200 L 588,186 L 588,172 Z`,
  },
  {
    id: "southeast-asia",
    fill: "rgba(35,52,25,0.85)",
    stroke: "rgba(100,145,65,0.3)",
    d: `M 668,158 L 690,155 L 710,155 L 728,158 L 738,166
        L 738,178 L 730,186 L 716,192 L 700,196 L 684,194
        L 670,190 L 660,182 L 660,170 Z`,
  },
  {
    id: "indochina",
    fill: "rgba(35,52,25,0.82)",
    stroke: "rgba(100,145,65,0.25)",
    d: `M 700,196 L 716,192 L 728,198 L 732,210 L 728,220
        L 718,228 L 706,232 L 698,228 L 695,218 L 696,206 Z`,
  },
  {
    id: "malay-peninsula",
    fill: "rgba(35,52,25,0.8)",
    stroke: "rgba(100,145,65,0.2)",
    d: `M 706,232 L 714,235 L 718,244 L 715,253 L 708,255
        L 702,250 L 700,241 Z`,
  },
  {
    id: "china-korea",
    fill: "rgba(48,34,22,0.9)",
    stroke: "rgba(175,115,55,0.4)",
    d: `M 712,126 L 732,122 L 748,116 L 758,108 L 768,108
        L 778,116 L 782,128 L 778,140 L 768,150 L 756,158
        L 741,162 L 728,162 L 716,158 L 706,150 L 700,140
        L 700,128 Z`,
  },
  {
    id: "japan-honshu",
    fill: "rgba(42,22,22,0.9)",
    stroke: "rgba(195,75,75,0.45)",
    // Main island - elongated arc
    d: `M 786,130 L 793,128 L 800,130 L 806,136 L 808,144
        L 806,152 L 800,158 L 793,160 L 786,157 L 782,150
        L 781,141 Z`,
  },
  {
    id: "japan-kyushu",
    fill: "rgba(42,22,22,0.85)",
    stroke: "rgba(195,75,75,0.35)",
    d: `M 782,158 L 788,160 L 792,166 L 790,172 L 784,172
        L 780,166 Z`,
  },
  {
    id: "japan-hokkaido",
    fill: "rgba(42,22,22,0.85)",
    stroke: "rgba(195,75,75,0.35)",
    d: `M 793,120 L 800,118 L 808,122 L 810,130 L 806,133
        L 798,132 L 793,126 Z`,
  },
  {
    id: "taiwan",
    fill: "rgba(48,34,22,0.8)",
    stroke: "rgba(175,115,55,0.25)",
    d: `M 775,175 L 779,173 L 782,178 L 780,183 L 774,182 Z`,
  },
  {
    id: "borneo-sumatra",
    fill: "rgba(35,52,25,0.82)",
    stroke: "rgba(100,145,65,0.25)",
    d: `M 718,228 L 738,225 L 755,228 L 768,238 L 770,250
        L 762,260 L 745,265 L 730,262 L 720,252 L 716,240 Z`,
  },
  {
    id: "java",
    fill: "rgba(35,52,25,0.78)",
    stroke: "rgba(100,145,65,0.2)",
    d: `M 730,268 L 748,266 L 765,270 L 768,276 L 756,280
        L 736,278 L 725,274 Z`,
  },
  {
    id: "australia",
    fill: "rgba(65,42,18,0.88)",
    stroke: "rgba(175,115,45,0.38)",
    d: `M 708,286 L 728,278 L 750,272 L 774,272 L 796,278
        L 812,290 L 818,308 L 815,328 L 805,348 L 790,364
        L 770,374 L 748,378 L 724,375 L 705,362 L 694,344
        L 689,322 L 690,300 Z`,
  },
  {
    id: "new-zealand-n",
    fill: "rgba(65,42,18,0.75)",
    stroke: "rgba(175,115,45,0.25)",
    d: `M 840,358 L 846,354 L 852,358 L 853,366 L 848,370
        L 841,368 Z`,
  },
  {
    id: "new-zealand-s",
    fill: "rgba(65,42,18,0.75)",
    stroke: "rgba(175,115,45,0.22)",
    d: `M 842,374 L 848,372 L 855,378 L 855,386 L 848,390
        L 840,386 Z`,
  },
  {
    id: "greenland",
    fill: "rgba(30,45,65,0.8)",
    stroke: "rgba(80,130,200,0.3)",
    d: `M 318,30 L 340,22 L 365,20 L 385,24 L 392,36
        L 388,50 L 378,60 L 360,66 L 340,65 L 322,58
        L 312,44 Z`,
  },
  {
    id: "sri-lanka",
    fill: "rgba(42,50,25,0.75)",
    stroke: "rgba(115,145,65,0.22)",
    d: `M 618,234 L 622,232 L 626,237 L 624,243 L 618,242 Z`,
  },
];

// Latitude/longitude grid lines
function GridLines() {
  const lats = [-60, -30, 0, 30, 60]; // latitude lines
  const lons = [-120, -60, 0, 60, 120]; // longitude lines

  return (
    <g opacity={0.04}>
      {lats.map((lat) => {
        const y = (90 - lat) * 2.778;
        return (
          <line
            key={`lat-${lat}`}
            x1={0} y1={y} x2={900} y2={y}
            stroke="white" strokeWidth={lat === 0 ? 1 : 0.5}
          />
        );
      })}
      {lons.map((lon) => {
        const x = (lon + 180) * 2.5;
        return (
          <line
            key={`lon-${lon}`}
            x1={x} y1={0} x2={x} y2={500}
            stroke="white" strokeWidth={lon === 0 ? 1 : 0.5}
          />
        );
      })}
    </g>
  );
}

// Equator and Tropics labels
function GeoLabels() {
  const equatorY = (90 - 0) * 2.778;
  const tropicNY = (90 - 23.5) * 2.778;
  const tropicSY = (90 + 23.5) * 2.778;

  return (
    <g>
      <line x1={0} y1={equatorY} x2={900} y2={equatorY}
        stroke="rgba(100,200,255,0.08)" strokeWidth={1.2} strokeDasharray="3 8" />
      <line x1={0} y1={tropicNY} x2={900} y2={tropicNY}
        stroke="rgba(255,200,100,0.05)" strokeWidth={0.8} strokeDasharray="2 12" />
      <line x1={0} y1={tropicSY} x2={900} y2={tropicSY}
        stroke="rgba(255,200,100,0.05)" strokeWidth={0.8} strokeDasharray="2 12" />
    </g>
  );
}

interface WorldMapProps {
  activeCountries: string[];
  onCountryTap: (id: string) => void;
}

export function WorldMap({ activeCountries, onCountryTap }: WorldMapProps) {
  return (
    <svg
      viewBox="0 0 900 500"
      style={{ width: "100%", height: "100%", display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Deep ocean gradient */}
        <radialGradient id="oceanGrad" cx="45%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#0A1E35" />
          <stop offset="50%" stopColor="#071525" />
          <stop offset="100%" stopColor="#030C18" />
        </radialGradient>

        {/* Continent inner shadow/depth */}
        <filter id="landShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
        </filter>

        {/* Node glow filter */}
        <filter id="nodeGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Stronger glow for active nodes */}
        <filter id="activeGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Vignette overlay */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
        </radialGradient>

        {/* Ocean shimmer pattern */}
        <pattern id="oceanShimmer" x="0" y="0" width="120" height="80" patternUnits="userSpaceOnUse">
          <path d="M0,40 Q30,35 60,40 Q90,45 120,40" fill="none"
            stroke="rgba(255,255,255,0.018)" strokeWidth="0.6" />
        </pattern>
      </defs>

      {/* Ocean */}
      <rect width="900" height="500" fill="url(#oceanGrad)" />
      <rect width="900" height="500" fill="url(#oceanShimmer)" />

      {/* Geographic reference lines */}
      <GeoLabels />
      <GridLines />

      {/* Antarctica strip */}
      <path
        d="M 0,440 Q 225,432 450,435 Q 675,438 900,432 L 900,500 L 0,500 Z"
        fill="rgba(160,185,210,0.22)"
        stroke="rgba(200,220,240,0.12)"
        strokeWidth="0.5"
      />

      {/* All continents */}
      {CONTINENTS.map((c) => (
        <path
          key={c.id}
          d={c.d}
          fill={c.fill}
          stroke={c.stroke}
          strokeWidth="0.8"
          strokeLinejoin="round"
          filter="url(#landShadow)"
        />
      ))}

      {/* Vignette */}
      <rect width="900" height="500" fill="url(#vignette)" />

      {/* === ART NODE MARKERS === */}
      {COUNTRY_NODES.map((country) => {
        const isActive = activeCountries.includes(country.id);
        return (
          <g
            key={country.id}
            onClick={() => onCountryTap(country.id)}
            style={{ cursor: "pointer" }}
          >
            {/* Outer pulse rings (active only) */}
            {isActive && (
              <>
                <circle cx={country.x} cy={country.y} r={5} fill={country.color} opacity={0.12}>
                  <animate attributeName="r" from="7" to="32" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.35" to="0" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx={country.x} cy={country.y} r={5} fill={country.color} opacity={0.1}>
                  <animate attributeName="r" from="7" to="22" dur="3s" begin="1s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.25" to="0" dur="3s" begin="1s" repeatCount="indefinite" />
                </circle>
              </>
            )}

            {/* Glow bloom */}
            <circle
              cx={country.x}
              cy={country.y}
              r={isActive ? 12 : 5}
              fill={isActive ? country.color : "rgba(255,255,255,0.2)"}
              opacity={isActive ? 0.25 : 0.15}
              filter={isActive ? "url(#activeGlow)" : "url(#nodeGlow)"}
            />

            {/* Outer ring */}
            <circle
              cx={country.x}
              cy={country.y}
              r={isActive ? 8 : 5}
              fill="none"
              stroke={isActive ? country.color : "rgba(255,255,255,0.35)"}
              strokeWidth={isActive ? 1.5 : 1}
              opacity={isActive ? 0.8 : 0.5}
            />

            {/* Inner dot */}
            <circle
              cx={country.x}
              cy={country.y}
              r={isActive ? 4.5 : 3}
              fill={isActive ? country.color : "rgba(255,255,255,0.55)"}
            />

            {/* Dot highlight */}
            <circle
              cx={country.x - 1}
              cy={country.y - 1}
              r={isActive ? 1.5 : 1}
              fill="rgba(255,255,255,0.7)"
            />

            {/* Country label (always shown for active, hover via click) */}
            {isActive && (
              <>
                {/* Label background pill */}
                <rect
                  x={country.x - 30}
                  y={country.y - 24}
                  width={60}
                  height={14}
                  rx={7}
                  fill="rgba(0,0,0,0.65)"
                  stroke={country.color}
                  strokeWidth="0.5"
                  opacity={0.9}
                />
                <text
                  x={country.x}
                  y={country.y - 14}
                  textAnchor="middle"
                  fill={country.color}
                  fontSize="7.5"
                  fontWeight="700"
                  fontFamily="Inter, system-ui, sans-serif"
                  letterSpacing="0.06em"
                >
                  {country.id.toUpperCase()}
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* Connection arcs between active nodes */}
      {(() => {
        const activeNodes = COUNTRY_NODES.filter((c) => activeCountries.includes(c.id));
        if (activeNodes.length < 2) return null;
        const lines = [];
        for (let i = 0; i < activeNodes.length - 1; i++) {
          const a = activeNodes[i];
          const b = activeNodes[i + 1];
          const mx = (a.x + b.x) / 2;
          const my = Math.min(a.y, b.y) - 25;
          lines.push(
            <path
              key={`arc-${i}`}
              d={`M ${a.x},${a.y} Q ${mx},${my} ${b.x},${b.y}`}
              fill="none"
              stroke="rgba(212,175,55,0.12)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
          );
        }
        return lines;
      })()}
    </svg>
  );
}
