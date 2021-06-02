<script>
	import { createEventDispatcher } from 'svelte'
	import { IconButton } from '$atoms'
<<<<<<< HEAD:src/lib/components/molecules/RecordAudio.svelte
	import { RecordIcon } from '$icons'
=======
	import { RecordIcon, StopRecordingIcon } from '$icons'
>>>>>>> b25be9b2c31b2516ca66a17d99ef6fa22750544b:src/lib/components/molecules/RecordAudio.svelte

	export let recorder: MediaRecorder
	let chunks: any[] = []
	let clicked = false

	const dispatch = createEventDispatcher()

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
			let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
			chunks = []
			const file = new File([blob], 'message.ogg', { type: 'audio/ogg; codecs=opus' })

			dispatch('message', file)
		}
	}
</script>

{#if clicked}
	<IconButton on:click={stopMedia}><StopRecordingIcon /></IconButton>
{:else}
	<IconButton on:click={recordMedia}><RecordIcon /></IconButton>
{/if}
