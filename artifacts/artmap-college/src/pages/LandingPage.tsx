import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useLang, LangProvider } from "@/i18n/LangContext";

function AnimatedGlobe() {
  return (
    <div style={{ position: "relative", width: 260, height: 260, margin: "0 auto" }}>
      <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="gGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="gGlobe" cx="42%" cy="38%" r="58%">
            <stop offset="0%" stopColor="#1a2540" />
            <stop offset="100%" stopColor="#04080f" />
          </radialGradient>
          <clipPath id="globeClip">
            <circle cx="130" cy="130" r="90" />
          </clipPath>
        </defs>

        {/* Outer glow ring */}
        <circle cx="130" cy="130" r="118" fill="url(#gGlow)" />

        {/* Globe background */}
        <circle cx="130" cy="130" r="90" fill="url(#gGlobe)" />

        {/* Latitude lines */}
        {[-40, -20, 0, 20, 40].map((lat, i) => {
          const y = 130 + (lat / 90) * 90;
          const r = Math.sqrt(Math.max(0, 90 * 90 - (y - 130) * (y - 130)));
          return r > 0 ? (
            <ellipse key={i} cx="130" cy={y} rx={r} ry={r * 0.35}
              fill="none" stroke="rgba(212,175,55,0.12)" strokeWidth="0.8" clipPath="url(#globeClip)" />
          ) : null;
        })}

        {/* Longitude lines */}
        {[0, 36, 72, 108, 144].map((_, i) => (
          <ellipse key={i} cx="130" cy="130" rx={(i * 18) + 18} ry="90"
            fill="none" stroke="rgba(212,175,55,0.10)" strokeWidth="0.8"
            transform={`rotate(${i * 36} 130 130)`} clipPath="url(#globeClip)" />
        ))}

        {/* Continent dots suggestion */}
        {[
          [100,100],[105,108],[98,116],[112,112],[118,104],
          [155,98],[162,106],[158,114],[168,108],
          [130,140],[137,148],[125,150],[140,144],
          [88,130],[82,138],[92,144],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5"
            fill="#D4AF37" opacity={0.3 + (i % 3) * 0.15} clipPath="url(#globeClip)" />
        ))}

        {/* Globe outline */}
        <circle cx="130" cy="130" r="90" fill="none" stroke="rgba(212,175,55,0.35)" strokeWidth="1.5" />

        {/* Equator highlight */}
        <ellipse cx="130" cy="130" rx="90" ry="31.5"
          fill="none" stroke="rgba(212,175,55,0.22)" strokeWidth="1" clipPath="url(#globeClip)" />

        {/* Crosshair detail — prime meridian */}
        <ellipse cx="130" cy="130" rx="1" ry="90"
          fill="none" stroke="rgba(212,175,55,0.20)" strokeWidth="1" clipPath="url(#globeClip)" />

        {/* Brush stroke accent — artistic element */}
        <path d="M 52 72 Q 95 55 140 68 Q 165 75 178 62"
          fill="none" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />

        {/* Compass needle */}
        <path d="M 186 68 L 196 56 L 194 70 Z" fill="#D4AF37" opacity="0.55" />

        {/* Active dot — highlighted country */}
        <circle cx="155" cy="108" r="5" fill="#D4AF37" opacity="0.9">
          <animate attributeName="r" values="5;8;5" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="155" cy="108" r="3.5" fill="#D4AF37" opacity="1" />

        {/* Second pulse */}
        <circle cx="100" cy="112" r="4" fill="rgba(135,206,235,0.9)">
          <animate attributeName="r" values="4;7;4" dur="3.1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3.1s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="112" r="2.5" fill="#87CEEB" opacity="0.9" />
      </svg>
    </div>
  );
}

function StarField() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 60 }, (_, i) => {
        const x = (i * 137.5) % 100;
        const y = (i * 79.3) % 100;
        const r = [0.6, 0.9, 1.2][i % 3];
        const op = [0.2, 0.35, 0.5][i % 3];
        return <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="#D4AF37" opacity={op} />;
      })}
    </svg>
  );
}

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Interactive World Map",
    titleId: "Peta Dunia Interaktif",
    desc: "Tap any country to uncover its art history — artists, movements, and masterpieces rooted in place.",
    descId: "Ketuk negara mana pun untuk menemukan sejarah seninya — seniman, aliran, dan mahakarya.",
    color: "#D4AF37",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#87CEEB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h4l3-9 4 18 3-9h4" />
      </svg>
    ),
    title: "Guided Journeys",
    titleId: "Perjalanan Terpandu",
    desc: "Follow curated paths through 1,000 years of art history — from Byzantine icons to AI-generated art.",
    descId: "Ikuti jalur kurasi melalui 1.000 tahun sejarah seni — dari ikon Byzantium hingga seni AI.",
    color: "#87CEEB",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E05C5C" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Art Passport",
    titleId: "Paspor Seni",
    desc: "Collect stamps as you explore. Unlock achievements and track your journey through civilizations.",
    descId: "Kumpulkan cap saat menjelajah. Buka pencapaian dan lacak perjalanan Anda melalui peradaban.",
    color: "#E05C5C",
  },
];

const STATS = [
  { value: "1,000+", label: "Years of History", labelId: "Tahun Sejarah" },
  { value: "50+", label: "Countries", labelId: "Negara" },
  { value: "200+", label: "Masterworks", labelId: "Mahakarya" },
  { value: "8", label: "Art Eras", labelId: "Era Seni" },
];

function LandingInner() {
  const { lang, setLang } = useLang();
  const id = lang === "id";
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#04080f",
      fontFamily: "Inter, system-ui, sans-serif",
      color: "#fff",
      overflowX: "hidden",
    }}>
      <StarField />

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: "0 24px",
        height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 40 ? "rgba(4,8,15,0.92)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(16px)" : "none",
        borderBottom: scrollY > 40 ? "1px solid rgba(212,175,55,0.1)" : "none",
        transition: "all 0.3s",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ArtMapLogo size={32} />
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.22em", color: "#D4AF37", textTransform: "uppercase", fontWeight: 800, lineHeight: 1 }}>ArtMap</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.01em" }}>College</div>
          </div>
        </div>

        {/* Right nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setLang(lang === "en" ? "id" : "en")}
            style={{ height: 32, padding: "0 10px", borderRadius: 8, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.22)", color: "#D4AF37", cursor: "pointer", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}
          >
            {lang === "en" ? "ID" : "EN"}
          </button>
          <Link href="/app" style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "8px 18px", borderRadius: 10,
            background: "linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.08))",
            border: "1px solid rgba(212,175,55,0.4)",
            color: "#D4AF37", fontWeight: 700, fontSize: 13,
            textDecoration: "none", letterSpacing: "0.01em",
            transition: "all 0.2s",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {id ? "Buka Peta" : "Open Map"}
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "80px 24px 60px",
        position: "relative",
        textAlign: "center",
      }}>
        {/* Ambient glow behind globe */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -60%)",
          width: 480, height: 480,
          background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Eyebrow pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "5px 14px", borderRadius: 20,
          background: "rgba(212,175,55,0.07)",
          border: "1px solid rgba(212,175,55,0.22)",
          fontSize: 11, color: "#D4AF37", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          marginBottom: 32,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4AF37", display: "inline-block" }} />
          {id ? "Jelajahi Sejarah Seni Dunia" : "Explore 1,000 Years of Art History"}
        </div>

        {/* Globe */}
        <div style={{ marginBottom: 40 }}>
          <AnimatedGlobe />
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: "clamp(32px, 7vw, 58px)",
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1.12,
          letterSpacing: "-0.03em",
          marginBottom: 18,
          maxWidth: 640,
        }}>
          {id ? (
            <>"Google Earth"<br />untuk <span style={{ color: "#D4AF37" }}>Sejarah Seni</span></>
          ) : (
            <>"Google Earth"<br />for <span style={{ color: "#D4AF37" }}>Art History</span></>
          )}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 17,
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.65,
          maxWidth: 480,
          marginBottom: 40,
        }}>
          {id
            ? "Ketuk negara mana pun di peta dunia interaktif dan temukan seniman, mahakarya, serta gerakan seni yang lahir di sana."
            : "Tap any country on an interactive world map and discover the artists, masterworks, and movements that were born there."}
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 16 }}>
          <Link href="/app" style={{
            display: "inline-flex", alignItems: "center", gap: 9,
            padding: "15px 30px", borderRadius: 14,
            background: "linear-gradient(135deg, #D4AF37 0%, #92400E 100%)",
            color: "#0A0A0A", fontWeight: 800, fontSize: 15,
            textDecoration: "none", letterSpacing: "0.01em",
            boxShadow: "0 8px 32px rgba(212,175,55,0.28)",
            transition: "all 0.2s",
          }}>
            {id ? "Mulai Menjelajah" : "Start Exploring"}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <a href="#features" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "15px 26px", borderRadius: 14,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.7)", fontWeight: 700, fontSize: 15,
            textDecoration: "none", letterSpacing: "0.01em",
            transition: "all 0.2s",
          }}>
            {id ? "Pelajari Lebih Lanjut" : "Learn More"}
          </a>
        </div>

        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 8 }}>
          {id ? "Gratis • Tidak perlu akun" : "Free to use · No account required"}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{
        padding: "40px 24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(255,255,255,0.015)",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
          maxWidth: 600,
          margin: "0 auto",
          textAlign: "center",
        }}>
          {STATS.map((s) => (
            <div key={s.value}>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#D4AF37", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4, letterSpacing: "0.02em" }}>
                {id ? s.labelId : s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 10, color: "#D4AF37", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>
              {id ? "Fitur" : "Features"}
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 10 }}>
              {id ? "Cara Baru Memahami Seni" : "A New Way to Understand Art"}
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
              {id ? "Dibangun untuk rasa ingin tahu — bukan kelas seni." : "Built for curiosity — not an art class."}
            </p>
          </div>

          {/* Feature cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 18,
                padding: "22px 22px",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 18,
                transition: "all 0.2s",
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 13, flexShrink: 0,
                  background: `${f.color}10`,
                  border: `1px solid ${f.color}25`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 5 }}>
                    {id ? f.titleId : f.title}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                    {id ? f.descId : f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section style={{
        padding: "80px 24px 100px",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", bottom: 0, left: "50%",
          transform: "translateX(-50%)",
          width: 600, height: 300,
          background: "radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ fontSize: 10, color: "#D4AF37", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>
          {id ? "Siap Menjelajah?" : "Ready to Explore?"}
        </div>
        <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 12, maxWidth: 360, margin: "0 auto 16px" }}>
          {id ? "Mulai Perjalanan Seni Anda" : "Begin Your Art Journey"}
        </h2>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 32, maxWidth: 320, margin: "0 auto 32px" }}>
          {id ? "Ribuan tahun sejarah seni menunggu di ujung jari Anda." : "Thousands of years of art history, waiting at your fingertips."}
        </p>

        <Link href="/app" style={{
          display: "inline-flex", alignItems: "center", gap: 9,
          padding: "16px 34px", borderRadius: 14,
          background: "linear-gradient(135deg, #D4AF37 0%, #92400E 100%)",
          color: "#0A0A0A", fontWeight: 800, fontSize: 16,
          textDecoration: "none",
          boxShadow: "0 8px 40px rgba(212,175,55,0.32)",
        }}>
          {id ? "Buka ArtMap" : "Open ArtMap"}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "28px 24px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <ArtMapLogo size={24} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>ArtMap College</span>
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          {id ? "Dibuat dengan ❤ untuk pecinta seni" : "Made with ❤ for art lovers everywhere"}
        </div>
      </footer>
    </div>
  );
}

export function ArtMapLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="logoGlow" cx="42%" cy="40%" r="58%">
          <stop offset="0%" stopColor="#1e2b45" />
          <stop offset="100%" stopColor="#0a1020" />
        </radialGradient>
        <clipPath id="logoClip">
          <circle cx="40" cy="40" r="29" />
        </clipPath>
      </defs>

      {/* Background circle */}
      <circle cx="40" cy="40" r="29" fill="url(#logoGlow)" />

      {/* Latitude arc */}
      <ellipse cx="40" cy="40" rx="29" ry="10.5"
        fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.35" clipPath="url(#logoClip)" />

      {/* Longitude */}
      <line x1="40" y1="11" x2="40" y2="69"
        stroke="#D4AF37" strokeWidth="1.2" opacity="0.35" clipPath="url(#logoClip)" />

      {/* Globe outline */}
      <circle cx="40" cy="40" r="29" fill="none" stroke="#D4AF37" strokeWidth="1.8" />

      {/* Brush stroke — artistic element above globe */}
      <path d="M 18 22 Q 30 16 44 20 Q 55 24 62 18"
        fill="none" stroke="#D4AF37" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />

      {/* Compass arrow tip */}
      <path d="M 62 18 L 67 12 L 65 20 Z" fill="#D4AF37" opacity="0.7" />

      {/* Active location dot */}
      <circle cx="49" cy="36" r="3.5" fill="#D4AF37" opacity="0.95" />
      <circle cx="49" cy="36" r="5.5" fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.35" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <LangProvider>
      <LandingInner />
    </LangProvider>
  );
}
