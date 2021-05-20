<script>
	import type { InstructionsContent, InstructionsHrefs } from '$types'
	import { textToSpeech } from '$actions'
	import { Button, Image, Back, Help } from '$atoms'
	import { Pagination } from '$molecules'

	export let step: number
	export let content: InstructionsContent
	export let amount: number
	export let hrefs: InstructionsHrefs
</script>

<style>
	.top-container {
		display: flex;
	}

	.content-container {
		text-align: center;
	}
</style>

<div class="top-container">
	<Back href={hrefs.previous} />
	<Pagination selected={+step} {amount} />
	<Help />
</div>
<div class="content-container">
	<!-- TODO: Fix same spoken message after going to next item -->
	<p use:textToSpeech={content.text}>{content.text}</p>
	<Image src={content.image} alt={content.text} />
	{#if step < amount}
		<Button href={hrefs.next}>Volgende</Button>
	{:else if step === amount}
		<Button href={hrefs.finish}>Begrepen!</Button>
	{/if}
</div>
