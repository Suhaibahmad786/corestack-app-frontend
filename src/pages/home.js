import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      
      <h1 style={styles.title}>Welcome to CoreStack</h1>
      
      <p style={styles.subtitle}>
        Build your future with authentication system
      </p>

      <div style={styles.buttonBox}>
        
        <Link to="/login">
          <button style={styles.button}>Signin</button>
        </Link>

        <Link to="/signup">
          <button style={styles.button}>Signup</button>
        </Link>

      </div>

    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
    textAlign: "center",
  },
  title: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "gray",
  },
  buttonBox: {
    display: "flex",
    gap: "15px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Home;