<script>
	import Header from './Header.svelte'
	import type { ChatMessage } from '$types'
	import { SpokenText, Help, Back, MessageCloud } from '$atoms'
	import { AudioRecorder } from '$organisms'
	import { client } from '$config/supabase'
	import { onMount } from 'svelte'
	import { resolveLetter } from '$db/letter'

	export let messages: ChatMessage[]
	export let userRole: string
	export let letterId: string

	let form: HTMLFormElement
	const medium: boolean = true
	const userId = client.auth.session().user.id

	$: radioVal = ''

	onMount(async () => {
		form.addEventListener('input', (e: Event) => {
			const val: string = handleClick(e)
			radioVal = val
		})
	})

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
		overflow-x: scroll;
	}

	main {
		position: relative;
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

	form {
		display: flex;
		justify-content: center;
		flex-direction: column;
		position: absolute;
		bottom: 0;
		align-self: center;
		margin-bottom: var(--space-s);
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
<main>
	{#each messages as message (message.id)}
		{#if message.sender.id === userId}
			<audio controls src={message.file} type="audio/ogg" class="you" />
		{:else}
			<audio controls src={message.file} type="audio/ogg" />
		{/if}
	{/each}
	{#if userRole === 'user' && messages.length}
		<form
			bind:this={form}
			on:submit|preventDefault={e => {
				resolveLetter(letterId, radioVal)
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
