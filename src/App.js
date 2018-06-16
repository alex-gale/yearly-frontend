import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import NavRoute from './components/nav-route'
import './index.scss'
import Splash from './containers/splash'
import Login from './containers/login'

const App = () => {
	return (
		<Router>
			<div className="container">
				<Helmet
					title="Yearly"
				/>

				<NavRoute title="home" exact path="/" component={Splash} />
				<NavRoute title="login" path="/login" component={Login} />
			</div>
		</Router>
	)
}

export default App
