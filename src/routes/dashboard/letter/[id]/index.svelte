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

<script>
	import { Help, SpokenText, Back, Image, DataList } from '$atoms'
	import { Form } from '$organisms'
	import { client } from '$config/supabase'
	import { CarouselPage, Header } from '$templates'
	import type { definitions, Letter } from '$types'
	import type { Load } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	import organisations from './_organisations'

	export let letter: Letter
	export let role: 'user' | 'volunteer'

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
</script>

<style lang="scss">
	ol {
		display: grid;
		grid-template-columns: 1fr 1fr;
		list-style: none;
		padding: 0;
		gap: var(--space-m);
	}

	li {
		:global(img) {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	section {
		margin-top: var(--space-xl);
		header {
			margin-top: var(--space-m);
			display: flex;
			justify-content: space-between;
		}

		a {
			color: var(--blue);
			text-decoration: none;
		}
	}

	hr {
		margin-bottom: var(--space-m);
	}
</style>

<svelte:head>
	<title>Afronden</title>
</svelte:head>

{#if role === 'user'}
	<Header sticky>
		<Back slot="left" href="/dashboard/letter/{letter.id}/upload" />
		<SpokenText --align="center" slot="middle" text="Afronden" />
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
					required: true,
					list: 'sender',
				},
			]}
			method="POST"
		>
			<DataList id="sender" options={organisations} />
			<section>
				<header>
					<h3>Pagina's</h3>
					<a href="/dashboard/letter/{letter.id}/upload">Bewerken</a>
				</header>
				<hr />
				{#if pages.length}
					<ol>
						{#each pages as page}
							<li><Image src={page} alt="Page preview" shadow={true} /></li>
						{/each}
					</ol>
				{:else}
					<p>Upload pagina's van je brief om ze hier te zien.</p>
				{/if}
			</section>
			<svelte:fragment slot="submit">Brief versturen</svelte:fragment>
		</Form>
	</main>
{:else}
	<CarouselPage bind:selectedPage bind:pages title="Brief" backLink="/dashboard">
		<svelte:fragment slot="footer">Hier komt iets</svelte:fragment>
	</CarouselPage>
{/if}
