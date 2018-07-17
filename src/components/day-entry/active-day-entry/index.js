import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import TextArea from '../../text-area'
import Button from '../../button'
import ItemEditor from '../../item-editor'
import CloseIcon from '../../../assets/close.svg'
import MoodIcon from '../../icons/mood-icon'
import moodIcons from '../../../assets/mood-icons'
import ItemIcon from '../../icons/item-icon'
import { saveDay, deleteDay } from '../../../lib/days'

const getDate = (date = new Date()) => {
	return date.toDateString()
}

class ActiveDayEntry extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			day: JSON.parse(JSON.stringify(this.props.day)),
			submittedDay: JSON.parse(JSON.stringify(this.props.day)),
			pending: false
		}

		this.handleMoodChange = this.handleMoodChange.bind(this)
		this.handleMoodNoteChange = this.handleMoodNoteChange.bind(this)
		this.handleItemAdd = this.handleItemAdd.bind(this)
		this.handleItemEdit = this.handleItemEdit.bind(this)
		this.handleItemSave = this.handleItemSave.bind(this)
		this.handleItemDelete = this.handleItemDelete.bind(this)
		this.handleModalClose = this.handleModalClose.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}

	handleMoodChange(mood) {
		let day = Object.assign({}, this.state.day)
		day.mood = mood
		this.setState({ day })
	}

	handleMoodNoteChange(event) {
		let day = Object.assign({}, this.state.day)
		day.note = event.target.value
		this.setState({ day })
	}

	handleItemAdd() {
		const modal =	(
			<ItemEditor
				onClose={this.handleModalClose}
				editType="add"
				onSave={ (itemType) => { this.handleItemSave(itemType, null) } }
			/>
		)
		this.setState({ currentModal: modal })
	}

	handleItemEdit(index) {
		const modal = (
			<ItemEditor
				onClose={this.handleModalClose}
				editType="edit"
				onSave={(itemType) => { this.handleItemSave(itemType, index) }}
				onDelete={() => { this.handleItemDelete(index) }}
				type={this.state.day.items[index]}
			/>
		)

		this.setState({ currentModal: modal })
	}

	handleItemSave(itemType, index) {
		let day = Object.assign({}, this.state.day)
		if (index !== null) {
			day.items[index] = itemType
		} else {
			day.items.push(itemType)
		}
		this.setState({ day })
	}

	handleItemDelete(index) {
		let day = Object.assign({}, this.state.day)
		day.items.splice(index, 1)
		this.setState({ day })
	}

	handleModalClose() {
		this.setState({ currentModal: null })
	}

	handleSave() {
		const day = JSON.parse(JSON.stringify(this.state.day))
		this.setState({ message: '', pending: true })

		saveDay(day, (err, message) => {
			this.setState({ pending: false })

			if (err) {
				return this.setState({ message: err.message })
			}

			if (!this.props.today) {
				this.props.onSave(day)
				this.props.onClose()
			} else {
				this.setState({ message, submittedDay: day })
			}
		})
	}

	handleDelete() {
		this.setState({ message: '' })

		deleteDay(this.state.day.date, (err, message) => {
			if (err) {
				return this.setState({ message: err.message })
			}

			this.setState({ message })
		})
	}

	handleClose() {
		this.props.onClose()
	}

	render() {
		return (
			<div className="day-editor">
				<div className="date-display">
					{getDate(new Date(this.state.day.date))}
					{!this.props.today ?
						<div className="close-entry" onClick={this.handleClose}>
							<img src={CloseIcon} alt="Close" />
						</div> : null
					}
				</div>
				<div className="mood-selector">
					{this.state.day.mood === null || this.state.day.mood < 0 ?
						moodIcons.map((mood, i) => {
							return (
								<MoodIcon
									key={shortid.generate()}
									onClick={() => { this.handleMoodChange(i) }}
									mood={i}
								/>
							)
						}) :
						<MoodIcon
							mood={this.state.day.mood}
							onClick={() => { this.handleMoodChange(-1) }}
						/>
					}

					{this.state.day.mood !== null && this.state.day.mood >= 0 ?
						<div className="note-entry">
							<TextArea
								value={this.state.day.note}
								onChange={this.handleMoodNoteChange}
								placeholder="How was your day?"
							/>
						</div> : null
					}
				</div>

				{this.state.day.mood !== null ?
					<div className="item-area">
						<div className="separate-line" />
						<p>Today's Activities</p>

						<div className="item-container">
							{this.state.day.items.map((item, i) => {
								return (
									<div key={shortid.generate()} className="item" onClick={() => { this.handleItemEdit(i) }}>
										<ItemIcon type={item} />
									</div>
								)
							})}
							<div className="new-item" onClick={this.handleItemAdd}>+</div>
						</div>
						<div className="options-buttons">
							<p className="input-message">{this.state.message}</p>

							<Button
								active={
									this.state.day.note.length >= 3 &&
									this.state.day.mood >= 0 &&
									JSON.stringify(this.state.day) !== JSON.stringify(this.state.submittedDay) &&
									this.state.pending
								}
								onClick={this.handleSave}
							>
								Save
							</Button>
						</div>

						{this.state.currentModal}
					</div> : null
				}
			</div>
		)
	}
}

ActiveDayEntry.propTypes = {
	day: PropTypes.object.isRequired,
	onSave: PropTypes.func,
	onClose: PropTypes.func,
	today: PropTypes.bool
}

ActiveDayEntry.defaultProps = {
	onClose: null,
	onSave: null,
	today: false
}

export default ActiveDayEntry
