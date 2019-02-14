import React from 'react'
import PropTypes from 'prop-types'
import nprogress from 'nprogress'
import { Link } from 'react-router-dom'

import './index.scss'
import Card from '../../components/card'
import LoadingIcon from '../../components/loading-icon'
import { isLoggedIn } from '../../lib/login'
import { verify } from '../../lib/register'

class Verify extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			vhash: this.props.match.params.vhash,
			loading: true,
			message: "",
			success: false
		}

		if (isLoggedIn()) {
			this.props.history.push('/dashboard')
		}

		nprogress.start()
	}

	componentDidMount() {
		nprogress.done()

		if (this.state.vhash) {
			verify(this.state.vhash, (err) => {
				if (err) {
					return this.setState({ message: err.message, loading: false, success: false })
				} else {
					this.setState({ message: "Your account has successfully been verified.", loading: false , success: true })
				}
			})
		} else {
			this.setState({ loading: false, message: "Please provide a verification hash." })
		}
	}

	render() {
		return (
			<div className="content verify-content">
				{this.state.loading ?
					 <LoadingIcon /> :
					 <Card>
						<h1>{this.state.success ? "Success" : "Error"}</h1>
						<div className="separate-line" />

						<p>{this.state.message}</p>
						{this.state.success &&
							<p>Click <Link to="/login">here</Link> to login!</p>
						}
					</Card>
				}
			</div>
		)
	}
}

Verify.propTypes = {
	history: PropTypes.object.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			vhash: PropTypes.string
		})
	})
}

export default Verify
