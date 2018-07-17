import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import './index.scss'
import Modal from '../modal'
import TextInput from '../text-input'
import Button from '../button'
import itemIcons from '../../assets/item-icons'

class ItemEditor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isOpen: true,
			currentType: this.props.type
		}

		this.handleClose = this.handleClose.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleSave = this.handleSave.bind(this)
	}

	handleClose() {
		this.setState({ isOpen: false })
		this.props.onClose()
	}

	handleChange(e) {
		this.setState({ currentType: e.target.value })
	}

	handleDelete() {
		this.props.onDelete()
		this.props.onClose()
	}

	handleSave(e) {
		e.preventDefault()
		this.props.onSave(this.state.currentType.toLowerCase())
		this.handleClose()
	}

	render() {
		return (
			<Modal
				show={this.state.isOpen}
				onClose={this.handleClose}
				title={this.props.editType === 'add' ? "Add Item" : "Edit Item"}
			>
				<div className="add-item-container">
					<form onSubmit={this.handleSave}>
						<TextInput
							required
							autoFocus
							value={this.state.currentType}
							onChange={this.handleChange}
							placeholder="Item Type"
							maxLength="30"
						/>
						<div className="search-area">
							{itemIcons.map((item) => {
								return (
									<div
										key={shortid.generate()}
										className="search-item"
										onClick={() => {this.setState({ currentType: item.type })}}
									>
										<img src={item.icon} />
										{item.type}
									</div>
								)
							})}
						</div>
						<div className="option-buttons">
							{this.props.editType === 'edit' ?
								<Button onClick={this.handleDelete}>Delete</Button> : null
							}
							<Button
								submit
								active={
									this.state.currentType.length <= 30 &&
									this.state.currentType.length > 0}
							>
									Save
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		)
	}
}

ItemEditor.propTypes = {
	onClose: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
	editType: PropTypes.oneOf(['add', 'edit']).isRequired,
	type: PropTypes.string
}

ItemEditor.defaultProps = {
	onDelete: null,
	type: ''
}

export default ItemEditor
