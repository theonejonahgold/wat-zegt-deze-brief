<script>
	import { Help, SpokenText } from '$atoms'
	import { ArchiveIcon, LetterIcon, UserIcon } from '$icons'
	import { ImageButton } from '$molecules'
	import { UserLetterCard } from '$organisms'
	import type { Letter } from '$types'
	import Header from './Header.svelte'
	import NavBar from './NavBar.svelte'

	export let letters: Letter[]
</script>

<style>
	hr {
		margin: var(--space-xl) 0 var(--space-s);
	}

	ul {
		list-style: none;
		padding: 0;
		display: grid;
		row-gap: var(--space-l);
		margin-top: var(--space-xxs);
	}

	section {
		:global(div:first-child p) {
			margin-top: var(--space-l);
			margin-bottom: var(--space-m);
		}
	}
</style>

<Header>
	<SpokenText --align="center" slot="middle" text="Home" />
	<Help slot="right" />
</Header>
<main>
	<ImageButton
		href="/dashboard/letter"
		text={letters.length ? 'Nieuwe brief opsturen' : 'Stuur hier je eerste brief op'}
	>
		<UserIcon />
	</ImageButton>
	{#if letters.length}
		<hr />
		<section>
			<SpokenText text="Jouw brieven" --align="center" />
			<ul>
				{#each letters as letter (letter.id)}
					<li>
						<UserLetterCard {letter} />
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</main>
<NavBar
	links={[
		{
			href: '/dashboard/archive',
			icon: ArchiveIcon,
		},
		{
			href: '/dashboard',
			icon: LetterIcon,
		},
	]}
/>
