import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import HamhawShield from '../assets/hamhaw_shield.png'; // Import the shield image
import PropTypes from 'prop-types'; // Import PropTypes
import './navbar.css';

const Navbar = ({ rootClassName, imageSrc2, imageAlt2 }) => {
  const [user, setUser] = useState(null); // State to store logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUser(user); // If user exists, store in state
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    // Log the user out and clear the state
    await supabase.auth.signOut();
    setUser(null);
    navigate('/signup'); // Redirect to signup/login page after logout
  };

  const handleLogin = () => {
    navigate('/signup'); // Redirect to signup/login page if not logged in
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous screen
  };

  return (
    <div className={`navbar-container ${rootClassName}`}>
      <div className="navbar-left-side">
        <img
          src={HamhawShield} // Use imported shield image
          alt={imageAlt2}
          className="navbar-ham-haw-shield"
        />
        <Link to="/" className="navbar-link">Home</Link>
        <button onClick={handleBackClick} className="navbar-button">Back</button>
        <Link to="/find" className="navbar-link">Find</Link>
      </div>
      <div className="navbar-right-side">
        {user ? (
          <>
            <span>Logged in as: {user.email}</span>
            <button onClick={handleLogout} className="navbar-button">Logout</button>
          </>
        ) : (
          <>
            <span>Not logged in</span>
            <button onClick={handleLogin} className="navbar-button">Login</button>
          </>
        )}
      </div>
    </div>
  );
};

// Define the expected PropTypes for type-checking
Navbar.propTypes = {
  rootClassName: PropTypes.string,  // Class name for styling
  imageSrc2: PropTypes.string,      // Source for the image
  imageAlt2: PropTypes.string       // Alt text for the image
};

// Default prop values in case they are not passed
Navbar.defaultProps = {
  rootClassName: '',
  imageSrc2: HamhawShield,
  imageAlt2: 'HamHaw Shield'
};

export default Navbar;