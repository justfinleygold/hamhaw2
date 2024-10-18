import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const SignupLogin = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [callSign, setCallSign] = useState('');
  const [otp, setOtp] = useState(''); // For entering the OTP
  const [isOtpSent, setIsOtpSent] = useState(false); // To track if OTP was sent
  const navigate = useNavigate();

  const handleSignupOrLogin = async () => {
    // Send OTP to email
    const { error } = await supabase.auth.signInWithOtp({ email });
    
    if (error) {
      alert('Failed to send OTP: ' + error.message);
      return;
    }
    alert('OTP sent to your email!');
    setIsOtpSent(true); // OTP sent, now show OTP input field
  };

  const handleVerifyOtp = async () => {
    // Verify the OTP (user types it in)
    const { error } = await supabase.auth.verifyOtp({ email, token: otp, type: 'magiclink' });

    if (error) {
      alert('Failed to verify OTP: ' + error.message);
      return;
    }

    // Once OTP is verified, insert additional info into the users table
    const { data: rolesData, error: rolesError } = await supabase
      .from('roles')
      .select('id')
      .eq('name', role)
      .single();

    if (rolesError) {
      alert('Error fetching role: ' + rolesError.message);
      return;
    }

    // Insert the new user into the users table
    const { error: insertError } = await supabase.from('users').insert([
      {
        email,
        first_name: firstName,
        last_name: lastName,
        city,
        state,
        role_id: rolesData.id, // Assign the selected role
        phone,
        call_sign: role !== 'Public' ? callSign : null, // Call sign only if not "Public"
      },
    ]);

    if (insertError) {
      alert('Error saving user data: ' + insertError.message);
    } else {
      alert('Signup/Login successful!');
      navigate('/find'); // Redirect after successful signup/login
    }
  };

  return (
    <div>
      <h1>Signup/Login</h1>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="Public">Public</option>
        <option value="Volunteer">Volunteer</option>
      </select>
      {role !== 'Public' && (
        <input
          type="text"
          placeholder="Call Sign"
          value={callSign}
          onChange={(e) => setCallSign(e.target.value)}
        />
      )}
      <input
        type="text"
        placeholder="Phone (Optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      {!isOtpSent ? (
        <button onClick={handleSignupOrLogin}>Send OTP</button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default SignupLogin;