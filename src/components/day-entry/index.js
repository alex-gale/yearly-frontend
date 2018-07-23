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
		if (this.state.status === 'new') {
			this.props.onClose()
		} else {
			this.setState({ status: 'display' })
		}
	}

	handleSave(day) {
		if (this.state.status === 'new') {
			this.props.onSave(day)
		} else {
			this.setState({ day })
		}
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
					<ActiveDayEntry
						today={this.state.status === 'today'}
						new={this.state.status === 'new'}
						message={this.state.message}
						day={this.state.day}
						onSave={(day) => { this.handleSave(day) }}
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
	onSave: PropTypes.func,
	onClose: PropTypes.func
}

DayEntry.defaultProps = {
	day: {
		date: new Date(),
		mood: null,
		note: '',
		items: []
	},
	status: 'display',
	onSave: null,
	onClose: null
}

export default DayEntry
