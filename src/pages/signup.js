import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🚀 NORMAL SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("https://app-backend-production-89a2.up.railway.app/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data || "Something went wrong");
        return;
      }

      setMessage("Signup successful 🚀");
      setTimeout(() => navigate("/login"), 2000);

    } catch (error) {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  // 🔵 GOOGLE SIGNUP
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setMessage("");

      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send Google user to your backend
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
        setMessage(data || "Google signup failed");
        return;
      }

      setMessage("Google Signup successful 🚀");
      setTimeout(() => navigate("/dashboard"), 2000);

    } catch (error) {
      setMessage("Google signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Fill in your details to get started.</p>
        </div>

        {/* FORM */}
        <form style={styles.form} onSubmit={handleSignup}>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              placeholder="name@email.com"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
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
          onClick={handleGoogleSignup}
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

        {/* BACK BUTTON */}
        <button onClick={() => navigate("/")} style={styles.secondaryButton}>
          ← Back to Home
        </button>

        {/* LOGIN LINK */}
        <p style={styles.footerText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Log in
          </span>
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
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "380px",
  },
  header: { textAlign: "center", marginBottom: "25px" },
  title: { margin: "0", color: "#1b2559", fontSize: "24px" },
  subtitle: { color: "#a3aed0", fontSize: "13px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { fontSize: "14px", fontWeight: "600", color: "#1b2559" },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d9e6",
    outline: "none",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#4318ff",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
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
    backgroundColor: "#d1d9e6",
  },
  dividerText: {
    color: "#a3aed0",
    fontSize: "13px",
  },
  googleButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #d1d9e6",
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
  secondaryButton: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #d1d9e6",
    backgroundColor: "transparent",
    color: "#4318ff",
    cursor: "pointer",
  },
  footerText: {
    textAlign: "center",
    marginTop: "15px",
    fontSize: "13px",
    color: "#a3aed0",
  },
  link: { color: "#4318ff", fontWeight: "bold", cursor: "pointer" },
};

export default Signup;