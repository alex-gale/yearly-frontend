import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'
import Card from '../card'
import CloseIcon from '../../assets/close.svg'

class Modal extends React.Component {
	render() {
		if (!this.props.show) {
			return null
		}

		return (
			<div className="modal-container">
				<Card>
					<div className="title-display">
						{this.props.title}
						<div className="close-modal" onClick={this.props.onClose}>
							<img src={CloseIcon} alt="close" />
						</div>
					</div>
					{this.props.children}
				</Card>
			</div>
		)
	}
}

Modal.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
	show: PropTypes.bool,
	onClose: PropTypes.func.isRequired
}

Modal.defaultProps = {
	title: '',
	children: null,
	show: false
}

export default Modal
