<script context="module">
	export const load: Load = async ({ page }) => {
		const letter = await fetchSingleLetter(page.params.id)

		const { body: role } = await client
			.rpc<string>('get_user_role', {
				user_id: client.auth.session().user.id,
			})
			.single()

		if (role === 'user' && letter.status === 'published')
			return {
				redirect: '/dashboard/letter/waiting',
				status: 303,
			}

		return {
			props: {
				letter,
				role,
			},
		}
	}
</script>

<script lang="typescript">
	import { Help, SpokenText, Back, Image, Button } from '$atoms'
	import { client } from '$config/supabase'
	import { CarouselPage, Flex, Header } from '$templates'
	import type { Letter } from '$types'
	import type { Load } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	import { AudioRecorder, Form } from '$organisms'
	import { format } from 'date-fns'
	import { fetchSingleLetter } from '$db/letter'
	import { goto } from '$app/navigation'

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
		width: 100%;
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

		+ form {
			margin-top: auto;
			width: 100%;
			position: sticky;
			bottom: var(--space-xl);
		}
	}
</style>

<svelte:head>
	<title>{role === 'user' ? 'Afronden' : 'Brief'}</title>
</svelte:head>

{#if role === 'user'}
	<Header sticky>
		<Back slot="left" href="/dashboard/letter/{letter.id}/deadline" />
		<SpokenText --align="center" slot="middle" text="Afronden" />
		<Help slot="right" />
	</Header>
	<Flex --justify="stretch" pt="var(--space-l)">
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
					? format(new Date(letter.deadline), 'dd-MM-yyyy')
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
		<form action="/api/letter/{letter.id}?redirect=/dashboard/letter/success" method="POST">
			<input type="hidden" name="status" value="published" />
			<Button>Opsturen</Button>
		</form>
	</Flex>
{:else}
	<CarouselPage bind:selectedPage bind:pages title="Brief" backLink="/dashboard">
		<svelte:fragment slot="footer">
			{#if letter.volunteer}
				<AudioRecorder
					letterId={letter.id}
					on:uploaded={() => goto(`/dashboard/chat/${letter.id}`)}
				/>
			{:else}
				<Form
					action="/api/letter/assign"
					fields={[
						{
							type: 'hidden',
							name: 'id',
							initialValue: letter.id,
						},
					]}
					on:success={() => {
						goto(`/dashboard/letter/${letter.id}/pages`)
					}}
					buttonPosition={false}
				>
					<svelte:fragment slot="submit">Ik wil deze brief uitleggen</svelte:fragment>
				</Form>
			{/if}
		</svelte:fragment>
	</CarouselPage>
{/if}
