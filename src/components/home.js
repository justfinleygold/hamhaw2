import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Hamhawbanner from './hamhawbanner'
import Footer from './footer'
import './home.css'

// Import the images
import hamhawLogo from '../assets/hamhaw_logo.png'
import hamhawShield from '../assets/hamhaw_shield.png'
import hamhawBanner from '../assets/hamhaw_banner.png'
import hamhawDiagram from '../assets/hamhaw_diagram.png'
import whenAllElseFails from '../assets/when_all_else_fails_any_club.png'
import hamhawStorm from '../assets/hamhaw_storm.jpeg'
import hamhawAntenna from '../assets/hamhaw_antenna.jpeg'
import hamhawHomeImage from "../assets/hamhaw_homeimage.png"

const Home = (props) => {
  return (
    <div className="home-container1">
      <Helmet>
        <title>HamHAW</title>
        <meta
          name="description"
          content="Amateur radio helping with health and welfare communications in emergencies"
        />
        <meta property="og:title" content="HamHAW" />
        <meta
          property="og:description"
          content="Amateur Radio helping with health and welfare communications in emergencies"
        />
        <meta
          property="og:image"
          content={hamhawLogo}//"https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/6d315056-b625-4ee8-9786-7202e6c83792/56bd4fe0-c034-4c02-b760-d256d64cae26?org_if_sml=1&force_format=original"
        />
      </Helmet>
      <div className="home-navbar-home-container">
        <nav className="home-navbar">
          <div className="home-left-side">
            <a href="#home" className="home-link1">
              <img
                alt="hamhAW"
                src={hamhawShield}
                className="home-image1"
              />
            </a>
            <div data-role="BurgerMenu" className="home-burger-menu">
              <svg viewBox="0 0 1024 1024" className="home-icon2">
                <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
              </svg>
            </div>
            <div className="home-links-container1">
              <a href="#home" id="link_home" className="home-link2 Anchor">
                Home
              </a>
              <a href="#how" id="link_how" className="home-link3 Anchor">
                How?
              </a>
              <a
                href="#details"
                id="link_details"
                className="home-link4 Anchor"
              >
                Details
              </a>
              <a
                href="#ourstory"
                id="link_ourstory"
                className="home-link5 Anchor"
              >
                Our story
              </a>
            </div>
          </div>
          <div data-role="MobileMenu" className="home-mobile-menu">
            <div className="home-container2">
              <img
                alt=""
                src={hamhawHomeImage}
                className="home-image2"
              />
              <div data-role="CloseMobileMenu" className="home-close-menu">
                <svg viewBox="0 0 1024 1024" className="home-icon4">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="home-links-container2">
              <a href="#resources" className="home-link6 Anchor">
                Resources
              </a>
              <a href="#inspiration" className="home-link7 Anchor">
                Inspiration
              </a>
              <a href="#process" className="home-link8 Anchor">
                Process
              </a>
              <a href="#ourstory" className="home-link9 Anchor">
                Our story
              </a>
            </div>
          </div>
        </nav>
      </div>
      <div className="home-hero">
        <div className="home-herocontent-container">
          <div className="home-hero-textbox">
          <Hamhawbanner 
            rootClassName="hamhawbannerroot-class-name"
            imageSrc1={hamhawBanner}
            imageAlt1="HamHAW Banner"
          />

            <span className="home-herotext">
              <span>
                We are amateur radio volunteers (hams) with a goal to gather
                Health and Welfare status reports from emergency areas and pass
                them on to all interested parties.
              </span>
              <br className="Section-Text"></br>
              <span>
                We want to help people inside an emergency area report their
                status.
              </span>
              <br className="Section-Text"></br>
              <span>
                We want to help people outside an emergency area learn what is
                happening inside.
              </span>
              <br className="Section-Text"></br>
            </span>
          </div>
          <div className="home-container3">
            <Link
              to="/find"
              name="btnSearch"
              autoFocus="true"
              className="home-btnsearch Anchor button"
            >
              <span>SEARCH NOW</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="home-section-separator1"></div>
      <div id="how" className="home-how">
        <div className="home-heading-container1">
          <h2 className="home-headinghow Section-Heading">
            How does HamHaw Work?
          </h2>
        </div>
        <div className="home-howcards-container">
          <div className="home-howcard1">
            <div className="home-icon1container">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M14 1.5V22h-2V3.704L7.5 4.91V2.839l5-1.339z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="home-text1container">
              <span className="home-heading1">
                <span className="home-text17 Card-Heading">
                  The public searches
                </span>
                <br></br>
                <br></br>
              </span>
              <span className="home-howtext1">
                Enter information about missing people in our web form here. You
                also enter your info so we can get back to you.
              </span>
            </div>
          </div>
          <div className="home-features-card1">
            <div className="home-icon-container1">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M16 7.5a4 4 0 1 0-8 0H6a6 6 0 1 1 10.663 3.776l-7.319 8.723L18 20v2H6v-1.127l9.064-10.802A3.98 3.98 0 0 0 16 7.5"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="home-text-container1">
              <span className="home-heading2 Card-Heading">
                Ham radio operators get to work
              </span>
              <span className="home-text20">
                We use near and far-range radios, online tools, and anything
                else we can find to ask about people and how they are (Health
                and Welfare)
              </span>
            </div>
          </div>
          <div className="home-features-card2">
            <div className="home-icon-container2">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M18 2v1.362L12.81 9.55a6.501 6.501 0 1 1-7.116 8.028l1.94-.486A4.502 4.502 0 0 0 16.5 16a4.5 4.5 0 0 0-6.505-4.03l-.228.122l-.69-1.207L14.855 4H6.5V2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="home-text-container2">
              <span className="home-heading3 Card-Heading">
                They enter results here
              </span>
              <span className="home-text21">
                When we find something, we enter it here and anyone searching
                will find that info. Original searchers will also get an email.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section-separator2"></div>
      <div id="details" className="home-details">
        <div className="home-cards-container1">
          <div className="home-more-detail-card">
            <h3 className="home-text22 Card-Heading">More Detail</h3>
            <img
              alt=""
              src={hamhawDiagram}
              className="home-hamhawdiagram"
            />
          </div>
        </div>
      </div>
      <div className="home-section-separator3"></div>
      <div id="ourstory" className="home-our-story">
        <div className="home-heading-container2">
          <h1 className="home-text23 Section-Heading">Our story</h1>
          <span className="home-text24 Section-Text">
            Why we are doing this and how we got started
          </span>
        </div>
        <div className="home-cards-container2">
          <div className="home-left-section">
            <div className="home-video-container">
              <img
                alt=""
                src={hamhawStorm}
                className="home-stormimage"
              />
            </div>
            <div className="home-content-container1">
              <span className="home-heading4 Card-Heading">
                Hurricane Helene: September 2024
              </span>
              <span className="home-text25 Card-Text">
                <span>
                  Helene was an unprecedented disaster that affected a
                  surprising number of people. In the NC mountains, entire towns
                  were swept away. Emergency teams did an amazing job responding
                  with search and rescue. Ham operators took condition reports
                  the entire storm and afterwards.
                </span>
                <br></br>
                <span>
                  There was a gap in services to find out how people are doing.
                  That's called "Health and Welfare" checks. 
                  There was no health and welfare communication between inside
                  the disaster and outside (except for some hams who talked
                  through a repeater atop our tallest mountain, Mt. Mitchell.
                </span>
              </span>
              <span className="home-text29 Card-Text">
                {' '}
                We want to fill that gap. Next big emergency, come here to ask
                about people and how they are doing. The emergency responders
                don't have to take those calls so they can focus on
                responding.
              </span>
              <a
                href="https://www.readtangle.com/otherposts/hurricane-helene-in-the-north-carolina-mountains/?ref=the-sunday-edition-newsletter"
                target="_blank"
                rel="noreferrer noopener"
                className="home-linkessay Anchor"
              >
                Read more in an essay from a ham's view
              </a>
            </div>
          </div>
          <div className="home-right-section">
            <div className="home-card1">
              <div className="home-content-container2">
                <img
                  alt=""
                  src={whenAllElseFails}
                  className="home-hamradioworks"
                />
                <span className="home-text30 SmallCard-Heading">
                  Training for emergency communication is what we are about.
                  When all else fails, we can still operate our radios.
                </span>
              </div>
            </div>
            <div className="home-card2">
              <img
                alt=""
                src={hamhawAntenna}
                className="home-antennaimage"
              />
              <div className="home-content-container3">
                <span className="home-text31 SmallCard-Heading">
                  Hams love to tinker and build things that help them hear and
                  be heard. We optimize our equipment to be reach out further.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-section-separator4"></div>
      <div className="home-footer-container">
        <Footer
          link={
            <span className="home-text32 Anchor">
              Copyright HamHAW, Inc, 2024
            </span>
          }
        ></Footer>
      </div>
    </div>
  )
}

export default Home