import { resolve } from 'path'
import node from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'
import vhFix from 'postcss-100vh-fix'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const tsConfig = require('./tsconfig.json')
import webWorkerLoader from 'rollup-plugin-web-worker-loader'
import wasm from '@rollup/plugin-wasm'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: {
			plugins: [vhFix(), autoprefixer()],
		},
		defaults: {
			script: 'typescript',
			style: 'scss',
		},
	}),
	kit: {
		target: '#svelte',
		adapter: node(),
		vite: () => ({
			plugins: [webWorkerLoader(), wasm()],
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
