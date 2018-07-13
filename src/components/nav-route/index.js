import React from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './index.scss'
import Footer from '../footer'
import Button from '../button'

const NavRoute = (props) => {
	const {
		title,
		component,
		...rest
	} = props

	return (
		<Route
			{...rest}
			render={() => {
				return (
					<React.Fragment>
						<nav className="navbar">
							<Link className="main-title" to="/">Yearly</Link>
							<span className="page-title">| {props.title.toUpperCase()}</span>

							<div className="nav-links">
								<Button to="/login" buttontype="solid">Login</Button>
							</div>
						</nav>
						<div className="page-content">
							{component()}
						</div>
						<Footer />
					</React.Fragment>
				)
			}}
		/>
	)
}

NavRoute.propTypes = {
	title: PropTypes.string.isRequired,
	component: PropTypes.func.isRequired
}

export default NavRoute
