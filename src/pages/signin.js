import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🚀 NORMAL LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("https://app-backend-production-89a2.up.railway.app/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data || "Something went wrong");
        return;
      }

      setMessage("Login successful 🚀");
      setTimeout(() => navigate("/dashboard"), 2000);

    } catch (error) {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔵 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setMessage("");

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await fetch("https://app-backend-production-89a2.up.railway.app/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          googleId: user.uid,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data || "Google login failed");
        return;
      }

      setMessage("Google Login successful 🚀");
      setTimeout(() => navigate("/dashboard"), 2000);

    } catch (error) {
      setMessage("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back!</h2>
          <p style={styles.subtitle}>Enter your email and password to sign in.</p>
        </div>

        {/* FORM */}
        <form style={styles.form} onSubmit={handleLogin}>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="mail@website.com"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* MESSAGE */}
          {message && (
            <p style={{
              textAlign: "center",
              color: message.includes("🚀") ? "green" : "red",
              fontWeight: "600",
              fontSize: "14px",
              margin: "0",
            }}>
              {message}
            </p>
          )}

        </form>

        {/* DIVIDER */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>or</span>
          <div style={styles.dividerLine} />
        </div>

        {/* GOOGLE BUTTON */}
        <button
          onClick={handleGoogleLogin}
          style={styles.googleButton}
          disabled={loading}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            style={{ width: "20px", marginRight: "10px" }}
          />
          Continue with Google
        </button>

        {/* BACK & SIGNUP BUTTONS */}
        <div style={styles.actionDivider}>
          <button onClick={() => navigate("/")} style={styles.secondaryButton}>
            ← Back to Home
          </button>
          <button onClick={() => navigate("/signup")} style={styles.secondaryButton}>
            Create Account →
          </button>
        </div>

        <p style={styles.footerText}>
          Forgot password? <span style={styles.link}>Reset it here</span>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f7fe",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    width: "100%",
    maxWidth: "400px",
  },
  header: { textAlign: "center", marginBottom: "30px" },
  title: { margin: "0 0 8px 0", color: "#1b2559", fontSize: "28px", fontWeight: "700" },
  subtitle: { color: "#a3aed0", fontSize: "14px", margin: 0 },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "14px", fontWeight: "600", color: "#1b2559", marginLeft: "4px" },
  input: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #e0e5f2",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#fcfdfe",
  },
  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#4318ff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0px 4px 12px rgba(67, 24, 255, 0.25)",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "20px 0",
    gap: "10px",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#e0e5f2",
  },
  dividerText: {
    color: "#a3aed0",
    fontSize: "13px",
  },
  googleButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #e0e5f2",
    backgroundColor: "#fff",
    color: "#1b2559",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  },
  actionDivider: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },
  secondaryButton: {
    flex: 1,
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #e0e5f2",
    backgroundColor: "#fff",
    color: "#707ebe",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
  footerText: { textAlign: "center", marginTop: "25px", fontSize: "14px", color: "#a3aed0" },
  link: { color: "#4318ff", fontWeight: "600", cursor: "pointer" },
};

export default Login;