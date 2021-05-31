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
		row-gap: var(--space-m);
		margin-top: var(--space-xs);
	}
</style>

<Header>
	<SpokenText --align="center" slot="middle" text="Brieven" />
	<p slot="right">filter</p>
</Header>
<main>
	<section>
		<ul>
			{#each letters as letter (letter.id)}
				<li>
					<VolunteerLetterCard {letter} />
				</li>
			{/each}
		</ul>
	</section>
</main>
