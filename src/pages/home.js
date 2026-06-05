import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>

      {/* ── DARK APP HEADER ── */}
      <header style={styles.appHeader}>
        <div style={styles.headerLeft}>
          <div style={styles.navLogo}>
            <span style={styles.navLogoIcon}>⬡</span>
            <span style={styles.navLogoText}>CoreStack</span>
          </div>
        </div>

        <div style={styles.headerRight}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={styles.navLoginBtn}>Sign In</button>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <button style={styles.navSignupBtn}>Sign Up</button>
          </Link>
        </div>
      </header>

      {/* ── CLEAN HERO SECTION ── */}
      <main style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>v1.0 Stable Release</div>
          <h1 style={styles.title}>Welcome to <span style={styles.highlight}>CoreStack</span></h1>
          <p style={styles.subtitle}>
            A secure and modern workspace for full-stack developers to build, deploy, and scale with confidence.
          </p>
          
          <div style={styles.buttonBox}>
            <Link to="/signup">
              <button style={styles.primaryBtn}>Get Started →</button>
            </Link>
            <Link to="/login">
              <button style={styles.secondaryBtn}>Sign In</button>
            </Link>
          </div>
        </div>
      </main>

      {/* ── DARK APP FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <span style={styles.footerCopy}>© 2026 CoreStack Inc.</span>
          <div style={styles.footerLinks}>
                    <Link to="/contact" style={styles.footerLink}>Contact Us</Link>
            <Link to="/" style={styles.footerLink}>Terms</Link>

            <Link to="/" style={styles.footerLink}>Privacy</Link>
            <Link to="/" style={styles.footerLink}>Support</Link>
          </div>
          <div style={styles.footerSocial}>
            <span style={styles.socialText}>Github</span>
            <span style={styles.socialText}>Twitter</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  },
  // Header matched to Footer color
  appHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 40px",
    height: "64px",
    background: "#0b1437", 
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  headerLeft: { display: "flex", alignItems: "center" },
  navLogo: { display: "flex", alignItems: "center", gap: "10px" },
  navLogoIcon: { fontSize: "24px", color: "#4318ff" },
  navLogoText: { fontWeight: "800", fontSize: "20px", color: "#fff", letterSpacing: "-0.5px" },
  headerRight: { display: "flex", gap: "12px" },
  navLoginBtn: { 
    padding: "8px 16px", 
    borderRadius: "8px", 
    border: "1px solid rgba(255,255,255,0.2)", 
    background: "transparent", 
    color: "#fff", 
    fontWeight: "600", 
    cursor: "pointer", 
    fontSize: "13px" 
  },
  navSignupBtn: { 
    padding: "8px 16px", 
    borderRadius: "8px", 
    border: "none", 
    background: "#4318ff", 
    color: "#fff", 
    fontWeight: "600", 
    cursor: "pointer", 
    fontSize: "13px" 
  },
  
  hero: { 
    flex: 1, 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    background: "radial-gradient(at 0% 0%, rgba(67, 24, 255, 0.05) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(0, 200, 255, 0.05) 0px, transparent 50%)",
  },
  heroContent: { textAlign: "center", padding: "0 20px" },
  badge: { display: "inline-block", padding: "5px 12px", borderRadius: "30px", background: "#ede9fe", color: "#4318ff", fontSize: "11px", fontWeight: "700", marginBottom: "20px", textTransform: "uppercase" },
  title: { fontSize: "52px", fontWeight: "800", color: "#1b2559", margin: "0 0 16px 0", lineHeight: "1.1" },
  highlight: { color: "#4318ff" },
  subtitle: { fontSize: "19px", color: "#718096", marginBottom: "32px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto" },
  buttonBox: { display: "flex", gap: "12px", justifyContent: "center" },
  primaryBtn: { padding: "14px 32px", borderRadius: "10px", border: "none", background: "#1b2559", color: "#fff", fontSize: "15px", fontWeight: "600", cursor: "pointer", boxShadow: "0 10px 20px rgba(27, 37, 89, 0.1)" },
  secondaryBtn: { padding: "14px 32px", borderRadius: "10px", border: "1px solid #e0e5f2", background: "#fff", color: "#1b2559", fontSize: "15px", fontWeight: "600", cursor: "pointer" },
  
  footer: {
    height: "60px",
    background: "#0b1437",
    display: "flex",
    alignItems: "center",
    padding: "0 40px",
  },
  footerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  footerCopy: { fontSize: "13px", color: "#a3aed0", fontWeight: "500" },
  footerLinks: { display: "flex", gap: "20px" },
  footerLink: { textDecoration: "none", color: "#a3aed0", fontSize: "13px", fontWeight: "500" },
  footerSocial: { display: "flex", gap: "15px" },
  socialText: { fontSize: "13px", color: "#fff", fontWeight: "600", cursor: "pointer" }
};

export default Home;