import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const EmailLogin = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        redirectTo: `https://hamhaw-staging.vercel.app`, // Redirect to home or the desired page
      },
    });

    if (error) {
      console.error('Error sending login link:', error);
      alert('Failed to send login link. Please try again.');
    } else {
      alert('Check your email for the login link.');
    }
  };

  return (
    <div className="email-login-container">
      <h2>Log In</h2>
      <p>Enter your email to log back in:</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleEmailLogin}>Send Login Link</button>
    </div>
  );
};

export default EmailLogin;
