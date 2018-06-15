import React from 'react'
import { Link } from 'react-router-dom'

import './index.css'

function NavBar() {
	return (
		<div className="navbar">
			<Link className="main-title" to="/">Yearly</Link>
			<span className="page-title">| HOME</span>
		</div>
	)
}

export default NavBar
