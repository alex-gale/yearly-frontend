import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './index.scss'

const Button = (props) => {
	const {
		to,
		children,
		buttontype,
		...rest
	} = props

	const buttonTypeClass = buttontype === 'solid' ? 'button-solid' : 'button-outline'
	const classes = `button ${buttonTypeClass}`

	return to ? (
		<Link to={props.to} className={classes} {...rest}>
			{children}
		</Link>
	) : (
		<div className={classes} {...rest}>
			{children}
		</div>
	)
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	to: PropTypes.string,
	buttontype: PropTypes.oneOf(['outline', 'solid'])
}

Button.defaultProps = {
	to: '',
	buttontype: 'solid'
}

export default Button
