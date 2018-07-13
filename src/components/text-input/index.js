import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const TextInput = (props) => {
	const {
		type,
		...rest
	} = props

	return (
		<input type={type} {...rest} className="text-input" />
	)
}

TextInput.propTypes = {
	type: PropTypes.string
}

TextInput.defaultProps = {
	type: 'text'
}

export default TextInput
