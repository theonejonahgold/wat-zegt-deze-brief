const path = require('path')
const pkg = require('../package.json')

const base = {
	externals: new Set(Object.keys(pkg.dependencies)),
}

const src = path.resolve(__dirname, '..', 'src', 'index.ts')

const dist = path.resolve(__dirname, '..', 'dist', 'index.js')
const distFolder = path.resolve(__dirname, '..', 'dist')

module.exports = {
	src,
	dist,
	distFolder,
	base,
}
