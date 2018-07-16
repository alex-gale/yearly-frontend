import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const Card = (props) => {
	return (
		<div className="card">
			{props.children}
		</div>
	)
}

Card.propTypes = {
	children: PropTypes.node
}

Card.defaultProps = {
	children: null
}

export default Card
