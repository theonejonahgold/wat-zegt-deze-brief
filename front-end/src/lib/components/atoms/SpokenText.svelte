<script>
	import { onMount } from 'svelte'
	import { textToSpeech } from '$utils'
	import { Icon } from '$atoms'
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
		cursor: pointer;
	}
</style>

{#if !js}
	<p>{text}</p>
{:else}
	<p>
		{text}
		<button on:click={handleClick}>
			<Icon color="black">
				<AudioIcon {playing} />
			</Icon>
		</button>
	</p>
{/if}
