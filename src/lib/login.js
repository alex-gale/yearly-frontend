import jwtDecode from 'jwt-decode'

const callLoginApi = (username, password, callback) => {
	fetch('http://api.yearly.pro/auth', {
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
				callback(null, data.data.token)
			} else {
				callback(new Error(data.data), null)
			}
		})
}

const isLoggedIn = () => {
	const localStorage = window.localStorage
	if (localStorage.getItem('token')) {
		return true
	}

	return false
}

const decodedToken = () => {
	const token = window.localStorage.getItem('token')
	if (token) {
		return jwtDecode(token)
	}

	return false
}

export {
	callLoginApi,
	isLoggedIn,
	decodedToken
}
