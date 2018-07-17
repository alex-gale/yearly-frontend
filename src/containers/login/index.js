import React from 'react'
import PropTypes from 'prop-types'
import nprogress from 'nprogress'

import './index.scss'
import Card from '../../components/card'
import TextInput from '../../components/text-input'
import Button from '../../components/button'
import { login, isLoggedIn } from '../../lib/login'

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			message: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

		if (isLoggedIn()) {
			this.props.history.push('/dashboard')
		}

		nprogress.start()
	}

	componentDidMount() {
		nprogress.done()
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit(e) {
		e.preventDefault()

		const {
			username, password
		} = this.state

		this.setState({ message: '' })

		login(username, password, (err, token) => {
			if (err) {
				return this.setState({ message: err.message })
			}

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
							maxLength="16"
							required
						/>
						<TextInput
							value={this.state.password}
							onChange={this.handleChange}
							placeholder="Password"
							type="password"
							id="password"
							name="password"
							minLength="6"
							required
						/>
						<Button submit wide>Login</Button>
					</form>
					<p className="input-message">{this.state.message}</p>
				</Card>
			</div>
		)
	}
}

Login.propTypes = {
	history: PropTypes.object.isRequired
}

export default Login
