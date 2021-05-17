<script>
	import Button from '$atoms/Button.svelte'
	import Image from '$atoms/Image.svelte'
	import SpokenText from '$atoms/SpokenText.svelte'

	export let src: string
	export let alt: string
	export let audioFile: HTMLAudioElement
</script>

<Button on:click>
	<Image {src} {alt} />
</Button>
<SpokenText {audioFile}>
	<slot />
</SpokenText>
