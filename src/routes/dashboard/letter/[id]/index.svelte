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

		if (isUserRole && data.status === 'published')
			return {
				redirect: '/dashboard/letter/waiting',
				status: 303,
			}

		return {
			props: {
				letter: data,
				role: (isUserRole as unknown as boolean) ? 'user' : 'volunteer',
			},
		}
	}
</script>

<script>
	import { Help, SpokenText, Back, Image, Button } from '$atoms'
	import { Form } from '$organisms'
	import { client } from '$config/supabase'
	import { CarouselPage, Header } from '$templates'
	import type { definitions, Letter } from '$types'
	import type { Load } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	import { AudioRecorder } from '$organisms'
	import { volunteerLetter } from '$db/volunteerLetter'
	import { format } from 'date-fns'

	export let letter: Letter
	export let role: 'user' | 'volunteer'

	let pages: string[] = []
	let selectedPage = 0
	let clicked = false

	function handleClick() {
		clicked = true
	}

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
		+ section {
			margin-top: var(--space-xl);
		}

		header {
			margin: 0 0 var(--space-s);
			display: flex;
			justify-content: space-between;
		}

		a {
			color: var(--blue);
			text-decoration: none;
		}

		+ :global(form) {
			position: sticky;
			top: 100%;
			bottom: var(--space-l);
		}
	}
</style>

<svelte:head>
	<title>Afronden</title>
</svelte:head>

{#if role === 'user'}
	<Header sticky shadow>
		<Back slot="left" href="/dashboard/letter/{letter.id}/deadline" />
		<SpokenText --align="center" slot="middle" text="Afronden" />
		<Help slot="right" />
	</Header>
	<main>
		<section>
			<header>
				<h3>Organisatie</h3>
				<a href="/dashboard/letter/{letter.id}/organisation?edit=true">Bewerken</a>
			</header>
			<p>{letter.sender || 'Geen organisatie ingevuld'}</p>
		</section>
		<section>
			<header>
				<h3>Deadline</h3>
				<a href="/dashboard/letter/{letter.id}/deadline?edit=true">Bewerken</a>
			</header>
			<p>
				{letter.deadline
					? format(new Date(letter.deadline), 'dd/MM/yyyy')
					: 'Geen deadline ingevuld'}
			</p>
		</section>
		<section>
			<header>
				<h3>Pagina's</h3>
				<a href="/dashboard/letter/{letter.id}/upload?edit=true">Bewerken</a>
			</header>
			{#if pages.length}
				<ol>
					{#each pages as page}
						<li><Image src={page} alt="Page preview" /></li>
					{/each}
				</ol>
			{:else}
				<p>Upload pagina's van je brief om ze hier te zien.</p>
			{/if}
		</section>
		<Form
			action="/api/letter/{letter.id}?redirect=/dashboard/letter/success"
			fields={[
				{
					type: 'hidden',
					name: 'status',
					initialValue: 'published',
				},
			]}
			noEnhance
			buttonPosition={false}
		>
			<svelte:fragment slot="submit">Opsturen</svelte:fragment>
		</Form>
	</main>
{:else}
	<CarouselPage bind:selectedPage bind:pages title="Brief" backLink="/dashboard">
		<svelte:fragment slot="footer">
			{#if clicked}
				<AudioRecorder />
			{:else}
				<Button on:click|once={() => volunteerLetter(letter.id)} on:click={handleClick}
					>Ik wil deze brief uitleggen</Button
				>
			{/if}
		</svelte:fragment>
	</CarouselPage>
{/if}
