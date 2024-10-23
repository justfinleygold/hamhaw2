import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    call_sign: '',
    role_id: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Send OTP and sign up
  /* const handleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          redirectTo: `https://hamhaw-staging.vercel.app/find`  // Ensure the correct domain
        }
      });

      if (error) {
        setErrorMessage('Error sending signup email. Please try again.');
        console.error('Error sending signup email:', error);
        return;
      }

      alert('Check your email to complete the signup process.');
      navigate('/login'); // Navigate to login page after sending the OTP email
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  }; */
  const handleSignUp = async () => {
    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          data: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone: formData.phone,
            city: formData.city,
            state: formData.state,
            call_sign: formData.call_sign,
            role_id: formData.role_id
          },
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
  
      if (authError) throw authError;
  
      alert('Check your email to complete signup!');
      navigate('/find');
    } catch (error) {
      setErrorMessage('Signup failed: ' + error.message);
    }
  };
  
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <p>Fill in the details below to create your account:</p>

      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="call_sign"
        placeholder="Call Sign"
        value={formData.call_sign}
        onChange={handleInputChange}
      />
      <select
        name="role_id"
        value={formData.role_id}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Role</option>
        <option value="1">Public</option>
        <option value="2">Volunteer</option>
      </select>

      <button onClick={handleSignUp}>Sign Up</button>

      {/* Error Message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Signup;
