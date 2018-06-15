import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import './index.css'
import NavBar from './components/navbar'

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Helmet
						title="Yearly"
					/>

					<NavBar />
				</div>
			</Router>
		)
	}
}
