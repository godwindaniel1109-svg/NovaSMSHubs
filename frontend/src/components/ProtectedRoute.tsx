import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useAuth } from '../hooks/useApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  isAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true,
  redirectTo = '/login',
  isAdmin = false
}) => {
  const { user, loading: authLoading, error } = useAuth();
  const location = useLocation();

  // Check for admin authentication
  const checkAdminAuth = () => {
    const adminToken = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');
    return adminToken && adminData;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (requireAuth) {
    if (isAdmin) {
      // Check admin authentication
      if (!checkAdminAuth()) {
        return <Navigate to="/admin/login" replace />;
      }
    } else {
      // Check user authentication
      if (!user) {
        const returnUrl = encodeURIComponent(location.pathname + location.search);
        return <Navigate to={`${redirectTo}?returnUrl=${returnUrl}`} replace />;
      }
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
