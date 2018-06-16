import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import NavBar from '../navbar'
import Footer from '../footer'

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
						<NavBar title={title} />
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
