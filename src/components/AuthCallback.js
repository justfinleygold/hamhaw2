import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true
        }
      });

      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get('type');
      
      if (type === 'signup') {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            const { error: insertError } = await supabase
              .from('users')
              .insert([{
                id: session.user.id,
                email: session.user.email,
                ...session.user.user_metadata
              }]);

            if (!insertError) {
              navigate('/find');
            }
          }
        });

        return () => subscription.unsubscribe();
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