import { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
          await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          const { data: { user } } = await supabase.auth.getUser();
          
          if (user) {
            await supabase
              .from('users')
              .insert([{
                id: user.id,
                email: user.email,
                ...user.user_metadata
              }]);
            
            navigate('/find');
          }
        }
      } catch (error) {
        console.log('Auth error:', error);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Processing Authentication</h2>
      <p>Please wait while we complete your signup...</p>
    </div>
  );
};

export default AuthCallback;