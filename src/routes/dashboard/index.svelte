<script context="module">
	export const load: Load = async () => {
		const { data } = await listLetters()

		const letters = data
			? (
					await Promise.all(
						data?.map(letter =>
							client.storage
								.from('public')
								.createSignedUrl(`${letter.id}/image.jpeg`, 40)
								.then(({ signedURL }) => ({
									...letter,
									image: signedURL,
								}))
						)
					)
			  ).sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
			: []
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
	import { listLetters } from '$db/letter'
	import { UserIcon } from '$icons'
	import { ImageButton } from '$molecules'
	import { LetterCard } from '$organisms'
	import { Header } from '$templates'
	import type { definitions } from '$types'
	import type { Load } from '@sveltejs/kit'

	export let letters: definitions['letters'][]
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
			{#each letters as letter}
				<li>
					<LetterCard {letter} />
				</li>
			{/each}
		</ul>
	</section>
</main>
