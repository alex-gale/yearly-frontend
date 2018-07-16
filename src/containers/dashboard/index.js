import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import './index.scss'
import DayEntry from '../../components/day-entry'
import LoadingIcon from '../../components/loading-icon'
import { isLoggedIn } from '../../lib/login'
import { getDays, getToday } from '../../lib/days'

class Dashboard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loadingToday: true,
			loadingPrevious: true,
			days: []
		}

		if (!isLoggedIn()) {
			this.props.history.push('/login')
		}

		getDays((err, days) => {
			this.setState({ days, loadingPrevious: false })
		})

		getToday((err, today) => {
			this.setState({ today, loadingToday: false })
		})
	}

	render() {
		return (
			<div className="dash-content">
				<h1>Today</h1>
				{this.state.loadingToday ?
					<LoadingIcon /> :
					<DayEntry status="today" day={this.state.today} />
				}

				<div className="separate-line" />
				<h1>Previous Days</h1>
				{this.state.loadingPrevious ?
					<LoadingIcon /> :
					this.state.days.length > 0 ?
						this.state.days.map((day) => {
							return (
								<DayEntry key={shortid.generate()} day={day} status="display" />
							)
						}) :
						<h2>No content could be loaded.</h2>
				}
			</div>
		)
	}
}

Dashboard.propTypes = {
	history: PropTypes.object.isRequired
}

export default Dashboard
