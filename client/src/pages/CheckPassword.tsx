import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateChallengeScore } from "../features/progressSlice";
import serverIcon from "../imgs/server.png"; // Adjust the path
import searchIcon from "../imgs/search.png"; // Adjust the path

const PasswordCheckChallenge: React.FC = () => {
  const [showModal, setShowModal] = useState(true); // Control modal visibility
  const [password, setPassword] = useState(""); // Track user input
  const [showWarning, setShowWarning] = useState(false); // Show warning black screen
  const [showGoodJob, setShowGoodJob] = useState(false); // Show "Good job" black screen
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Navigate to SSL test after 4 seconds if "Good job" is displayed
  useEffect(() => {
    if (showGoodJob) {
      const timer = setTimeout(() => {
        navigate("/ssl-test"); // Redirect to SSL test
      }, 4000);

      return () => clearTimeout(timer); // Clear timeout on unmount
    }
  }, [showGoodJob, navigate]);

  // Give score 0 and navigate if warning is displayed
  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => {
        dispatch(
          updateChallengeScore({ challengeId: "password-check", score: 0 })
        ); // Set score to 0
        navigate("/ssl-test"); // Redirect to SSL test
      }, 4000);

      return () => clearTimeout(timer); // Clear timeout on unmount
    }
  }, [showWarning, dispatch, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value); // Start tracking input
    setShowWarning(true); // Show warning as soon as the user starts typing
  };

  const handleSkip = () => {
    setShowGoodJob(true); // Show "Good job" screen
    dispatch(
      updateChallengeScore({ challengeId: "password-check", score: 10 })
    ); // Set score to 10
  };

  return (
    <div style={styles.container}>
      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={{ color: "#007BFF" }}>Warning: Password Safety</h2>
            <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#333" }}>
              Never check your passwords on untrusted websites. Only use{" "}
              <strong>trusted websites</strong> like{" "}
              <a
                href="https://haveibeenpwned.com/Passwords"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#007BFF" }}
              >
                https://haveibeenpwned.com/Passwords
              </a>{" "}
              to see if your password has been compromised. Entering your
              password on untrusted sites can result in it being stolen.
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
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
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

      {/* Blue Banner */}
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
        <label style={{ marginBottom: "10px", display: "block" }}>
          This password will be searched among the hacked-passwords database
          among 2 Billion hacked password data:
        </label>
        <img
          src={serverIcon}
          alt="Server Icon"
          style={{ width: "50px", height: "50px", margin: "20px" }}
        />
        <img
          src={searchIcon}
          alt="Server Icon"
          style={{ width: "50px", height: "50px", margin: "20px" }}
        />

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
    padding: "20px",
  },
  banner: {
    backgroundColor: "#007BFF",
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
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  skipLink: {
    display: "block",
    color: "#007BFF",
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "80%",
    maxWidth: "600px",
    textAlign: "center" as "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
