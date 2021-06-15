<script>
	import Header from './Header.svelte'
	import type { ChatMessage, Letter } from '$types'
	import { SpokenText, Help, Back, MessageCloud, AudioPlayer } from '$atoms'
	import { AudioRecorder } from '$organisms'
	import { client } from '$config/supabase'
	import { formEnhancer } from '$actions'

	export let messages: ChatMessage[]
	export let userRole: string
	export let letter: Letter

	const userId = client.auth.session().user.id

	$: isUser = userRole === 'user'
</script>

<style>
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: var(--bs-up);
		padding-top: var(--space-m);
		width: 100%;
	}

	main {
		position: relative;
		display: flex;
		flex-direction: column;
		margin: var(--space-s);

		:global {
			.container.container {
				align-self: flex-start;
				margin-top: var(--space-xs);
				margin-bottom: var(--space-xs);
				align-self: var(--align, flex-start);
			}

			#container {
				align-self: var(--align, flex-start);
			}

			.size {
				font-size: var(--font-s);
			}
		}
	}

	div {
		display: block;
		overflow-y: scroll;
	}

	audio {
		margin: var(--space-s);
		display: block;
	}

	form {
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: inherit;
		align-self: center;
		margin: var(--space-xs-s);
	}

	fieldset {
		display: flex;
		justify-content: center;
		border: none;
		margin-bottom: 0.5rem;
	}

	fieldset label {
		margin: 0 0.8rem 0 0.8rem;
	}

	form input[type='submit'] {
		background-color: var(--dark);
		border: none;
		border-radius: 3px;
		width: 5rem;
		align-self: center;
		color: var(--white);
		padding: 0.5rem;
		box-shadow: var(--bs-key-ambient-light);
	}
</style>

<Header>
	<Back slot="left" href="/dashboard" />
	<SpokenText --align="center" slot="middle" text="Gesproken bericht" />
	<Help slot="right" />
</Header>
<div>
	<main>
		{#each messages as message, index ((message.id, index))}
			{#if message.file}
				<AudioPlayer
					file={message.file}
					--align={message.sender.id === userId ? 'flex-end' : 'flex-start'}
				/>
			{:else}
				<MessageCloud
					text={message.content}
					--align={message.sender.id === userId ? 'flex-end' : 'flex-start'}
				/>
			{/if}
		{/each}
		{#if isUser}
			{#if messages.length}
				{#if letter.status !== 'resolved'}
					<form
						action="/api/letter/resolve/{letter.id}"
						method="POST"
						use:formEnhancer={{
							success: (data, form) => console.log(data, form),
						}}
					>
						<label>Ik heb genoeg uitleg gekregen</label>
						<button type="submit" name="resolve" value="true">Ja</button>
						<button type="submit" name="resolve" value="false">Nee</button>
					</form>
				{/if}
			{/if}
		{/if}
	</main>
</div>
<footer>
	{#if isUser}
		<SpokenText
			--align="center"
			text="Klik op de microfoon en stel nog een vraag of bedank de vrijwilliger"
		/>
	{/if}
	<AudioRecorder />
</footer>
