import React from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProtectedRoute = ({ children }) => {
  const session = supabase.auth.session();

  // If the user is not logged in, redirect them to the login page
  if (!session) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, allow them to view the protected component
  return children;
};

export default ProtectedRoute;