<script>
	import Header from './Header.svelte'
	import type { ChatMessage } from '$types'
	import { SpokenText, Help, Back, MessageCloud } from '$atoms'
	import { AudioRecorder } from '$organisms'
	import { client } from '$config/supabase'
	import { onMount } from 'svelte'
	import type { definitions } from '$types'

	export let messages: ChatMessage[]
	export let userRole: string
	export let letterId: string

	let form: HTMLFormElement

	$: radioVal = ''

	onMount(async () => {
		form.addEventListener('input', (e: Event) => {
			const val: string = handleClick(e)
			radioVal = val
		})
	})

	const medium: boolean = true
	const userId = client.auth.session().user.id

	function handleClick(e: Event) {
		return (e.target as HTMLInputElement).value
	}

	async function submitHandler(val: string) {
		let status = val === 'Ja' ? 'resolved' : 'published'

		if (status === 'resolved') {
			const { data } = await client
				.from<definitions['letters']>('letters')
				.update({ status: status })
				.eq('id', letterId)
				.single()
		} else {
		}
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

	.resolve {
		position: absolute;
		bottom: 0;
	}

	fieldset {
		border: none;
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
	{#if messages.length}
		<form
			bind:this={form}
			on:submit|preventDefault={() => {
				submitHandler(radioVal)
				form.remove()
			}}
		>
			<label for="resolve">Ik heb genoeg uitleg gekregen</label>
			<fieldset>
				<input type="radio" name="resolve" id="yes" value="Ja" on:click={handleClick} />
				<label for="yes">Ja</label>
				<input type="radio" name="resolve" id="no" value="Nee" on:click={handleClick} />
				<label for="no">Nee</label>
				<input type="submit" value="Verstuur" />
			</fieldset>
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
