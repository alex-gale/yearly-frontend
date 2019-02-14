import timeout from './timeout'

const register = (invite, username, email, password, callback) => {
	timeout(10000, fetch('https://api.yearly.pro/users', {
		method: 'PUT',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			invite,
			username,
			email,
			password
		})
	})
		.then(result => { return result.json() })
		.then(data => {
			if (data.success) {
				return callback(null, data.data)
			} else {
				return callback(new Error(data.data), null)
			}
		})
	)
}

const verify = (vhash, callback) => {
	timeout(10000, fetch('https://api.yearly.pro/users/verify', {
		method: 'POST',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			vhash
		})
	})
		.then(result => { return result.json() })
		.then(data => {
			if (data.success) {
				return callback(null, data.data)
			} else {
				return callback(new Error(data.data), null)
			}
		})
	).catch(() => {
		return callback(new Error("Could not connect to database. Please try again later."))
	})
}

export {
	register,
	verify
}
