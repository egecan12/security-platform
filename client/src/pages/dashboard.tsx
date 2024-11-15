import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const username = localStorage.getItem("username") || "User";
  const navigate = useNavigate(); // Initialize useNavigate

  const handleStartTraining = () => {
    navigate("/make-password"); // Navigate to the MakePassword page
  };

  return (
    <div style={styles.container}>
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
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  banner: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "20px",
    textAlign: "center" as "center",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  content: {
    padding: "20px",
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
  },
};

export default Dashboard;
