import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon2 from "../imgs/icon2.png"; // Adjust the path

const commonPasswords = [
  "123456",
  "password",
  "12345678" /* Add other common passwords */,
];

const MakePassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const navigate = useNavigate(); // Initialize navigate hook for redirection

  const calculateStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    if (commonPasswords.includes(password.toLowerCase())) score -= 2;
    if (/123|abc|qwerty/.test(password.toLowerCase())) score -= 1;
    setStrength(Math.max(score, 0));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 1:
      case 2:
        return "#ff4d4d"; // Weak
      case 3:
      case 4:
        return "#ffa500"; // Moderate
      case 5:
      case 6:
        return "#4caf50"; // Strong
      default:
        return "#ddd"; // Very Weak
    }
  };

  const handleStartSSLTest = () => navigate("/ssl-test");

  return (
    <div>
      {" "}
      {/* Blue Banner */}
      <div
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "20px",
          marginBottom: "20px",
          width: "100%",
          left: 0,
          top: 0,
          position: "relative", // Ensures the banner is stretched across the page
        }}
      >
        <h1>Create a Strong Password</h1>
        <p>
          In today's digital world, password security is critical. Avoid using
          common passwords and make sure your passwords are long, unique, and
          include a mix of characters, numbers, and symbols.
        </p>
      </div>
      <div style={styles.container}>
        <h1>Task 1</h1>
        <img
          src={icon2}
          alt="Description of the image"
          style={{ width: "200px" }}
        />{" "}
        <p>
          Learn to generate password secure in order to move on to next step.
        </p>
        <p>Your password must be super-strong</p>
        <h2>Create a Strong Password</h2>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          style={styles.input}
        />
        <div
          style={{
            ...styles.thermometer,
            backgroundColor: getStrengthColor(),
            width: `${(strength / 6) * 100}%`,
          }}
        />
        <p style={styles.label}>
          {strength < 3 ? "Weak" : strength < 5 ? "Moderate" : "Strong"}{" "}
          Password
        </p>
        {strength === 6 && (
          <div>
            <span>Good Job ! </span>
            <button style={styles.button} onClick={handleStartSSLTest}>
              Proceed to Task 2
            </button>
          </div>
        )}
        <h1>Rules of Safety</h1>
        <p style={styles.instructions}>
          Never use the same password! <br />
          To create a more secure password, use at least 12 characters that
          include a mix of uppercase and lowercase letters, numbers, and
          symbols.
          <br />
          Avoid using sequential patterns (like "1234" or "abcd") and steer
          clear of common words or phrases that are easily guessed. A strong
          password should be unique and not contain any commonly used words like
          "password" or "qwerty."
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as "center",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  thermometer: {
    height: "10px",
    borderRadius: "5px",
    backgroundColor: "#ddd",
    transition: "width 0.3s ease",
  },
  label: {
    marginTop: "10px",
    fontSize: "16px",
  },
  instructions: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.6",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
};

export default MakePassword;
