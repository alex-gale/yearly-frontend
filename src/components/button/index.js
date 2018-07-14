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
		active,
		...rest
	} = props

	const buttonTypeClass = buttontype === 'solid' ? 'button-solid' : 'button-outline'
	const buttonWideClass = wide ? 'button-wide' : ''
	const buttonActiveClass = !active ? 'button-disabled' : ''
	const classes = `button ${buttonTypeClass} ${buttonWideClass} ${buttonActiveClass}`.trim()

	if (!active) {
		return (
			<div className={classes}>
				{children}
			</div>
		)
	}

	if (submit) {
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
	submit: PropTypes.bool,
	wide: PropTypes.bool,
	active: PropTypes.bool
}

Button.defaultProps = {
	to: '',
	buttontype: 'solid',
	submit: false,
	wide: false,
	active: true
}

export default Button
