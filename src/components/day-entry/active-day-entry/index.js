import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import TextArea from '../../text-area'
import Button from '../../button'
import ItemEditor from '../../item-editor'
import CloseIcon from '../../../assets/close.svg'
import MoodIcon from '../../icons/mood-icon'
import ItemIcon from '../../icons/item-icon'

const getDate = (date = new Date()) => {
	return date.toDateString()
}

class ActiveDayEntry extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			day: JSON.parse(JSON.stringify(this.props.day)),
			submittedDay: JSON.parse(JSON.stringify(this.props.day))
		}

		this.handleMoodNoteChange = this.handleMoodNoteChange.bind(this)
		this.handleItemAdd = this.handleItemAdd.bind(this)
		this.handleItemEdit = this.handleItemEdit.bind(this)
		this.handleItemSave = this.handleItemSave.bind(this)
		this.handleItemDelete = this.handleItemDelete.bind(this)
		this.handleModalClose = this.handleModalClose.bind(this)
		this.handleSave = this.handleSave.bind(this)
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
		this.setState({ submittedDay: day })
		this.props.onSave(day)
	}

	render() {
		return (
			<div className="day-editor">
				<div className="date-display">
					{getDate()}
					<div className="close-entry" onClick={this.props.onClose}>
						<img src={CloseIcon} alt="close" />
					</div>
				</div>

				<div className="mood-selector">
					<MoodIcon mood={this.state.day.mood} />
					<div className="note-entry">
						<TextArea
							value={this.state.day.note}
							onChange={this.handleMoodNoteChange}
							placeholder="How was your day?"
						/>
					</div>
				</div>

				<div className="item-area">
					<div className="separate-line" />
					<p>Activities</p>

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
					<div className="save-button">
						<p className="error-message">{this.props.message}</p>
						<Button
							active={
								this.state.day.note.length >= 3 &&
								JSON.stringify(this.state.day) !== JSON.stringify(this.state.submittedDay)
							}
							onClick={this.handleSave}
						>
							Save
						</Button>
					</div>

					{this.state.currentModal}
				</div>
			</div>
		)
	}
}

ActiveDayEntry.propTypes = {
	day: PropTypes.object,
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
	message: PropTypes.string
}

ActiveDayEntry.defaultProps = {
	day: {
		mood: null,
		note: '',
		items: []
	},
	message: ''
}

export default ActiveDayEntry
