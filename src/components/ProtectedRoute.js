import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state to handle session checks

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      } else {
        setSession(session); // Store session if exists
      }
      setLoading(false); // Mark loading as false when done
    };

    checkSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking session
  }

  // If no session, redirect to the login page
  if (!session) {
    return <Navigate to="/login" />;
  }

  // If session exists, render the protected component
  return children;
};

export default ProtectedRoute;
