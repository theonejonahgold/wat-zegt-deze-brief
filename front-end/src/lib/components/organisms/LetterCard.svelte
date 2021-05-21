<script>
	import { IconButton, Image } from '$atoms'
	import { textToSpeech } from '$actions'

	export let time: number
	export let name: string
</script>

<div>
	<div>
		<Image />
		<div>
			<p>{time}</p>
			<p>{name}</p>
			<p>Gesproken bericht</p>
		</div>
	</div>
	<div>
		<p use:textToSpeech>
			<slot />
		</p>
		<IconButton />
	</div>
</div>
