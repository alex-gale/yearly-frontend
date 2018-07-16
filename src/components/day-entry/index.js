import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'
import Card from '../card'
import ActiveDayEntry from './active-day-entry'
import DisplayDay from './display-day'

class DayEntry extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			day: JSON.parse(JSON.stringify(this.props.day)),
			status: this.props.status
		}

		this.handleModalClose = this.handleModalClose.bind(this)
		this.handleClose = this.handleClose.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
	}

	handleModalClose() {
		this.setState({ currentModal: null })
	}

	handleClose() {
		this.setState({ status: 'display' })
	}

	handleSave(day) {
		this.setState({ day })
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
					/> :
					this.state.status === 'today' ?
						<ActiveDayEntry
							today
							message={this.state.message}
							day={this.state.day}
						/> :
						<ActiveDayEntry
							day={this.state.day}
							message={this.state.message}
							onClose={this.handleClose}
							onSave={(day) => { this.handleSave(day) }}
						/>
				}
			</Card>
		)
	}
}

DayEntry.propTypes = {
	day: PropTypes.object,
	status: PropTypes.oneOf(['today', 'edit', 'display']),
}

DayEntry.defaultProps = {
	day: {
		date: new Date(),
		mood: null,
		note: '',
		items: []
	},
	status: 'display'
}

export default DayEntry
