<script>
	import { Image } from '$atoms'

	export let src: string
	export let alt: string = ''
</script>

<div>
	<Image {src} {alt} />
</div>
