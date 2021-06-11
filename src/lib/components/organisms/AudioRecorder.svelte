<script>
	import { RecordButton } from '$atoms'
	import { uploadMessage } from '$db/messageHandler'

	let recording = false
	let stream: MediaStream
	let recorder: MediaRecorder
	let chunks: Blob[] = []

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
		const file = new File(chunks, 'message.ogg', { type: 'audio/ogg; codecs=opus' })
		uploadMessage(file)
	}
</script>

<RecordButton {recording} on:click={buttonClickHandler} />
