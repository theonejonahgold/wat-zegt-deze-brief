<script>
	import { textToSpeech } from '$utils'

	export let text = ''
	let playing = false

	const handleClick = () => {
		if (playing) return
		playing = true
		textToSpeech(text, () => {
			playing = false
		})
	}
</script>

<style>
	button {
		text-decoration: none;
		appearance: none;
		display: block;
		background: var(--secondary);
		font-family: var(--font-family);
		color: var(--dark);
		width: var(--space-xl);
		height: var(--space-xl);
		line-height: 1em;
		text-align: center;
		font-size: var(--font-s);
		padding: 0;
		font-weight: 700;
		border: 1px solid var(--dark);
		border-radius: 50%;
	}

	a {
		line-height: 1.3em;
	}
</style>

{#if text}
	<button id="help" on:click={handleClick} aria-label="Leg dit scherm uit">?</button>
{:else}
	<button id="help" on:click aria-label="Leg dit scherm uit">?</button>
{/if}
