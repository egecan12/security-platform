import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateChallengeScore } from "../features/progressSlice"; // Redux action
import icon3 from "../imgs/icon3.png"; // Adjust the path

const SSLTest: React.FC = () => {
  const [secureUsername, setSecureUsername] = useState(
    "I_am_secure@example.com"
  );
  const [securePassword, setSecurePassword] = useState("StrongPass@123");
  const [insecureUsername, setInsecureUsername] = useState(
    "I_am_more_secure@example.com"
  );
  const [insecurePassword, setInsecurePassword] = useState("RedDonkey5457");
  const [showWarning, setShowWarning] = useState(false); // To control the black screen
  const [showSuccess, setShowSuccess] = useState(false); // To control the black screen
  const [showModal, setShowModal] = useState(true); // Control the modal visibility

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize Redux dispatch

  const handleInsecureLogin = () => {
    setShowWarning(true); // Show the warning message
    setTimeout(() => {
      // Update Redux state with a score of 0
      dispatch(updateChallengeScore({ challengeId: "ssl-test", score: 0 }));
      navigate("/phishing-test"); // Redirect after delay
    }, 3000); // 3-second delay
  };

  const handleSecureLogin = () => {
    setShowSuccess(true); // Show the success message
    setTimeout(() => {
      // Update Redux state with a score of 10
      dispatch(updateChallengeScore({ challengeId: "ssl-test", score: 10 }));
      navigate("/phishing-test"); // Redirect after delay
    }, 3000); // 3-second delay
  };

  return (
    <>
      <style>
        {`
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }

        .blinking-button {
          animation: blink 1s infinite;
        }
      `}
      </style>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          backgroundColor: "black",
        }}
      >
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
                maxWidth: "400px",
                textAlign: "center",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 style={{ color: "#007BFF" }}>What is SSL Encryption?</h2>
              <img
                src={require("../imgs/ssl.png")} // Adjust the path to your actual image directory
                alt="SSL Encryption"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  margin: "20px auto",
                  display: "block",
                }}
              />
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#333" }}>
                SSL (Secure Sockets Layer) encryption ensures that data
                transmitted between your browser and a website is secure and
                cannot be intercepted by malicious actors. Look for a padlock
                icon and HTTPS in the browser's address bar.
              </p>
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

        {/* Warning Overlay */}
        {showWarning && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              color: "red",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              zIndex: 1000,
            }}
          >
            <p>Wrong Choice! Your credentials may be compromised!</p>
            <p>
              <strong>Username:</strong> {insecureUsername || "Not provided"}
            </p>
            <p>
              <strong>Password:</strong> {insecurePassword || "Not provided"}
            </p>
          </div>
        )}
        {showSuccess && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              color: "green",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              zIndex: 1000,
            }}
          >
            Good Choice! Your password is securely encrypted!
          </div>
        )}

        {/* Blue Banner */}
        <div
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h1>SSL Test</h1>
          <p>
            In this task, you should provide your login credentials to the
            secure login. Make sure you pick the one that has encryption
            protection.
          </p>
        </div>

        {/* Icon */}
        <img
          src={icon3}
          alt="Description of the image"
          style={{ width: "200px", marginBottom: "20px" }}
        />

        {/* Container for Side-by-Side Divs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          {/* Secure Div */}
          <div
            style={{
              backgroundColor: "#f1f1f1",
              padding: "20px",
              borderRadius: "10px",
              width: "45%",
              maxWidth: "600px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            {/* Browser URL Bar */}
            <div
              style={{
                backgroundColor: "#fafafa",
                padding: "10px",
                borderRadius: "5px 5px 0 0",
                textAlign: "left",
                fontFamily: "monospace",
              }}
            >
              <span style={{ color: "green", fontWeight: "bold" }}>🔒</span>{" "}
              https://example.login.com
            </div>
            {/* Secure Input Fields */}
            <div style={{ padding: "20px", textAlign: "left" }}>
              <label>
                Username:
                <input
                  type="text"
                  value={secureUsername}
                  onChange={(e) => setSecureUsername(e.target.value)}
                  style={{
                    display: "block",
                    margin: "10px 0",
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={securePassword}
                  onChange={(e) => setSecurePassword(e.target.value)}
                  style={{
                    display: "block",
                    margin: "10px 0",
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </label>
            </div>
            <button
              onClick={handleSecureLogin}
              className="blinking-button"
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "5px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                position: "absolute",
                bottom: "20px",
                right: "20px",
              }}
            >
              Login
            </button>
          </div>

          {/* Insecure Div */}
          <div
            style={{
              backgroundColor: "#f1f1f1",
              padding: "20px",
              borderRadius: "10px",
              width: "45%",
              maxWidth: "600px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            {/* Browser URL Bar */}
            <div
              style={{
                backgroundColor: "#fafafa",
                padding: "10px",
                borderRadius: "5px 5px 0 0",
                textAlign: "left",
                fontFamily: "monospace",
              }}
            >
              <span style={{ color: "red", fontWeight: "bold" }}>⚠️</span>{" "}
              http://example.login.com
            </div>
            {/* Insecure Input Fields */}
            <div style={{ padding: "20px", textAlign: "left" }}>
              <label>
                Username:
                <input
                  type="text"
                  value={insecureUsername}
                  onChange={(e) => setInsecureUsername(e.target.value)}
                  style={{
                    display: "block",
                    margin: "10px 0",
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  value={insecurePassword}
                  onChange={(e) => setInsecurePassword(e.target.value)}
                  style={{
                    display: "block",
                    margin: "10px 0",
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              </label>
            </div>
            <button
              onClick={handleInsecureLogin}
              className="blinking-button"
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "5px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                position: "absolute",
                bottom: "20px",
                right: "20px",
              }}
            >
              Login
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: "#f1f1f1",
            padding: "10px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          <p>
            Developed by <strong>Egecan Kahyaoğlu</strong>
          </p>
        </footer>
      </div>{" "}
    </>
  );
};

export default SSLTest;
