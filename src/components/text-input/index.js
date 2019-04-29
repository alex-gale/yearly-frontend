import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const TextInput = (props) => {
	const {
		label,
		placeholder,
		...rest
	} = props

	return (
		<label className="text-input">
			<input type='text' id={props.label} name={props.label} {...rest} className="text-input-main" placeholder={props.label ? '\u00A0' : placeholder} />
			<span className="label">{props.label}</span>
		</label>
	)
}

TextInput.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string
}

export default TextInput
