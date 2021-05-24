<script>
	import { Help, SpokenText } from '$atoms'
	import { ImageButton } from '$molecules'
	import { LetterCard } from '$organisms'
	import { UserIcon } from '$icons'
	import { Header } from '$templates'
	import type { Letter } from '$types'

	const letters: Letter[] = [
		{
			id: 'alksdjfklashdfkuahsdfiuas',
			src: 'image',
			alt: 'alt',
			resolved: false,
			read: false,
			sender: 'De Key',
			createdAt: 1619956200,
			explainer: {
				id: 'alsdfhjalskdfaosfj',
				name: 'Jonah',
			},
			chat: {
				id: 'askldhfjlaksdfa',
				participants: ['alsdfhjalskdfaosfj', 'alsdfjalkdfjas'],
				messages: [
					{
						content: 'dingen',
						type: 'text',
						sender: {
							id: 'alsdfhjalskdfaosfj',
							name: 'Jonah',
						},
						id: 'ajsdhfhdgfidu',
						date: 1619956234,
					},
				],
			},
		},
	]

	const sortedLetters = letters.sort((a, b) => b.chat.messages[0].date - a.chat.messages[0].date)
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
			{#each sortedLetters as letter}
				<LetterCard {letter} />
			{/each}
		</ul>
	</section>
</main>
