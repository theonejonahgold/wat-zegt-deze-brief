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
	import { AudioRecorder } from '$organisms'
	import { CarouselPage } from '$templates'
	import type { definitions, Letter } from '$types'
	import { client } from '$config/supabase'
	import type { Load } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'

	export let letter: Letter

	let pages: string[] = []
	let selectedPage = 0

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
	<title>Brief</title>
</svelte:head>

<CarouselPage
	bind:selectedPage
	bind:pages
	title="Brief"
	backLink={letter.messages ? `/dashboard/chat/${letter.id}` : '/dashboard/chat'}
>
	<svelte:fragment slot="footer">
		<AudioRecorder letterId={letter.id} on:uploaded={() => goto(`/dashboard/chat/${letter.id}`)} />
	</svelte:fragment>
</CarouselPage>
