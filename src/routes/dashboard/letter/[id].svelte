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
	import type { Load } from '@sveltejs/kit'
	import { client } from '$config/supabase'
	import { Help, SpokenText, ImageInput, Back } from '$atoms'
	import { Header } from '$templates'
	import { Carousel, PageList } from '$organisms'
	import { onMount } from 'svelte'
	import { v4 as uuid } from 'uuid'

	export let letterId: string

	let pages: string[] = []
	let selectedPage = 0

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

	function pageSelectedHandler(e: CustomEvent<number>) {
		selectedPage = e.detail
	}

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

<style lang="scss">
	main {
		:global {
			label:nth-child(1) {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}

	footer {
		box-shadow: var(--bs-up);
		padding-top: var(--space-m);
		width: 100%;
		overflow-x: scroll;
	}
</style>

<!-- TODO: Make form progressively enhanced -->
<Header>
	<Back href="/dashboard" slot="left" />
	<SpokenText --align="center" slot="middle" text="Upload pagina's" />
	<a href="/dashboard/letter?id={letterId}">
		<Help slot="right" />
	</a>
</Header>
<main>
	{#if pages.length}
		<Carousel {pages} bind:selected={selectedPage} />
	{:else}
		<ImageInput on:change={changeHandler} name="page" />
	{/if}
</main>
<footer>
	<PageList bind:selected={selectedPage} on:page-select={pageSelectedHandler} {pages}>
		{#if pages.length}
			<ImageInput on:change={changeHandler} />
		{/if}
	</PageList>
</footer>
