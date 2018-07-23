import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'
import Modal from '../modal'
import Button from '../button'

class ConfirmModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpen: true
		}
	}

	render() {
		return (
			<Modal
				show={this.state.isOpen}
				title={this.props.title}
				onClose={this.props.onCancel}
			>
				<div className="confirm-modal">
					<p>{this.props.message}</p>

					<div className="options-buttons">
						<Button onClick={this.props.onConfirm}>Confirm</Button>
						<Button onClick={this.props.onCancel}>Cancel</Button>
					</div>
				</div>
			</Modal>
		)
	}
}

ConfirmModal.propTypes = {
	onConfirm: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	title: PropTypes.string,
	message: PropTypes.string
}

ConfirmModal.defaultProps = {
	title: "Confirm",
	message: "Are you sure you want to do this?"
}

export default ConfirmModal
