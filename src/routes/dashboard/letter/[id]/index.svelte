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
	import { Help, SpokenText, Back, Image, Button, DataList } from '$atoms'
	import { Form } from '$organisms'
	import { client } from '$config/supabase'
	import { CarouselPage, Header } from '$templates'
	import type { definitions, Letter } from '$types'
	import type { Load } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	import { volunteerLetter } from '$db/volunteerLetter'
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
		<Back slot="left" href="/dashboard/letter/{letter.id}/organisation" />
		<SpokenText --align="center" slot="middle" text="Afronden" />
		<Help slot="right" />
	</Header>
	<main>
		<section>
			<header>
				<h3>Organisatie</h3>
				<a href="/dashboard/letter/{letter.id}/organisation?edit=true">Bewerken</a>
			</header>
			<hr />
			<p>{letter.sender}</p>
		</section>
		<section>
			<header>
				<h3>Pagina's</h3>
				<a href="/dashboard/letter/{letter.id}/upload?edit=true">Bewerken</a>
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
		<Button>HIER AFRONDEN</Button>
	</main>
{:else}
	<CarouselPage bind:selectedPage bind:pages title="Brief" backLink="/dashboard">
		<svelte:fragment slot="footer">
			<Button on:click|once={() => volunteerLetter(letter.id)}>Ik wil deze brief uitleggen</Button>
		</svelte:fragment>
	</CarouselPage>
{/if}
