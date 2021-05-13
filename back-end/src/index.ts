import express from 'express'

main()

async function main() {
	const app = express()
	const port = process.env.PORT || 5000

	app.get('/', (_, res) => res.send('hoi!'))

	app.listen(port, () => console.log(`Listening on port ${port}`))
}
