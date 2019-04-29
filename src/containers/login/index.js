import React from 'react'
import PropTypes from 'prop-types'
import nprogress from 'nprogress'

import './index.scss'
import Card from '../../components/card'
import TextInput from '../../components/text-input'
import Button from '../../components/button'
import LoadingIcon from '../../components/loading-icon'
import { login, isLoggedIn } from '../../lib/login'

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password: '',
			message: '',
			pending: false
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

		this.setState({ message: '', pending: true })
    nprogress.start()

		login(username, password, (err, token) => {
      nprogress.done()
			if (err) {
				this.setState({ pending: false })
				return this.setState({ message: err.message })
			}

			window.localStorage.setItem('token', token)
			window.location = "/dashboard"
		})
	}

	render() {
		return (
			<div className="content login-content">
				<Card>
					<h1>Welcome back to <span className="yearly-title">Yearly</span></h1>
					<div className="separate-line" />

					<form onSubmit={this.handleSubmit}>
						<TextInput
							value={this.state.username}
							onChange={this.handleChange}
							id="username"
							name="username"
							label="Email/Username"
							maxLength="16"
							required
						/>
						<TextInput
							value={this.state.password}
							onChange={this.handleChange}
							type="password"
							id="password"
							label="Password"
							name="password"
							minLength="6"
							required
						/>
						<Button submit wide active={!this.state.pending}>Login</Button>
					</form>
					{this.state.pending && <LoadingIcon mini />}
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
