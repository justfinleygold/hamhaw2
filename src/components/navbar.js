import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import './navbar.css'
import HamhawShield from '../assets/hamhaw_shield.png';

const Navbar = (props) => {
  const navigate = useNavigate(); // Hook to navigate through the history

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page in the history
  };

  return (
    <div className={`navbar-navbar ${props.rootClassName} `}>
      <div className="navbar-left-side">
        <img
          src={HamhawShield}
          alt="Hamhaw Shield"
          className="navbar-image1"
        />
        <div data-role="BurgerMenu" className="navbar-burger-menu">
          <svg viewBox="0 0 1024 1024" className="navbar-icon1">
            <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
          </svg>
        </div>
        <div className="navbar-links-container1">
          <Link to="/" className="Anchor">
            {props.link ?? (
              <Fragment>
                <span className="navbar-text3 Anchor">Home</span>
              </Fragment>
            )}
          </Link>
          <Link to="/" className="navbar-link2 Anchor">
            {props.link1 ?? (
              <Fragment>
                <span className="navbar-text6 Anchor" onClick={handleBackClick}>Back</span>
              </Fragment>
            )}
          </Link>
        </div>
      </div>
      <div className="navbar-right-side"></div>
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
        <div className="navbar-links-container2">
          <a href="#resources" className="Anchor">
            {props.link2 ?? (
              <Fragment>
                <span className="navbar-text1 Anchor">Resources</span>
              </Fragment>
            )}
          </a>
          <a href="#inspiration" className="Anchor">
            {props.link3 ?? (
              <Fragment>
                <span className="navbar-text4 Anchor">Inspiration</span>
              </Fragment>
            )}
          </a>
          <a href="#process" className="Anchor">
            {props.link4 ?? (
              <Fragment>
                <span className="navbar-text2 Anchor">Process</span>
              </Fragment>
            )}
          </a>
          <a href="#ourstory" className="Anchor">
            {props.link5 ?? (
              <Fragment>
                <span className="navbar-text5 Anchor">Our story</span>
              </Fragment>
            )}
          </a>
        </div>
      </div>
    </div>
  )
}

Navbar.defaultProps = {
  link2: undefined,
  link4: undefined,
  link: undefined,
  link3: undefined,
  link5: undefined,
  imageSrc1: {HamhawShield},
  link1: undefined,
  rootClassName: '',
  imageAlt1: 'image',
  imageSrc2: {HamhawShield},
  imageAlt2: 'image',
}

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
}

export default Navbar
