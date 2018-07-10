import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const TextInput = (props) => {
	const {
		type
	} = props

	return (
		<input type={type} className="text-input" {...props} />
	)
}

TextInput.propTypes = {
	type: PropTypes.string
}

TextInput.defaultProps = {
	type: 'text'
}

export default TextInput
