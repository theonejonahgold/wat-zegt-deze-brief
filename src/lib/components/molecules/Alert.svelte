<script>
	import { createEventDispatcher } from 'svelte'
	import { Button, Image, Help, SpokenText } from '$atoms'

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
	<SpokenText text="" />
	<Image {src} {alt} />
	<Button on:click={buttonClickHandler}>Oke</Button>
</div>
