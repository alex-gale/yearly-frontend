import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import nprogress from 'nprogress'
import { ToastContainer, Slide } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import 'nprogress/nprogress.css'
import './index.scss'
import NavRoute from './components/nav-route'
import Splash from './containers/splash'
import Register from './containers/register'
import Verify from './containers/verify'
import Login from './containers/login'
import Dashboard from './containers/dashboard'
import Account from './containers/account'
import { isLoggedIn, validateToken } from './lib/login'

nprogress.configure({ showSpinner: false })

class App extends React.PureComponent {
	constructor(props) {
		super(props)

		if (isLoggedIn()) {
			validateToken()
		}
	}

	render() {
		return (
			<Router>
				<div className="container">
					<Helmet
						title="Yearly"
					/>

					<Switch>
						<NavRoute exact title="Home" path="/" component={Splash} />
						<NavRoute exact title="Login" path="/login" component={Login} />
						<NavRoute exact title="Register" path="/register/:invite?" component={Register} />
						<NavRoute exact title="Verify" path="/verify/:vhash?" component={Verify} />
						<NavRoute exact title="Dashboard" path="/dashboard" component={Dashboard} />
						<NavRoute exact title="My Account" path="/account" component={Account} />
						<NavRoute title="404" component={NotFound} />
					</Switch>

					<ToastContainer
						toastClassName="toast-notification"
						hideProgressBar
						position="bottom-right"
						transition={Slide}
						pauseOnHover={false}
						closeButton={false}
					/>
				</div>
			</Router>
		)
	}
}

const NotFound = () => {
	return (
		<h1 className="not-found">404 Not Found</h1>
	)
}

export default App
