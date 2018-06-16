import React from 'react'
import { Link } from 'react-router-dom'

import './index.scss'

function NavBar() {
	return (
		<nav className="navbar">
			<Link className="main-title" to="/">Yearly</Link>
			<span className="page-title">| HOME</span>
		</nav>
	)
}

export default NavBar
