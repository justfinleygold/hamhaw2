import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Home from './components/home';
import Find from './components/find';
import SearchEntry from './components/SearchEntry';
import SearchDetails from './components/SearchDetails';
import EmailLogin from './components/EmailLogin';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []);

  return (
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
  );
}

export default App;