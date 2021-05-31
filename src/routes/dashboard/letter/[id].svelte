<script context="module">
	export const load: Load = async ({ page }) => {
		const { data } = await client
			.from<definitions['letters']>('letters')
			.select()
			.eq('id', page.params.id)
			.limit(1)
			.single()

		const { body: isUserRole } = await client.rpc<boolean>('is_role', {
			user_id: client.auth.session().user.id,
			u_role: 'user',
		})

		return {
			props: {
				letter: data,
				role: (isUserRole as unknown as boolean) ? 'user' : 'volunteer',
			},
		}
	}
</script>

<script lang="typescript">
	import { ImageInput } from '$atoms'
	import { client } from '$config/supabase'
	import { CarouselPage } from '$templates'
	import type { definitions, Letter } from '$types'
	import type { Load } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	import { v4 as uuid } from 'uuid'

	export let letter: Letter
	export let role: 'user' | 'volunteer'

	let pages: string[] = []
	let selectedPage = 0

	$: console.log(role)

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

<!-- TODO: Make form progressively enhanced -->
{#if role === 'user'}
	<CarouselPage bind:selectedPage bind:pages title="Upload pagina's" backLink="/dashboard">
		<ImageInput slot="empty" on:change={changeHandler} name="page" />
		<svelte:fragment slot="footer-item">
			{#if pages.length}
				<ImageInput on:change={changeHandler} name="page" />
			{/if}
		</svelte:fragment>
	</CarouselPage>
{:else}
	<CarouselPage bind:selectedPage bind:pages title="Brief" backLink="/dashboard">
		<svelte:fragment slot="footer">Hier komt iets</svelte:fragment>
	</CarouselPage>
{/if}
