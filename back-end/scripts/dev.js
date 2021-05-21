const config = require('./_baseNccConfig')
const fs = require('fs')
const path = require('path')

const watcher = require('@vercel/ncc')(config.src, {
	...config.base,
	production: false,
	watch: true,
	sourceMap: true,
	sourceMapRegister: false,
})

watcher.handler(({ code, map, err }) => {
	if (err) return console.error(err)
	if (!fs.existsSync(config.distFolder)) fs.mkdirSync(config.distFolder)
	fs.writeFileSync(config.dist, code)
	fs.writeFileSync(path.resolve(config.distFolder, 'index.js.map'), map)
})
