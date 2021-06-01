<script>
	import { createEventDispatcher } from 'svelte'

	export let recorder: MediaRecorder
	let src: string
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

			dispatch('message', blob)
		}
	}
</script>

{#if clicked}
	<button on:click={stopMedia} {src}>Stop</button>
{:else}
	<button on:click={recordMedia} {src}>Record</button>
{/if}
