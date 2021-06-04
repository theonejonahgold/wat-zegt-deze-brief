<script>
	import { Help, SpokenText } from '$atoms'
	import { ImageButton } from '$molecules'
	import { UserLetterCard } from '$organisms'
	import Header from './Header.svelte'
	import { UserIcon } from '$icons'
	import type { Letter } from '$types'

	export let letters: Letter[]
</script>

<style>
	hr {
		margin: var(--space-s) 0;
	}

	ul {
		list-style: none;
		padding: 0;
		display: grid;
		row-gap: var(--space-s);
		margin-top: var(--space-xxs);
	}
</style>

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
					<UserLetterCard {letter} />
				</li>
			{/each}
		</ul>
	</section>
</main>
