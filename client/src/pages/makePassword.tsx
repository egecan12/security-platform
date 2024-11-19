import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateChallengeScore } from "../features/progressSlice"; // Redux action
import icon2 from "../imgs/icon2.png"; // Adjust the path

const commonPasswords = [
  "123456",
  "password",
  "12345678" /* Add other common passwords */,
];

const MakePassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showModal, setShowModal] = useState(true); // Control modal visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if (strength <= 2) return "#ff4d4d"; // Weak
    if (strength <= 4) return "#ffa500"; // Moderate
    return "#4caf50"; // Strong
  };

  const handleStartSSLTest = () => {
    if (strength === 6) {
      dispatch(
        updateChallengeScore({ challengeId: "make-password", score: 10 })
      );
      navigate("/check-password");
    } else {
      alert("Please create a super secure password to proceed.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Rules of Safety</h2>
            <ul style={styles.rulesList}>
              <li>✔️ Never use the same password!</li>
              <li>
                ✔️ Use at least 12 characters that include a mix of:
                <ul style={styles.nestedList}>
                  <li>Uppercase and lowercase letters</li>
                  <li>Numbers</li>
                  <li>Symbols</li>
                </ul>
              </li>
              <li>✔️ Avoid sequential patterns like "1234" or "abcd".</li>
              <li>✔️ Steer clear of common words or easily guessed phrases.</li>
              <li>✔️ Ensure your password is unique and secure.</li>
            </ul>
            <button
              onClick={() => setShowModal(false)}
              style={styles.modalButton}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Banner */}
      <div style={styles.banner}>
        <h1>Create a Super Secure Password</h1>
        <p>
          Strengthen your cybersecurity by learning to create secure passwords.
        </p>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h1>Task 1</h1>
        <img src={icon2} alt="Password Icon" style={styles.icon} />
        <p>Create a super-strong password to move to the next step.</p>
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
        <p style={styles.strengthLabel}>
          {strength <= 2 ? "Weak" : strength <= 4 ? "Moderate" : "Strong"}{" "}
          Password
        </p>
        {strength === 6 && (
          <button onClick={handleStartSSLTest} style={styles.proceedButton}>
            Proceed to Task 2
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center" as "center",
  },
  modalOverlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "left" as "left",
  },
  modalTitle: {
    color: "#007BFF",
    textAlign: "center" as "center",
  },
  rulesList: {
    padding: "10px 20px",
    listStyleType: "none",
    fontSize: "16px",
    lineHeight: "1.8",
  },
  nestedList: {
    listStyleType: "disc",
    marginLeft: "20px",
    marginTop: "10px",
  },
  modalButton: {
    marginTop: "20px",
    display: "block",
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    margin: "0 auto",
  },
  banner: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "20px",
    marginBottom: "20px",
  },
  mainContent: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  icon: {
    width: "100px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  thermometer: {
    height: "10px",
    borderRadius: "5px",
    backgroundColor: "#ddd",
    marginBottom: "10px",
    transition: "width 0.3s ease",
  },
  strengthLabel: {
    margin: "10px 0",
    fontSize: "16px",
    color: "#333",
  },
  proceedButton: {
    backgroundColor: "#28A745",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
};

export default MakePassword;
