import node from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'
import vhFix from 'postcss-100vh-fix'
import cssnano from 'cssnano'

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
	},
}

export default config
