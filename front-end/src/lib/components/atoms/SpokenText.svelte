<script>
	import { onDestroy, onMount } from 'svelte'

	export let audioFile: HTMLAudioElement

	let isPlaying: boolean

	onMount(() => {
		audioFile.addEventListener('play', updatePlayingState)
		audioFile.addEventListener('pause', updatePlayingState)
		audioFile.addEventListener('ended', updatePlayingState)
	})

	onDestroy(() => {
		audioFile.removeEventListener('play', updatePlayingState)
		audioFile.removeEventListener('pause', updatePlayingState)
		audioFile.removeEventListener('ended', updatePlayingState)
	})

	const updatePlayingState = (e: Event) => (isPlaying = e.type === 'play')

	const handlePlayback = () => {
		if (!isPlaying) return audioFile.play()
		audioFile.pause()
		audioFile.currentTime = 0
	}
</script>

<p>
	<slot />
	<button on:click={handlePlayback}>
		<!-- svelte-ignore a11y-missing-attribute -->
		<img src={isPlaying ? '' : ''} aria-hidden="true" />
	</button>
</p>
