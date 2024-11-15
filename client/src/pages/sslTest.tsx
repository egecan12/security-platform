import React, { useState } from "react";
import icon3 from "../imgs/icon3.png"; // Adjust the path

const SSLTest: React.FC = () => {
  const [secureUsername, setSecureUsername] = useState("");
  const [securePassword, setSecurePassword] = useState("");
  const [insecureUsername, setInsecureUsername] = useState("");
  const [insecurePassword, setInsecurePassword] = useState("");

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
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
          In this task, you should provide your login credentials to the secure
          login. Make sure you pick the one that has encryption protection.
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
          {/* Login Button */}
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "5px 10px", // Added top padding
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
          {/* Login Button */}
          <button
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "5px 10px", // Added top padding
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
    </div>
  );
};

export default SSLTest;
