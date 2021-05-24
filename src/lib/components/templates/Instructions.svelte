<script>
	import type { InstructionsContent, InstructionsHrefs } from '$types'
	import { Button, Image, Back, Help, SpokenText } from '$atoms'
	import { Pagination } from '$molecules'
	import Header from './Header.svelte'

	export let step: number
	export let content: InstructionsContent
	export let amount: number
	export let hrefs: InstructionsHrefs
</script>

<style>
	main {
		text-align: center;

		:global(img) {
			margin: var(--space-l) 0;
		}
	}
</style>

<Header>
	<Back slot="left" href={hrefs.previous} />
	<Pagination slot="middle" selected={+step} {amount} />
	<Help slot="right" />
</Header>
<main>
	<SpokenText --align="center" text={content.text} />
	<Image src={content.image} alt={content.text} />
	{#if step < amount}
		<Button href={hrefs.next}>Volgende</Button>
	{:else if step === amount}
		<Button href={hrefs.finish}>Begrepen!</Button>
	{/if}
</main>
