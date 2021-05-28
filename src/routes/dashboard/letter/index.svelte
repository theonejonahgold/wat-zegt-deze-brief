<script context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ page, fetch }) => {
		const step = +page.query.get('step') || 1
		const letterId = page.query.get('id')
		const res = await fetch(`${page.path}/${step}.json`)
		const data: { content: InstructionsContent; amount: number } = await res.json()

		return {
			props: {
				...data,
				letterId,
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
	export let letterId: string

	let hrefs: InstructionsHrefs
	$: hrefs = {
		previous:
			step === 1
				? letterId
					? `/dashboard/letter/${letterId}`
					: '/dashboard'
				: `${path}?step=${+step - 1}`,
		next: {
			path: `${path}?step=${+step + 1}${letterId ? `&id=${letterId}` : ''}`,
			text: 'Volgende',
		},
		finish: letterId
			? [{ path: `/dashboard/letter/${letterId}`, text: 'Begrepen!' }]
			: [{ path: '/api/letter', text: 'Begrepen!' }],
	}
</script>

{#if !content}
	<slot />
{:else}
	<Instructions {hrefs} {step} {content} {amount} />
{/if}
