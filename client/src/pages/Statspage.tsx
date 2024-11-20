import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { RootState } from "../store/store";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use"; // Optional: For responsive confetti size

const StatsPage: React.FC = () => {
  const { challenges } = useSelector((state: RootState) => state.progress);
  const { width, height } = useWindowSize(); // Get screen size for confetti dimensions
  const navigate = useNavigate(); // Initialize navigate hook

  // Map of challenge IDs to human-readable names
  const challengeNames: Record<string, string> = {
    "password-check": "Password Check",
    "make-password": "Password Generation Test",
    "ssl-test": "SSL Login Test",
    "phishing-test": "Phishing Test",
    // Add new challenge names here
  };

  // Calculate total score dynamically
  const totalScore = Object.values(challenges).reduce(
    (sum, challenge) => sum + challenge.score,
    0
  );

  // Calculate the maximum possible score dynamically
  const maxScore = Object.keys(challenges).length * 10;

  // Determine letter grade dynamically
  const getLetterGrade = (score: number): string => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C+";
    if (percentage >= 40) return "C";
    return "F";
  };

  const letterGrade = getLetterGrade(totalScore);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Confetti Animation */}
      <Confetti width={width} height={height} numberOfPieces={750} />
      {/* Blue Banner */}
      <div
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1>Congratulations!</h1>
        <p>
          You have successfully completed the test. Here’s your performance:
        </p>
      </div>

      {/* Total Score & Grade */}
      <div
        style={{
          marginBottom: "20px",
          padding: "20px",
          backgroundColor: "#f1f1f1",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#007BFF" }}>
          Total Score: {totalScore} / {maxScore}
        </h2>
        <h3 style={{ color: "#28A745" }}>Grade: {letterGrade}</h3>
      </div>

      {/* Progress Section */}
      <h3 style={{ marginBottom: "20px", color: "#333" }}>Your Progress:</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Object.entries(challenges).map(([id, data]) => (
          <li
            key={id}
            style={{
              marginBottom: "10px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: data.completed ? "#e8f5e9" : "#ffebee",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "left",
              maxWidth: "500px",
              margin: "10px auto",
            }}
          >
            <strong>{challengeNames[id] || id}</strong>
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color: data.completed ? "#28A745" : "#D32F2F",
                  fontWeight: "bold",
                }}
              >
                {data.completed ? "Completed" : "Pending"}
              </span>
            </p>
            <p>
              <strong>Score:</strong> {data.score} / 10
            </p>
          </li>
        ))}
      </ul>

      {/* Action Buttons */}
      <div>
        <button
          onClick={() => navigate("/dashboard")} // Redirect to dashboard
          style={{
            marginTop: "20px",
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginRight: "10px", // Add spacing between buttons
          }}
        >
          Retake Test
        </button>
        <button
          onClick={() => alert("Thank you for participating!")}
          style={{
            marginTop: "20px",
            backgroundColor: "#28A745",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default StatsPage;
