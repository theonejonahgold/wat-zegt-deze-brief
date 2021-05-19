<script>
	import { Button, Image, SpokenText } from '$atoms'

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
