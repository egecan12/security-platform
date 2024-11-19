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
import { Provider } from "react-redux";
import store from "../src/store/store";
import StatsPage from "./pages/Statspage"; // Import the stats page

const App: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Provider store={store}>
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
          <Route path="/stats" element={<StatsPage />} /> {/* Add this */}
          {/* Catch-all route */}
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
