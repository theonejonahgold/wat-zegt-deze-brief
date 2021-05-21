<script>
	import type { InstructionsContent, InstructionsHrefs } from '$types'
	import { Button, Image, Back, Help, SpokenText } from '$atoms'
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
				flex-shrink: 0;
				margin-right: var(--space-s);
			}

			:last-child {
				flex-shrink: 0;
				margin-left: var(--space-s);
			}
		}
	}

	main {
		text-align: center;

		:global(img) {
			margin: var(--space-l) 0;
		}
	}
</style>

<header>
	<Back href={hrefs.previous} />
	<Pagination selected={+step} {amount} />
	<Help />
</header>
<main>
	<SpokenText text={content.text} />
	<Image src={content.image} alt={content.text} />
	{#if step < amount}
		<Button href={hrefs.next}>Volgende</Button>
	{:else if step === amount}
		<Button href={hrefs.finish}>Begrepen!</Button>
	{/if}
</main>
