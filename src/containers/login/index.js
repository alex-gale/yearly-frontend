import React from 'react'
import { withRouter } from "react-router-dom"
import PropTypes from 'prop-types'

import './index.scss'
import Card from '../../components/card'
import TextInput from '../../components/text-input'
import Button from '../../components/button'
import { callLoginApi, isLoggedIn } from '../../lib/login'

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			errorMessage: ''
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
			username, password
		} = this.state

		callLoginApi(username, password, (err, token) => {
			if (err) {
				return this.setState({ errorMessage: err.message })
			}

			this.setState({ errorMessage: '' })
			window.localStorage.setItem('token', token)
			window.location = "/dashboard"
		})
	}

	render() {
		return (
			<div className="login-content">
				<Card>
					<h1>Welcome back to <span className="yearly-title">Yearly</span></h1>
					<div className="separate-line" />

					<form onSubmit={this.handleSubmit}>
						<TextInput
							value={this.state.username}
							onChange={this.handleChange}
							placeholder="Email/Username"
							id="username"
							name="username"
							required
						/>
						<TextInput
							value={this.state.password}
							onChange={this.handleChange}
							placeholder="Password"
							type="password"
							id="password"
							name="password"
							required
						/>
						<Button submit wide>Login</Button>
					</form>
					<p className="error-message">{this.state.errorMessage}</p>
				</Card>
			</div>
		)
	}
}

Login.propTypes = {
	history: PropTypes.object
}

export default withRouter(Login)
