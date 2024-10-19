import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Home from './components/home';
import Find from './components/find';
import SearchEntry from './components/SearchEntry';
import SearchDetails from './components/SearchDetails';
import EmailLogin from './components/EmailLogin';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { EventProvider } from './context/EventContext';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession(); // Correct session retrieval
      if (session) {
        setUser(session.user);
      }
    };
    getSession();
  }, []);

  return (
    <EventProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/find" element={<Find />} />

          {/* Protected Routes */}
          <Route
            path="/search-entry"
            element={
              <ProtectedRoute>
                <SearchEntry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search-details/:id"
            element={
              <ProtectedRoute>
                <SearchDetails />
              </ProtectedRoute>
            }
          />

          {/* Login Route */}
          <Route path="/login" element={<EmailLogin />} />

          {/* Signup Route */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </EventProvider>
  );
}

export default App;