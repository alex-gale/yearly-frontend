import React from 'react'
import shortid from 'shortid'

import './index.scss'
import Card from '../../components/card'
import EntryToday from '../../components/entry-today'
import MoodIcon from '../../components/icons/mood-icon'
import ItemIcon from '../../components/icons/item-icon'

const tempData = {
	success: true,
	data: [
		{
			date: '2018-06-14 16:32:48.752',
			mood: 3,
			note: 'This is test data. It must be at least two lines long to test the text wrap capabilities of this item.',
			items: [
				'programming',
				'gaming'
			]
		},
		{
			date: '2018-06-13 16:32:48.752',
			mood: 4,
			note: 'This is another test data, but it is in the past.',
			items: [
				'gaming',
				'holy things'
			]
		}
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

					return (
						<Card key={shortid.generate()}>
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
								{day.items.map((item) => {
									return (
										<ItemIcon key={shortid.generate()} type={item} />
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
