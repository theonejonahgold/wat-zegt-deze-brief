<script>
	import { browser } from '$app/env'

	let recorder: MediaRecorder
	let src: HTMLAudioElement
	let chunks: any[] = []

	if (browser) {
		navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
			recorder = new MediaRecorder(stream)
		})
	}

	function recordMedia() {
		recorder.start()
		console.log(recorder.state)

		recorder.ondataavailable = (e: BlobEvent) => {
			chunks.push(e.data)
		}

		recorder.onstop = () => {
			let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
			chunks = []
			console.log(blob)

			if (window) {
				const audioURL = window.URL.createObjectURL(blob)
				src = audioURL
			}
		}
	}

	function stopMedia() {
		recorder.stop()
		console.log(recorder.state)
	}
</script>

<button on:click={recordMedia}>Record</button>
<button on:click={stopMedia}>Stop</button>

<article>
	<audio controls {src} />
</article>
