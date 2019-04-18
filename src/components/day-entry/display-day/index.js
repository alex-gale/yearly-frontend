import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import subYears from 'date-fns/sub_years'
import isBefore from 'date-fns/is_before'
import format from 'date-fns/format'

import EditIcon from '../../../assets/edit.svg'
import MoodIcon from '../../icons/mood-icon'
import ItemIcon from '../../icons/item-icon'

const getDate = (date = new Date()) => {
	const yearAgo = subYears(new Date(), 1)
	const dateFormat = isBefore(date, yearAgo) ? 'Do MMM YYYY' : 'dddd Do MMM'

	return format(date, dateFormat)
}

const DisplayDay = (props) => {
	const day = Object.assign({}, props.day)
	const date = getDate(new Date(day.date))

	if (props.search !== '') {
		const parts = day.note.split(new RegExp(`(${props.search})`, 'gi'))
		day.note = parts.map((part) => {
			return part.toLowerCase() === props.search.toLowerCase() ?
				<span key={shortid.generate()} className="highlighted">{part}</span> :
				part
		})
	}

	return (
		<div className="display-day">
			<div className="date-display">
				{date}
				{props.editable &&
					<div className="manage-buttons">
						<div className="edit-entry" onClick={props.onEdit}>
							<img src={EditIcon} alt="Edit" title="Edit" />
						</div>
					</div>
				}
			</div>
			<div className="day-main">
				<MoodIcon mood={day.mood} selectable={false} />
				<p className="day-note">{day.note}</p>
			</div>

			<div className="separate-line" />
			<p className="activities">Activities</p>

			<div className="day-items">
				{day.items.length > 0 ?
					day.items.map((item) => {
						return (
							<div key={shortid.generate()} className="item">
								<ItemIcon key={shortid.generate()} type={item} />
							</div>
						)
					}) :
					<p>No activities</p>
				}
			</div>
		</div>
	)
}

DisplayDay.propTypes = {
	day: PropTypes.object.isRequired,
	onEdit: PropTypes.func,
	editable: PropTypes.bool.isRequired,
	search : PropTypes.string.isRequired
}

DisplayDay.defaultProps = {
	onEdit: null
}

export default DisplayDay
