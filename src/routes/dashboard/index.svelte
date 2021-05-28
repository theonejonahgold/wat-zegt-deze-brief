<script context="module">
	export const load: Load = async () => {
		const { data } = await client.from<definitions['letters']>('letters').select(`
			id,
			resolved,
			sender,
			createdAt,
			volunteer:volunteer_id ( name ),
			status,
			messages (
				sender:sender_id ( name ),
				content,
				type,
				date
			)
		`)
		const letters = (
			await Promise.all(
				data.map(letter =>
					client.storage
						.from('public')
						.createSignedUrl(`${letter.id}.png`, 40)
						.then(({ signedURL }) => ({
							...letter,
							image: signedURL,
						}))
				)
			)
		).sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
		return {
			props: {
				letters,
			},
		}
	}
</script>

<script>
	import { Help, SpokenText } from '$atoms'
	import { client } from '$config/supabase'
	import { UserIcon } from '$icons'
	import { ImageButton } from '$molecules'
	import { LetterCard } from '$organisms'
	import { Header } from '$templates'
	import type { Letter } from '$types'

	import type { Load } from '@sveltejs/kit'

	export let letters: Letter[]
</script>

<style>
	hr {
		margin: var(--space-m) 0;
	}

	ul {
		list-style: none;
		padding: 0;
		display: grid;
		row-gap: var(--space-m);
		margin-top: var(--space-xs);
	}
</style>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<Header>
	<SpokenText --align="center" slot="middle" text="Jouw brieven" />
	<Help slot="right" />
</Header>
<main>
	<ImageButton href="/dashboard/letter" text="Nieuwe brief opsturen">
		<UserIcon />
	</ImageButton>
	<hr />
	<section>
		<SpokenText text="Brieven" --align="center" />
		<ul>
			{#each letters as letter (letter.id)}
				<li>
					<LetterCard {letter} />
				</li>
			{/each}
		</ul>
	</section>
</main>
