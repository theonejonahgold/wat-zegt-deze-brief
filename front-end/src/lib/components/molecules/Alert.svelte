<script>
	import { createEventDispatcher } from 'svelte'
	import { Button, Image, SpokenText, Help } from '$atoms'

	export let audioFile: HTMLAudioElement
	export let src: string
	export let alt: string

	const dispatch =
		createEventDispatcher<{
			close: null | undefined
		}>()

	function buttonClickHandler() {
		dispatch('close')
	}
</script>

<!-- TODO: how to properly handle multiple on:clicks? -->
<div>
	<Help on:click />
	<SpokenText {audioFile} />
	<Image {src} {alt} />
	<Button on:click={buttonClickHandler}>Oke</Button>
</div>
