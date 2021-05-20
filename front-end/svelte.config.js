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
		markupTagName: 'markup',
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
			resolve: {
				alias: Object.entries(tsConfig.compilerOptions.paths).reduce(
					(acc, [alias, path]) => ({
						...acc,
						[alias]: resolve(import.meta.url, `/${path}`),
					}),
					{}
				),
			},
		}),
	},
}

export default config
