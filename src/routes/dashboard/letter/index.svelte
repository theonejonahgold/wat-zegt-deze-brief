<script context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ page, fetch }) => {
		const step = +page.query.get('step') || 1
		const id = page.query.get('id')
		const res = await fetch(`${page.path}/${step}.json`)
		const data: { content: InstructionsContent; amount: number } = await res.json()
		const { body } = await client
			.from<definitions['onboardings']>('onboardings')
			.select(
				`
				letter_onboarding
		`
			)
			.eq('user_id', client.auth.session().user.id)
			.single()

		return {
			props: {
				...data,
				step,
				id,
				path: page.path,
				canSkip: body.letter_onboarding,
			},
		}
	}
</script>

<script>
	import { Instructions } from '$templates'
	import type { definitions, InstructionsContent, InstructionsHrefs } from '$types'
	import { client } from '$config/supabase'

	export let step: number
	export let content: InstructionsContent
	export let amount: number
	export let path: string
	export let id: string
	export let canSkip = false

	let hrefs: InstructionsHrefs
	$: hrefs = {
		previous: step === 1 ? '/dashboard' : `${path}?step=${+step - 1}${id ? `&id=${id}` : ''}`,
		next:
			step === 1 && canSkip
				? [
						{
							path: id
								? `/dashboard/letter/${id}/upload?skipped=true`
								: '/api/onboarding/letter?skipped=true',
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
			: [
					{
						path: '/api/onboarding/letter',
						text: 'Begrepen, upload mijn brief',
					},
			  ],
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
