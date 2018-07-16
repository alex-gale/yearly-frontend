import jwtDecode from 'jwt-decode'

const login = (username, password, callback) => {
	fetch('https://api.yearly.pro/auth', {
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
				return callback(new Error(data.data), null)
			}
		})
}

const isLoggedIn = () => {
	const token = window.localStorage.getItem('token')
	if (token) {
		return true
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

export {
	login,
	isLoggedIn,
	getToken,
	getDecodedToken
}
