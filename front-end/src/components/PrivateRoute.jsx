import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../utils/auth';

function PrivateRoute({ children, requireAdmin = false }) {
  const authenticated = isAuthenticated();
  const admin = isAdmin();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !admin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PrivateRoute;