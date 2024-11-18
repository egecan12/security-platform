import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import MakePassword from "./pages/makePassword";
import SslTest from "./pages/sslTest";
import PhishingTest from "./pages/phishing-test";

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Redirect logged-in users away from Login and Register pages */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/make-password"
          element={isLoggedIn ? <MakePassword /> : <Navigate to="/login" />}
        />
        <Route
          path="/ssl-test"
          element={isLoggedIn ? <SslTest /> : <Navigate to="/login" />}
        />
        <Route
          path="/phishing-test"
          element={isLoggedIn ? <PhishingTest /> : <Navigate to="/login" />}
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
