import React from 'react'
import shortid from 'shortid'

import './index.scss'
import Card from '../../components/card'
import EntryToday from '../../components/entry-today'
import itemIcons from '../../assets/item-icons'
import moodIcons from '../../assets/mood-icons'

const tempData = {
	success: true,
	data: [
		
	]
}

const days = tempData.data

const Dashboard = () => {
	return (
		<div className="dash-content">
			<h1>Today</h1>
			<EntryToday />

			<div className="separate-line" />
			<h1>Previous Days</h1>
			{days.length > 0 ?
				days.map((day) => {
					const date = new Date(day.date).toDateString()
					const moodIcon = moodIcons.filter((icon) => {
						return icon.mood === day.mood
					})[0] // [0] because it returns an array

					return (
						<Card key={shortid.generate()}>
							<div className="date-display">
								{date}
							</div>
							<div className="day-main">
								<div className={`mood mood-${day.mood}`}>
									<img src={moodIcon.icon} />
								</div>
								<p className="day-note">{day.note}</p>
							</div>

							<div className="separate-line" />
							<div className="day-items">
								{day.items.map((item) => {
									const itemIcon = itemIcons.filter((icon) => {
										return icon.type === item.type
									})[0] // [0] because it returns an array

									return (
										<div key={shortid.generate()} className="item">
											<div className="item-icon" title={item.type}>{itemIcon && <img src={itemIcon.icon} alt={item.type} />}</div>
											<p>{item.note}</p>
										</div>
									)
								})}
							</div>
						</Card>
					)
				}) :
				<h2>No content could be loaded.</h2>
			}
		</div>
	)
}

export default Dashboard
