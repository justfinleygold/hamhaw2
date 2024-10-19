import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        redirectTo: `https://hamhaw-staging.vercel.app/login`, // Redirect after verification
      },
    });

    if (error) {
      setErrorMessage('Error sending signup email. Please try again.');
      console.error('Error sending signup email:', error);
    } else {
      alert('Check your email to complete the signup process.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <p>Enter your email to sign up:</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>

      {/* Error Message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Signup;
