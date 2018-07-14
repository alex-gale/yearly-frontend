import React from 'react'
import shortid from 'shortid'

import './index.scss'
import Card from '../card'
import TextArea from '../text-area'
import Button from '../button'
import AddItem from '../add-item'
import CloseIcon from '../../assets/close.svg'
import moodIcons from '../../assets/mood-icons'
import MoodIcon from '../icons/mood-icon'
import ItemIcon from '../icons/item-icon'

const getDate = () => {
	const date = new Date()
	return date.toDateString()
}

class EntryToday extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedMood: null,
			moodNote: '',
			items: [],
			itemNoteBuffer: []
		}

		this.selectMood = this.selectMood.bind(this)
		this.handleMoodNoteChange = this.handleMoodNoteChange.bind(this)
		this.handleItemAdd = this.handleItemAdd.bind(this)
		this.handleItemSave = this.handleItemSave.bind(this)
		this.handleModalClose = this.handleModalClose.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}

	selectMood(mood) {
		this.setState({ selectedMood: mood })
	}

	handleMoodNoteChange(event) {
		this.setState({ moodNote: event.target.value })
	}

	handleItemAdd() {
		this.setState({ currentModal: <AddItem onClose={this.handleModalClose} onSave={ (itemType) => { this.handleItemSave(itemType) } } /> })
	}

	handleItemSave(itemType) {
		const { items } = this.state
		items.push({
			type: itemType
		})
		this.setState({ items })
	}

	handleModalClose() {
		this.setState({ currentModal: null })
	}

	handleClose() {
		this.setState({ selectedMood: null })
	}

	render() {
		return (
			<Card>
				<div className="entry-today">
					<div className="date-display">
						{getDate()}
						{this.state.selectedMood !== null ?
							<div className="close-today" onClick={this.handleClose}>
								<img src={CloseIcon} alt="close" />
							</div> : null
						}
					</div>
					<div className="mood-selector">
						{this.state.selectedMood === null ?
							moodIcons.map((mood, i) => {
								return (
									<MoodIcon
										key={shortid.generate()}
										onClick={() => { this.selectMood(i) }}
										mood={i}
									/>
								)
							}) :
							<MoodIcon mood={this.state.selectedMood} />
						}

						{this.state.selectedMood !== null ?
							<div className="note-entry">
								<TextArea
									value={this.state.moodNote}
									onChange={this.handleMoodNoteChange}
									placeholder="How was your day?"
								/>
							</div> : null
						}
					</div>

					{this.state.selectedMood !== null ?
						<div className="selected-view">
							<div className="separate-line" />
							<p>Today's Activities</p>

							<div className="item-container">
								{this.state.items.map((item, i) => {
									return (
										<div key={shortid.generate()} className="item">
											<ItemIcon type={item.type} />
										</div>
									)
								})}
								<div className="new-item" onClick={this.handleItemAdd}>+</div>
							</div>
							<div className="save-button">
								<Button active={this.state.moodNote.length >= 3}>Save</Button>
							</div>

							{this.state.currentModal}
						</div> : null
					}
				</div>
			</Card>
		)
	}
}

export default EntryToday
