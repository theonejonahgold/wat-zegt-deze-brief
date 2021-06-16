<script context="module">
	export const load: Load = async ({ page }) => {
		const { data } = await client
			.from<definitions['letters']>('letters')
			.select()
			.eq('id', page.params.id)
			.limit(1)
			.single()

		return {
			props: {
				letter: data,
				editing: !!page.query.get('edit'),
			},
		}
	}
</script>

<script>
	import { Help, SpokenText, Back } from '$atoms'
	import { Form } from '$organisms'
	import { client } from '$config/supabase'
	import { Header } from '$templates'
	import type { definitions, Letter } from '$types'
	import type { Load } from '@sveltejs/kit'
	import { format } from 'date-fns'

	export let letter: Letter
	export let editing: boolean
</script>

<svelte:head>
	<title>Deadline</title>
</svelte:head>

<Header sticky>
	<Back
		slot="left"
		href={editing
			? `/dashboard/letter/${letter.id}`
			: `/dashboard/letter/${letter.id}/organisation`}
	/>
	<SpokenText --align="center" slot="middle" text="Deadline" />
	<Help slot="right" />
</Header>
<main>
	<Form
		noEnhance
		action="/api/letter/{letter.id}"
		fields={[
			{
				label: 'Wanneer moet je uiterlijk een reactie geven?',
				name: 'deadline',
				type: 'date',
				autofocus: true,
				initialValue: letter.deadline?.slice(0, 10),
				min: format(new Date(), 'yyyy-MM-dd'),
			},
		]}
		method="POST"
	>
		<svelte:fragment slot="submit">{editing ? 'Wijzigingen opslaan' : 'Volgende'}</svelte:fragment>
	</Form>
</main>
