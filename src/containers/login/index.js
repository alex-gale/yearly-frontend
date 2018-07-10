import React from 'react'

import './index.scss'
import Card from '../../components/card'
import TextInput from '../../components/text-input'
import Button from '../../components/button'

const Login = () => {
	return (
		<div className="login-content">
			<Card>
				<h1>Welcome back to <span className="yearly-title">Yearly</span></h1>
				<div className="separate-line" />

				<form>
					<TextInput placeholder="Email/Username" id="username" name="username" required />
					<TextInput placeholder="Password" type="password" id="password" name="password" required />
					<Button submit wide>Login</Button>
				</form>
			</Card>
		</div>
	)
}

export default Login
