import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MakePassword from "./pages/MakePassword";
import CheckPassword from "./pages/CheckPassword";
import SslTest from "./pages/SslTest";
import PhishingTest from "./pages/Phishing-test";
import { Provider } from "react-redux";
import store from "../src/store/store";
import StatsPage from "./pages/Statspage"; // Import the stats page

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem("token")
  );

  React.useEffect(() => {
    // Update login state whenever localStorage changes
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

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
            path="/check-password"
            element={isLoggedIn ? <CheckPassword /> : <Navigate to="/login" />}
          />
          <Route
            path="/ssl-test"
            element={isLoggedIn ? <SslTest /> : <Navigate to="/login" />}
          />
          <Route
            path="/phishing-test"
            element={isLoggedIn ? <PhishingTest /> : <Navigate to="/login" />}
          />
          <Route
            path="/stats"
            element={isLoggedIn ? <StatsPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
