<script>
	import Header from './Header.svelte'
	import type { ChatMessage } from '$types'
	import { SpokenText, Help, Back } from '$atoms'
	import { AudioRecorder } from '$organisms'
	import { client } from '$config/supabase'

	export let messages: ChatMessage[]
	export let userRole: string

	const medium: boolean = true
	const userId = client.auth.session().user.id
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

	main {
		display: flex;
		flex-direction: column;
		overflow: auto;
	}

	audio {
		margin: 1rem 0 1rem 0;
	}

	.you {
		align-self: flex-end;
	}
</style>

<Header>
	<Back slot="left" href="/dashboard" />
	<SpokenText --align="center" slot="middle" text="Gesproken bericht" />
	<Help slot="right" />
</Header>
<main>
	{#each messages as message (message.id)}
		{#if message.sender.id === userId}
			<audio controls src={message.file} type="audio/ogg" class="you" />
		{:else}
			<audio controls src={message.file} type="audio/ogg" />
		{/if}
	{/each}
</main>
<footer>
	{#if userRole === 'user'}
		<SpokenText
			--align="center"
			text="Klik op de microfoon en stel nog een vraag of bedank de vrijwilliger"
			{medium}
		/>
	{/if}
	<AudioRecorder />
</footer>
