<script>
	import { Image } from '$atoms'
	import { webSpeech } from '$actions'

	export let src: string
	export let alt: string
	export let name: string
	export let value: string
</script>

<label>
	<Image {src} {alt} />
	<input {name} {value} type="radio" />
</label>
<p use:webSpeech>
	<slot />
</p>
