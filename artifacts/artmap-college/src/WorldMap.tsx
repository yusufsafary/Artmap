import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const COUNTRY_NODES = [
  { id: "Italy",          lon: 12.5,  lat: 41.9,  color: "#D4AF37" },
  { id: "France",         lon: 2.3,   lat: 46.2,  color: "#87CEEB" },
  { id: "Netherlands",    lon: 5.3,   lat: 52.1,  color: "#FF8C00" },
  { id: "Japan",          lon: 138.3, lat: 36.2,  color: "#E05C5C" },
  { id: "China",          lon: 104.2, lat: 35.9,  color: "#FFD700" },
  { id: "Egypt",          lon: 30.8,  lat: 26.8,  color: "#DAA520" },
  { id: "United Kingdom", lon: -1.5,  lat: 52.3,  color: "#4169E1" },
  { id: "United States",  lon: -95.7, lat: 37.1,  color: "#FF6B35" },
  { id: "Spain",          lon: -3.7,  lat: 40.4,  color: "#DC143C" },
];

interface WorldMapProps {
  activeCountries: string[];
  onCountryTap: (id: string) => void;
}

export function WorldMap({ activeCountries, onCountryTap }: WorldMapProps) {
  const [hoveredGeo, setHoveredGeo] = useState<string | null>(null);

  const activeNodes = COUNTRY_NODES.filter((n) => activeCountries.includes(n.id));

  return (
    <div style={{ width: "100%", height: "100%", background: "#040d18", position: "relative", overflow: "hidden" }}>
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 153, center: [20, 10] }}
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <radialGradient id="oceangrd" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#071830" />
            <stop offset="60%" stopColor="#04101f" />
            <stop offset="100%" stopColor="#020a14" />
          </radialGradient>
          <filter id="landGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="nodeGlow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="activeGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Ocean */}
        <rect width="100%" height="100%" fill="url(#oceangrd)" />

        {/* Countries */}
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isHovered = hoveredGeo === geo.rsmKey;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHoveredGeo(geo.rsmKey)}
                  onMouseLeave={() => setHoveredGeo(null)}
                  style={{
                    default: {
                      fill: isHovered ? "rgba(80,100,140,0.72)" : "rgba(38,58,92,0.62)",
                      stroke: "rgba(90,130,200,0.22)",
                      strokeWidth: 0.5,
                      outline: "none",
                      transition: "fill 0.2s",
                    },
                    hover: {
                      fill: "rgba(80,100,140,0.72)",
                      stroke: "rgba(120,160,230,0.35)",
                      strokeWidth: 0.6,
                      outline: "none",
                    },
                    pressed: {
                      fill: "rgba(80,100,140,0.72)",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Connection arcs between active nodes */}
        {activeNodes.length >= 2 &&
          activeNodes.slice(0, -1).map((from, i) => {
            const to = activeNodes[i + 1];
            return (
              <Line
                key={`arc-${i}`}
                from={[from.lon, from.lat]}
                to={[to.lon, to.lat]}
                stroke="rgba(212,175,55,0.18)"
                strokeWidth={1}
                strokeDasharray="4 8"
                strokeLinecap="round"
              />
            );
          })}

        {/* Art nodes */}
        {COUNTRY_NODES.map((node) => {
          const isActive = activeCountries.includes(node.id);
          return (
            <Marker
              key={node.id}
              coordinates={[node.lon, node.lat]}
              onClick={() => onCountryTap(node.id)}
            >
              <g style={{ cursor: "pointer" }} filter={isActive ? "url(#activeGlow)" : "url(#nodeGlow)"}>
                {/* Outer ring */}
                <circle
                  r={isActive ? 9 : 5.5}
                  fill="none"
                  stroke={isActive ? node.color : "rgba(255,255,255,0.4)"}
                  strokeWidth={isActive ? 1.8 : 1}
                  opacity={isActive ? 0.9 : 0.6}
                />
                {/* Inner dot */}
                <circle
                  r={isActive ? 5 : 3}
                  fill={isActive ? node.color : "rgba(255,255,255,0.65)"}
                />
                {/* Highlight */}
                <circle
                  cx={-1}
                  cy={-1}
                  r={isActive ? 1.8 : 1}
                  fill="rgba(255,255,255,0.75)"
                />
                {/* Pulse rings for active */}
                {isActive && (
                  <>
                    <circle r={9} fill={node.color} opacity={0}>
                      <animate attributeName="r" from="9" to="30" dur="2.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.4" to="0" dur="2.8s" repeatCount="indefinite" />
                    </circle>
                    <circle r={9} fill={node.color} opacity={0}>
                      <animate attributeName="r" from="9" to="20" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.3" to="0" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}
              </g>
              {/* Country label */}
              {isActive && (
                <g>
                  <rect
                    x={-32}
                    y={-27}
                    width={64}
                    height={15}
                    rx={7.5}
                    fill="rgba(0,0,0,0.75)"
                    stroke={node.color}
                    strokeWidth={0.6}
                    opacity={0.95}
                  />
                  <text
                    textAnchor="middle"
                    y={-16}
                    fill={node.color}
                    fontSize={7.5}
                    fontWeight={700}
                    fontFamily="Inter, system-ui, sans-serif"
                    letterSpacing={0.06}
                    style={{ pointerEvents: "none" }}
                  >
                    {node.id.toUpperCase()}
                  </text>
                </g>
              )}
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
