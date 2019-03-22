import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'
import moodIcons from '../../../assets/mood-icons'

const MoodIcon = (props) => {
	const {
		mood,
		selectable,
		...rest
	} = props

	const moodObject = moodIcons.filter((icon) => {
		return icon.mood === mood
	})[0] // [0] because it returns an array

	return (
		<div className={`mood mood-${mood} ${selectable ? 'selectable' : null}`} title={moodObject.name} {...rest}>
			<img src={moodObject.icon} alt={moodObject.name} />
		</div>
	)
}

MoodIcon.propTypes = {
	mood: PropTypes.number.isRequired,
	selectable: PropTypes.bool
}

MoodIcon.defaultProps = {
	selectable: true
}

export default MoodIcon
