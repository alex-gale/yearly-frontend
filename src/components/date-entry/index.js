import React from 'react'

import './index.scss'

const DateEntry = (props) => {
	return (
		<input
			type="date"
			className="date-entry"
			placeholder="MM/DD/YYYY"
			{...props}
		/>
	)
}

export default DateEntry
