import React from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './index.scss'
import Footer from '../footer'
import Button from '../button'
import UserDropdown from '../user-dropdown'
import { isLoggedIn, decodedToken } from '../../lib/login'

const NavRoute = (props) => {
	const {
		title,
		component,
		...rest
	} = props

	const PageContent = component
	const tokenContent = isLoggedIn() ? decodedToken() : null

	return (
		<Route
			{...rest}
			render={() => {
				return (
					<React.Fragment>
						<nav className="navbar">
							<Link className="main-title" to="/">Yearly</Link>
							<span className="page-title">| {title.toUpperCase()}</span>
							{isLoggedIn() ?
								<div className="nav-links">
									<Button to="/dashboard" buttontype="solid">Dashboard</Button>
									<UserDropdown username={tokenContent.username} />
								</div>
								:
								<div className="nav-links">
									<Button to="/login" buttontype="solid">Login</Button>
								</div>
							}
						</nav>
						<div className="page-content">
							<PageContent />
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
