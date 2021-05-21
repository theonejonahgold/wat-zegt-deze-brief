const fs = require('fs')
const config = require('./_baseNccConfig')

require('@vercel/ncc')(config.src, { ...config.base, minify: true }).then(({ code }) => {
	if (!fs.existsSync(config.distFolder)) fs.mkdirSync(config.distFolder)
	fs.writeFileSync(config.dist, code)
})
