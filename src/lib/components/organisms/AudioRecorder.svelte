<script>
	import { AudioPlayer, IconButton, Loader, RecordButton } from '$atoms'
	import { uploadMessage } from '$db/messageHandler'
	import { DeleteIcon, SendIcon } from '$icons'
	import { createEventDispatcher, onMount, tick } from 'svelte'

	export let letterId: string

	let recording = false
	let uploading = false
	let stream: MediaStream
	let recorder: MediaRecorder
	let chunks: Blob[] = []
	let file: File

	let encoderWorker: any
	let OggOpusWasm: any
	let WebMOpusWasm: any

	const dispatch = createEventDispatcher<{
		uploaded: undefined
	}>()

	onMount(async () => {
		const OpusRecorder = (await import('opus-media-recorder/OpusMediaRecorder.js')).default
		encoderWorker = (await import('web-worker:opus-media-recorder/encoderWorker.umd.js')).default
		OggOpusWasm = (await import('opus-media-recorder/OggOpusEncoder.wasm')).default
		WebMOpusWasm = (await import('opus-media-recorder/WebMOpusEncoder.wasm')).default
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
		await uploadMessage(file, letterId)
		file = undefined
		uploading = false
		dispatch('uploaded')
	}

	function deleteHandler() {
		file = undefined
	}
</script>

<style lang="scss">
	.player-container {
		display: flex;
		align-items: center;
	}

	.audio-recorder {
		margin: 0 auto;
		display: flex;
		justify-content: center;
	}
</style>

<div class="audio-recorder">
	{#if !file}
		<RecordButton {recording} on:click={buttonClickHandler} />
	{:else}
		<div class="player-container">
			<IconButton small buttonColor="var(--dark)" on:click={deleteHandler}>
				<DeleteIcon />
			</IconButton>
			<AudioPlayer {file} />
			{#if !uploading}
				<IconButton small buttonColor="var(--dark)" on:click={uploadHandler}>
					<SendIcon />
				</IconButton>
			{:else}
				<Loader --size="var(--space-xxl)" />
			{/if}
		</div>
	{/if}
</div>
