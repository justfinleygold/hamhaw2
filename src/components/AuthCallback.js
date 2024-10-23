import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Starting authentication...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      setStatus('Checking session...');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setStatus('Session found, creating user record...');
        const { error: insertError } = await supabase
          .from('users')
          .insert([{
            id: session.user.id,
            email: session.user.email,
            ...session.user.user_metadata
          }]);

        if (!insertError) {
          setStatus('Success! Redirecting...');
          navigate('/find');
        } else {
          setStatus('Error creating user: ' + insertError.message);
        }
      } else {
        setStatus('No session found');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div style={{ 
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <h2 style={{ color: '#333' }}>Authentication in Progress</h2>
      <p style={{ fontSize: '18px', color: '#666' }}>{status}</p>
    </div>
  );
};

export default AuthCallback;
