import React, { useState } from "react";
import adidasImage from "../imgs/phishing-test/adidas.png";
import awsImage from "../imgs/phishing-test/aws.png";
import bookingImage from "../imgs/phishing-test/booking.png";
import luftansaImage from "../imgs/phishing-test/luftansa.png";
import nikeImage from "../imgs/phishing-test/nike.png";
import paypalImage from "../imgs/phishing-test/paypal.png";
import uberImage from "../imgs/phishing-test/uber.png";
import uber2Image from "../imgs/phishing-test/uber2.png";

const phishingImages = [
  { src: adidasImage, isLegit: null },
  { src: uber2Image, isLegit: null },
  { src: awsImage, isLegit: null },
  { src: bookingImage, isLegit: null },
  { src: luftansaImage, isLegit: null },
  { src: nikeImage, isLegit: null },
  { src: paypalImage, isLegit: null },
  { src: uberImage, isLegit: null },
];

const PhishingTest: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current image index
  const [results, setResults] = useState<(boolean | null)[]>(
    phishingImages.map(() => null)
  );

  const handleAnswer = (isLegit: boolean) => {
    const updatedResults = [...results];
    updatedResults[currentIndex] = isLegit;
    setResults(updatedResults);

    if (currentIndex < phishingImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("Test completed! Check the console for results.");
      console.log("Results:", updatedResults);
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
