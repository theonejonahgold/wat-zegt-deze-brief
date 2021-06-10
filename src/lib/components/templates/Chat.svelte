<script>
	import Header from './Header.svelte'
	import { SpokenText, Help, Back, MessageCloud } from '$atoms'
	import { RecordAudio } from '$molecules'
	import { browser } from '$app/env'
	import { messageHandler } from '$db/messageHandler'
	import { onMount } from 'svelte'

	export let initialMessages: any
	export let newMessages: any

	let recorder: MediaRecorder

	if (browser) {
		navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
			recorder = new MediaRecorder(stream)
		})
	}
</script>

<style>
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: var(--bs-up);
		padding-top: var(--space-m);
		width: 100%;
		overflow-x: scroll;
	}
</style>

<Header>
	<Back slot="left" href="/dashboard" />
	<SpokenText --align="center" slot="middle" text="Gesproken bericht" />
	<Help slot="right" />
</Header>
<main>
	{#each newMessages as { src }, i}
		<audio controls {src} type="audio/ogg" />
	{/each}
</main>
<footer>
	<SpokenText
		--align="center"
		text="Klik op de microfoon en stel nog een vraag of bedank de vrijwilliger"
	/>
	<RecordAudio {recorder} on:message={messageHandler} />
</footer>
