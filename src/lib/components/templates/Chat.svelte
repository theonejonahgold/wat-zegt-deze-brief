<script>
	import Header from './Header.svelte'
	import type { ChatMessage } from '$types'
	import { SpokenText, Help, Back, AudioPlayer } from '$atoms'
	import { AudioRecorder } from '$organisms'
	import { client } from '$config/supabase'

	export let messages: ChatMessage[]
	export let userRole: string

	const userId = client.auth.session().user.id
</script>

<style lang="scss">
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

		:global {
			.container.container {
				align-self: flex-start;
				margin-top: var(--space-xs);
				margin-bottom: var(--space-xs);
				align-self: var(--align, flex-start);
			}
		}
	}
</style>

<Header>
	<Back slot="left" href="/dashboard" />
	<SpokenText --align="center" slot="middle" text="Gesproken bericht" />
	<Help slot="right" />
</Header>
<main>
	{#each messages as message (message.id)}
		{#if message.file}
			{#if message.sender.id === userId}
				<AudioPlayer file={message.file} --align="flex-end" />
			{:else}
				<AudioPlayer file={message.file} />
			{/if}
		{/if}
	{/each}
</main>
<footer>
	{#if userRole === 'user'}
		<SpokenText
			--align="center"
			text="Klik op de microfoon en stel nog een vraag of bedank de vrijwilliger"
		/>
	{/if}
	<AudioRecorder />
</footer>
