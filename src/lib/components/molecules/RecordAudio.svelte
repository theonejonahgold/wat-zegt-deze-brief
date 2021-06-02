<script>
	import { createEventDispatcher } from 'svelte'
	import { IconButton } from '$atoms'
	import { RecordIcon } from '$icons'

	export let recorder: MediaRecorder
	let chunks: any[] = []
	let clicked = false

	const dispatch = createEventDispatcher()

	function recordMedia() {
		clicked = !clicked
		recorder.start()
		console.log(recorder.state)

		recorder.ondataavailable = (e: BlobEvent) => {
			chunks.push(e.data)
		}
	}

	function stopMedia() {
		clicked = !clicked
		recorder.stop()
		console.log(recorder.state)

		recorder.onstop = () => {
			let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
			chunks = []
			console.log(blob)
			const file = new File([blob], 'message.ogg', { type: 'audio/ogg; codecs=opus' })

			dispatch('message', file)
		}
	}
</script>

{#if clicked}
	<IconButton on:click={stopMedia}><RecordIcon /></IconButton>
{:else}
	<IconButton on:click={recordMedia}><RecordIcon /></IconButton>
{/if}
