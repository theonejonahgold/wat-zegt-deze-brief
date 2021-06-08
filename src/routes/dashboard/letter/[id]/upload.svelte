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
	let pageIDs: string[] = letter.page_order || []
	let selectedPage = 0

	onMount(() => {
		client.storage
			.from('pages')
			.list(`${letter.id}`)
			.then(({ data }) => {
				data.sort(
					(a, b) =>
						pageIDs.findIndex(id => id.includes(a.name)) -
						pageIDs.findIndex(id => id.includes(b.name))
				)
				Promise.all(
					data.map(page => client.storage.from('pages').download(`${letter.id}/${page.name}`))
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
	})

	async function changeHandler(e: Event & { currentTarget: HTMLInputElement }) {
		const image = e.currentTarget.files[0]
		if (!image) return

		const id = uuid()
		const mime = image.type.split('/')[1]
		await client.storage.from('pages').upload(`${letter.id}/${id}.${mime}`, image)
		pageIDs.push(`${id}.${mime}`)
		pageIDs = pageIDs

		if (!pages.length) {
			await client
				.from('letters')
				.update({ thumbnail: `${id}.${mime}` })
				.eq('id', letter.id)
		}

		await client
			.from<definitions['letters']>('letters')
			// @ts-expect-error: Types are wrong, page_order is an array
			.update({ page_order: pageIDs })
			.eq('id', letter.id)
			.single()

		setTimeout(() => {
			client.storage
				.from('pages')
				.download(`${letter.id}/${id}.${mime}`)
				.then(({ data }) => {
					const reader = new FileReader()
					reader.readAsDataURL(data)
					reader.addEventListener('load', e => {
						pages.push(e.target.result as string)
						pages = pages
						selectedPage = pages.length - 1
					})
				})
		}, 500)
	}

	async function removeHandler(e: CustomEvent<string>) {
		const index = pages.findIndex(p => p === e.detail)
		const image = pageIDs[index]
		await client.storage.from('pages').remove([`${letter.id}/${image}`])
		pageIDs.splice(index, 1)
		pageIDs = pageIDs
		pages.splice(index, 1)
		pages = pages
		selectedPage = selectedPage >= pages.length ? pages.length - 1 : selectedPage
	}

	async function moveHandler(
		e: CustomEvent<{
			oldIndex: number
			newIndex: number
		}>
	) {
		const { oldIndex, newIndex } = e.detail
		const id = pageIDs[oldIndex]
		pageIDs.splice(oldIndex, 1)
		pageIDs.splice(newIndex, 0, id)
		pageIDs = pageIDs
		const data = pages[oldIndex]
		pages.splice(oldIndex, 1)
		pages.splice(newIndex, 0, data)
		pages = pages

		await client
			.from<definitions['letters']>('letters')
			// @ts-expect-error: Types are wrong, page_order is an array
			.update({ page_order: pageIDs })
			.eq('id', letter.id)
			.single()
	}
</script>

<svelte:head>
	<title>Upload pagina's</title>
</svelte:head>

<CarouselPage
	bind:selectedPage
	bind:pages
	title="Upload pagina's"
	backLink="/dashboard/letter?step=4&id={letter.id}"
>
	<ImageInput slot="empty" on:change={changeHandler} name="page" />
	<svelte:fragment slot="footer">
		<PageList
			on:remove={removeHandler}
			on:move={moveHandler}
			bind:selected={selectedPage}
			bind:pages
		>
			{#if pages.length}
				<ImageInput on:change={changeHandler} name="page" />
			{/if}
		</PageList>
		<Button href="/dashboard/letter/{letter.id}">Pagina's opslaan</Button>
	</svelte:fragment>
</CarouselPage>
