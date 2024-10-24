import { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log('URL:', window.location.href);
      console.log('Search params:', window.location.search);
      console.log('Hash:', window.location.hash);
      
      const code = new URLSearchParams(window.location.search).get('code');
      console.log('Code:', code);
      
      if (code) {
        const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
        console.log('Session:', session);
        console.log('Error:', error);
        
        if (session?.user) {
          const { error: insertError } = await supabase
            .from('users')
            .insert([{
              id: session.user.id,
              email: session.user.email,
              ...session.user.user_metadata
            }]);

          console.log('Insert error:', insertError);

          if (!insertError) {
            navigate('/find');
          }
        }
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
