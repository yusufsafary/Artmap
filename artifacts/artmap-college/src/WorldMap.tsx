import { useState, useCallback, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const COUNTRY_NODES = [
  { id: "Italy",          lon: 12.5,  lat: 41.9,  color: "#D4AF37", movement: "Renaissance" },
  { id: "France",         lon: 2.3,   lat: 46.2,  color: "#87CEEB", movement: "Impressionism" },
  { id: "Netherlands",    lon: 5.3,   lat: 52.1,  color: "#FF8C00", movement: "Dutch Masters" },
  { id: "Japan",          lon: 138.3, lat: 36.2,  color: "#E05C5C", movement: "Ukiyo-e" },
  { id: "China",          lon: 104.2, lat: 35.9,  color: "#FFD700", movement: "Classical" },
  { id: "Egypt",          lon: 30.8,  lat: 26.8,  color: "#DAA520", movement: "Ancient Egypt" },
  { id: "United Kingdom", lon: -1.5,  lat: 52.3,  color: "#4169E1", movement: "Romanticism" },
  { id: "United States",  lon: -95.7, lat: 37.1,  color: "#FF6B35", movement: "Modern Art" },
  { id: "Spain",          lon: -3.7,  lat: 40.4,  color: "#DC143C", movement: "Surrealism" },
];

interface HoveredNode {
  id: string;
  color: string;
  movement: string;
  x: number;
  y: number;
}

interface WorldMapProps {
  activeCountries: string[];
  onCountryTap: (id: string) => void;
}

export function WorldMap({ activeCountries, onCountryTap }: WorldMapProps) {
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [20, 10],
    zoom: 1,
  });
  const [hoveredNode, setHoveredNode] = useState<HoveredNode | null>(null);
  const [hoveredGeo, setHoveredGeo] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMoveEnd = useCallback((pos: { coordinates: [number, number]; zoom: number }) => {
    setPosition(pos);
  }, []);

  const handleZoomIn = useCallback(() => {
    setPosition(p => ({ ...p, zoom: Math.min(p.zoom * 1.6, 10) }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setPosition(p => ({ ...p, zoom: Math.max(p.zoom / 1.6, 1) }));
  }, []);

  const handleReset = useCallback(() => {
    setPosition({ coordinates: [20, 10], zoom: 1 });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoveredNode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setHoveredNode(prev =>
      prev ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top } : null
    );
  }, [hoveredNode]);

  const activeNodes = COUNTRY_NODES.filter(n => activeCountries.includes(n.id));
  const zoomPct = Math.round((position.zoom - 1) / 9 * 100);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredNode(null)}
      style={{ width: "100%", height: "100%", background: "#030c19", position: "relative", overflow: "hidden" }}
    >
      {/* ── MAP ── */}
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 153, center: [20, 10] }}
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <radialGradient id="oceangrd" cx="50%" cy="45%" r="65%">
            <stop offset="0%"   stopColor="#071a30" />
            <stop offset="55%"  stopColor="#040f1f" />
            <stop offset="100%" stopColor="#020810" />
          </radialGradient>
          <filter id="nodeGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="activeGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="labelShadow" x="-20%" y="-40%" width="140%" height="180%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="rgba(0,0,0,0.9)" />
          </filter>
        </defs>

        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          maxZoom={10}
          minZoom={1}
        >
          {/* Ocean bg */}
          <rect width="1600" height="900" x="-800" y="-450" fill="url(#oceangrd)" />

          {/* Countries */}
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => {
                const isH = hoveredGeo === geo.rsmKey;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => setHoveredGeo(geo.rsmKey)}
                    onMouseLeave={() => setHoveredGeo(null)}
                    style={{
                      default: {
                        fill: isH ? "rgba(68,92,135,0.78)" : "rgba(30,50,80,0.68)",
                        stroke: "rgba(60,100,170,0.18)",
                        strokeWidth: 0.4,
                        outline: "none",
                        transition: "fill 0.15s",
                      },
                      hover: {
                        fill: "rgba(68,92,135,0.82)",
                        stroke: "rgba(90,140,220,0.28)",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      pressed: { fill: "rgba(68,92,135,0.82)", outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Connection arcs */}
          {activeNodes.length >= 2 &&
            activeNodes.slice(0, -1).map((from, i) => (
              <Line
                key={`arc-${i}`}
                from={[from.lon, from.lat]}
                to={[activeNodes[i + 1].lon, activeNodes[i + 1].lat]}
                stroke={`${from.color}30`}
                strokeWidth={0.9}
                strokeDasharray="3 7"
                strokeLinecap="round"
              />
            ))}

          {/* Art nodes */}
          {COUNTRY_NODES.map(node => {
            const isActive = activeCountries.includes(node.id);
            const isHov = hoveredNode?.id === node.id;
            const outerR = isActive ? 9 : isHov ? 7.5 : 5.5;
            const innerR = isActive ? 5.5 : isHov ? 4 : 3;

            return (
              <Marker
                key={node.id}
                coordinates={[node.lon, node.lat]}
                onClick={() => onCountryTap(node.id)}
                onMouseEnter={(e: any) => {
                  if (!containerRef.current) return;
                  const rect = containerRef.current.getBoundingClientRect();
                  setHoveredNode({
                    id: node.id,
                    color: node.color,
                    movement: node.movement,
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <g
                  style={{ cursor: "pointer" }}
                  filter={isActive ? "url(#activeGlow)" : isHov ? "url(#nodeGlow)" : undefined}
                >
                  {/* Halo ring */}
                  {isActive && (
                    <circle
                      r={outerR + 4}
                      fill="none"
                      stroke={node.color}
                      strokeWidth={0.6}
                      opacity={0.18}
                    />
                  )}
                  {/* Outer ring */}
                  <circle
                    r={outerR}
                    fill="none"
                    stroke={isActive ? node.color : isHov ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.42)"}
                    strokeWidth={isActive ? 1.6 : 0.9}
                    opacity={isActive ? 0.95 : 0.7}
                  />
                  {/* Inner fill */}
                  <circle
                    r={innerR}
                    fill={isActive ? node.color : isHov ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.65)"}
                  />
                  {/* Specular highlight */}
                  <circle
                    cx={-innerR * 0.32}
                    cy={-innerR * 0.32}
                    r={innerR * 0.38}
                    fill="rgba(255,255,255,0.85)"
                  />
                  {/* Pulse rings for active */}
                  {isActive && (
                    <>
                      <circle r={outerR} fill={node.color} opacity={0}>
                        <animate attributeName="r"       from={String(outerR)} to="32" dur="3.2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.45" to="0"    dur="3.2s" repeatCount="indefinite" />
                      </circle>
                      <circle r={outerR} fill={node.color} opacity={0}>
                        <animate attributeName="r"       from={String(outerR)} to="20" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.3"  to="0"    dur="3.2s" begin="1.6s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                </g>

                {/* Country label */}
                {isActive && (
                  <g filter="url(#labelShadow)">
                    <rect
                      x={-32} y={-outerR - 18}
                      width={64} height={14}
                      rx={7}
                      fill="rgba(4,10,24,0.88)"
                      stroke={node.color}
                      strokeWidth={0.55}
                    />
                    <text
                      textAnchor="middle"
                      y={-outerR - 7}
                      fill={node.color}
                      fontSize={6.5}
                      fontWeight={700}
                      fontFamily="Inter, system-ui, sans-serif"
                      letterSpacing="0.06"
                      style={{ pointerEvents: "none" }}
                    >
                      {node.id.toUpperCase()}
                    </text>
                  </g>
                )}
              </Marker>
            );
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* ── VIGNETTE ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(2,8,18,0.72) 100%)",
      }} />

      {/* ── ZOOM CONTROLS ── */}
      <div style={{
        position: "absolute", right: 14, bottom: 175,
        display: "flex", flexDirection: "column", gap: 6, zIndex: 20,
      }}>
        {([
          { label: "+", fn: handleZoomIn,  title: "Zoom in"    },
          { label: "−", fn: handleZoomOut, title: "Zoom out"   },
          { label: "⊙", fn: handleReset,   title: "Reset view" },
        ] as const).map(b => (
          <button
            key={b.label}
            onClick={b.fn}
            title={b.title}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: "rgba(8,18,38,0.90)",
              border: "1px solid rgba(212,175,55,0.28)",
              color: "rgba(212,175,55,0.92)",
              fontSize: b.label === "⊙" ? 14 : 20,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(14px)",
              boxShadow: "0 2px 14px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
              transition: "background 0.15s, border-color 0.15s",
              lineHeight: 1, userSelect: "none",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.12)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.55)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(8,18,38,0.90)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.28)";
            }}
          >
            {b.label}
          </button>
        ))}

        {/* Zoom level indicator */}
        <div style={{
          textAlign: "center", fontSize: 8, color: "rgba(212,175,55,0.5)",
          fontWeight: 700, letterSpacing: "0.04em", marginTop: 2,
        }}>
          {position.zoom === 1 ? "1×" : `${position.zoom.toFixed(1)}×`}
        </div>
      </div>

      {/* ── ACTIVE REGIONS BADGE ── */}
      {activeCountries.length > 0 && (
        <div style={{
          position: "absolute", top: 98, left: 14, zIndex: 20,
          background: "rgba(8,18,38,0.88)",
          border: "1px solid rgba(212,175,55,0.22)",
          borderRadius: 12, padding: "7px 12px",
          backdropFilter: "blur(14px)",
          boxShadow: "0 2px 14px rgba(0,0,0,0.4)",
          pointerEvents: "none",
        }}>
          <div style={{ fontSize: 9, color: "#D4AF37", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: 5 }}>
            {activeCountries.length} Active Region{activeCountries.length > 1 ? "s" : ""}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {activeCountries.slice(0, 5).map(c => {
              const node = COUNTRY_NODES.find(n => n.id === c);
              return node ? (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: node.color, boxShadow: `0 0 5px ${node.color}`,
                  }} />
                  <span style={{ fontSize: 8, color: node.color, fontWeight: 600 }}>{node.id}</span>
                </div>
              ) : null;
            })}
            {activeCountries.length > 5 && (
              <span style={{ fontSize: 8, color: "rgba(255,255,255,0.35)" }}>+{activeCountries.length - 5}</span>
            )}
          </div>
        </div>
      )}

      {/* ── MAP LEGEND ── */}
      <div style={{
        position: "absolute", bottom: 175, left: 14, zIndex: 20,
        background: "rgba(8,18,38,0.82)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10, padding: "7px 10px",
        backdropFilter: "blur(14px)",
        pointerEvents: "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#D4AF37", boxShadow: "0 0 7px #D4AF37" }} />
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>Active era</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.3)" }} />
          <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>Other regions</span>
        </div>
        <div style={{ fontSize: 8, color: "rgba(255,255,255,0.2)", marginTop: 6, lineHeight: 1.4 }}>
          Drag to pan · Scroll to zoom
        </div>
      </div>

      {/* ── HOVER TOOLTIP ── */}
      {hoveredNode && (() => {
        const TW = 148;
        const x = Math.min(hoveredNode.x + 16, (containerRef.current?.clientWidth ?? 400) - TW - 8);
        const y = Math.max(hoveredNode.y - 60, 8);
        return (
          <div style={{
            position: "absolute", left: x, top: y,
            width: TW, zIndex: 40, pointerEvents: "none",
            background: "rgba(6,14,32,0.96)",
            border: `1px solid ${hoveredNode.color}55`,
            borderRadius: 13, padding: "9px 13px",
            backdropFilter: "blur(18px)",
            boxShadow: `0 4px 28px rgba(0,0,0,0.55), 0 0 0 1px ${hoveredNode.color}18`,
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 7, marginBottom: 5,
            }}>
              <div style={{
                width: 9, height: 9, borderRadius: "50%",
                background: hoveredNode.color, boxShadow: `0 0 7px ${hoveredNode.color}`,
                flexShrink: 0,
              }} />
              <div style={{ fontSize: 12, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
                {hoveredNode.id}
              </div>
            </div>
            <div style={{ fontSize: 10, color: hoveredNode.color, fontWeight: 600, letterSpacing: "0.03em", marginBottom: 5 }}>
              {hoveredNode.movement}
            </div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.38)", display: "flex", alignItems: "center", gap: 4 }}>
              <span>Tap to explore</span>
              <span style={{ fontSize: 11 }}>→</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
