import { useState, useEffect, useRef } from "react";
import hero from './hero.jpg';
import image1 from './image1.jpg';
import image2 from './image2.jpg';
import image3 from './image3.jpg';
import image4 from './image4.jpg';




const BLUSH = "#F2E4DC";
const BLUSH_DARK = "#E8D0C4";
const BLUSH_DEEPER = "#D4B5A8";
const BLUSH_DEEP = "#D4B5A8";
const BLUSH_DARKER = "#C4A096";
const BLUSH_LIGHT = "#F5E8E0";
const ROSE = "#C49A8A";
const ROSE_DARK = "#A67868";
const BROWN = "#6B4C43";
const CREAM = "#FAF7F4";
const CREAM2 = "#F5F0EB";
const WHITE = "#FFFFFF";
const TEXT_DARK = "#2C1F1A";
const TEXT_MID = "#7A5C55";
const TEXT_LIGHT = "#A68880";
const GOLD = "#C9A07A";

const IMAGES = {
  hero: hero,
  col1:image1,
  col2: image2,
  col3: image3,
  col4: image4,
  store: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
  vivian: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  gioia: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
};

function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return { isMobile, isTablet };
}

const collections = [
  { img: IMAGES.col1, tag: "Neue Kollektion", name: "Mailänder Eleganz", season: "Frühjahr 2025" },
  { img: IMAGES.col2, tag: "Exklusiv", name: "Pariser Leichtigkeit", season: "Sommer 2025" },
  { img: IMAGES.col3, tag: "Couture", name: "Abendmode", season: "Kollektion" },
  { img: IMAGES.col4, tag: "Limitiert", name: "Show-Stopper", season: "Exklusiv" },
];

export default function App() {
  const [hovCol, setHovCol] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isTablet } = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile && !isTablet) setMenuOpen(false);
  }, [isMobile, isTablet]);

  const navLinks = ["Kollektion", "Über uns", "Boutique", "Service"];

  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
      background: CREAM,
      color: TEXT_DARK,
      margin: 0,
      padding: 0,
      overflowX: "hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes shimmer { 0%,100% { opacity:0.6 } 50% { opacity:1 } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:translateY(0) } }
        .col-img { transition: transform 0.7s ease; }
        .col-item:hover .col-img { transform: scale(1.06); }
        button { font-family: 'Cormorant Garamond', 'Georgia', serif; }

        /* Responsive grid helpers */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: ${BLUSH_DARK};
        }
        .collection-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 48px;
        }
        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        .visit-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 48px;
        }
        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* Tablet (640px – 1023px) */
        @media (max-width: 1023px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .collection-grid { grid-template-columns: repeat(2, 1fr); }
          .story-grid { grid-template-columns: 1fr; gap: 40px; }
          .visit-grid { grid-template-columns: 1fr; gap: 40px; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
          .story-badge { right: -8px !important; bottom: -8px !important; }
        }

        /* Mobile (< 640px) */
        @media (max-width: 639px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .collection-grid { grid-template-columns: repeat(2, 1fr); }
          .team-grid { grid-template-columns: 1fr; gap: 36px; }
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .story-grid { grid-template-columns: 1fr; gap: 32px; }
          .visit-grid { grid-template-columns: 1fr; gap: 32px; }
          .story-badge { right: 0 !important; bottom: -16px !important; }
          .hero-buttons { flex-direction: column; gap: 12px; }
          .cta-buttons { flex-direction: column; align-items: center; gap: 12px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(250,247,244,0.97)" : "rgba(250,247,244,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled ? BLUSH_DARK : "transparent"}`,
        padding: "0 5vw",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: scrolled ? 60 : 76,
        transition: "all 0.4s ease",
        animation: "fadeDown 0.6s ease"
      }}>
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
          <span style={{ fontSize: scrolled ? 16 : isMobile ? 16 : 22, fontWeight: 500, letterSpacing: "4px", textTransform: "uppercase", color: TEXT_DARK, transition: "font-size 0.4s" }}>
            Strauss & Co
          </span>
          <span style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: TEXT_LIGHT }}>
            seit 1921 · münchen
          </span>
        </div>

        {/* Desktop Nav Links */}
        {!isMobile && !isTablet && (
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {navLinks.map(l => (
              <span key={l} style={{ fontSize: 12, letterSpacing: "2px", textTransform: "uppercase", color: TEXT_MID, cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = ROSE_DARK}
                onMouseLeave={e => e.target.style.color = TEXT_MID}>{l}</span>
            ))}
          </div>
        )}

        {/* Desktop CTA */}
        {!isMobile && !isTablet && (
          <button style={{
            background: "transparent", color: ROSE_DARK, border: `1px solid ${ROSE}`,
            padding: "8px 22px", fontSize: 11, letterSpacing: "2px",
            textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.target.style.background = ROSE; e.target.style.color = WHITE; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = ROSE_DARK; }}
          >Termin buchen</button>
        )}

        {/* Mobile / Tablet Hamburger */}
        {(isMobile || isTablet) && (
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: "8px", display: "flex", flexDirection: "column",
              gap: 5, alignItems: "flex-end"
            }}
          >
            <span style={{ display: "block", width: 24, height: 1.5, background: TEXT_DARK, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none" }} />
            <span style={{ display: "block", width: menuOpen ? 0 : 18, height: 1.5, background: TEXT_DARK, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 24, height: 1.5, background: TEXT_DARK, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none" }} />
          </button>
        )}

        {/* Mobile Dropdown Menu */}
        {(isMobile || isTablet) && menuOpen && (
          <div style={{
            position: "absolute", top: "100%", left: 0, right: 0,
            background: "rgba(250,247,244,0.98)", backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${BLUSH_DARK}`,
            padding: "16px 5vw 24px",
            animation: "slideDown 0.3s ease",
            zIndex: 99,
            display: "flex", flexDirection: "column", gap: 0
          }}>
            {navLinks.map((l, i) => (
              <span key={l} onClick={() => setMenuOpen(false)} style={{
                fontSize: 14, letterSpacing: "2px", textTransform: "uppercase",
                color: TEXT_MID, cursor: "pointer", padding: "14px 0",
                borderBottom: i < navLinks.length - 1 ? `1px solid ${BLUSH_DARK}` : "none",
                display: "block"
              }}>{l}</span>
            ))}
            <button style={{
              background: ROSE, color: WHITE, border: "none",
              padding: "12px 24px", fontSize: 11, letterSpacing: "2px",
              textTransform: "uppercase", cursor: "pointer", marginTop: 20,
              alignSelf: "flex-start"
            }}>Termin buchen</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${IMAGES.hero})`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.55) saturate(0.8)"
        }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(242,228,220,0.55) 0%, rgba(250,247,244,0.15) 100%)` }} />
        <div style={{ position: "relative", zIndex: 2, padding: isMobile ? "0 6vw" : "0 8vw", maxWidth: 680 }}>
          <div style={{
            fontSize: 11, letterSpacing: "5px", textTransform: "uppercase", color: BLUSH,
            marginBottom: isMobile ? 20 : 28,
            display: "flex", alignItems: "center", gap: 14,
            animation: "fadeDown 1s ease 0.2s both"
          }}>
            <span style={{ width: 36, height: 1, background: BLUSH_DEEP, display: "inline-block", flexShrink: 0 }} />
            <span style={{ fontSize: isMobile ? 9 : 11 }}>Exklusive Boutique · Marienplatz München</span>
          </div>
          <h1 style={{
            fontSize: isMobile ? "clamp(32px, 9vw, 48px)" : "clamp(40px, 7vw, 72px)",
            fontWeight: 300, lineHeight: 1.1, letterSpacing: "1px",
            color: WHITE, marginBottom: 8,
            animation: "fadeDown 1s ease 0.4s both"
          }}>
            Lieben Sie das<br />
            <em style={{ fontStyle: "italic", color: BLUSH_LIGHT }}>Außergewöhnliche?</em>
          </h1>
          <div style={{ fontSize: isMobile ? 10 : 13, letterSpacing: "5px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", margin: "18px 0 28px", animation: "fadeDown 1s ease 0.6s both" }}>
            — Seit 1921 am Marienplatz —
          </div>
          <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.9, color: "rgba(255,255,255,0.75)", maxWidth: 460, marginBottom: isMobile ? 32 : 44, fontWeight: 300, animation: "fadeDown 1s ease 0.8s both" }}>
            Wo italienische Eleganz auf französische Lebensart trifft. Monatlich wechselnde Kollektionen, persönlich in Mailand und Paris für Sie ausgewählt.
          </p>
          <div className="hero-buttons" style={{ animation: "fadeDown 1s ease 1s both" }}>
            <button style={{
              background: ROSE, color: WHITE, border: "none",
              padding: isMobile ? "12px 28px" : "14px 38px",
              fontSize: 12, letterSpacing: "2.5px", textTransform: "uppercase",
              cursor: "pointer", transition: "background 0.3s",
              width: isMobile ? "100%" : "auto"
            }}
              onMouseEnter={e => e.target.style.background = ROSE_DARK}
              onMouseLeave={e => e.target.style.background = ROSE}>
              Kollektion entdecken
            </button>
            <button style={{
              background: "transparent", color: WHITE,
              border: "1px solid rgba(255,255,255,0.45)",
              padding: isMobile ? "12px 28px" : "14px 38px",
              fontSize: 12, letterSpacing: "2.5px", textTransform: "uppercase",
              cursor: "pointer",
              width: isMobile ? "100%" : "auto"
            }}>
              Unsere Geschichte
            </button>
          </div>
        </div>
        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          color: "rgba(255,255,255,0.45)", fontSize: 10, letterSpacing: "3px",
          textTransform: "uppercase", animation: "shimmer 2s ease 2s infinite"
        }}>
          <span style={{ width: 1, height: 44, background: `linear-gradient(to bottom, ${BLUSH}, transparent)` }} />
          scroll
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: BLUSH_DARK, padding: "13px 0", overflow: "hidden", whiteSpace: "nowrap", borderTop: `1px solid ${BLUSH_DEEPER}`, borderBottom: `1px solid ${BLUSH_DEEPER}` }}>
        <span style={{ display: "inline-block", animation: "marquee 24s linear infinite", fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", color: BROWN, fontWeight: 500 }}>
          {Array(8).fill("MAILAND · PARIS · MÜNCHEN · COUTURE · SEIT 1921 · EXKLUSIV · FASHION · ").join("")}
        </span>
      </div>

      {/* STATS */}
      <FadeIn>
        <div className="stats-grid">
          {[
            { num: "1921", label: "Gegründet" },
            { num: "100+", label: "Jahre Tradition" },
            { num: "2×", label: "Jährlich in Mailand" },
            { num: "2×", label: "Jährlich in Paris" },
          ].map(st => (
            <div key={st.label} style={{ background: CREAM, padding: isMobile ? "28px 16px" : "40px 24px", textAlign: "center" }}>
              <div style={{ fontSize: isMobile ? 32 : 42, fontWeight: 300, color: ROSE_DARK, letterSpacing: "-1px", lineHeight: 1 }}>{st.num}</div>
              <div style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: TEXT_LIGHT, marginTop: 8 }}>{st.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* COLLECTION */}
      <section style={{ padding: isMobile ? "60px 5vw" : "90px 6vw", background: CREAM2 }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
            <div style={{ fontSize: 11, letterSpacing: "5px", textTransform: "uppercase", color: ROSE, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <span style={{ width: 36, height: 1, background: BLUSH_DEEPER, display: "inline-block" }} />
              Aktuelle Kollektion
              <span style={{ width: 36, height: 1, background: BLUSH_DEEPER, display: "inline-block" }} />
            </div>
            <h2 style={{ fontSize: isMobile ? "clamp(26px, 7vw, 36px)" : "clamp(32px, 5vw, 50px)", fontWeight: 300, letterSpacing: "1px", color: TEXT_DARK }}>
              Ausgewählt in <em style={{ fontStyle: "italic", color: ROSE_DARK }}>Mailand & Paris</em>
            </h2>
            <p style={{ fontSize: 16, color: TEXT_LIGHT, lineHeight: 1.9, maxWidth: 480, margin: "16px auto 0", fontWeight: 300 }}>
              Monatlich wechselnde Show-Stopper, persönlich für Sie kuratiert.
            </p>
          </div>
        </FadeIn>
        <div className="collection-grid">
          {collections.map((c, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="col-item" style={{ position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: "3/4" }}
                onMouseEnter={() => setHovCol(i)}
                onMouseLeave={() => setHovCol(null)}>
                <img src={c.img} alt={c.name} className="col-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(44,31,26,0.75) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "16px 12px" : "24px 20px" }}>
                  <div style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: BLUSH, marginBottom: 6 }}>{c.tag}</div>
                  <div style={{ fontSize: isMobile ? 15 : 20, fontWeight: 300, color: WHITE, letterSpacing: "0.5px" }}>{c.name}</div>
                  <div style={{ fontSize: isMobile ? 10 : 12, color: "rgba(255,255,255,0.55)", marginTop: 4, letterSpacing: "1px" }}>{c.season}</div>
                </div>
                <div style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, background: "rgba(250,247,244,0.9)", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovCol === i ? 1 : 0, transition: "opacity 0.3s", fontSize: 18 }}>+</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div style={{ textAlign: "center", marginTop: isMobile ? 32 : 48 }}>
            <button style={{
              background: "transparent", color: ROSE_DARK, border: `1px solid ${ROSE}`,
              padding: isMobile ? "11px 30px" : "13px 40px",
              fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.3s"
            }}
              onMouseEnter={e => { e.currentTarget.style.background = ROSE; e.currentTarget.style.color = WHITE; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = ROSE_DARK; }}>
              Alle Kollektionen ansehen
            </button>
          </div>
        </FadeIn>
      </section>

      {/* STORY */}
      <section style={{ padding: isMobile ? "60px 6vw" : "90px 8vw", background: CREAM }}>
        <div className="story-grid">
          <FadeIn>
            <div style={{ position: "relative" }}>
              <img src={IMAGES.store} alt="Boutique" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
              <div className="story-badge" style={{
                position: "absolute", bottom: -24, right: -24,
                background: BLUSH, padding: isMobile ? "20px 24px" : "28px 32px",
                border: `1px solid ${BLUSH_DARK}`
              }}>
                <div style={{ fontSize: isMobile ? 30 : 42, fontWeight: 300, color: ROSE_DARK, lineHeight: 1 }}>1921</div>
                <div style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: TEXT_LIGHT, marginTop: 4 }}>Gegründet</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ paddingTop: isMobile ? "40px" : "0" }}>
              <div style={{ fontSize: 11, letterSpacing: "5px", textTransform: "uppercase", color: ROSE, marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ width: 36, height: 1, background: BLUSH_DEEPER, display: "inline-block" }} />
                Unsere Geschichte
              </div>
              <h2 style={{ fontSize: isMobile ? "clamp(24px, 7vw, 36px)" : "clamp(28px, 4vw, 46px)", fontWeight: 300, letterSpacing: "0.5px", lineHeight: 1.2, color: TEXT_DARK, marginBottom: 24 }}>
                Tradition trifft<br /><em style={{ fontStyle: "italic", color: ROSE_DARK }}>Couture</em>
              </h2>
              <blockquote style={{ fontSize: isMobile ? 17 : 20, fontStyle: "italic", color: ROSE, lineHeight: 1.7, borderLeft: `2px solid ${BLUSH_DARK}`, paddingLeft: 20, marginBottom: 32, fontWeight: 300 }}>
                "Life's a Party – Join the Celebration"
              </blockquote>
              <p style={{ fontSize: 15, color: TEXT_MID, lineHeight: 2, fontWeight: 300, marginBottom: 20 }}>
                Seit 1921 am Münchener Marienplatz, eingebettet in das historische Rathaus der Weltstadt mit Herz. Das Familienunternehmen H. Chr. Strauss & Co vereint seit über einem Jahrhundert italienische Eleganz mit französischer Lebensart.
              </p>
              <p style={{ fontSize: 15, color: TEXT_MID, lineHeight: 2, fontWeight: 300, marginBottom: 36 }}>
                Vivian Scher und Gioia Gruosso reisen persönlich nach Mailand und Paris — immer auf der Suche nach dem Außergewöhnlichen, nur für Sie.
              </p>
              <button style={{ background: ROSE, color: WHITE, border: "none", padding: "13px 36px", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", cursor: "pointer", transition: "background 0.3s" }}
                onMouseEnter={e => e.target.style.background = ROSE_DARK}
                onMouseLeave={e => e.target.style.background = ROSE}>
                Mehr erfahren
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: isMobile ? "60px 6vw" : "90px 8vw", background: BLUSH }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 60 }}>
            <div style={{ fontSize: 11, letterSpacing: "5px", textTransform: "uppercase", color: ROSE_DARK, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <span style={{ width: 36, height: 1, background: BLUSH_DARKER, display: "inline-block" }} />
              Creators of our Style
              <span style={{ width: 36, height: 1, background: BLUSH_DARKER, display: "inline-block" }} />
            </div>
            <h2 style={{ fontSize: isMobile ? "clamp(24px, 7vw, 36px)" : "clamp(28px, 4vw, 46px)", fontWeight: 300, color: TEXT_DARK }}>
              Persönlich <em style={{ fontStyle: "italic", color: ROSE_DARK }}>für Sie</em>
            </h2>
          </div>
        </FadeIn>
        <div className="team-grid">
          {[
            { name: "Vivian Scher", role: "Creative Director", img: IMAGES.vivian, desc: "Vivian reist zweimal jährlich nach Mailand, um exklusive Kollektionen persönlich auszuwählen. Ihr Gespür für Stil und Eleganz macht jede Kollektion zu einem Erlebnis." },
            { name: "Gioia Gruosso", role: "Style Director", img: IMAGES.gioia, desc: "Gioia bringt die Leichtigkeit Frankreichs nach München — mit einem Auge für das Außergewöhnliche und einer Leidenschaft für Pariser Mode." },
          ].map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img src={t.img} alt={t.name} style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block", filter: "saturate(0.85)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: ROSE }} />
                </div>
                <div style={{ fontSize: 24, fontWeight: 300, color: TEXT_DARK, letterSpacing: "1px" }}>{t.name}</div>
                <div style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: ROSE_DARK, marginTop: -10 }}>{t.role}</div>
                <div style={{ fontSize: 14, color: TEXT_MID, lineHeight: 1.9, fontWeight: 300 }}>{t.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* VISIT */}
      <section style={{
        padding: isMobile ? "60px 6vw" : "90px 8vw",
        background: `linear-gradient(rgba(44,31,26,0.72), rgba(44,31,26,0.72)), url(${IMAGES.store}) center/cover`,
      }}>
        <div className="visit-grid">
          <FadeIn>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "5px", textTransform: "uppercase", color: BLUSH, marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ width: 36, height: 1, background: BLUSH_DEEPER, display: "inline-block" }} />
                Besuchen Sie uns
              </div>
              <h2 style={{ fontSize: isMobile ? "clamp(24px, 7vw, 36px)" : "clamp(28px, 4vw, 44px)", fontWeight: 300, color: WHITE, marginBottom: 36 }}>
                Boutique am <em style={{ fontStyle: "italic", color: BLUSH }}>Marienplatz</em>
              </h2>
              {[
                { label: "Adresse", val: "Marienplatz 8\n80331 München" },
                { label: "Öffnungszeiten", val: "Mo – Fr: 10:00 – 19:00\nSa: 10:00 – 18:00" },
                { label: "Telefon", val: "+49 (0)89 12286886" },
                { label: "E-Mail", val: "h.chr.straussundco@gmail.com" },
              ].map(item => (
                <div key={item.label} style={{ borderBottom: "1px solid rgba(242,228,220,0.15)", paddingBottom: 18, marginBottom: 18 }}>
                  <div style={{ fontSize: 10, letterSpacing: "3px", textTransform: "uppercase", color: BLUSH_DEEPER, marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 15, color: WHITE, fontWeight: 300, lineHeight: 1.7, whiteSpace: "pre-line", wordBreak: "break-all" }}>{item.val}</div>
                </div>
              ))}
              <button style={{
                background: "transparent", color: BLUSH,
                border: `1px solid rgba(242,228,220,0.5)`,
                padding: "13px 36px", fontSize: 11, letterSpacing: "2.5px",
                textTransform: "uppercase", cursor: "pointer", marginTop: 16, transition: "all 0.3s"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = ROSE; e.currentTarget.style.borderColor = ROSE; e.currentTarget.style.color = WHITE; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(242,228,220,0.5)"; e.currentTarget.style.color = BLUSH; }}>
                Termin vereinbaren
              </button>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{
              background: "rgba(250,247,244,0.07)",
              border: "1px solid rgba(242,228,220,0.2)",
              padding: isMobile ? "28px 24px" : "44px 40px",
              marginTop: isMobile ? "0" : "0"
            }}>
              <div style={{ fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", color: BLUSH, marginBottom: 20 }}>Persönliche Stilberatung</div>
              <h3 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 300, color: WHITE, lineHeight: 1.3, marginBottom: 20 }}>
                Lassen Sie sich <em style={{ fontStyle: "italic", color: BLUSH }}>inspirieren</em>
              </h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, fontWeight: 300, marginBottom: 28 }}>
                Vereinbaren Sie einen persönlichen Beratungstermin und entdecken Sie Ihre neue Lieblingskollektion.
              </p>
              {["Persönliche Stilberatung", "Exklusive Vorab-Einblicke", "Maßgeschneiderte Empfehlungen", "VIP-Zugang zu Neuankömmlinge"].map(f => (
                <div key={f} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 14 }}>
                  <span style={{ color: ROSE, fontSize: 8 }}>◆</span> {f}
                </div>
              ))}
              <button style={{ background: ROSE, color: WHITE, border: "none", padding: "13px 36px", fontSize: 11, letterSpacing: "2.5px", textTransform: "uppercase", cursor: "pointer", marginTop: 24, transition: "background 0.3s" }}
                onMouseEnter={e => e.target.style.background = ROSE_DARK}
                onMouseLeave={e => e.target.style.background = ROSE}>
                Jetzt buchen
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: isMobile ? "60px 6vw" : "90px 8vw", background: CREAM2 }}>
        <FadeIn>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: isMobile ? 36 : 56 }}>
              <div style={{ fontSize: 11, letterSpacing: "5px", textTransform: "uppercase", color: ROSE, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                <span style={{ width: 36, height: 1, background: BLUSH_DEEPER, display: "inline-block" }} />
                Häufige Fragen
                <span style={{ width: 36, height: 1, background: BLUSH_DEEPER, display: "inline-block" }} />
              </div>
              <h2 style={{ fontSize: isMobile ? "clamp(24px, 7vw, 36px)" : "clamp(28px, 4vw, 44px)", fontWeight: 300, color: TEXT_DARK }}>
                Alles, was Sie <em style={{ fontStyle: "italic", color: ROSE_DARK }}>wissen möchten</em>
              </h2>
            </div>
            {[
              { q: "Wie oft wechseln Ihre Kollektionen?", a: "Unsere Kollektionen wechseln monatlich — frisch ausgewählt in Mailand und Paris, damit Sie immer die neuesten Trends entdecken können." },
              { q: "Kann ich einen persönlichen Stilberatungstermin buchen?", a: "Ja! Wir bieten persönliche Stilberatungen in unserer Boutique an. Rufen Sie uns an oder senden Sie uns eine E-Mail, um einen Termin zu vereinbaren." },
              { q: "Bieten Sie auch Anpassungen an?", a: "Wir arbeiten mit ausgewählten Schneidern zusammen, um sicherzustellen, dass jedes Stück perfekt sitzt. Fragen Sie unser Team nach Details." },
              { q: "Wo finde ich Ihre Boutique?", a: "Wir befinden uns im Herzen Münchens am Marienplatz 8, eingebettet in das historische Rathaus. Direkt erreichbar mit U-Bahn, Tram und Bus." },
            ].map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${BLUSH_DARK}`, padding: "20px 0", cursor: "pointer" }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: isMobile ? 14 : 16, fontWeight: 400, color: TEXT_DARK, letterSpacing: "0.3px" }}>{f.q}</span>
                  <span style={{ color: ROSE, fontSize: 22, fontWeight: 300, flexShrink: 0, transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </div>
                {openFaq === i && (
                  <div style={{ fontSize: 14, color: TEXT_MID, lineHeight: 1.9, marginTop: 14, fontWeight: 300 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* CTA */}
      <section style={{ padding: isMobile ? "60px 6vw" : "90px 8vw", background: BLUSH_DARK, textAlign: "center" }}>
        <FadeIn>
          <div style={{ fontSize: 11, letterSpacing: "5px", textTransform: "uppercase", color: ROSE_DARK, marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <span style={{ width: 36, height: 1, background: BLUSH_DEEPER, display: "inline-block" }} />
            Werden Sie Teil unserer Welt
            <span style={{ width: 36, height: 1, background: BLUSH_DEEPER, display: "inline-block" }} />
          </div>
          <h2 style={{ fontSize: isMobile ? "clamp(26px, 7vw, 40px)" : "clamp(32px, 5vw, 54px)", fontWeight: 300, color: TEXT_DARK, marginBottom: 16 }}>
            Bereit für Ihren <em style={{ fontStyle: "italic", color: ROSE_DARK }}>neuen Lieblingslook?</em>
          </h2>
          <p style={{ fontSize: 16, color: TEXT_MID, lineHeight: 1.9, maxWidth: 460, margin: "0 auto 44px", fontWeight: 300 }}>
            Besuchen Sie uns am Marienplatz oder vereinbaren Sie Ihren persönlichen Beratungstermin.
          </p>
          <div className="cta-buttons">
            <button style={{
              background: ROSE, color: WHITE, border: "none",
              padding: "14px 40px", fontSize: 12, letterSpacing: "2.5px",
              textTransform: "uppercase", cursor: "pointer", transition: "background 0.3s",
              width: isMobile ? "100%" : "auto"
            }}
              onMouseEnter={e => e.target.style.background = ROSE_DARK}
              onMouseLeave={e => e.target.style.background = ROSE}>
              Termin buchen
            </button>
            <button style={{
              background: "transparent", color: ROSE_DARK, border: `1px solid ${ROSE}`,
              padding: "14px 40px", fontSize: 12, letterSpacing: "2.5px",
              textTransform: "uppercase", cursor: "pointer",
              width: isMobile ? "100%" : "auto"
            }}>
              Kontakt aufnehmen
            </button>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{ background: TEXT_DARK, padding: isMobile ? "48px 6vw 28px" : "60px 8vw 36px" }}>
        <div className="footer-grid">
          <div>
            <div style={{ fontSize: 20, letterSpacing: "5px", textTransform: "uppercase", color: WHITE, marginBottom: 6 }}>Strauss & Co</div>
            <div style={{ fontSize: 10, letterSpacing: "3px", color: ROSE, marginBottom: 18 }}>SEIT 1921 · MARIENPLATZ MÜNCHEN</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 2, fontWeight: 300, maxWidth: 280 }}>
              Das Familienunternehmen H. Chr. Strauss & Co — wo italienische Eleganz auf französische Lebensart trifft, seit über einem Jahrhundert.
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", color: ROSE, marginBottom: 20 }}>Navigation</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Kollektion", "Über uns", "Service", "Boutique", "Kontakt"].map(l => (
                <span key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", cursor: "pointer", letterSpacing: "0.5px" }}
                  onMouseEnter={e => e.target.style.color = BLUSH}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}>{l}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "4px", textTransform: "uppercase", color: ROSE, marginBottom: 20 }}>Kontakt</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Marienplatz 8, München", "+49 (0)89 12286886", "h.chr.straussundco@gmail.com", "@straussundco_boutique"].map(l => (
                <span key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", letterSpacing: "0.3px", wordBreak: "break-all" }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12
        }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.5px" }}>© 2025 H.Chr Strauss & Co. OHG · Alle Rechte vorbehalten</div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Datenschutz", "Impressum", "AGB"].map(l => (
              <span key={l} style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", cursor: "pointer" }}>{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}