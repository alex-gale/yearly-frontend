import { isLoggedIn, getToken } from './login'
import timeout from './timeout'

const getSettings = (callback) => {
  if (!isLoggedIn()) {
    return callback(new Error("You must be logged in to fetch settings."))
  }

  timeout(10000, fetch('https://api.yearly.pro/users/settings', {
    method: 'GET',
    headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json',
			'x-access-token': getToken()
		}
  })
    .then(result => { return result.json() })
    .then(data => {
      if (data.success) {
        return callback(null, data.data.settings)
      } else {
        return callback(new Error(data.data))
      }
    })
  ).catch(() => {
    return callback(new Error("Could not connect to database. Please try again later."))
  })
}

const saveSettings = (settings, callback) => {
  if (!isLoggedIn()) {
		return callback(new Error("You must be logged in to save a day."))
	}

  timeout(10000, fetch('https://api.yearly.pro/users/settings', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json',
			'x-access-token': getToken()
    },
    body: JSON.stringify({
      settings
    })
  })
    .then(result => { return result.json() })
    .then(data => {
      if (data.success) {
        return callback(null, data.data)
      } else {
        return callback(new Error(data.data))
      }
    })
  ).catch(() => {
    return callback(new Error("Could not connect to database. Please try again later."))
  })
}

export {
  getSettings,
  saveSettings
}
