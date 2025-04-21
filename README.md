# Security Training Platform

<div align="center">

![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)

An interactive Security Awareness Training Platform built with modern technologies to help users understand and practice essential cybersecurity concepts.



![Platform Demo](https://github.com/user-attachments/assets/5c6b68f5-d84e-49af-b1bc-82352e0d83f6)

---

## ✨ Key Features

- 🔐 Secure user authentication and session handling
- 🧠 Interactive training modules (passwords, phishing, SSL)
- 📈 Real-time scoring and dynamic feedback
- 🎯 Quizzes and simulations to reinforce concepts
- 📱 Responsive, modern UI for a seamless experience
- 🔍 Backend API for tracking and analyzing progress

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16 (Higher versions are not supported)
- **MongoDB** (Local or cloud-based)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone git@github.com:egecan12/security-platform.git
   cd security-platform
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Variables**

Create a `.env` file in the `backend` directory:
```env
PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb_connection_string
```

5. **Run the backend**
   ```bash
   cd backend
   npm run build
   npm run dev
   ```

6. **Run the frontend**
   ```bash
   cd ../frontend
   npm start
   ```

---

## 🧪 Testing

We use **Jest** for unit testing.

Run all tests:
```bash
npm run test
```

---

## 📁 Project Structure

### Backend (`/backend`)
- `server.ts`: Entry point
- `routes/auth.ts`: Handles login and registration
- `models/User.ts`: User schema
- Authentication and API logic

### Frontend (`/frontend`)
- Built with **React + Redux + TypeScript**
- `Login.tsx`, `Register.tsx`, `Dashboard.tsx`
- Challenge components: `PhishingTest.tsx`, `MakePassword.tsx`, `SSLTest.tsx`

---

## 🧩 Challenge Types

- **Password Strength Test**
- **Phishing Simulation**
- **SSL Awareness Quiz**

Scoring and progress are handled via Redux (`progressSlice`).

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create a new branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push and open a pull request.

---

## 🙌 Acknowledgements

- [Have I Been Pwned](https://haveibeenpwned.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- Node.js, MongoDB, TypeScript, and Open Source Contributors

---

## 👨‍💻 Contact

Egecan Kahyaoglu  
- [GitHub](https://github.com/egecan12)  
- [LinkedIn](Your-LinkedIn-URL)

---

<div align="center">
Made with 🛡️ and ❤️ by Egecan Kahyaoglu
</div>
