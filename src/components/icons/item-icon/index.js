import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'
import itemIcons from '../../../assets/item-icons'

const ItemIcon = (props) => {
	const {
		type,
		...rest
	} = props

	const itemObject = itemIcons.filter((icon) => {
		return icon.type === type
	})[0] // [0] because it returns an array

	return (
		<div className="item-icon" {...rest}>
			{itemObject ? <img src={itemObject.icon} alt={type} /> : type.charAt(0)}
			<span className="hover-text">{type}</span>
		</div>
	)
}

ItemIcon.propTypes = {
	type: PropTypes.string
}

ItemIcon.defaultProps = {
	type: ''
}

export default ItemIcon
