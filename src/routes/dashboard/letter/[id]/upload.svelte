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
				editing: !!page.query.get('edit'),
				skipped: !!page.query.get('skipped'),
			},
		}
	}
</script>

<script>
	import { FileInput, Button, Loader } from '$atoms'
	import { PageList } from '$organisms'
	import { client } from '$config/supabase'
	import { CarouselPage } from '$templates'
	import type { definitions, Letter } from '$types'
	import type { Load } from '@sveltejs/kit'
	import { onMount, tick } from 'svelte'
	import { v4 as uuid } from 'uuid'
	import { checkRole } from '$db/user'

	export let letter: Letter
	export let editing: boolean
	export let skipped: boolean

	let pages: string[] = []
	let pageIDs: string[] = letter.page_order || []
	let selectedPage = 0
	let loading = false

	onMount(() => {
		loading = true
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
						loading = false
						pages = images
					})
			})
	})

	async function changeHandler(e: Event & { currentTarget: HTMLInputElement }) {
		const image = e.currentTarget.files[0]
		if (!image) return
		loading = true

		await tick()

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
						loading = false
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

		await client
			.from<definitions['letters']>('letters')
			// @ts-expect-error: Types are wrong, page_order is an array
			.update({ page_order: pageIDs })
			.eq('id', letter.id)
			.single()
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

<style>
	div {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr calc(1.5 * var(--space-xxxl));
		column-gap: var(--space-s);
		align-items: center;

		:global(:nth-child(2)) {
			justify-self: end;
		}

		:global(ul) {
			grid-column: 1;
		}
	}
</style>

<svelte:head>
	{#if editing}
		<title>Pagina's bewerken</title>
	{:else}
		<title>Upload pagina's</title>
	{/if}
</svelte:head>

<CarouselPage
	bind:selectedPage
	bind:pages
	title={editing ? "Pagina's bewerken" : "Upload pagina's"}
	backLink={editing
		? `/dashboard/letter/${letter.id}`
		: skipped
		? `/dashboard/letter?step=1&id=${letter.id}`
		: `/dashboard/letter?step=4&id=${letter.id}`}
>
	<svelte:component
		this={loading ? Loader : FileInput}
		slot="empty"
		name="page"
		on:change={changeHandler}
	>
		Upload de eerste pagina
	</svelte:component>
	<svelte:fragment slot="footer-full">
		<div>
			<PageList
				on:remove={removeHandler}
				on:move={moveHandler}
				bind:selected={selectedPage}
				bind:pages
			/>
			<svelte:component
				this={loading ? Loader : FileInput}
				slot="empty"
				name="page"
				on:change={changeHandler}
			>
				Pagina
			</svelte:component>
		</div>
		<Button
			href={editing
				? `/dashboard/letter/${letter.id}`
				: `/dashboard/letter/${letter.id}/organisation`}
			>{editing ? 'Wijzigingen opslaan' : "Pagina's opslaan"}</Button
		>
	</svelte:fragment>
</CarouselPage>
