import { isLoggedIn, getToken } from './login'
import timeout from './timeout'

const saveDay = (day, callback) => {
	if (!isLoggedIn()) {
		return callback(new Error("You must be logged in to save a day."))
	}

	timeout(10000, fetch('https://api.yearly.pro/days', {
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
	).catch(() => {
		return callback(new Error("Could not connect to database. Please try again later."))
	})
}

const deleteDay = (date, callback) => {
	if (!isLoggedIn()) {
		return callback(new Error("You must be logged in to delete a day."))
	}

	timeout(10000, fetch ('https://api.yearly.pro/days', {
		method: 'DELETE',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json',
			'x-access-token': getToken()
		},
		body: JSON.stringify({
			date
		})
	})
		.then(result => { return result.json() })
		.then(data => {
			if (data.success) {
				callback(null, data.data)
			} else {
				return callback(new Error(data.data))
			}
		})
	).catch(() => {
		return callback(new Error("Could not connect to database. Please try again later."))
	})
}

const getDays = (callback) => {
	if (!isLoggedIn()) {
		return callback(new Error("You must be logged in to get a day."))
	}

	timeout(10000, fetch('https://api.yearly.pro/days', {
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
				return callback(null, data.data.days)
			} else {
				return callback(new Error(data.data))
			}
		})
	).catch(() => {
		return callback(new Error("Could not connect to database. Please try again later."))
	})
}

const getToday = (callback) => {
	if (!isLoggedIn()) {
		return callback(new Error("You must be logged in to get a day."))
	}

	timeout(10000, fetch('https://api.yearly.pro/days/today', {
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
				return callback(null, data.data.day)
			} else {
				return callback(new Error(data.data))
			}
		})
	).catch((err) => {
		console.log(err)
		return callback(new Error("Could not connect to database. Please try again later."))
	})
}

export {
	saveDay,
	deleteDay,
	getDays,
	getToday
}
