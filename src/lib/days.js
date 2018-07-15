import { isLoggedIn, getToken } from './login'

const saveDay = (day, callback) => {
	if (!isLoggedIn()) {
		return callback(new Error("You must be logged in to save a day."))
	}

	fetch('http://api.yearly.pro/days', {
		method: 'PUT',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json',
			'x-access-token': getToken()
		},
		body: JSON.stringify(day)
	})
		.then(result => { return result.json() })
		.then(data => {
			if (data.success) {
				return callback(null, data.data)
			} else {
				return callback(new Error(data.data))
			}
		})
}

const getDays = (callback) => {
	if (!isLoggedIn()) {
		return callback(new Error("You must be logged in to get a day."))
	}

	fetch('http://api.yearly.pro/days', {
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
				callback(null, data.data.days)
			} else {
				callback(new Error(data.data))
			}
		})
}

const getToday = (callback) => {
	if (!isLoggedIn()) {
		return callback(new Error("You must be logged in to get a day."))
	}

	fetch('http://api.yearly.pro/days/today', {
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
				callback(null, data.data)
			} else {
				callback(new Error(data.data))
			}
		})
}

export {
	saveDay,
	getDays,
	getToday
}
