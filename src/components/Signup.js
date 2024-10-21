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
    role_id: ''  // Role selection during signup
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async () => {
    try {
      // Send OTP to email for sign-up
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          redirectTo: `https://hamhaw-staging.vercel.app/find` // Redirect to the find screen after OTP verification
        },
      });

      if (error) {
        setErrorMessage('Error sending signup email. Please try again.');
        console.error('Error sending signup email:', error);
        return;
      }

      // Notify the user to check their email
      alert('Check your email to complete the signup process.');
      navigate('/login'); // Redirect to login after OTP email is sent
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  // Automatically save user details to the 'users' table after OTP verification and login
  const saveUserData = async () => {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('Error getting authenticated user:', authError);
      return;
    }

    // Insert user details into the 'users' table
    const { error: insertError } = await supabase.from('users').insert([
      {
        id: user.id, // UUID from Supabase Auth
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        call_sign: formData.call_sign,
        role_id: formData.role_id, // Role selection
        last_activity: new Date(),
      },
    ]);

    if (insertError) {
      console.error('Error saving user to database:', insertError);
    } else {
      console.log('User saved to database');
      navigate('/find'); // Redirect to find page after successful signup
    }
  };

  // Call this function after the user clicks the OTP link and logs in
  const handlePostLogin = async () => {
    const { data: session } = await supabase.auth.getSession();

    if (session) {
      saveUserData();
    } else {
      console.error('No session found after OTP verification');
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
        {/* Add more roles as needed */}
      </select>

      <button onClick={handleSignUp}>Sign Up</button>

      {/* Error Message */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Signup;
