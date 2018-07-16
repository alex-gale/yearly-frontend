import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'
import Card from '../../components/card'
import TextInput from '../../components/text-input'
import Button from '../../components/button'
import { register } from '../../lib/register'
import { isLoggedIn } from '../../lib/login'

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			inviteCode: this.props.match.params.invite,
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			message: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

		if (isLoggedIn()) {
			this.props.history.push('/dashboard')
		}
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault()

		const {
			inviteCode, username, email, password, confirmPassword
		} = this.state

		this.setState({ message: '' })

		if (password === confirmPassword) {
			register(inviteCode, username, email, password, (err, token) => {
				if (err) {
					return this.setState({ message: err.message })
				}

				window.localStorage.setItem('token', token)
				window.location = "/dashboard"
			})
		} else {
			this.setState({ message: "Passwords do not match" })
		}
	}

	render() {
		return (
			<div className="register-content">
				<Card>
					<h1>Register</h1>
					<div className="separate-line" />

					<form onSubmit={this.handleSubmit}>
						<div className="form-section">
							<TextInput
								value={this.state.inviteCode}
								onChange={this.handleChange}
								placeholder="Invite Code"
								name="inviteCode"
								required
							/>
						</div>
						<div className="form-section">
							<TextInput
								value={this.state.username}
								onChange={this.handleChange}
								placeholder="Username"
								name="username"
								required
							/>
							<TextInput
								value={this.state.email}
								onChange={this.handleChange}
								placeholder="Email"
								name="email"
								required
							/>
						</div>
						<div className="form-section">
							<TextInput
								value={this.state.password}
								onChange={this.handleChange}
								placeholder="Password"
								type="password"
								name="password"
								required
							/>
							<TextInput
								value={this.state.confirmPassword}
								onChange={this.handleChange}
								placeholder="Confirm Password"
								type="password"
								name="confirmPassword"
								required
							/>
						</div>
						<Button submit wide>Register </Button>
					</form>
					<p className="input-message">{this.state.message}</p>
				</Card>
			</div>
		)
	}
}

Register.propTypes = {
	history: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
}

export default Register
