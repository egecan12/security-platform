import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = async () => {
    setError(""); // Reset any previous errors

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store token in localStorage
        localStorage.setItem("username", username); // Store username in localStorage for personalization
        navigate("/dashboard"); // Redirect to dashboard after successful login
      } else {
        const errorText = await response.text();
        setError(errorText); // Display the error message
      }
    } catch (error) {
      setError("There was an error. Please try again.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      {/* Blue Banner */}
      <div
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>Login to Stay Secure</h1>
        <p>
          Cybersecurity is vital in today's world. Protect yourself by learning
          to identify phishing attacks. Always verify links and sender
          information before entering your credentials.
        </p>
      </div>

      {/* Login Form */}
      <div style={{ marginTop: "20px" }}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            width: "80%",
            maxWidth: "400px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            width: "80%",
            maxWidth: "400px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Login
        </button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

        {/* Register Link */}
        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#007BFF",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Register here
          </span>
        </p>
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: "40px",
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

export default Login;
