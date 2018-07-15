import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import MoodIcon from '../../icons/mood-icon'
import ItemIcon from '../../icons/item-icon'

const DisplayDay = (props) => {
	const day = props.day
	const date = new Date(day.date).toDateString()

	return (
		<div className="display-day">
			<div className="date-display">
				{date}
			</div>
			<div className="day-main">
				<MoodIcon mood={day.mood} />
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
	day: PropTypes.object.isRequired
}

export default DisplayDay
