import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Sample list of common passwords
const commonPasswords = [
  "123456",
  "password",
  "12345678",
  "qwerty",
  "abc123",
  "password1",
  "111111",
  "123123",
  "123456789",
  "12345",
  "1234",
  "iloveyou",
  "123",
  "000000",
  "1234567",
  "letmein",
  "sunshine",
  "admin",
  "welcome",
  "monkey",
  "qwertyuiop",
  "654321",
  "superman",
  "1q2w3e4r",
  "asdfgh",
  "zxcvbnm",
  "1qaz2wsx",
  "password123",
  "123qwe",
  "trustno1",
  "whatever",
  "qazwsx",
  "michael",
  "football",
  "baseball",
  "dragon",
  "princess",
  "shadow",
  "cheese",
  "batman",
  "jennifer",
  "letmein123",
  "hello123",
  "love123",
  "freedom",
  "trustme",
  "cookie",
  "flower",
  "jesus",
  "soccer",
  "killer",
];

const MakePassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const navigate = useNavigate(); // Initialize navigate hook for redirection

  const calculateStrength = (password: string) => {
    let score = 0;

    // Increase score for length
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;

    // Increase score for character diversity
    if (/[a-z]/.test(password)) score += 1; // Lowercase letters
    if (/[A-Z]/.test(password)) score += 1; // Uppercase letters
    if (/[0-9]/.test(password)) score += 1; // Numbers
    if (/[^a-zA-Z0-9]/.test(password)) score += 1; // Special characters

    // Deduct score for common passwords
    if (commonPasswords.includes(password.toLowerCase())) {
      score -= 2; // Strong penalty for common passwords
    }

    // Deduct score for sequential characters or numbers
    if (hasSequentialChars(password)) {
      score -= 1; // Penalty for sequential patterns
    }

    setStrength(Math.max(score, 0)); // Ensure strength is not negative
  };

  const hasSequentialChars = (password: string) => {
    const sequenceRegex =
      /(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i;
    return sequenceRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    calculateStrength(newPassword);
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 1:
      case 2:
        return "#ff4d4d"; // Weak (Red)
      case 3:
      case 4:
        return "#ffa500"; // Moderate (Orange)
      case 5:
      case 6:
        return "#4caf50"; // Strong (Green)
      default:
        return "#ddd"; // Very Weak (Gray)
    }
  };

  const handleStartSSLTest = () => {
    navigate("/ssl-test"); // Navigate to ssl-test page
  };

  return (
    <div style={styles.container}>
      <h1>Task 1</h1>
      <p>Learn to generate password secure in order to move on to next step.</p>
      <p>Your password must be super-strong</p>
      <h2>Create a Strong Password</h2>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter your password"
        style={styles.input}
      />
      <div
        style={{
          ...styles.thermometer,
          backgroundColor: getStrengthColor(),
          width: `${(strength / 6) * 100}%`,
        }}
      />
      <p style={styles.label}>
        {strength < 3 ? "Weak" : strength < 5 ? "Moderate" : "Strong"} Password
      </p>
      <h1>Rules of Safety</h1>
      <p style={styles.instructions}>
        Never use the same password! To create a more secure password, use at
        least 12 characters that include a mix of uppercase and lowercase
        letters, numbers, and symbols. Avoid using sequential patterns (like
        "1234" or "abcd") and steer clear of common words or phrases that are
        easily guessed. A strong password should be unique and not contain any
        commonly used words like "password" or "qwerty."
      </p>

      {strength === 6 && (
        <div>
          <span>Good Job ! </span>
          <button style={styles.button} onClick={handleStartSSLTest}>
            Proceed to Task 2
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as "center",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  thermometer: {
    height: "10px",
    borderRadius: "5px",
    backgroundColor: "#ddd",
    transition: "width 0.3s ease",
  },
  label: {
    marginTop: "10px",
    fontSize: "16px",
  },
  instructions: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
    lineHeight: "1.6",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  },
};

export default MakePassword;
