export const frontEndOrigin =
	process.env.NODE_ENV === 'production'
		? 'https://wzdb-dev-fe.herokuapp.com'
		: process.env.NODE_ENV === 'staging'
		? 'https://wzdb-fe.herokuapp.com'
		: 'http://localhost:3000'
