import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link for the Header

// --- PART 1: THE HEADER COMPONENT ---
// This ensures your navigation stays consistent across all pages
const Header = () => {
  const hStyles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 50px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
    },
    navLogo: { display: 'flex', alignItems: 'center', gap: '10px' },
    navLogoIcon: { fontSize: '24px', color: '#4318ff' }, // Matched your blue color
    navLogoText: { fontWeight: 'bold', fontSize: '20px', color: '#1b2559' },
    navLinks: { display: 'flex', gap: '25px', alignItems: 'center' },
    navLink: { textDecoration: 'none', color: '#707ebe', fontWeight: '500', fontSize: '14px' },
    navLoginBtn: { padding: '8px 16px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '600', color: '#1b2559' },
    navSignupBtn: { padding: '10px 20px', backgroundColor: '#4318ff', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }
  };

  return (
    <nav style={hStyles.navbar}>
      <div style={hStyles.navLogo}>
        <span style={hStyles.navLogoIcon}>⬡</span>
        <span style={hStyles.navLogoText}>CoreStack</span>
      </div>
      <div style={hStyles.navLinks}>
        <Link to="/" style={hStyles.navLink}>Home</Link>
        <Link to="/contact" style={hStyles.navLink}>Contact Us</Link>
        <Link to="/price" style={hStyles.navLink}>Price</Link>
        <Link to="/login"><button style={hStyles.navLoginBtn}>Sign In</button></Link>
        <Link to="/signup"><button style={hStyles.navSignupBtn}>Sign Up</button></Link>
      </div>
    </nav>
  );
};

// --- PART 2: THE CONTACT PAGE COMPONENT ---
export default function Contact() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:5000/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

    if (!res.ok) {
  setMessage(data.message || "Something went wrong");
  return;
}

      setMessage("Message sent successfully! ✅ We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });

    } catch (err) {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f4f7fe", minHeight: "100vh" }}>
      {/* 1. Add the Header here */}
      <Header />

      {/* 2. Form Content */}
      <div style={s.container}>
        <div style={s.card}>
          {/* Header */}
          <div style={s.header}>
            <h2 style={s.title}>Contact Us</h2>
            <p style={s.subtitle}>Fill out the form and we'll get back to you shortly.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={s.form}>
            {/* Name */}
            <div style={s.inputGroup}>
              <label style={s.label}>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                style={s.input}
                value={form.name}
                onChange={e => handleChange("name", e.target.value)}
              />
            </div>

            {/* Email */}
            <div style={s.inputGroup}>
              <label style={s.label}>Email Address</label>
              <input
                type="email"
                placeholder="you@email.com"
                style={s.input}
                value={form.email}
                onChange={e => handleChange("email", e.target.value)}
              />
            </div>

            {/* Subject */}
            <div style={s.inputGroup}>
              <label style={s.label}>Subject</label>
              <input
                type="text"
                placeholder="How can we help?"
                style={s.input}
                value={form.subject}
                onChange={e => handleChange("subject", e.target.value)}
              />
            </div>

            {/* Message */}
            <div style={s.inputGroup}>
              <label style={s.label}>Message</label>
              <textarea
                placeholder="Write your message here..."
                rows={5}
                style={{ ...s.input, resize: "vertical" }}
                value={form.message}
                onChange={e => handleChange("message", e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" style={s.button} disabled={loading}>
              {loading ? "Sending..." : "Send Message ✉️"}
            </button>

            {/* Success/Error Message */}
            {message && (
              <p style={{
                textAlign: "center",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
            background:
  typeof message === "string" && message.includes("✅")
    ? "#f0fff4"
    : "#fff5f5",

color:
  typeof message === "string" && message.includes("✅")
    ? "#276749"
    : "#c53030",

border: `1px solid ${
  typeof message === "string" && message.includes("✅")
    ? "#9ae6b4"
    : "#feb2b2"
}`,
              }}>
                {message}
              </p>
            )}
          </form>

          {/* Back button */}
          <button onClick={() => navigate("/")} style={s.backBtn}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// (The s object with your styles remains the same)
const s = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px 20px", // Adjusted padding for better spacing with header
    backgroundColor: "#f4f7fe",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "480px",
  },
  header: { textAlign: "center", marginBottom: "30px" },
  title: { margin: "0 0 8px 0", color: "#1b2559", fontSize: "28px", fontWeight: "700" },
  subtitle: { color: "#a3aed0", fontSize: "14px", margin: 0 },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", fontWeight: "600", color: "#1b2559" },
  input: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #e0e5f2",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#fcfdfe",
    fontFamily: "'Segoe UI', sans-serif",
  },
  button: {
    marginTop: "6px",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#4318ff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0px 4px 12px rgba(67,24,255,0.25)",
  },
  backBtn: {
    marginTop: "16px",
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #e0e5f2",
    backgroundColor: "#fff",
    color: "#707ebe",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
};