<script>
	import { createEventDispatcher } from 'svelte'
	import { Button, Image, Help } from '$atoms'
	import { textToSpeech } from '$actions'

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

<div>
	<Help on:click />
	<p use:textToSpeech><slot /></p>
	<Image {src} {alt} />
	<Button on:click={buttonClickHandler}>Oke</Button>
</div>
