import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";

function NotUser({ children }) {
  const { user } = useUser();

  if (user == null) {
    return children;
  }
  return <Navigate to="/notAllow" />;
}

export default NotUser;
