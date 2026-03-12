import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

import {jwtDecode} from 'jwt-decode';

export const ProtectedRoute = ({ children, requiredRoles }) => {

  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decoded = jwtDecode(token);

  const userRoles = Array.isArray(decoded.roles)
    ? decoded.roles
    : [decoded.roles];

  const hasAccess = userRoles.some(role =>
    requiredRoles.includes(role)
  );

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};