import React from 'react'
import autosize from "autosize"

import './index.scss'

class TextArea extends React.Component {
	componentDidMount() {
		autosize(this.textarea)
	}

	render() {
		return (
			<textarea ref={c => { this.textarea = c }}  {...this.props} className="text-area" />
		)
	}
}

export default TextArea
