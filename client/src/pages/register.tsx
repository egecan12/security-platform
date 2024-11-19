import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon1 from "../imgs/icon1.png"; // Adjust the path
import MatrixBackground from "../components/MatrixBackground"; // Import the background

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/dashboard");
      } else {
        const errorMessage = await response.text();
        alert(`Registration failed: ${errorMessage}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error}`);
    }
  };

  return (
    <div style={styles.container}>
      <MatrixBackground />
      <header style={styles.banner}>
        <h1 style={styles.bannerTitle}>Join Our Security Training Platform</h1>
        <p style={styles.bannerText}>
          Enhance your cybersecurity knowledge with interactive training.
        </p>
        <button style={styles.loginButton} onClick={() => navigate("/login")}>
          Login
        </button>
      </header>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Create an Account</h2>
        <img src={icon1} alt="Security Icon" style={styles.icon} />
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
        <button style={styles.registerButton} onClick={handleRegister}>
          Register
        </button>
      </div>

      <footer style={styles.footer}>
        <p>
          Built by <strong>Egecan Kahyaoğlu</strong>
        </p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as "relative",
    minHeight: "100vh",
    padding: "20px",
    overflow: "hidden", // To ensure no scrollbars appear with the background
    color: "#fff",
  },
  banner: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    padding: "40px",
    textAlign: "center" as "center",
    borderRadius: "8px",
    marginBottom: "20px",
    width: "100%",
  },
  bannerTitle: {
    fontSize: "28px",
    margin: "0",
  },
  bannerText: {
    fontSize: "16px",
    marginTop: "10px",
  },
  loginButton: {
    position: "absolute" as "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "#0056b3",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center" as "center",
    maxWidth: "400px",
    width: "100%",
    color: "#fff",
  },
  cardTitle: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  icon: {
    width: "80px",
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
  registerButton: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  footer: {
    marginTop: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "10px",
    fontSize: "14px",
    color: "#aaa",
    textAlign: "center" as "center",
    width: "100%",
  },
};

export default Register;
