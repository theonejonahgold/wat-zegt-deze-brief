<script>
	import { browser } from '$app/env'

	let recorder: MediaRecorder
	let src: string
	let chunks: any[] = []
	let clicked = false

	if (browser) {
		navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
			recorder = new MediaRecorder(stream)
		})
	}

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

			if (window) {
				const audioURL = window.URL.createObjectURL(blob)
				src = audioURL
			}
		}
	}
</script>

{#if clicked}
	<button on:click={stopMedia} {src}>Stop</button>
{:else}
	<button on:click={recordMedia} {src}>Record</button>
{/if}

<article>
	<audio controls {src} />
</article>
