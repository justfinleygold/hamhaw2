import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState(''); // For selecting the role
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup/login
  const navigate = useNavigate();

  const handleSignupOrLogin = async () => {
    if (isSignup) {
      // Create a new user in Supabase authentication
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        alert('Signup failed: ' + signupError.message);
        return;
      }

      // If signup successful, assign the role to the user
      const { user } = signupData;
      if (user) {
        // Fetch the selected role from the roles table
        const { data: rolesData, error: rolesError } = await supabase
          .from('roles')
          .select('id')
          .eq('name', role)
          .single();

        if (rolesError) {
          alert('Error fetching role: ' + rolesError.message);
          return;
        }

        // Insert the new user into the users table with the selected role
        const { error: insertError } = await supabase.from('users').insert([
          {
            email,
            first_name: firstName,
            last_name: lastName,
            role_id: rolesData.id, // Assign the selected role
          },
        ]);

        if (insertError) {
          alert('Error saving user data: ' + insertError.message);
        } else {
          alert('Signup successful! Redirecting...');
          navigate('/find'); // Redirect after successful signup
        }
      }
    } else {
      // Login process
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        alert('Login failed: ' + loginError.message);
      } else {
        alert('Login successful! Redirecting...');
        navigate('/find');
      }
    }
  };

  return (
    <div>
      <h1>{isSignup ? 'Signup' : 'Login'}</h1>
      {isSignup && (
        <>
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
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Public">Public</option>
            <option value="Volunteer">Volunteer</option>
          </select>
        </>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignupOrLogin}>{isSignup ? 'Signup' : 'Login'}</button>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
      </button>
    </div>
  );
};

export default Signup;
