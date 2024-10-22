import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Navbar from './navbar';
import Hamhawbanner from './hamhawbanner';

const Find = () => {
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    const handlePostLogin = async () => {
      // Check if the user is logged in after OTP verification
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error('Error getting authenticated user:', authError);
        return;
      }

      // Check if the user is already inserted into the users table
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError || !existingUser) {
        // Insert the user into the users table
        const { error: insertError } = await supabase.from('users').insert([
          {
            id: user.id, // UUID from Supabase Auth
            first_name: user.user_metadata?.first_name || '',  // Use metadata or formData from signup
            last_name: user.user_metadata?.last_name || '',
            email: user.email,
            phone: user.user_metadata?.phone || '',
            city: user.user_metadata?.city || '',
            state: user.user_metadata?.state || '',
            call_sign: user.user_metadata?.call_sign || '',
            role_id: user.user_metadata?.role_id || 1, // Default to Public if no role
            last_activity: new Date(),
          },
        ]);

        if (insertError) {
          setErrorMessage('Error saving user to database.');
          console.error('Error inserting user into users table:', insertError);
        } else {
          console.log('User inserted successfully into the users table');
        }
      } else {
        console.log('User already exists in the users table');
      }
    };

    // Call the function after the component mounts
    handlePostLogin();
  }, []);

  return (
    <div>
      <Navbar />
      <Hamhawbanner />
      <h1>Find Page</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Find;
