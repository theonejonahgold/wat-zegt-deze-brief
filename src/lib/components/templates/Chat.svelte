<script>
	import Header from './Header.svelte'
	import type { ChatMessage, Letter } from '$types'
	import { SpokenText, Help, Back, MessageCloud, AudioPlayer } from '$atoms'
	import { AudioRecorder } from '$organisms'
	import { MessageBar } from '$molecules'
	import { client } from '$config/supabase'
	import { formEnhancer } from '$actions'
	import { useEffect } from '$utils'

	export let messages: ChatMessage[]
	export let userRole: string
	export let letter: Letter
	export let page: string

	useEffect(
		() => {
			if (!el || !el.children.length) return
			el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
		},
		() => [messages, el]
	)

	const userId = client.auth.session().user.id

	let el: HTMLElement

	$: lastReadID =
		[...messages].reverse().find(message => message.sender.id === userId && message.read)?.id || -1

	const isUser = userRole === 'user'
</script>

<style lang="scss">
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-shadow: var(--bs-l-up);
		padding-top: var(--space-m);
		width: 100%;
		background: var(--white);

		:global(p) {
			margin-bottom: var(--space-s);
		}
	}

	main {
		overflow-y: auto;
		margin: var(--space-s);

		small {
			text-align: right;
			display: block;
			margin-top: calc(var(--space-xxs) * -1);
		}

		:global {
			.container.container {
				margin-top: var(--space-s);
				margin-right: 0;
				margin-left: var(--margin);
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
		width: 100%;
		margin-top: var(--space-xs-s);
	}

	form button {
		background-color: var(--dark);
		border: none;
		border-radius: 3px;
		width: 3rem;
		align-self: center;
		color: var(--white);
		padding: 0.5rem;
		box-shadow: var(--bs-key-ambient-light);
	}

	form button:nth-child(1) {
		margin-right: 1rem;
	}

	img {
		width: 100%;
		height: auto;
	}
</style>

<Header sticky>
	<Back slot="left" href="/dashboard" />
	<SpokenText --align="center" slot="middle" text="Gesproken bericht" />
	<Help slot="right" />
</Header>
<div>
	<main bind:this={el}>
		<MessageCloud --margin={userRole === 'user' ? 'auto' : ''}>
			<a href="/dashboard/letter/{letter.id}/pages"><img src={page} alt="Page Image" /></a>
		</MessageCloud>
		{#each messages as message, index ((message.id, index))}
			{#if message.type === 'audio'}
				<AudioPlayer file={message.file} --margin={message.sender.id === userId ? 'auto' : '0'} />
			{:else}
				<MessageCloud
					text={message.content}
					--margin={message.sender.id === userId ? 'auto' : '0'}
				/>
			{/if}
			{#if lastReadID === message.id}
				<small>{message.type === 'audio' ? 'Geluisterd' : 'Gelezen'} </small>
			{/if}
		{/each}
		{#if isUser}
			{#if messages.length}
				{#if letter.status !== 'resolved'}
					<MessageCloud text="Ik heb genoeg uitleg gekregen" --margin="auto">
						<form
							action="/api/letter/resolve/{letter.id}"
							method="POST"
							use:formEnhancer={{
								success: (data, form) => console.log(data, form),
							}}
						>
							<button type="submit" name="resolve" value="true">Ja</button>
							<button type="submit" name="resolve" value="false">Nee</button>
						</form>
					</MessageCloud>
				{/if}
			{/if}
		{/if}
	</main>
</div>
<aside>
	<MessageBar letterId={letter.id} />
</aside>
<footer>
	{#if isUser}
		<SpokenText
			--align="center"
			text="Klik op de microfoon en stel nog een vraag of bedank de vrijwilliger"
			small={true}
		/>
	{/if}
	<AudioRecorder />
</footer>
