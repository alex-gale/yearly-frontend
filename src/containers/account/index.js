import React from 'react'
import nprogress from 'nprogress'

import './index.scss'
import LoadingIcon from '../../components/loading-icon'
import Checkbox from '../../components/checkbox'
import Card from '../../components/card'
import Button from '../../components/button'
import { isLoggedIn } from '../../lib/login'
import { getSettings, saveSettings } from '../../lib/settings'

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingSettings: true,
      settings: {},
      savedSettings: {},
      message: "",
			error: ""
    }

    if (!isLoggedIn()) {
      this.props.history.push('/login')
    }

    this.updateCheckValue = this.updateCheckValue.bind(this)
    this.handleSave = this.handleSave.bind(this)

    nprogress.start()
  }

  componentDidMount() {
    nprogress.done()

    getSettings((err, settings) => {
      if (err) {
        return this.setState({ loadingSettings: false, error: err.message })
      } else {
        this.setState({ settings, savedSettings: settings, loadingSettings: false })
      }
    })
  }

  updateCheckValue(e) {
    let settings = { ...this.state.settings }
    settings[e.target.name] = e.target.checked
    this.setState({ settings })
  }

  handleSave(e) {
    const settings = { ...this.state.settings }
    this.setState({ message: '', pending: true })

    saveSettings(settings, (err) => {
      this.setState({ pending: false })
      if (err) return this.setState({ message: err.message })

      this.setState({ message: "Settings saved.", savedSettings: settings })
    })
  }

  render() {
    return (
      <div className="content account-content">
        <h1>My Account</h1>

        {this.state.loadingSettings ?
          <LoadingIcon /> :
					this.state.error.length > 0 ?
						<h2 className="error-message">{this.state.error}</h2> :
	          <Card>
	            <h1>Account Settings</h1>
	            <div className="separate-line" />

	            <div className="account-setting">
	              <Checkbox name="editing" text="Allow previous entry editing" onChange={this.updateCheckValue} checked={this.state.settings.editing} />
	            </div>

	            <div className="save-area">
	              <p className="input-message">{this.state.message}</p>
	              {this.state.pending &&
									<LoadingIcon mini />
								}
	              <Button
	                active={
	                  !this.state.pending &&
	                  JSON.stringify(this.state.settings) !== JSON.stringify(this.state.savedSettings)
	                }
	                onClick={this.handleSave}
	              >
	                Save
	              </Button>
	            </div>
	          </Card>
        }
      </div>
    )
  }
}

export default Account
