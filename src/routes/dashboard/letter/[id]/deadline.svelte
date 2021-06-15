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

	export let letter: Letter
</script>

<svelte:head>
	<title>Deadline</title>
</svelte:head>

<Header sticky>
	<Back slot="left" href="/dashboard/letter/{letter.id}/upload" />
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
			},
		]}
		method="POST"
	>
		<svelte:fragment slot="submit">Volgende</svelte:fragment>
	</Form>
</main>
