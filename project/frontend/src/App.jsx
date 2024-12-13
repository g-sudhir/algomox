import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import Dashboard from "./components/Dashboard";
import Events from "./pages/Events";
import RegisteredEvents from "./pages/RegisteredEvents";
import CreateEvent from "./pages/admin/CreateEvent";
import AdminEvents from "./pages/admin/AdminEvents";
import { setToken, removeToken, isAuthenticated, isAdmin } from "./utils/auth";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-4">
          Something went wrong. Please refresh the page.
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const authStatus = isAuthenticated();
      setAuthenticated(authStatus);
    } catch (error) {
      console.error("Authentication error:", error);
      setAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (response) => {
    console.log(response);
    if (response && response.token) {
      setToken(response.token);
      setAuthenticated(true);
    } else {
      console.error("Invalid login response:", response);
    }
  };

  const handleLogout = () => {
    removeToken();
    setAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          {authenticated && <Navbar onLogout={handleLogout} />}
          <div className="p-4">
            <Routes>
              <Route
                path="/login"
                element={
                  !authenticated ? (
                    <AuthForm onLogin={handleLogin} />
                  ) : (
                    <Navigate to="/dashboard" replace />
                  )
                }
              />

              <Route
                path="/dashboard"
                element={
                  authenticated ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              <Route
                path="/events"
                element={
                  authenticated ? <Events /> : <Navigate to="/login" replace />
                }
              />

              <Route
                path="/registered-events"
                element={
                  authenticated ? (
                    <RegisteredEvents />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              <Route
                path="/admin/events"
                element={
                  authenticated && isAdmin() ? (
                    <AdminEvents />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              <Route
                path="/admin/events/create"
                element={
                  authenticated && isAdmin() ? (
                    <CreateEvent />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              <Route
                path="/"
                element={
                  <Navigate
                    to={authenticated ? "/dashboard" : "/login"}
                    replace
                  />
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
