import React from 'react'
import PropTypes from 'prop-types'
import addHours from 'date-fns/add_hours'

import './index.scss'
import Card from '../card'
import ActiveDayEntry from './active-day-entry'
import DisplayDay from './display-day'

class DayEntry extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			day: Object.assign({}, this.props.day),
			status: this.props.status
		}

		// stored date
		this.state.day.storedDate = this.state.day.date

		// client utc offset
		const utcDiff = new Date().getTimezoneOffset() / 60
		// utc offset in data
		const storedDiff = new Date(this.state.day.date).getTimezoneOffset() / 60

		// if client not in UTC, adjust display date
		if (utcDiff !== 0 && storedDiff === 0) {
			this.state.day.date = addHours(this.state.day.date, -utcDiff)
		}

		this.handleModalClose = this.handleModalClose.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleReload = this.handleReload.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}

	handleModalClose() {
		this.setState({ currentModal: null })
	}

	handleClose() {
		if (this.state.status === 'new') {
			this.props.onClose()
		} else {
			this.setState({ status: 'display' })
		}
	}

	handleReload(day) {
		this.props.onReload(day)
	}

	handleEdit() {
		this.setState({ status: 'edit' })
	}

	render() {
		return (
			<Card>
				{this.state.status === 'display' ?
					<DisplayDay
						day={this.state.day}
						onEdit={this.handleEdit}
						editable={this.props.editable}
						search={this.props.search}
					/> :
					<ActiveDayEntry
						today={this.state.status === 'today'}
						new={this.state.status === 'new'}
						message={this.state.message}
						day={this.state.day}
						onReload={(day) => { this.handleReload(day) }}
						onClose={this.handleClose}
					/>
				}
			</Card>
		)
	}
}

DayEntry.propTypes = {
	day: PropTypes.object,
	status: PropTypes.oneOf(['today', 'edit', 'display', 'new']),
	onReload: PropTypes.func,
	onClose: PropTypes.func,
	editable: PropTypes.bool,
	search: PropTypes.string
}

DayEntry.defaultProps = {
	day: {
		date: new Date(),
		mood: null,
		note: '',
		items: []
	},
	status: 'display',
	onReload: null,
	onClose: null,
	editable: false,
	search: ''
}

export default DayEntry
