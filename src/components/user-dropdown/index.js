import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

import './index.scss'
import DownArrow from '../../assets/down-arrow.svg'
import UpArrow from '../../assets/up-arrow.svg'

class UserDropdown extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active: false
		}

		this.handleToggle = this.handleToggle.bind(this)
		this.handleClickOff = this.handleClickOff.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
	}

	handleToggle() {
		const active = !this.state.active
		this.setState({ active })
	}

	handleClickOff() {
		this.setState({ active: false })
	}

	handleLogout() {
		window.localStorage.clear()
		window.location = '/'
	}

	render() {
		const activeClass = this.state.active ? 'active' : ''
		const dropdownClass = `user-dropdown ${activeClass}`

		return (
			<div className="dropdown" onBlur={this.handleClickOff} tabIndex={0}>
				<p className="toggle-dropdown" onClick={this.handleToggle}>
					<img className="arrow-icon" alt="" src={this.state.active ? UpArrow : DownArrow} />
					{this.props.username}
				</p>
				<div className={dropdownClass}>
					<Link to="/dashboard">Dashboard</Link>
					<p>My Account</p>
					<p onClick={this.handleLogout}>Logout</p>
				</div>
			</div>
		)
	}
}

UserDropdown.propTypes = {
	username: PropTypes.string.isRequired,
	history: PropTypes.object
}

export default withRouter(UserDropdown)
