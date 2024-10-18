import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './style.css';
import {Container} from '@mui/material';
import {ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './components/home';  // Home Page
import Find from './components/find';  // Find Page (Search)
import SearchDetails from './components/SearchDetails'; // SearchDetails Page
import SearchEntry from './components/SearchEntry';  // New Entry Page
import SignupLogin from './components/SignupLogin'; 
import { EventProvider } from './context/EventContext'; // Import EventContext
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

// Create a MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color (blue)
    },
    secondary: {
      main: '#f50057', // Secondary color (pink)
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <EventProvider>
      <Router>
        {/* Routes for different pages */}
        <Container>
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />
            <Route path="/find" element={<Find />} />
            <Route path="/signup" element={<SignupLogin />} />
            <Route path="/search-details/:id" element={<SearchDetails />} /> 
            {/* Protect SearchEntry Route */}
              <Route
              path="/search-entry"
              element={
                <ProtectedRoute> 
                  <SearchEntry />
                </ProtectedRoute>
              }
              />
          </Routes>
        </Container>
      </Router>
      </EventProvider>
    </ThemeProvider>
  );
}

export default App;