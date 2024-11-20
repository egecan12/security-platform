import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateChallengeScore } from "../features/progressSlice";
import MatrixBackground from "../components/MatrixBackground"; // Import the Matrix background
import serverIcon from "../imgs/server.png"; // Adjust the path
import searchIcon from "../imgs/search.png"; // Adjust the path

const PasswordCheckChallenge: React.FC = () => {
  const [showModal, setShowModal] = useState(true); // Control modal visibility
  const [password, setPassword] = useState(""); // Track user input
  const [showWarning, setShowWarning] = useState(false); // Show warning black screen
  const [showGoodJob, setShowGoodJob] = useState(false); // Show "Good job" black screen
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (showGoodJob) {
      const timer = setTimeout(() => {
        navigate("/ssl-test");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showGoodJob, navigate]);

  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => {
        dispatch(
          updateChallengeScore({ challengeId: "password-check", score: 0 })
        );
        navigate("/ssl-test");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showWarning, dispatch, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setShowWarning(true);
  };

  const handleSkip = () => {
    setShowGoodJob(true);
    dispatch(
      updateChallengeScore({ challengeId: "password-check", score: 10 })
    );
  };

  return (
    <div style={styles.container}>
      <MatrixBackground />
      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Warning: Password Safety</h2>
            <p style={styles.modalText}>
              Never check your passwords on untrusted websites. Only use{" "}
              <strong>trusted websites</strong> like{" "}
              <a
                href="https://haveibeenpwned.com/Passwords"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00FF00" }}
              >
                https://haveibeenpwned.com/Passwords
              </a>{" "}
              to see if your password has been compromised.
            </p>
            <button
              onClick={() => setShowModal(false)}
              style={styles.modalButton}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Warning Screen */}
      {showWarning && (
        <div style={styles.warningOverlay}>
          <p style={styles.warningText}>
            ⚠️ Do NOT type your passwords into unknown inputs!
          </p>
        </div>
      )}

      {/* "Good Job" Screen */}
      {showGoodJob && (
        <div style={styles.goodJobOverlay}>
          <p style={styles.goodJobText}>Good job!</p>
        </div>
      )}

      {/* Banner */}
      <div style={styles.banner}>
        <h1>Password Safety Challenge</h1>
        <p>
          Your task is to simulate a password check. Enter a password below to
          verify if it’s in a hacked-password database. But remember: never type
          your real passwords into unknown forms.
        </p>
      </div>

      {/* Input Section */}
      <div style={styles.content}>
        <h2>Enter Your Password</h2>
        <p style={styles.instructionText}>
          This password will be searched among 2 Billion hacked-password data:
        </p>
        <div style={styles.iconRow}>
          <img src={serverIcon} alt="Server Icon" style={styles.icon} />
          <img src={searchIcon} alt="Search Icon" style={styles.icon} />
        </div>
        <input
          type="password"
          placeholder="Enter password here"
          value={password}
          onChange={handleInputChange}
          style={styles.input}
        />
        <a href="#" onClick={handleSkip} style={styles.skipLink}>
          No Thanks! Skip it
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center" as "center",
    position: "relative" as "relative",
    minHeight: "100vh",
    color: "#fff",
    overflow: "hidden",
  },
  banner: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  content: {
    marginTop: "20px",
    padding: "20px",
    textAlign: "left" as "left",
    maxWidth: "500px",
    margin: "0 auto",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  instructionText: {
    marginBottom: "10px",
  },
  iconRow: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  icon: {
    width: "50px",
    height: "50px",
    margin: "0 10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #555",
    backgroundColor: "#222",
    color: "#fff",
    outline: "none",
  },
  skipLink: {
    display: "block",
    color: "#00FF00",
    textDecoration: "underline",
    cursor: "pointer",
    marginTop: "10px",
  },
  modalOverlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  modalContent: {
    backgroundColor: "#333",
    padding: "20px",
    borderRadius: "10px",
    width: "80%",
    maxWidth: "600px",
    textAlign: "center" as "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    color: "#fff",
  },
  modalTitle: {
    color: "#00FF00",
    marginBottom: "10px",
  },
  modalText: {
    fontSize: "14px",
    lineHeight: "1.6",
  },
  modalButton: {
    marginTop: "20px",
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  warningOverlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    color: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3000,
  },
  warningText: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  goodJobOverlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3000,
  },
  goodJobText: {
    color: "green",
    fontSize: "32px",
    fontWeight: "bold",
  },
};

export default PasswordCheckChallenge;
