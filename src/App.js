import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import nprogress from 'nprogress'

import './index.scss'
import 'nprogress/nprogress.css'
import NavRoute from './components/nav-route'
import Splash from './containers/splash'
import Register from './containers/register'
import Login from './containers/login'
import Dashboard from './containers/dashboard'

nprogress.configure({ showSpinner: false })

const App = () => {
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
					<NavRoute exact title="Dashboard" path="/dashboard" component={Dashboard} />
					<NavRoute title="not found" component={NotFound} />
				</Switch>
			</div>
		</Router>
	)
}

const NotFound = () => {
	return (
		<h1 className="not-found">404 Not Found</h1>
	)
}

export default App
