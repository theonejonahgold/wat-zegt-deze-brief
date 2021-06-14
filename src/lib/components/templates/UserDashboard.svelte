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
		margin: var(--space-xl) 0 var(--space-s);
	}

	ul {
		list-style: none;
		padding: 0;
		display: grid;
		row-gap: var(--space-s);
		margin-top: var(--space-xxs);
	}

	section {
		:global(div:first-child p) {
			margin-top: var(--space-l);
			margin-bottom: var(--space-m);
		}
	}

	.empty {
		:global(div:last-child p) {
			font-size: var(--font-m);
			margin-top: var(--space-xl);
		}
	}
</style>

<Header>
	<SpokenText --align="center" slot="middle" text="Home" />
	<Help slot="right" />
</Header>
<main>
	<ImageButton href="/dashboard/letter" text="Nieuwe brief opsturen">
		<UserIcon />
	</ImageButton>
	<hr />
	<section class:empty={!letters.length}>
		<SpokenText text="Jouw brieven" --align="center" />
		{#if letters.length}
			<ul>
				{#each letters as letter (letter.id)}
					<li>
						<UserLetterCard {letter} />
					</li>
				{/each}
			</ul>
		{:else}
			<SpokenText
				text="Je hebt nog geen brieven ingestuurd, klik op de knop hierboven om je eerste brief in te sturen."
				--align="center"
			/>
		{/if}
	</section>
</main>
