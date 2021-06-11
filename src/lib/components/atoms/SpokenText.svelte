<script>
	import { onMount } from 'svelte'
	import { textToSpeech } from '$utils'
	import Icon from './Icon.svelte'
	import { AudioIcon } from '$icons'

	export let text = ''
	export let medium: boolean = false

	let playing = false
	let js = false

	onMount(() => (js = true))

	const handleClick = () => {
		if (playing) return
		playing = true

		textToSpeech(text, () => {
			playing = false
		})
	}
</script>

<style>
	button {
		line-height: 1;
		border: none;
		cursor: pointer;
		background: none;
		height: var(--space-m);
		width: var(--space-m);
		padding: 0.4em 0 0;
	}

	p {
		font-size: var(--space-l);
		text-align: var(--align, initial);
		color: var(--muted);
	}

	.medium {
		font-size: var(--space-m);
	}
</style>

{#if !js}
	<p class={medium ? 'medium' : ''}>{text}</p>
{:else}
	<p class={medium ? ' medium' : ''}>
		{text}
		<button type="button" on:click={handleClick}>
			<Icon color="black">
				<AudioIcon {playing} />
			</Icon>
		</button>
	</p>
{/if}
