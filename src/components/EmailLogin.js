import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import './EmailLogin.css';

const EmailLogin = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Check if the email exists in the users table
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      setErrorMessage('User not found. Please sign up.');
      return;
    }

    // If user exists, set session (assuming user is authenticated)
    const { sessionError } = await supabase.auth.setSession({ user: data });

    if (sessionError) {
      setErrorMessage('Authentication failed. Please try again.');
      return;
    }

    // Redirect to SearchEntry after login
    navigate('/search-entry');
  };

  return (
    <div className="email-login-container">
      <h2>Log In</h2>
      <p>Enter your email to log in:</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Submit</button>

      {/* Error Message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {/* Link to Signup Page */}
      <p>
        No account yet?{' '}
        <Link to="/signup" className="signup-link">
          Click here to sign up
        </Link>
      </p>
    </div>
  );
};

export default EmailLogin;
