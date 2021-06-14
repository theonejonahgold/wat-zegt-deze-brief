<script>
	import { onMount, tick } from 'svelte'
	import decode from 'audio-decode'
	import { bufferToWave } from '$utils'

	export let file: Blob
	let paused = true
	let currentTime = 0
	let duration = 0
	let src: string
	let audio: HTMLAudioElement

	onMount(async () => {
		try {
			const buffer: AudioBuffer = await decode(file)
			const blob = bufferToWave(buffer, buffer.length)
			const url = URL.createObjectURL(blob)
			src = url
			await tick()
			audio.addEventListener('loadedmetadata', async () => {
				if (duration !== Infinity) return
				currentTime = 1e101
				await tick()
				currentTime = 0
			})
		} catch {
			src = ''
		}
	})

	function formatTime(time: number) {
		if (time === Infinity) return ''
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time - minutes * 60)
		return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
	}
</script>

<style lang="scss">
	.container {
		background: var(--secondary);
		padding: var(--space-l) var(--space-m) var(--space-xxs);
		display: flex;
		border-radius: 4px;
		margin: 0 var(--space-s);
		width: max-content;
	}

	button {
		all: unset;
		color: transparent;
		margin-right: var(--space-s);
		width: var(--space-m);
		height: var(--space-l);
		position: relative;
		overflow: hidden;

		&.paused:before {
			content: '';
			width: 0;
			height: 0;
			position: absolute;
			top: 0;
			left: 0;
			border-top: var(--space-xs) solid transparent;
			border-bottom: var(--space-xs) solid transparent;
			border-left: var(--space-s) solid black;
		}

		&:not(.paused) {
			&:before,
			&:after {
				content: '';
				background: black;
				width: calc(var(--space-xxs) * 0.75);
				height: 100%;
				position: absolute;
				top: 0;
			}

			&:before {
				left: 0;
			}

			&:after {
				right: 0;
			}
		}
	}

	input[type='range'] {
		-webkit-appearance: none;
		width: 100%;
	}

	input[type='range']:focus {
		outline: none;
	}

	input[type='range']::-webkit-slider-runnable-track {
		// TODO: Change this out for light-grey variable when it is merged.
		background: #d8d8d8;
		height: 5px;
		border-radius: 2.5px;
	}

	input[type='range']::-moz-range-track {
		// TODO: Change this out for light-grey variable when it is merged.
		background: #d8d8d8;
		height: 5px;
		border-radius: 2.5px;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: var(--space-s);
		width: var(--space-s);
		background: var(--dark);
		margin-top: -5px;
		border-radius: 50%;
	}

	input[type='range']::-moz-range-thumb {
		height: var(--space-s);
		width: var(--space-s);
		background: var(--dark);
		margin-top: -10px;
		border-radius: 50%;
	}

	.metadata {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: min-content auto;
		row-gap: var(--space-xxs);
		margin-top: var(--space-xxs);

		input {
			grid-column: span 2;
			grid-row: 1;
		}

		p {
			font-size: var(--font-xxs);
			color: var(--grey);
		}

		p:nth-of-type(2) {
			justify-self: end;
		}
	}
</style>

{#if src}
	<div class="container">
		<audio
			bind:this={audio}
			on:ended={() => (currentTime = 0)}
			bind:paused
			bind:duration
			bind:currentTime
		>
			<source {src} type="audio/wav" />
		</audio>
		<button class:paused on:click={() => (paused = !paused)}
			>{paused ? 'Afspelen' : 'Pauzeren'}</button
		>
		<div class="metadata">
			<input
				on:mousedown={() => (paused = true)}
				type="range"
				min="0"
				step="0.0001"
				max={duration}
				bind:value={currentTime}
			/>
			<p>{formatTime(currentTime)}</p>
			<p>{formatTime(duration)}</p>
		</div>
	</div>
{/if}
