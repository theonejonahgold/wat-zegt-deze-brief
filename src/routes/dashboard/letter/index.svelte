<script context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ page, fetch }) => {
		const step = +page.query.get('step') || 1
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
		previous: step === 1 ? '/dashboard' : `${path}?step=${+step - 1}`,
		next: `${path}?step=${+step + 1}`,
		finish: '/api/letter',
	}
</script>

{#if !content}
	<slot />
{:else}
	<Instructions {hrefs} {step} {content} {amount} />
{/if}
