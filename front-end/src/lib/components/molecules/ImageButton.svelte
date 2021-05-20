<script>
	import { Image, SpokenText } from '$atoms'

	export let src: string
	export let alt: string
	export let name: string
	export let value: string
	export let text: string
</script>

<label>
	<Image {src} {alt} />
	<input {name} {value} type="radio" />
</label>
<SpokenText {text} />
