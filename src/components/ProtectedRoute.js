import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession(); // Get session with the new method
      setSession(session);
    };
    checkSession();
  }, []);

  // If session is null, redirect to login
  if (!session) {
    return <Navigate to="/login" />;
  }

  // If session exists, allow access to protected route
  return children;
};

export default ProtectedRoute;