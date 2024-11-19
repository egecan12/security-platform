import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateChallengeScore } from "../features/progressSlice"; // Import Redux action
import icon2 from "../imgs/icon2.png"; // Adjust the path

const commonPasswords = [
  "123456",
  "password",
  "12345678" /* Add other common passwords */,
];

const MakePassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showModal, setShowModal] = useState(true); // Control the modal visibility
  const navigate = useNavigate(); // Initialize navigate hook for redirection
  const dispatch = useDispatch(); // Initialize dispatch for Redux actions

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

  const handleStartSSLTest = () => {
    if (strength === 6) {
      // Dispatch the score update to Redux
      dispatch(
        updateChallengeScore({ challengeId: "make-password", score: 10 })
      );
      navigate("/ssl-test");
    } else {
      alert("Please create a super secure password to proceed.");
    }
  };

  return (
    <div>
      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "80%",
              maxWidth: "700px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ color: "#007BFF" }}>Rules of Safety</h2>
            <ul
              style={{
                textAlign: "left",
                marginTop: "20px",
                listStyleType: "none",
                lineHeight: "1.8",
                fontSize: "16px",
                color: "#333",
              }}
            >
              <li
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#28A745", marginRight: "10px" }}>
                  ✔️
                </span>
                Never use the same password!
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#28A745", marginRight: "10px" }}>
                  ✔️
                </span>
                Use at least 12 characters that include a mix of:
                <ul
                  style={{
                    marginTop: "10px",
                    marginLeft: "30px",
                    listStyleType: "disc",
                  }}
                >
                  <li>Uppercase and lowercase letters</li>
                  <li>Numbers</li>
                  <li>Symbols</li>
                </ul>
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#28A745", marginRight: "10px" }}>
                  ✔️
                </span>
                Avoid using sequential patterns like <strong>"1234"</strong> or{" "}
                <strong>"abcd"</strong>.
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#28A745", marginRight: "10px" }}>
                  ✔️
                </span>
                Steer clear of common words or phrases that are easily guessed.
              </li>
              <li
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ color: "#28A745", marginRight: "10px" }}>
                  ✔️
                </span>
                Ensure your password is unique and does not contain commonly
                used words like <strong>"password"</strong> or{" "}
                <strong>"qwerty."</strong>
              </li>
            </ul>
            <button
              onClick={() => setShowModal(false)}
              style={{
                marginTop: "20px",
                backgroundColor: "#007BFF",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Blue Banner */}
      <div
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "20px",
          textAlign: "center" as "center",
          marginBottom: "20px",
          width: "100%",
          left: 0,
          top: 0,
          position: "relative", // Ensures the banner is stretched across the page
        }}
      >
        <h1>Create a Super Secure Password</h1>
        <p>
          In today's digital world, password security is critical. Avoid using
          common passwords and make sure your passwords are long, unique, and
          include a mix of characters, numbers, and symbols.
        </p>
      </div>
      <div style={styles.container}>
        {/* Remaining page content */}
        <h1>Task 1</h1>
        <img
          src={icon2}
          alt="Description of the image"
          style={{ width: "200px" }}
        />
        <p>
          Learn to generate password secure in order to move on to next step.
        </p>
        <p>Your password must be super-strong</p>
        <h2>Create a Strong Password</h2>
        {strength === 6 && (
          <div>
            <span>Good Job ! </span>
            <button style={styles.button} onClick={handleStartSSLTest}>
              Proceed to Task 2
            </button>
          </div>
        )}
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
  button: {
    backgroundColor: "green",
    color: "white",
    padding: "10px 20px",
    margin: "20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
};

export default MakePassword;
