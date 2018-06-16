import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './index.scss'
import Button from '../button'

const NavBar = (props) => {
	return (
		<nav className="navbar">
			<Link className="main-title" to="/">Yearly</Link>
			<span className="page-title">| {props.title.toUpperCase()}</span>

			<div className="nav-links">
				<Button to="/register" buttontype="solid">Register</Button>
				<Button to="/login" buttontype="outline">Login</Button>
			</div>
		</nav>
	)
}

NavBar.propTypes = {
	title: PropTypes.string.isRequired
}

export default NavBar
