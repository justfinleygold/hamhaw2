import React, { Fragment } from 'react'

import { Helmet } from 'react-helmet'

import Navbar from './navbar'
import Hamhawbanner from './hamhawbanner'
import './find.css'

const Find = (props) => {
  return (
    <div className="find-container1">
      <Helmet>
        <title>Find - HamHAW</title>
        <meta
          name="description"
          content="Amateur radio helping with health and welfare communications in emergencies"
        />
        <meta property="og:title" content="Find - HamHAW" />
        <meta
          property="og:description"
          content="Amateur Radio helping with health and welfare communications in emergencies"
        />
        <meta
          property="og:image"
          content="https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/6d315056-b625-4ee8-9786-7202e6c83792/56bd4fe0-c034-4c02-b760-d256d64cae26?org_if_sml=1&amp;force_format=original"
        />
      </Helmet>
      <div className="find-container2">
        <Navbar
          link={
            <Fragment>
              <span className="find-text1 Anchor">Home</span>
            </Fragment>
          }
          link1={
            <Fragment>
              <span className="find-text2 Anchor">Back</span>
            </Fragment>
          }
          link2={
            <Fragment>
              <span className="find-text3 Anchor">Resources</span>
            </Fragment>
          }
          link3={
            <Fragment>
              <span className="find-text4 Anchor">Inspiration</span>
            </Fragment>
          }
          link4={
            <Fragment>
              <span className="find-text5 Anchor">Process</span>
            </Fragment>
          }
          link5={
            <Fragment>
              <span className="find-text6 Anchor">Our story</span>
            </Fragment>
          }
          rootClassName="navbarroot-class-name"
          imageSrc="../assets/hamhaw_shield.png"
        ></Navbar>
        <Hamhawbanner rootClassName="hamhawbannerroot-class-name"></Hamhawbanner>
      </div>
      <div className="find-container3">
        <span className="Section-Heading">Search for a person or city</span>
      </div>
      <div className="find-container-search-row">
        <label className="find-lbl-select">Event: </label>
        <select id="cboEvent" required="true" className="find-cbo-event">
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
        <input
          type="text"
          id="txtFirstName"
          placeholder="First Name"
          className="find-txt-first-name input"
        />
        <input
          type="text"
          id="txtLastName"
          placeholder="Last Name"
          className="find-txt-last-name input"
        />
        <input
          type="text"
          id="txtCity"
          required="true"
          placeholder="City"
          className="find-txt-city input"
        />
        <input
          type="text"
          id="txtState"
          required="true"
          placeholder="State"
          className="find-txt-state input"
        />
        <button
          id="btnSearch"
          name="btnSearch"
          type="submit"
          className="find-btn-search Anchor button"
        >
          <span>SEARCH</span>
        </button>
      </div>
      <div className="find-gridmissing">
        <div className="find-gridmissingrow1">
          <div className="find-container-col1">
            <span>FirstName</span>
          </div>
          <div className="find-container-col2">
            <span>LastName</span>
          </div>
          <div className="find-container-col3">
            <span>City</span>
          </div>
          <div className="find-container-col4">
            <span>State</span>
          </div>
          <div className="find-container-col5">
            <span>Condition</span>
          </div>
          <div className="find-container-col6">
            <span>When</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Find
