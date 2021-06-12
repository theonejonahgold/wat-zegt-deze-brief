<script>
	import { AudioPlayer, IconButton, Loader, RecordButton } from '$atoms'
	import { uploadMessage } from '$db/messageHandler'
	import { DeleteIcon, SendIcon } from '$icons'
	import { tick } from 'svelte'

	let recording = false
	let uploading = false
	let stream: MediaStream
	let recorder: MediaRecorder
	let chunks: Blob[] = []
	let file: File

	async function buttonClickHandler() {
		recording = !recording
		if (recording) {
			stream = await navigator.mediaDevices.getUserMedia({ audio: true })
			recorder = new MediaRecorder(stream)
			recorder.addEventListener('dataavailable', dataAvailableHandler)
			return recorder.start()
		}
		recorder.stop()
		recorder.addEventListener('stop', stopHandler)
		stream.getTracks().forEach(track => track.stop())
	}

	function dataAvailableHandler(e: BlobEvent) {
		chunks = [...chunks, e.data]
	}

	function stopHandler() {
		file = new File(chunks, 'message.ogg', { type: 'audio/ogg; codecs=opus' })
		chunks = []
	}

	async function uploadHandler() {
		uploading = true
		await tick()
		await uploadMessage(file)
		file = undefined
		uploading = false
	}

	function deleteHandler() {
		file = undefined
	}
</script>

<style>
	div {
		display: flex;
		align-items: center;
	}
</style>

{#if !file}
	<RecordButton {recording} on:click={buttonClickHandler} />
{:else}
	<div>
		<IconButton small buttonColor="var(--dark)" on:click={deleteHandler}><DeleteIcon /></IconButton>
		<AudioPlayer {file} />
		{#if !uploading}
			<IconButton small buttonColor="var(--dark)" on:click={uploadHandler}><SendIcon /></IconButton>
		{:else}
			<Loader --size="var(--space-xxl)" />
		{/if}
	</div>
{/if}
