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
		line-height: 1;
		border: none;
		cursor: pointer;
		background: none;
		height: var(--space-m);
		width: var(--space-m);
		padding: 0;
		margin-left: var(--space-xs);
	}

	p {
		text-align: var(--align, initial);
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
