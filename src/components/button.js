import React, { Fragment } from 'react'

import PropTypes from 'prop-types'

import './button.css'

const Button = (props) => {
  return (
    <div className={`button-container ${props.rootClassName} `}>
      <button
        name="btnSearch"
        type="submit"
        className="button-cta-btn Anchor button"
      >
        <span>
          {props.ctaBtn ?? (
            <Fragment>
              <span className="button-text2">SEARCH NOW</span>
            </Fragment>
          )}
        </span>
      </button>
    </div>
  )
}

Button.defaultProps = {
  ctaBtn: undefined,
  rootClassName: '',
}

Button.propTypes = {
  ctaBtn: PropTypes.element,
  rootClassName: PropTypes.string,
}

export default Button
