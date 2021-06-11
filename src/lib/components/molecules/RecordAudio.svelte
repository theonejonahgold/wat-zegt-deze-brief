<script>
	import { createEventDispatcher } from 'svelte'
	import { IconButton } from '$atoms'
	import { RecordIcon, StopRecordingIcon } from '$icons'

	export let recorder: MediaRecorder
	let chunks: Blob[] = []
	let clicked = false

	const dispatch = createEventDispatcher<{
		message: File
	}>()
  
	function recordMedia() {
		clicked = !clicked
		recorder.start()

		recorder.ondataavailable = (e: BlobEvent) => {
			chunks.push(e.data)
		}
	}

	function stopMedia() {
		clicked = !clicked
		recorder.stop()

		recorder.onstop = () => {
			const file = new File(chunks, 'message.ogg', { type: 'audio/ogg; codecs=opus' })
			dispatch('message', file)
		}
	}
</script>

{#if clicked}
	<IconButton on:click={stopMedia}><StopRecordingIcon /></IconButton>
{:else}
	<IconButton on:click={recordMedia}><RecordIcon /></IconButton>
{/if}
