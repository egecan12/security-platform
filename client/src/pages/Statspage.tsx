import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { RootState } from "../store/store";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // Optional: For responsive confetti size

const StatsPage: React.FC = () => {
  const { challenges, totalScore } = useSelector(
    (state: RootState) => state.progress
  );
  const { width, height } = useWindowSize(); // Get screen size for confetti dimensions
  const navigate = useNavigate(); // Initialize navigate hook

  // Map of challenge IDs to human-readable names
  const challengeNames: Record<string, string> = {
    "make-password": "Password Generation Test",
    "ssl-test": "SSL Login Test",
    "phishing-test": "Phishing Test",
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      {/* Confetti Animation */}
      <Confetti width={width} height={height} numberOfPieces={250} />
      {/* Blue Banner */}
      <div
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "20px",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <h1>Congratulations!</h1>
        <p>
          You have successfully completed the test. Here's how you performed:
        </p>
      </div>
      <h2>Total Score: {totalScore} / 30</h2> {/* Adjust based on max score */}
      <h3>Your Progress:</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Object.entries(challenges).map(([id, data]) => (
          <li
            key={id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
              textAlign: "left",
              maxWidth: "400px",
              margin: "10px auto",
            }}
          >
            <strong>{challengeNames[id] || id}</strong> {/* Use mapped name */}
            <p>Status: {data.completed ? "Completed" : "Pending"}</p>
            <p>Score: {data.score} / 10</p>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => alert("Thank you for participating!")}
          style={{
            marginTop: "20px",
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px", // Add spacing between buttons
          }}
        >
          Finish
        </button>
        <button
          onClick={() => navigate("/dashboard")} // Redirect to dashboard
          style={{
            marginTop: "20px",
            backgroundColor: "#28A745",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Retake Test
        </button>
      </div>
    </div>
  );
};

export default StatsPage;
