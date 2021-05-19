import express, { json, urlencoded } from 'express'
import cors from 'cors'
import router from '$router'
import { frontEndOrigin } from './config/env.js'

main()

async function main() {
	const app = express()
	const port = process.env.PORT || 5000

	app.use(
		cors({
			origin: frontEndOrigin,
			methods: ['GET', 'POST', 'HEAD', 'OPTION'],
			credentials: true,
			allowedHeaders: ['Accept', 'Content-Type', 'Authentication'],
		})
	)
	app.use(urlencoded({ extended: true }))
	app.use(json())
	app.use(router)

	app.listen(port, () => console.log(`Listening on port ${port}`))
}
