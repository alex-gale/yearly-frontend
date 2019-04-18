// good luck

import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import subYears from 'date-fns/sub_years'
import subDays from 'date-fns/sub_days'
import isBefore from 'date-fns/is_before'
import isAfter from 'date-fns/is_after'
import isSameDay from 'date-fns/is_same_day'
import format from 'date-fns/format'
import { toast } from 'react-toastify'

import TextArea from '../../text-area'
import Button from '../../button'
import ItemEditor from '../../item-editor'
import LoadingIcon from '../../loading-icon'
import DateEntry from '../../date-entry'
import ConfirmModal from '../../confirm-modal'
import CloseIcon from '../../../assets/close.svg'
import DeleteIcon from '../../../assets/delete.svg'
import MoodIcon from '../../icons/mood-icon'
import moodIcons from '../../../assets/mood-icons'
import ItemIcon from '../../icons/item-icon'
import { saveDay, deleteDay, getUsedDates } from '../../../lib/days'

const getDate = (date = new Date()) => {
	const yearAgo = subYears(new Date(), 1)
	const dateFormat = isBefore(date, yearAgo) ? 'Do MMM YYYY' : 'dddd Do MMM'

	return format(date, dateFormat)
}

class ActiveDayEntry extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			day: JSON.parse(JSON.stringify(this.props.day)),
			submittedDay: JSON.parse(JSON.stringify(this.props.day)),
			pending: false,
			submitConf: false
		}

		this.handleMoodChange = this.handleMoodChange.bind(this)
		this.handleMoodNoteChange = this.handleMoodNoteChange.bind(this)
		this.handleDateChange = this.handleDateChange.bind(this)
		this.handleItemAdd = this.handleItemAdd.bind(this)
		this.handleItemEdit = this.handleItemEdit.bind(this)
		this.handleItemSave = this.handleItemSave.bind(this)
		this.handleItemDelete = this.handleItemDelete.bind(this)
		this.handleModalClose = this.handleModalClose.bind(this)
		this.handleConfirmSave = this.handleConfirmSave.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleClose = this.handleClose.bind(this)

		if (props.new) {
			let day = JSON.parse(JSON.stringify(this.state.day))
			day.date = subDays(new Date(), 1)
			this.state.day = day
		}
	}

	handleMoodChange(mood) {
		let day = JSON.parse(JSON.stringify(this.state.day))
		day.mood = mood
		this.setState({ day })
	}

	handleMoodNoteChange(event) {
		let day = JSON.parse(JSON.stringify(this.state.day))
		day.note = event.target.value
		this.setState({ day })
	}

	handleDateChange(event) {
		if (!isAfter(event.target.value, subDays(new Date(), 1))) {
			let day = JSON.parse(JSON.stringify(this.state.day))
			day.date = new Date(event.target.value)
			this.setState({ day })
		}
	}

	handleItemAdd() {
		const modal =	(
			<ItemEditor
				onClose={this.handleModalClose}
				editType="add"
				onReload={ (itemType) => { this.handleItemSave(itemType, null) } }
			/>
		)
		this.setState({ currentModal: modal })
	}

	handleItemEdit(index) {
		const modal = (
			<ItemEditor
				onClose={this.handleModalClose}
				editType="edit"
				onReload={(itemType) => { this.handleItemSave(itemType, index) }}
				onDelete={() => { this.handleItemDelete(index) }}
				type={this.state.day.items[index]}
			/>
		)

		this.setState({ currentModal: modal })
	}

	handleItemSave(itemType, index) {
		let day = JSON.parse(JSON.stringify(this.state.day))
		if (index !== null) {
			day.items[index] = itemType
		} else {
			day.items.push(itemType)
		}
		this.setState({ day })
	}

	handleItemDelete(index) {
		let day = JSON.parse(JSON.stringify(this.state.day))
		day.items.splice(index, 1)
		this.setState({ day })
	}

	handleModalClose() {
		this.setState({ currentModal: null, pending: false })
	}

	handleConfirmSave() {
		this.setState({ submitConf: true, pending: false, currentModal: null }, () => {
			this.handleSave()
		})
	}

	handleSave() {
		const day = JSON.parse(JSON.stringify(this.state.day))

		if (!day.date) {
			return this.setState({ message: "Please enter a valid date." })
		}

		this.setState({ message: '', pending: true })

		// if this is a new date entry AND the submit has not been confirmed
		if (this.props.new && !this.state.submitConf) {
			getUsedDates((err, dates) => {
				if (err) {
					return this.setState({ message: err.message })
				}

				if (dates.length === 0) {
					return this.handleConfirmSave()
				}

				for (let i in dates) {
					if (isSameDay(dates[i], day.date)) {
						const formattedDate = format(dates[i], 'DD/MM/YYYY')
						const modal = (
							<ConfirmModal
								title="Warning"
								message={`An entry already exists for ${formattedDate}. Are you sure you want to overwrite it?`}
								onCancel={this.handleModalClose}
								onConfirm={this.handleConfirmSave}
							/>
						)
						return this.setState({ currentModal: modal })
					} else {
						// i*1 here because js is stupid
						if (i*1 + 1 === dates.length) {
							this.handleConfirmSave()
						}
					}
				}
			})
		} else {
			saveDay(day, (err, message) => {
				this.setState({ pending: false })

				if (err) {
					return this.setState({ message: err.message })
				}

				if (!this.props.today) {
					toast.success("Day saved!")
					this.props.onReload(day)
					//this.props.onClose()
				} else {
					this.setState({ message, submittedDay: day })
				}
			})
		}
	}

	handleDelete() {
		this.setState({ message: '' })

		deleteDay(this.state.day.storedDate, (err, message) => {
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
					{this.props.new ?
						<DateEntry
							value={format(this.state.day.date, 'YYYY-MM-DD')}
							max={format(subDays(new Date(), 1), 'YYYY-MM-DD')}
							onChange={this.handleDateChange}
							required
						/> :
						getDate(new Date(this.state.day.date))
					}

					{!this.props.today &&
						<div className="manage-buttons">
							<div className="delete-entry" onClick={this.handleDelete}>
								<img src={DeleteIcon} alt="Delete" />
							</div>
							<div className="close-entry" onClick={this.handleClose}>
								<img src={CloseIcon} alt="Close" />
							</div>
						</div>
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

					{(this.state.day.mood !== null && this.state.day.mood >= 0) &&
						<div className="note-entry">
							<TextArea
								value={this.state.day.note}
								onChange={this.handleMoodNoteChange}
								placeholder="How was your day?"
							/>
						</div>
					}
				</div>

				{this.state.day.mood !== null &&
					<div className="item-area">
						<div className="separate-line" />
						<p>{this.props.today ? 'Today\'s ' : null}Activities</p>

						<div className="item-container">
							{this.state.day.items.map((item, i) => {
								return (
									<div key={shortid.generate()} className="item" onClick={() => { this.handleItemEdit(i) }}>
										<ItemIcon type={item} />
									</div>
								)
							})}
							{this.state.day.items.length < 8 ?
								<div className="new-item" onClick={this.handleItemAdd}>+</div> : null
							}
						</div>
						<div className="save-area">
							<p className="input-message">{this.state.message}</p>
							{this.state.pending ? <LoadingIcon mini /> : null}
							<Button
								active={
									this.state.day.note.length >= 3 &&
									this.state.day.mood >= 0 &&
									!isAfter(this.state.day.date, new Date()) &&
									JSON.stringify(this.state.day) !== JSON.stringify(this.state.submittedDay) &&
									!this.state.pending
								}
								onClick={this.handleSave}
							>
								Save
							</Button>
						</div>

						{this.state.currentModal}
					</div>
				}
			</div>
		)
	}
}

ActiveDayEntry.propTypes = {
	day: PropTypes.object.isRequired,
	onReload: PropTypes.func,
	onClose: PropTypes.func,
	today: PropTypes.bool,
	new: PropTypes.bool
}

ActiveDayEntry.defaultProps = {
	onClose: null,
	onReload: null,
	today: false,
	new: false
}

export default ActiveDayEntry
