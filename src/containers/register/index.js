import React from 'react'
import PropTypes from 'prop-types'
import nprogress from 'nprogress'

import './index.scss'
import Card from '../../components/card'
import TextInput from '../../components/text-input'
import Button from '../../components/button'
import LoadingIcon from '../../components/loading-icon'
import { register } from '../../lib/register'
import { isLoggedIn } from '../../lib/login'

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			inviteCode: this.props.match.params.invite || '',
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			message: '',
			pending: false,
			submitted: false
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
			inviteCode, username, email, password, confirmPassword
		} = this.state

		this.setState({ message: '', pending: true })
    nprogress.start()

		if (password === confirmPassword) {
			register(inviteCode, username, email, password, (err) => {
			    nprogress.done()

				if (err) {
					this.setState({ pending: false })
					return this.setState({ message: err.message })
				}

				this.setState({ submitted: true })
			})
		} else {
			this.setState({ message: "Passwords do not match", pending: false })
		}
	}

	render() {
		return (
			<div className="content register-content">
				<Card>
					{this.state.submitted ?
						<React.Fragment>
							<h1>Success</h1>
							<div className="separate-line" />

							<p>A verification email was sent to <span className="bold">{this.state.email}</span>.</p>
							<p>Please click the link in the email to activate your account (remember to check your spam!)</p>
						</React.Fragment>
						:
						<React.Fragment>
							<h1>Register</h1>
							<div className="separate-line" />

							<form onSubmit={this.handleSubmit}>
								<div className="form-section">
									<TextInput
										value={this.state.inviteCode}
										onChange={this.handleChange}
										label="Invite Code"
										name="inviteCode"
										required
									/>
								</div>
								<div className="form-section">
									<TextInput
										value={this.state.username}
										onChange={this.handleChange}
										label="Username"
										name="username"
										maxLength="16"
										minLength="3"
										required
									/>
									<TextInput
										value={this.state.email}
										onChange={this.handleChange}
										label="Email"
										name="email"
										required
									/>
								</div>
								<div className="form-section">
									<TextInput
										value={this.state.password}
										onChange={this.handleChange}
										label="Password"
										type="password"
										name="password"
										minLength="6"
										required
									/>
									<TextInput
										value={this.state.confirmPassword}
										onChange={this.handleChange}
										label="Confirm Password"
										type="password"
										name="confirmPassword"
										minLength="6"
										required
									/>
								</div>
								<Button submit wide active={!this.state.pending}>Register</Button>
							</form>
							{this.state.pending && <LoadingIcon mini />}
							<p className="input-message">{this.state.message}</p>
						</React.Fragment>
					}
				</Card>
			</div>
		)
	}
}

Register.propTypes = {
	history: PropTypes.object.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			invite: PropTypes.string
		})
	})
}

export default Register
