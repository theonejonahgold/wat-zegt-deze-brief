<script context="module">
	export const load: Load = async ({ page }) => {
		const { data } = await client
			.from<definitions['letters']>('letters')
			.select()
			.eq('id', page.params.id)
			.limit(1)
			.single()

		const role = await checkRole()

		if (role !== 'user') {
			return {
				redirect: '/dashboard',
				status: 302,
			}
		}

		return {
			props: {
				letter: data,
			},
		}
	}
</script>

<script>
	import { ImageInput, Button } from '$atoms'
	import { PageList } from '$organisms'
	import { client } from '$config/supabase'
	import { CarouselPage } from '$templates'
	import type { definitions, Letter } from '$types'
	import type { Load } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	import { v4 as uuid } from 'uuid'
	import { checkRole } from '$db/user'

	export let letter: Letter

	let pages: string[] = []
	let selectedPage = 0

	onMount(() => {
		client.storage
			.from('pages')
			.list(`${letter.id}`)
			.then(({ data }) =>
				Promise.all(
					data.map(page => client.storage.from('pages').download(`${letter.id}/${page.name}`))
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

	async function changeHandler(e: Event & { currentTarget: HTMLInputElement }) {
		const image = e.currentTarget.files[0]
		if (!image) return

		const id = uuid()
		const mime = image.type.split('/')[1]
		await client.storage.from('pages').upload(`${letter.id}/${id}.${mime}`, image)

		setTimeout(() => {
			client.storage
				.from('pages')
				.download(`${letter.id}/${id}.${mime}`)
				.then(({ data }) => {
					const reader = new FileReader()
					reader.readAsDataURL(data)
					reader.addEventListener('load', e => {
						pages.unshift(e.target.result as string)
						pages = pages
						selectedPage = 0
					})
				})
		}, 500)
	}
</script>

<CarouselPage
	bind:selectedPage
	bind:pages
	title="Upload pagina's"
	backLink="/dashboard/letter?step=4&id={letter.id}"
>
	<ImageInput slot="empty" on:change={changeHandler} name="page" />
	<svelte:fragment slot="footer">
		<PageList bind:selected={selectedPage} {pages}>
			{#if pages.length}
				<ImageInput on:change={changeHandler} name="page" />
			{/if}
		</PageList>
		<Button href="/dashboard/letter/{letter.id}">Verder</Button>
	</svelte:fragment>
</CarouselPage>
