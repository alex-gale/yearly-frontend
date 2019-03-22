import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import nprogress from 'nprogress'

import './index.scss'
import DayEntry from '../../components/day-entry'
import LoadingIcon from '../../components/loading-icon'
import TextInput from '../../components/text-input'
import { isLoggedIn } from '../../lib/login'
import { getDays, getToday } from '../../lib/days'
import { getSettings } from '../../lib/settings'

class Dashboard extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			loadingToday: true,
			loadingPrevious: true,
			days: [],
			dayMessage: '',
			todayMessage: '',
			newDayActive: false,
			settings: {},
			searchTerm: ''
		}

		this.handleNewDay = this.handleNewDay.bind(this)
		this.handleCloseNewDay = this.handleCloseNewDay.bind(this)
		this.handleSearchUpdate = this.handleSearchUpdate.bind(this)

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

		getSettings((err, settings) => {
			if (!err) this.setState({ settings })
		})
	}

	handleNewDay() {
		this.setState({ newDayActive: true })
	}

	handleSave() {
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

	handleSearchUpdate(e) {
		this.setState({ searchTerm: e.target.value })
	}

	render() {
		const filteredDays = this.state.days.filter((day) => {
			return day.note.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1
		})

		return (
			<div className="content dash-content">
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
										onSave={(day) => { this.handleSave(day) }}
										onClose={this.handleCloseNewDay}
									/>
									<div className="separate-line" />
								</React.Fragment> :
								<div className="new-day" title="New Day" onClick={this.handleNewDay}>+</div>
							}

							<div className="dash-filters">
								<p>Search:</p>
								<TextInput
									value={this.state.searchTerm}
									onChange={this.handleSearchUpdate}
									placeholder="Search Days"
								/>
							</div>

							{this.state.days.length > 0 ?
								filteredDays.length > 0 ?
									filteredDays.map((day) => {
										return (
											<DayEntry
												key={shortid.generate()}
												day={day}
												status="display"
												editable={this.state.settings.editing}
												onSave={(day) => { this.handleSave(day) }}
												search={this.state.searchTerm}
											/>
										)
									}) :
									<h2>No entries found under search term '{this.state.searchTerm}'</h2>
								:
								<h2>No entries saved. Make some by clicking the + button above!</h2>
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
