import jwtDecode from 'jwt-decode'

import timeout from './timeout'

const login = (username, password, callback) => {
	timeout(10000, fetch('https://api.yearly.pro/auth', {
		method: 'POST',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username,
			password
		})
	})
		.then(result => { return result.json() })
		.then(data => {
			if (data.success) {
				return callback(null, data.data.token)
			} else {
				return callback(new Error(data.data))
			}
		})
	).catch(() => {
		return callback(new Error("Could not connect to database. Please try again later."))
	})
}

const isLoggedIn = () => {
	const token = window.localStorage.getItem('token')
	if (token) {
		try {
			jwtDecode(token)
			return true
		} catch(err) {
			return false
		}
	}

	return false
}

const getToken = () => {
	const token = window.localStorage.getItem('token')
	if (token) {
		return token
	}

	return false
}

const getDecodedToken = () => {
	const token = window.localStorage.getItem('token')
	if (token) {
		return jwtDecode(token)
	}

	return false
}

const validateToken = (token, callback) => {
	fetch('https://api.yearly.pro/auth/validate', {
		method: 'POST',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			token
		})
	})
		.then(result => { return result.json() })
		.then(data => {
			if (data.success) {
				return callback(true)
			} else {
				return callback(false)
			}
		})
}

export {
	login,
	isLoggedIn,
	getToken,
	getDecodedToken,
	validateToken
}
