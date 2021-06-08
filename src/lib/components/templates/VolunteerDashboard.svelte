<script>
	import { SpokenText } from '$atoms'
	import { VolunteerLetterCard } from '$organisms'
	import Header from './Header.svelte'
	import type { Letter } from '$types'
	import { client } from '$config/supabase'

	export let letters: Letter[]

	let userId: any = client.auth.session().user.id
</script>

<style>
	ul {
		list-style: none;
		padding: 0;
		display: grid;
		row-gap: var(--space-s);
		margin-top: var(--space-xxs);
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
					<VolunteerLetterCard {letter} {userId} />
				</li>
			{/each}
		</ul>
	</section>
</main>
