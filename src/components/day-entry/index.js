import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'
import Card from '../card'
import ActiveDayEntry from './active-day-entry'
import DisplayDay from './display-day'
import TodayEntry from './today-entry'

class DayEntry extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			day: JSON.parse(JSON.stringify(this.props.day)),
			submittedDay: JSON.parse(JSON.stringify(this.props.day)),
			status: this.props.status,
			message: ''
		}

		this.handleModalClose = this.handleModalClose.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}

	handleDaySave() {
		// do this one day
	}

	handleModalClose() {
		this.setState({ currentModal: null })
	}

	handleClose() {
		this.setState({ status: 'display' })
	}

	render() {
		return (
			<Card>
				{this.state.status === 'display' ?
					<DisplayDay
						day={this.state.day}
					/> :
					this.props.status === 'today' ?
						<TodayEntry
							day={this.state.day}
						/> :
						<ActiveDayEntry
							day={this.state.day}
							message={this.state.message}
							onSave={(day) => { this.handleDaySave(day) }}
							onClose={this.handleClose}
						/>
				}
			</Card>
		)
	}
}

DayEntry.propTypes = {
	day: PropTypes.object,
	status: PropTypes.oneOf(['today', 'edit', 'display']).isRequired,
}

DayEntry.defaultProps = {
	day: {
		date: new Date(),
		mood: null,
		note: '',
		items: []
	}
}

export default DayEntry
