import { useLang, LangProvider } from "@/i18n/LangContext";

function NotFoundInner() {
  const { t } = useLang();
  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#04080f",
      fontFamily: "Inter, system-ui, sans-serif",
    }}>
      <div style={{
        textAlign: "center",
        padding: "40px 24px",
        maxWidth: 340,
      }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          background: "rgba(212,175,55,0.08)",
          border: "1px solid rgba(212,175,55,0.22)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <div style={{
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "#D4AF37",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 8,
        }}>
          ArtMap College
        </div>

        <h1 style={{
          fontSize: 22,
          fontWeight: 800,
          color: "#fff",
          marginBottom: 10,
          letterSpacing: "-0.01em",
        }}>
          {t("not_found_title")}
        </h1>

        <p style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.6,
          marginBottom: 28,
        }}>
          {t("not_found_desc")}
        </p>

        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 22px",
            background: "linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.08))",
            border: "1px solid rgba(212,175,55,0.35)",
            borderRadius: 14,
            color: "#D4AF37",
            fontWeight: 700,
            fontSize: 13,
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {t("not_found_back")}
        </a>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <LangProvider>
      <NotFoundInner />
    </LangProvider>
  );
}
