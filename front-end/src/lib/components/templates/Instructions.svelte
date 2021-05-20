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
	header {
		display: flex;
		align-items: center;
		margin-bottom: var(--space-m);

		> :global {
			:first-child {
				margin-right: var(--space-s);
			}
			:last-child {
				margin-left: var(--space-s);
			}
		}
	}

	main {
		text-align: center;
	}
</style>

<header>
	<Back href={hrefs.previous} />
	<Pagination selected={+step} {amount} />
	<Help />
</header>
<main>
	<!-- TODO: Fix same spoken message after going to next item -->
	<p use:textToSpeech={content.text}>{content.text}</p>
	<Image src={content.image} alt={content.text} />
	{#if step < amount}
		<Button href={hrefs.next}>Volgende</Button>
	{:else if step === amount}
		<Button href={hrefs.finish}>Begrepen!</Button>
	{/if}
</main>
