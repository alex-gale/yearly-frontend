import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'
import Modal from '../modal'
import TextInput from '../text-input'
import Button from '../button'

class AddItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpen: true,
			currentType: ''
		}

		this.handleClose = this.handleClose.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSave = this.handleSave.bind(this)
	}

	handleClose() {
		this.setState({ isOpen: false })
		this.props.onClose()
	}

	handleChange(e) {
		this.setState({ currentType: e.target.value })
	}

	handleSave(e) {
		e.preventDefault()
		this.props.onSave(this.state.currentType.toLowerCase())
		this.handleClose()
	}

	render() {
		return (
			<Modal show={this.state.isOpen} onClose={this.handleClose} title="Add Item">
				<div className="add-item-container">
					<form onSubmit={this.handleSave}>
						<TextInput
							required
							autoFocus
							value={this.state.currentType}
							onChange={this.handleChange}
							placeholder="Item Type"
						/>
						<Button submit>Save</Button>
					</form>
				</div>
			</Modal>
		)
	}
}

AddItem.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired
}

export default AddItem
