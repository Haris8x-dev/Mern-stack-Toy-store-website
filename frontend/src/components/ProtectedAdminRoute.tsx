import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center bg-black">
        <p className="text-white">Checking authentication...</p>
      </main>
    );
  }

  // not logged in → send to signup/login
  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  // logged in but not admin → block
  if (!user.isAdmin) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center bg-black">
        <p className="text-red-400">🚫 Not authorized. Admins only.</p>
      </main>
    );
  }

  // logged in and admin → allow
  return <>{children}</>;
};

export default ProtectedAdminRoute;
