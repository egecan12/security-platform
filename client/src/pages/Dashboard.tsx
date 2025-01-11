import React from "react";
import { useNavigate } from "react-router-dom";
import MatrixBackground from "../components/MatrixBackground"; // Import the Matrix background

const Dashboard: React.FC = () => {
  const username = localStorage.getItem("username") || "User";
  const navigate = useNavigate();

  const handleStartTraining = () => {
    navigate("/make-password");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <div style={styles.container}>
      <MatrixBackground />
      {/* Logout Button */}
      <button style={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>

      <div style={styles.banner}>
        <h1>Welcome, {username}!</h1>
        <p>We’re glad to see you here.</p>
      </div>

      <div style={styles.content}>
        <p style={styles.description}>
          This is a training platform. Security awareness training software
          provides businesses with online courses to train and assess their
          employees' security readiness. Businesses use these tools to outsource
          security training to specialized providers with experience and courses
          specific to a variety of security measures. Many of these tools
          deliver simulated attacks or fraudulent emails to help employees
          better identify malicious content before encountering it in real-life
          scenarios.
        </p>
        <button style={styles.button} onClick={handleStartTraining}>
          Start Training
        </button>
      </div>
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
    overflow: "hidden", // Ensure no scrollbars with background
    color: "#fff",
  },
  banner: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    padding: "20px",
    textAlign: "center" as "center",
    borderRadius: "8px",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "800px",
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center" as "center",
    maxWidth: "800px",
    width: "100%",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  },
  logoutButton: {
    position: "absolute" as "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "#dc3545",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold" as "bold",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
  },
};

export default Dashboard;
