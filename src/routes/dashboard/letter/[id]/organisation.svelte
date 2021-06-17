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
	import { Help, SpokenText, Back, DataList } from '$atoms'
	import { Form } from '$organisms'
	import { client } from '$config/supabase'
	import { Header } from '$templates'
	import type { definitions, Letter } from '$types'
	import type { Load } from '@sveltejs/kit'
	import organisations from './_organisations'

	export let letter: Letter
	export let editing: boolean
</script>

<svelte:head>
	<title>Organisatie</title>
</svelte:head>

<Header sticky>
	<Back
		slot="left"
		href={editing ? `/dashboard/letter/${letter.id}` : `/dashboard/letter/${letter.id}/upload`}
	/>
	<SpokenText --align="center" slot="middle" text="Organisatie" />
	<Help slot="right" />
</Header>
<main>
	<Form
		noEnhance
		action="/api/letter/{letter.id}{editing
			? '?editing=true'
			: `?redirect=/dashboard/letter/${letter.id}/deadline`}"
		fields={[
			{
				label: 'Van welke organisatie komt deze brief?',
				placeholder: 'Bijvoorbeeld Belastingdienst',
				name: 'sender',
				type: 'text',
				autofocus: true,
				list: 'sender',
				initialValue: letter.sender,
			},
			{
				name: 'route',
				type: 'hidden',
				initialValue: 'senderRoute',
			},
		]}
		method="POST"
	>
		<DataList id="sender" options={organisations} />
		<svelte:fragment slot="submit">{editing ? 'Wijzigingen opslaan' : 'Volgende'}</svelte:fragment>
	</Form>
</main>
