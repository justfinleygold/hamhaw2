import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { supabase } from '../supabaseClient';
import HamhawShield from '../assets/hamhaw_shield.png'; // Import the shield image
import './navbar.css'; // Keep the original CSS

const Navbar = (props) => {
  const [user, setUser] = useState(null); // State to store logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user); // If user exists, store in state
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    // Log the user out and redirect to the Find screen
    await supabase.auth.signOut();
    setUser(null);
    navigate('/find'); // Redirect to the Find screen after logout
  };

  const handleLogin = () => {
    navigate('/login'); // Redirect to the email login screen if not logged in
  };

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous screen
  };

  return (
    <div className={`navbar-navbar ${props.rootClassName}`}>
      <div className="navbar-left-side">
        <img
          src={HamhawShield} // Use imported shield image
          alt="HamHaw Shield"
          className="navbar-image1" // Use the original class from navbar.css
        />
        <div data-role="BurgerMenu" className="navbar-burger-menu">
          <svg viewBox="0 0 1024 1024" className="navbar-icon1">
            <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
          </svg>
        </div>
        <div className="navbar-links-container1">
          <Link to="/" className="Anchor">
            <span className="navbar-text3 Anchor">Home</span>
          </Link>
          <button onClick={handleBackClick} className="Anchor navbar-back-button">
            <span className="navbar-text6 Anchor">Back</span>
          </button>
        </div>
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
      <div data-role="MobileMenu" className="navbar-mobile-menu">
        <div className="navbar-container">
          <img
            alt={props.imageAlt1}
            src={props.imageSrc1}
            className="navbar-image2"
          />
          <div data-role="CloseMobileMenu" className="navbar-close-menu">
            <svg viewBox="0 0 1024 1024" className="navbar-icon3">
              <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.defaultProps = {
  link2: undefined,
  link4: undefined,
  link: undefined,
  link3: undefined,
  link5: undefined,
  imageSrc1: 'https://play.teleporthq.io/static/svg/default-img.svg',
  link1: undefined,
  rootClassName: '',
  imageAlt1: 'image',
  imageSrc2: HamhawShield,
  imageAlt2: 'HamHaw Shield',
};

Navbar.propTypes = {
  link2: PropTypes.element,
  link4: PropTypes.element,
  link: PropTypes.element,
  link3: PropTypes.element,
  link5: PropTypes.element,
  imageSrc1: PropTypes.string,
  link1: PropTypes.element,
  rootClassName: PropTypes.string,
  imageAlt1: PropTypes.string,
  imageSrc2: PropTypes.string,
  imageAlt2: PropTypes.string,
};

export default Navbar;