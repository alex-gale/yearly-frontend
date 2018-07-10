import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './index.scss'

const Button = (props) => {
	const {
		to,
		children,
		buttontype,
		submit,
		wide,
		...rest
	} = props

	const buttonTypeClass = buttontype === 'solid' ? 'button-solid' : 'button-outline'
	const buttonWideClass = wide ? 'button-wide' : null
	const classes = `button ${buttonTypeClass} ${buttonWideClass}`

	if (props.submit) {
		return (
			<button type="submit" className={classes} {...rest}>
				{children}
			</button>
		)
	}

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
	buttontype: PropTypes.oneOf(['outline', 'solid']),
	submit: PropTypes.bool
}

Button.defaultProps = {
	to: '',
	buttontype: 'solid',
	submit: false
}

export default Button
