import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateChallengeScore } from "../features/progressSlice"; // Redux action
import adidasImage from "../imgs/phishing-test/adidas.png";
import awsImage from "../imgs/phishing-test/aws.png";
import bookingImage from "../imgs/phishing-test/booking.png";
import luftansaImage from "../imgs/phishing-test/luftansa.png";
import nikeImage from "../imgs/phishing-test/nike.png";
import paypalImage from "../imgs/phishing-test/paypal.png";
import uberImage from "../imgs/phishing-test/uber.png";
import uber2Image from "../imgs/phishing-test/uber2.png";
import { useNavigate } from "react-router-dom";

const phishingImages = [
  { src: adidasImage, isLegit: false },
  { src: uber2Image, isLegit: true },
  { src: awsImage, isLegit: true },
  { src: bookingImage, isLegit: true },
  { src: luftansaImage, isLegit: true },
  { src: nikeImage, isLegit: true },
  { src: paypalImage, isLegit: false },
  { src: uberImage, isLegit: false },
];

const PhishingTest: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current image index
  const [results, setResults] = useState<(boolean | null)[]>(
    phishingImages.map(() => null)
  );
  const [showFeedback, setShowFeedback] = useState<"correct" | "wrong" | null>(
    null
  ); // Track feedback type
  const dispatch = useDispatch(); // Initialize Redux dispatch

  const handleAnswer = (isLegit: boolean) => {
    const isCorrect = isLegit === phishingImages[currentIndex].isLegit;
    const updatedResults = [...results];
    updatedResults[currentIndex] = isCorrect;
    setResults(updatedResults);

    // Show feedback animation
    setShowFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      setShowFeedback(null); // Hide feedback after animation
      if (currentIndex < phishingImages.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        calculateScore(updatedResults);
      }
    }, 1500); // 1.5-second delay for animation
  };

  const calculateScore = (results: (boolean | null)[]) => {
    const correctAnswers = results.filter((res) => res === true).length;
    const score = (correctAnswers / phishingImages.length) * 10;

    // Dispatch the final score to Redux
    dispatch(updateChallengeScore({ challengeId: "phishing-test", score }));

    // Redirect to Stats Page
    navigate("/stats");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      {/* Feedback Animation */}
      {showFeedback === "correct" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 255, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            color: "green",
            zIndex: 1000,
          }}
        >
          ✅ Correct!
        </div>
      )}
      {showFeedback === "wrong" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            color: "red",
            zIndex: 1000,
          }}
        >
          ❌ Wrong!
        </div>
      )}

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
        <h1>Phishing Test</h1>
        <p>
          Test your ability to identify phishing scams. Decide if the displayed
          image is a legitimate email or a phishing attempt.
        </p>
      </div>

      {/* Display the current image */}
      <div>
        <img
          src={phishingImages[currentIndex].src}
          alt={`Phishing Test ${currentIndex + 1}`}
          style={{
            width: "150%",
            maxWidth: "1000px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>

      {/* Buttons for user to choose */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => handleAnswer(false)} // Mark as Scam
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            marginRight: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Scam
        </button>
        <button
          onClick={() => handleAnswer(true)} // Mark as Legit
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Legit
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

export default PhishingTest;
