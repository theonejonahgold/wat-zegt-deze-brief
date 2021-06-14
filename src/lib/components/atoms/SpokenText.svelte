<script>
	import { onMount } from 'svelte'
	import { textToSpeech } from '$utils'
	import Icon from './Icon.svelte'
	import { AudioIcon } from '$icons'

	export let text = ''

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
		height: var(--space-l);
		width: var(--space-l);
		padding: calc(var(--space-xxs) / 1.5) 0 0;
	}

	p {
		font-size: var(--space-l);
		text-align: var(--align, initial);
		color: var(--muted);
	}
</style>

{#if !js}
	<p>{text}</p>
{:else}
	<p>
		{text}
		<button type="button" on:click={handleClick}>
			<Icon color="black">
				<AudioIcon {playing} />
			</Icon>
		</button>
	</p>
{/if}
