<script context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ page, fetch }) => {
		const step = +page.query.get('step') || 1
		const id = page.query.get('id')
		const res = await fetch(`${page.path}/${step}.json`)
		const data: { content: InstructionsContent; amount: number } = await res.json()

		return {
			props: {
				...data,
				step,
				id,
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
	export let id: string

	let hrefs: InstructionsHrefs
	$: hrefs = {
		previous: step === 1 ? '/dashboard' : `${path}?step=${+step - 1}${id ? `&id=${id}` : ''}`,
		next:
			step === 1
				? [
						{
							path: id ? `/dashboard/letter/${id}/upload` : '/api/letter',
							text: 'Uitleg overslaan',
						},
						{
							path: `${path}?step=${+step + 1}${id ? `&id=${id}` : ''}`,
							text: 'Volgende',
						},
				  ]
				: [
						{
							path: `${path}?step=${+step + 1}${id ? `&id=${id}` : ''}`,
							text: 'Volgende',
						},
				  ],
		finish: id
			? [{ path: `/dashboard/letter/${id}/upload`, text: 'Verder met je brief' }]
			: [{ path: '/api/letter', text: 'Begrepen, upload mijn brief' }],
	}
</script>

<svelte:head>
	<title>Uitleg</title>
</svelte:head>

{#if !content}
	<slot />
{:else}
	<Instructions {hrefs} {step} {content} {amount} />
{/if}
