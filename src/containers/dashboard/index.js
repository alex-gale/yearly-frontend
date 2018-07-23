import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import nprogress from 'nprogress'

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
			days: [],
			dayMessage: '',
			todayMessage: '',
			newDayActive: false
		}

		this.handleNewDay = this.handleNewDay.bind(this)
		this.handleCloseNewDay = this.handleCloseNewDay.bind(this)

		if (!isLoggedIn()) {
			this.props.history.push('/login')
		}

		nprogress.start()
	}

	componentDidMount() {
		nprogress.done()

		getDays((err, days) => {
			if (err) {
				return this.setState({ dayMessage: err.message, loadingPrevious: false })
			} else {
				this.setState({ days, loadingPrevious: false })
			}
		})

		getToday((err, today) => {
			if (err) {
				return this.setState({ todayMessage: err.message, loadingToday: false })
			} else {
				this.setState({ today, loadingToday: false })
			}
		})
	}

	handleNewDay() {
		this.setState({ newDayActive: true })
	}

	handleSaveNewDay() {
		this.setState({ loadingPrevious: true })

		getDays((err, days) => {
			if (err) {
				return this.setState({ dayMessage: err.message, loadingPrevious: false })
			} else {
				this.setState({ days, loadingPrevious: false })
			}
		})
	}

	handleCloseNewDay() {
		this.setState({ newDayActive: false })
	}

	render() {
		return (
			<div className="dash-content">
				<h1>Today</h1>
				{this.state.loadingToday ?
					<LoadingIcon /> :
					this.state.todayMessage.length > 0 ?
						<h2 className="error-message">{this.state.todayMessage}</h2> :
						<DayEntry status="today" day={this.state.today} />
				}

				<div className="separate-line" />
				<h1>Previous Days</h1>

				{this.state.loadingPrevious ?
					<LoadingIcon /> :
					this.state.dayMessage.length > 0 ?
						<h2 className="error-message">{this.state.dayMessage}</h2> :
						<React.Fragment>
							{this.state.newDayActive ?
								<React.Fragment>
									<DayEntry
										status="new"
										onSave={(day) => { this.handleSaveNewDay(day) }}
										onClose={this.handleCloseNewDay}
									/>
									<div className="separate-line" />
								</React.Fragment> :
								<div className="new-day" title="New Day" onClick={this.handleNewDay}>+</div>
							}

							{this.state.days.length > 0 ?
								this.state.days.map((day) => {
									return (
										<DayEntry key={shortid.generate()} day={day} status="display" />
									)
								}) :
								<h2>No content could be loaded.</h2>
							}
						</React.Fragment>
				}
			</div>
		)
	}
}

Dashboard.propTypes = {
	history: PropTypes.object.isRequired
}

export default Dashboard
