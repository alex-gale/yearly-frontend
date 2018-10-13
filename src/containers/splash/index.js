import React from 'react'
import nprogress from 'nprogress'

import './index.scss'
import LockIcon from '../../assets/lock.svg'
import GraphIcon from '../../assets/graph.svg'
import ActivityIcon from '../../assets/activity.svg'

class Splash extends React.Component {
	constructor(props) {
		super(props)

		nprogress.start()
	}

	componentDidMount() {
		nprogress.done()
	}

	render() {
		return (
			<div className="splash-content">
				<h1 className="tagline-header">What will you do this year?</h1>
				<p className="tagline-subtext">Track your year with <span className="yearly-title">Yearly</span></p>
				<div className="showcase-area">
					<div className="showcase-object">
						<img src={GraphIcon} alt="" />
						<h2>Mood Tracking</h2>
						<p>Integrated charts and graphs for tracking your mood day by day</p>
					</div>
					<div className="showcase-object">
						<img src={ActivityIcon} alt="" />
						<h2>Activity Tracking</h2>
						<p>Track your daily activities so you never forget what you do each day</p>
					</div>
					<div className="showcase-object">
						<img src={LockIcon} alt="" />
						<h2>Encrypted entries</h2>
						<p>Your entries are encrypted with AES-256, so nobody but you can access them</p>
					</div>
				</div>
			</div>
		)
	}
}

export default Splash
