import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateChallengeScore } from "../features/progressSlice"; // Redux action
import { useNavigate } from "react-router-dom";
import MatrixBackground from "../components/MatrixBackground"; // Import the Matrix background
import adidasImage from "../imgs/phishing-test/adidas.png";
import awsImage from "../imgs/phishing-test/aws.png";
import bookingImage from "../imgs/phishing-test/booking.png";
import luftansaImage from "../imgs/phishing-test/luftansa.png";
import nikeImage from "../imgs/phishing-test/nike.png";
import paypalImage from "../imgs/phishing-test/paypal.png";
import uberImage from "../imgs/phishing-test/uber.png";
import uber2Image from "../imgs/phishing-test/uber2.png";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<(boolean | null)[]>(
    phishingImages.map(() => null)
  );
  const [showFeedback, setShowFeedback] = useState<"correct" | "wrong" | null>(
    null
  );
  const [showModal, setShowModal] = useState(true); // Control the modal visibility
  const dispatch = useDispatch();

  const handleAnswer = (isLegit: boolean) => {
    const isCorrect = isLegit === phishingImages[currentIndex].isLegit;
    const updatedResults = [...results];
    updatedResults[currentIndex] = isCorrect;
    setResults(updatedResults);

    setShowFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      setShowFeedback(null);
      if (currentIndex < phishingImages.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        calculateScore(updatedResults);
      }
    }, 1500);
  };

  const calculateScore = (results: (boolean | null)[]) => {
    const correctAnswers = results.filter((res) => res === true).length;
    const score = (correctAnswers / phishingImages.length) * 10;

    dispatch(updateChallengeScore({ challengeId: "phishing-test", score }));
    navigate("/stats");
  };

  const progressPercentage = ((currentIndex + 1) / phishingImages.length) * 100;

  return (
    <div style={styles.container}>
      <MatrixBackground />
      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>What Are Phishing Emails?</h2>
            <p style={styles.modalText}>
              Phishing emails are fraudulent attempts to obtain sensitive
              information by pretending to be a trustworthy entity. Here’s how
              to spot them:
            </p>
            <ul style={styles.infoList}>
              <li>Check for misspelled email addresses (e.g., amaz0n.com).</li>
              <li>
                Beware of urgent or threatening language, like "Your account
                will be locked!"
              </li>
              <li>
                Look for generic greetings like "Dear User" instead of your
                name.
              </li>
              <li>
                Hover over links to see if the URL matches the sender’s domain.
              </li>
              <li>Never provide sensitive information via email.</li>
            </ul>
            <button
              onClick={() => setShowModal(false)}
              style={styles.modalButton}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Feedback Animation */}
      {showFeedback === "correct" && (
        <div style={styles.feedbackOverlayCorrect}>✅ Correct!</div>
      )}
      {showFeedback === "wrong" && (
        <div style={styles.feedbackOverlayWrong}>❌ Wrong!</div>
      )}

      {/* Progress Bar */}
      <div style={styles.progressBarContainer}>
        <div
          style={{
            ...styles.progressBar,
            width: `${progressPercentage}%`,
          }}
        ></div>
      </div>

      {/* Banner */}
      <div style={styles.banner}>
        <h1>Phishing Test</h1>
        <p>
          Test your ability to identify phishing scams. Decide if the displayed
          image is a legitimate email or a phishing attempt.
        </p>
      </div>

      {/* Card for Image */}
      <div style={styles.card}>
        <img
          src={phishingImages[currentIndex].src}
          alt={`Phishing Test ${currentIndex + 1}`}
          style={styles.image}
        />
      </div>

      {/* Buttons */}
      <div style={styles.buttonsContainer}>
        <button
          onClick={() => handleAnswer(false)}
          style={{ ...styles.button, backgroundColor: "red" }}
        >
          Scam
        </button>
        <button
          onClick={() => handleAnswer(true)}
          style={{ ...styles.button, backgroundColor: "green" }}
        >
          Legit
        </button>
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
  progressBarContainer: {
    height: "10px",
    backgroundColor: "#333",
    borderRadius: "5px",
    marginBottom: "20px",
    overflow: "hidden",
  },
  progressBar: {
    height: "10px",
    backgroundColor: "#4caf50",
    borderRadius: "5px",
    transition: "width 0.3s ease",
  },
  card: {
    display: "inline-block",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    marginBottom: "20px",
    backgroundColor: "#222",
  },
  image: {
    width: "100%",
    maxWidth: "900px",
    display: "block",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  feedbackOverlayCorrect: {
    position: "fixed" as "fixed",
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
  },
  feedbackOverlayWrong: {
    position: "fixed" as "fixed",
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
  infoList: {
    textAlign: "left" as "left",
    marginTop: "20px",
    listStyleType: "disc",
    lineHeight: "1.8",
    fontSize: "14px",
    color: "#fff",
  },
};

export default PhishingTest;
