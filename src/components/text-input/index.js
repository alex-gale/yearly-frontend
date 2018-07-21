import React from 'react'

import './index.scss'

const TextInput = (props) => {
	return (
		<input type='text' {...props} className="text-input" />
	)
}

export default TextInput
