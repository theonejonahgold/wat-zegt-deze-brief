<script>
	import type { InstructionsContent, InstructionsHrefs } from '$types'
	import { Button, Image, Back, Help, SpokenText } from '$atoms'
	import { Pagination } from '$molecules'
	import Flex from './Flex.svelte'
	import Header from './Header.svelte'

	export let step: number
	export let content: InstructionsContent
	export let amount: number
	export let hrefs: InstructionsHrefs
</script>

<style>
	div {
		width: 100%;
	}

	.image-container {
		background: var(--secondary);
		border-radius: var(--border-radius);
		padding: var(--space-xxl);

		:global(img) {
			width: 100%;
			max-height: 14em;
			object-fit: contain;
		}
	}
</style>

<Header>
	<Back slot="left" href={hrefs.previous} />
	<Pagination slot="middle" selected={+step} {amount} />
	<Help slot="right" />
</Header>
<Flex --textAlign="center">
	<SpokenText --align="center" text={content.text} />
	<div class="image-container">
		<Image src={content.image} alt={content.text} />
	</div>
	{#if step < amount}
		<Button href={hrefs.next.path}>{hrefs.next.text}</Button>
	{:else if step === amount}
		<div class="button-container">
			{#each hrefs.finish as href, i}
				<Button invert={hrefs.finish.length > 1 && i === 0} href={href.path}>{href.text}</Button>
			{/each}
		</div>
	{/if}
</Flex>
