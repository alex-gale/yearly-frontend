import React from 'react'
import shortid from 'shortid'

import './index.scss'
import Card from '../card'
import TextArea from '../text-area'
import Button from '../button'
import CloseIcon from '../../assets/close.svg'
import moodIcons from '../../assets/mood-icons'

const getDate = () => {
	const date = new Date()
	return date.toDateString()
}

class EntryToday extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedMood: null,
			moodIcon: null,
			items: []
		}

		this.selectMood = this.selectMood.bind(this)
		this.handleItemAdd = this.handleItemAdd.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}

	selectMood(mood) {
		const moodIcon = mood !== null ? moodIcons.filter((icon) => {
			return icon.mood === mood
		})[0] : null

		this.setState({ selectedMood: mood, moodIcon: moodIcon.icon })
	}

	handleItemAdd() {
		const { items } = this.state
		items.push(emptyItem)
		this.setState({ items })
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
									<div key={shortid.generate()} className={`mood mood-${i}`} onClick={() => { this.selectMood(i) }} title={mood.name}>
										<img src={mood.icon} />
									</div>
								)
							}) :
							<div className={`mood mood-${this.state.selectedMood}`}>
								<img src={this.state.moodIcon} />
							</div>
						}

						{this.state.selectedMood !== null ?
							<div className="note-entry">
								<TextArea placeholder="How was your day?" />
							</div> : null
						}
					</div>

					{this.state.selectedMood !== null ?
						<div className="selected-view">
							<div className="separate-line" />

							<div className="item-container">
								{this.state.items.map(() => {
									return (
										<div key={shortid.generate()} className="item">
											<div className="item-icon" />
											<TextArea placeholder="Notes" />
										</div>
									)
								})}
							</div>
							<div className="new-item" onClick={this.handleItemAdd}>+</div>
							<div className="save-button">
								<Button>Save</Button>
							</div>
						</div> : null
					}
				</div>
			</Card>
		)
	}
}

export default EntryToday
