<script>
	import { Button, Image, SpokenText, Help } from '$atoms'

	export let audioFile: HTMLAudioElement
	export let src: string
	export let alt: string
</script>

<!-- TODO: how to properly handle multiple on:clicks? -->
<div>
	<Help on:click />
	<SpokenText {audioFile} />
	<Image {src} {alt} />
	<Button on:click>Oke</Button>
</div>
