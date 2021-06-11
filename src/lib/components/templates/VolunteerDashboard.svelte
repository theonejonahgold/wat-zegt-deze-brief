<script>
	import { SpokenText } from '$atoms'
	import { VolunteerLetterCard } from '$organisms'
	import Header from './Header.svelte'
	import type { Letter } from '$types'

	export let letters: Letter[]
</script>

<style>
	ul {
		list-style: none;
		padding: 0;
		display: grid;
		row-gap: var(--space-s);
		margin-top: var(--space-xxs);
	}

	.empty {
		:global(p) {
			font-size: var(--font-m);
			margin-top: var(--space-xl);
		}
	}
</style>

<Header>
	<SpokenText --align="center" slot="middle" text="Brieven" />
	<p slot="right">filter</p>
</Header>
<main>
	<section class:empty={!letters.length}>
		{#if letters.length}
			<ul>
				{#each letters as letter (letter.id)}
					<li>
						<VolunteerLetterCard {letter} />
					</li>
				{/each}
			</ul>
		{:else}
			<SpokenText text="Er zijn geen mensen meer om te helpen, kom later terug!" --align="center" />
		{/if}
	</section>
</main>
