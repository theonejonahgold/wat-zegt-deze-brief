<script>
	import Header from './Header.svelte'
	import type { ChatMessage } from '$types'
	import { SpokenText, Help, Back, MessageCloud, AudioPlayer } from '$atoms'
	import { AudioRecorder } from '$organisms'
	import { client } from '$config/supabase'
	import { onDestroy, onMount } from 'svelte'
	import { resolveLetter } from '$db/letter'
	import { postResolveStatusMessage } from '$db/messageHandler'

	export let messages: ChatMessage[]
	export let userRole: string
	export let letterId: string

	console.log(messages)

	let form: HTMLFormElement
	const medium: boolean = true
	const userId = client.auth.session().user.id

	$: radioVal = ''
	$: isUser = userRole === 'user' ? true : false

	if (userRole === 'user') {
		onMount(async () => {
			form.addEventListener('input', (e: Event) => {
				const val: string = handleClick(e)
				radioVal = val
			})
		})

		onDestroy(() => {
			resolveLetter(letterId, radioVal)
			postResolveStatusMessage(letterId, radioVal)
		})
	}

	function handleClick(e: Event) {
		return (e.target as HTMLInputElement).value
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

	.you {
		align-self: flex-end;
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
			{#if message.sender.id === userId}
				{#if message.file}
					<!-- <audio controls="control" src={message.file} type="audio/ogg" class="you" /> -->
					<AudioPlayer file={message.file} --align="flex-end" />
				{:else}
					<MessageCloud text={message.content} optionalClass="you" />
				{/if}
			{:else if message.file}
				<AudioPlayer file={message.file} />
			{:else}
				<MessageCloud text={message.content} />
			{/if}
		{/each}
		{#if isUser}
			{#if messages.length}
				<form
					bind:this={form}
					on:submit|preventDefault={() => {
						form.remove()
					}}
				>
					<label for="resolve">Ik heb genoeg uitleg gekregen</label>
					<fieldset>
						<input type="radio" name="resolve" id="yes" value="Ja" on:click={handleClick} />
						<label for="yes">Ja</label>
						<input type="radio" name="resolve" id="no" value="Nee" on:click={handleClick} />
						<label for="no">Nee</label>
					</fieldset>
					<input type="submit" value="Verstuur" />
				</form>
			{/if}
		{/if}
	</main>
</div>
<footer>
	{#if isUser}
		<SpokenText
			--align="center"
			text="Klik op de microfoon en stel nog een vraag of bedank de vrijwilliger"
			{medium}
		/>
	{/if}
	<AudioRecorder />
</footer>
