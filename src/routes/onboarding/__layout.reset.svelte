<script context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ page, fetch }) => {
		if (page.path === '/onboarding') return {}
		if (!page.path.endsWith('/user') && !page.path.endsWith('/volunteer')) return {}

		const step = +page.query.get('step')
		if (!step) return {}
		const res = await fetch(`${page.path}/${step}.json`)
		const data: { content: InstructionsContent; amount: number } = await res.json()

		return {
			props: {
				...data,
				step,
				path: page.path,
			},
		}
	}
</script>

<script>
	import { Instructions } from '$templates'
	import type { InstructionsContent, InstructionsHrefs } from '$types'

	export let step: number
	export let content: InstructionsContent
	export let amount: number
	export let path: string
	let hrefs: InstructionsHrefs
	$: hrefs = {
		previous: step === 1 ? '/onboarding' : `${path}?step=${+step - 1}`,
		next: { path: `${path}?step=${+step + 1}`, text: 'Volgende' },
		finish: path?.endsWith('/user')
			? [
					{ path: `${path}/register`, text: 'Nee' },
					{ path: `${path}/languages`, text: 'Ja' },
			  ]
			: [{ path: `${path}/register`, text: 'Begrepen!' }],
	}
</script>

{#if !content}
	<slot />
{:else}
	<Instructions {hrefs} {step} {content} {amount} {path} />
{/if}
