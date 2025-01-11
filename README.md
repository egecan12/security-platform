![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

# Security Training Platform

This repository contains a **Security Awareness Training Platform** designed to educate users on essential cybersecurity practices. The application walks users through various tasks, including:

- Generating strong passwords.
- Identifying phishing attempts.
- Learning about SSL encryption.

The platform includes interactive challenges and assessments to evaluate the user's understanding of security concepts.

---

## Features

- **User Authentication:** Secure login and registration system.
- **Interactive Challenges:** Tasks to strengthen cybersecurity awareness.
- **Simulations:** Tests for identifying phishing scams and weak passwords.
- **Dynamic Feedback:** Instant feedback and scoring.
- **Responsive UI:** Engaging and informative layouts.

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 is required; higher versions are not supported)
- **MongoDB** (Running locally or connected via a cloud service)

### Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:egecan12/security-platform.git
   cd security-platform
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../client
   npm install
   ```

4. Create an `.env` file in the backend folder with the following:

   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret
   MONGO_URI=mongodb_connection_string
   ```

5. Run the backend server:

   ```bash
   cd backend
   npm run build
   npm run dev
   ```

6. Run the frontend server:

   ```bash
   cd ../frontend
   npm start
   ```

---

## Tests

We used the JestJS Framework to create tests. Run tests with the following command:

```bash
npm run test
```

---

## Project Structure

### Backend

Located in the `backend` folder, it handles:

- **Authentication and Authorization**
- **User Management**
- **APIs for Challenge Scoring**

Key files:

- `server.ts`: Main entry point for the server.
- `routes/auth.ts`: Routes for login and registration.
- `models/User.ts`: Mongoose schema for user data.

### Frontend

Located in the `frontend` folder, it manages:

- **Interactive UI**
- **Dynamic Feedback**
- **User Progress Tracking**

Key components:

- `Login.tsx`: Login functionality.
- `Register.tsx`: Registration form.
- `Dashboard.tsx`: Main user dashboard.
- `PhishingTest.tsx`: Challenge for identifying phishing scams.
- `MakePassword.tsx`: Challenge for creating strong passwords.
- `SSLTest.tsx`: SSL encryption awareness test.

---

### Features

1. **Authentication**:

   - **Registration:** Secure registration with input validation and password hashing.
   - **Login:** Token-based authentication using JWT.
   - **Logout:** Clears session and token data.

2. **Challenges**:

   - Password Strength Test
   - Phishing Simulation
   - SSL Awareness Quiz

3. **Scoring System**:
   - Challenges are scored dynamically.
   - User progress is tracked in the `progressSlice` state.

---

## How to Contribute

We welcome contributions to improve this platform! Here's how you can help:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:

   ```bash
   git checkout -b feature-name
   ```

3. Make your changes and submit a pull request.

---

## Acknowledgements

- **Have I Been Pwned**: For password breach validation.
- **React Icons**: For UI enhancements.
- **Node.js and MongoDB**: Backbone technologies for the project.

---

## Contact

For any questions, feel free to contact us.
