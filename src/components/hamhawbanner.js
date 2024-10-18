import React from 'react'

import PropTypes from 'prop-types'

import './hamhawbanner.css'
import hamhawBanner from '../assets/hamhaw_banner.png'

const Hamhawbanner = (props) => {
  return (
    <div className={`hamhawbanner-container ${props.rootClassName} `}>
      <img
        src={hamhawBanner}
        alt={props.imageAlt1}
        className="hamhawbanner-image1"
      />
    </div>
  )
}

Hamhawbanner.defaultProps = {
  imageAlt: 'image',
  rootClassName: '',
  imageSrc: {hamhawBanner},
  imageSrc1: {hamhawBanner},
  imageAlt1: 'image',
}

Hamhawbanner.propTypes = {
  imageAlt: PropTypes.string,
  rootClassName: PropTypes.string,
  imageSrc: PropTypes.string,
  imageSrc1: PropTypes.string,
  imageAlt1: PropTypes.string,
}

export default Hamhawbanner
