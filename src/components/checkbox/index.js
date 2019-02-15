import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const Checkbox = (props) => (
  <div className="checkbox">
    <input className="checkbox-input" type="checkbox" name={props.name} id={props.name} onChange={props.onChange} checked={props.checked} />
    <label htmlFor={props.name}>
      <svg viewBox="0, 0, 50, 50">
        <path d="M5 30 L 20 45 L 45 5" />
      </svg>
    </label>
    <label htmlFor={props.name}>{props.text}</label>
  </div>
)

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string,
  text: PropTypes.string
}

Checkbox.defaultPropTypes = {
  name: "",
  text: ""
}

export default Checkbox
