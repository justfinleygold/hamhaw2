import React from 'react';
import { BrowserRouter as Router, Route, Routes, Switch, Redirect,useLocation, useNavigate } from 'react-router-dom';
import './style.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
import Home from './components/home';  // Home Page
import Find from './components/find';  // Search Page
import VolunteerAccess from './components/VolunteerAccess';  // Volunteer Access (Login page)

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
      <Router>
         {/* Routes for different pages */}
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find" element={<Find />} />
            <Route path="/volunteer-access" element={<VolunteerAccess />} />
            <Route path="/about" element={<div>About HamHAW</div>} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;