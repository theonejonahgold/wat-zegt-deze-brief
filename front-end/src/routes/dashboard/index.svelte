<script>
	import { Help, SpokenText } from '$atoms'
	import { ImageButton } from '$molecules'
	import { LetterCard } from '$organisms'
	import { UserIcon } from '$icons'
	import { Header } from '$templates'
	import type { Letter } from '$types'

	const letters: Letter[] = [
		{
			id: 1,
			time: 1619956234,
			explained: false,
			src: 'image',
			alt: 'alt',
		},
		{
			id: 2,
			time: 1621511434,
			explained: true,
			src: 'image',
			alt: 'alt',
			name: 'Victor',
		},
		{
			id: 3,
			time: 1621864444,
			explained: true,
			src: 'image',
			alt: 'alt',
		},
	]

	const sortedLetters = letters.sort((a, b) => b.time - a.time)
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<Header>
	<SpokenText --align="center" slot="middle" text="Home" />
	<Help slot="right" />
</Header>

<main>
	<ImageButton href="/dashboard/letter" text="Foto maken van je brief">
		<UserIcon />
	</ImageButton>
	<h2>Brieven</h2>
	{#each sortedLetters as letter}
		<LetterCard {letter} />
	{/each}
</main>
