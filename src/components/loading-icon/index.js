import React from 'react'

import './index.scss'

const LoadingIcon = (props) => {
	if (props.mini) {
		return (
			<div className="loading-icon-mini" />
		)
	} else {
		return (
			<div className="loading-icon">
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
				<div />
			</div>
		)
	}
}

export default LoadingIcon
