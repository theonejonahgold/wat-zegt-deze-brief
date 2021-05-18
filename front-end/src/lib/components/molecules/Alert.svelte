<script>
	import Button from '$atoms/Button.svelte'
	import Image from '$atoms/Image.svelte'
	import SpokenText from '$atoms/SpokenText.svelte'
	import Help from '$atoms/Help.svelte'

	export let audioFile: HTMLAudioElement
	export let src: string
	export let alt: string
</script>

<div>
	<Help />
	<SpokenText {audioFile} />
	<Image {src} {alt} />
	<Button on:click>Oke</Button>
</div>
