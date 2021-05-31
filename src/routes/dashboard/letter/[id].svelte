<script context="module">
	export const load: Load = async ({ page }) => {
		const res = await client.rpc('is_in_letter', {
			uid: client.auth.session().user.id,
			letter_id: page.params.id,
		})

		const letterId = page.params.id

		if (res.body.length ? !res.body[0] : !res.body)
			return {
				status: 303,
				redirect: '/dashboard',
			}

		return {
			props: {
				letterId,
			},
		}
	}
</script>

<script>
	import { ImageInput } from '$atoms'
	import { client } from '$config/supabase'
	import { CarouselPage } from '$templates'
	import type { Load } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	import { v4 as uuid } from 'uuid'

	export let letterId: string

	let pages: string[] = []
	let selectedPage = 0

	$: console.log(pages.length)

	onMount(() => {
		client.storage
			.from('pages')
			.list(`${letterId}`)
			.then(({ data }) =>
				Promise.all(
					data.map(page => client.storage.from('pages').download(`${letterId}/${page.name}`))
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
		await client.storage.from('pages').upload(`${letterId}/${id}.${mime}`, image)

		setTimeout(() => {
			client.storage
				.from('pages')
				.download(`${letterId}/${id}.${mime}`)
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

<!-- TODO: Make form progressively enhanced -->
<CarouselPage bind:selectedPage bind:pages title="Upload pagina's" backLink="/dashboard">
	<ImageInput slot="empty" on:change={changeHandler} name="page" />
	<svelte:fragment slot="footer-item">
		{#if pages.length}
			<ImageInput on:change={changeHandler} name="page" />
		{/if}
	</svelte:fragment>
</CarouselPage>
