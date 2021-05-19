import express, { json, urlencoded } from 'express'
import router from './router/index.js'

main()

async function main() {
	const app = express()
	const port = process.env.PORT || 5000

	app.use(urlencoded({ extended: true }))
	app.use(json())
	app.use(router)

	app.listen(port, () => console.log(`Listening on port ${port}`))
}
