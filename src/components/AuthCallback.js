import { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [navigate]);

  return <div>Processing authentication...</div>;
};

export default AuthCallback;
