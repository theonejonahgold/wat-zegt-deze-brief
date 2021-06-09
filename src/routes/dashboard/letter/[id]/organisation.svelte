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
	import { Help, SpokenText, Back, DataList } from '$atoms'
	import { Form } from '$organisms'
	import { client } from '$config/supabase'
	import { Header } from '$templates'
	import type { definitions, Letter } from '$types'
	import type { Load } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	import organisations from './_organisations'

	export let letter: Letter

	let pages: string[] = []

	onMount(() => {
		client.storage
			.from('pages')
			.list(`${letter.id}`)
			.then(({ data }) =>
				Promise.all(
					data
						.sort(
							(a, b) =>
								letter.page_order.findIndex(page => page.includes(a.name)) -
								letter.page_order.findIndex(page => page.includes(b.name))
						)
						.map(page => client.storage.from('pages').download(`${letter.id}/${page.name}`))
				)
			)
			.then(results =>
				Promise.all(
					results.map(
						({ data }) =>
							new Promise<string>(resolve => {
								const reader = new FileReader()
								reader.readAsDataURL(data)
								reader.addEventListener('load', e => {
									resolve(e.target.result as string)
								})
							})
					)
				)
			)
			.then(images => {
				pages = images
			})
	})
</script>

<svelte:head>
	<title>Organisatie</title>
</svelte:head>

<Header sticky>
	<Back slot="left" href="/dashboard/letter/{letter.id}/upload" />
	<SpokenText --align="center" slot="middle" text="Organisatie" />
	<Help slot="right" />
</Header>
<main>
	<Form
		noEnhance
		action="/api/letter/{letter.id}"
		fields={[
			{
				label: 'Van welke organisatie komt deze brief?',
				placeholder: 'Bijvoorbeeld Belastingdienst',
				name: 'sender',
				type: 'text',
				autofocus: true,
				list: 'sender',
			},
		]}
		method="POST"
	>
		<DataList id="sender" options={organisations} />
		<svelte:fragment slot="submit">Volgende</svelte:fragment>
	</Form>
</main>
