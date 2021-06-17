<script>
	import { onMount } from 'svelte'
	import { textToSpeech } from '$utils'
	import Icon from './Icon.svelte'
	import { AudioIcon } from '$icons'

	export let text = ''
	export let small = false

	let playing = false
	let js = false

	onMount(() => (js = true))

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
		border: none;
		background: none;
		height: var(--space-m);
		width: var(--space-m);
		padding: calc(var(--space-xxs) / 1.5) 0 0;
	}

	p {
		font-size: var(--font-m);
		text-align: var(--align, initial);
		color: var(--muted);
	}

	.small {
		font-size: var(--font-m);
	}
</style>

{#if !js}
	<p class:small>{text}</p>
{:else}
	<p class:small>
		{text}
		<button type="button" on:click={handleClick}>
			<Icon color="black">
				<AudioIcon {playing} />
			</Icon>
		</button>
	</p>
{/if}
