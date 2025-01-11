import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MatrixBackground from "../components/MatrixBackground"; // Import the Matrix background

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = async () => {
    setError(""); // Reset any previous errors

    try {
      const response = await fetch(
        "https://security-platform-amyr.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store token in localStorage
        localStorage.setItem("username", username); // Store username in localStorage
        window.location.href = "/"; // Use this instead of navigate
      } else if (response.status === 401) {
        setError("Invalid credentials. Please try again.");
      } else if (response.status === 404) {
        setError("User not found. Please register.");
      } else {
        const errorText = await response.text();
        setError(errorText || "An unexpected error occurred.");
      }
    } catch (err) {
      setError("There was an error. Please check your network connection.");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <MatrixBackground />
      {/* Blue Banner */}
      <div style={styles.banner}>
        <h1 style={styles.bannerTitle}>Welcome Back!</h1>
        <p style={styles.bannerText}>
          Secure your digital life. Login to continue your journey towards
          better cybersecurity awareness.
        </p>
      </div>

      {/* Login Form */}
      <div style={styles.formContainer}>
        <h2 style={styles.formTitle}>Login</h2>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
        {error && <p style={styles.errorMessage}>{error}</p>}

        {/* Register Link */}
        <p style={styles.registerText}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={styles.registerLink}
          >
            Register here
          </span>
        </p>
      </div>

      {/* Footer */}
      <footer style={styles.footer}></footer>
    </div>
  );
};

const styles = {
  pageContainer: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as "relative",
    minHeight: "100vh",
    overflow: "hidden", // Ensures no scrollbars with background
  },
  banner: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    padding: "40px",
    textAlign: "center" as "center",
    width: "100%",
    borderBottom: "5px solid rgba(0, 128, 0, 0.8)", // Green Matrix theme
  },
  bannerTitle: {
    fontSize: "32px",
    margin: "0",
  },
  bannerText: {
    fontSize: "18px",
    marginTop: "10px",
  },
  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center" as "center",
    maxWidth: "400px",
    width: "100%",
    color: "#fff",
    marginTop: "-50px", // Overlaps the banner slightly
  },
  formTitle: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    textAlign: "left" as "left",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#ddd",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #555",
    fontSize: "16px",
    backgroundColor: "#222",
    color: "#fff",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  },
  errorMessage: {
    color: "red",
    marginTop: "10px",
  },
  registerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#ccc",
  },
  registerLink: {
    color: "#00FF00",
    cursor: "pointer",
    textDecoration: "underline",
  },
  footer: {
    marginTop: "40px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "10px",
    fontSize: "14px",
    color: "#aaa",
    textAlign: "center" as "center",
    width: "100%",
  },
};

export default Login;
