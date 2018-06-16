import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import './index.scss'
import NavBar from './components/navbar'
import Footer from './components/footer'
import Splash from './pages/splash'

function App() {
	return (
		<Router>
			<div className="container">
				<Helmet
					title="Yearly"
				/>

				<NavBar />
				<div className="page-content">
					<Route exact path="/" component={Splash} />
				</div>
				<Footer />
			</div>
		</Router>
	)
}

export default App
