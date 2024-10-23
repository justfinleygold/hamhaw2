import { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log('AuthCallback: Starting...');
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Session data:', session);
      
      if (session?.user) {
        console.log('User data:', session.user);
        // Insert the user data into users table
        const { data, error: insertError } = await supabase
          .from('users')
          .insert([{
            id: session.user.id,
            email: session.user.email,
            ...session.user.user_metadata
          }])
          .select();

        console.log('Insert result:', { data, error: insertError });

        if (!insertError) {
          navigate('/find');
        } else {
          console.error('Insert error:', insertError);
        }
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <div>Completing signup...</div>;
};

export default AuthCallback;
