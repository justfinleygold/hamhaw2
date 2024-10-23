import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { supabase } from './supabaseClient';
import Home from './components/home';
import Find from './components/find';
import SearchEntry from './components/SearchEntry';
import SearchDetails from './components/SearchDetails';
import EmailLogin from './components/EmailLogin';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import AuthCallback from './components/AuthCallback';
import { EventProvider } from './context/EventContext';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    getSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>≈
    <EventProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/find" element={<Find />} />
          <Route path="/login" element={<EmailLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/search-details/:id" element={<SearchDetails />} />

          {/* Protected Routes */}
          <Route
            path="/search-entry"
            element={
              <ProtectedRoute>
                <SearchEntry />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </EventProvider>
  </UserContext.Provider>
  );
}

export default App;