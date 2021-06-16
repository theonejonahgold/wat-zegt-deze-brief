<script>
	import { AudioPlayer, IconButton, Loader, RecordButton } from '$atoms'
	import { uploadMessage } from '$db/messageHandler'
	import { DeleteIcon, SendIcon } from '$icons'
	import { onMount, tick } from 'svelte'
	import encoderWorker from 'web-worker:opus-media-recorder/encoderWorker.umd.js'
	import OggOpusWasm from 'opus-media-recorder/OggOpusEncoder.wasm'
	import WebMOpusWasm from 'opus-media-recorder/WebMOpusEncoder.wasm'

	let recording = false
	let uploading = false
	let stream: MediaStream
	let recorder: MediaRecorder
	let chunks: Blob[] = []
	let file: File

	onMount(async () => {
		if (window.MediaRecorder?.isTypeSupported('audio/ogg;codecs=opus')) return

		const { default: OpusRecorder } = await import('opus-media-recorder')
		window.MediaRecorder = OpusRecorder
	})

	async function buttonClickHandler() {
		recording = !recording
		if (recording) {
			stream = await navigator.mediaDevices.getUserMedia({ audio: true })
			recorder = new (<any>MediaRecorder)(
				stream,
				{},
				{
					encoderWorkerFactory: () => {
						return new encoderWorker()
					},
					OggOpusEncoderWasmPath: OggOpusWasm,
					WebMOpusEncoderWasmPath: WebMOpusWasm,
				}
			)
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
