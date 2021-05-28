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
	:global(img) {
		width: auto;
		height: 14em;
	}

	div {
		width: 100%;
	}
</style>

<Header>
	<Back slot="left" href={hrefs.previous} />
	<Pagination slot="middle" selected={+step} {amount} />
	<Help slot="right" />
</Header>
<Flex --textAlign="center">
	<SpokenText --align="center" text={content.text} />
	<Image src={content.image} alt={content.text} />
	{#if step < amount}
		<Button href={hrefs.next.path}>{hrefs.next.text}</Button>
	{:else if step === amount}
		<div>
			{#each hrefs.finish as href}
				<Button href={href.path}>{href.text}</Button>
			{/each}
		</div>
	{/if}
</Flex>
