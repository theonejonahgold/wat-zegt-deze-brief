import { resolve } from 'path'
import node from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'
import vhFix from 'postcss-100vh-fix'
import cssnano from 'cssnano'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const tsConfig = require('./tsconfig.json')

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: {
			plugins: [autoprefixer(), vhFix(), cssnano()],
		},
		defaults: {
			script: 'typescript',
			style: 'scss',
		},
	}),
	kit: {
		target: '#svelte',
		adapter: node(),
		vite: config => ({
			...config,
			mode: process.env.NODE_ENV || 'development',
			resolve: {
				alias: Object.entries(tsConfig.compilerOptions.paths).reduce(
					(acc, [alias, path]) => ({
						...acc,
						[alias.replace('/*', '')]: resolve(import.meta.url, `/${path[0].replace('/*', '')}`),
					}),
					{}
				),
			},
		}),
	},
}

export default config
