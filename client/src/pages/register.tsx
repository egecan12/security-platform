import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import icon1 from "../imgs/icon1.png"; // Adjust the path
const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/dashboard"); // Redirect to makePassword page
      } else {
        const errorMessage = await response.text();
        alert(`Registration failed: ${errorMessage}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error}`);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      {/* Banner with Login Button */}
      <div
        style={{
          position: "relative",
          backgroundColor: "#007BFF",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>Welcome to My Security Training Platform</h1>
        <p>
          This app let you learn security practices on Web and help you to
          better understand{" "}
        </p>
        {/* Login Button */}
        <button
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/login")} // Redirect to login page
        >
          Login
        </button>
      </div>

      {/* Registration Form */}
      <div style={{ marginTop: "20px" }}>
        <h2>Register</h2>
        <img
          src={icon1}
          alt="Description of the image"
          style={{ width: "200px" }}
        />{" "}
        <input
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            width: "80%",
            maxWidth: "400px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          style={{
            display: "block",
            margin: "10px auto",
            padding: "10px",
            width: "80%",
            maxWidth: "400px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleRegister}
        >
          Register
        </button>
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

export default Register;
