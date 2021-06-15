<script>
	import Header from './Header.svelte'
	import type { ChatMessage, Letter } from '$types'
	import { SpokenText, Help, Back, MessageCloud, AudioPlayer } from '$atoms'
	import { AudioRecorder } from '$organisms'
	import { client } from '$config/supabase'
	import { formEnhancer } from '$actions'
	import { useEffect } from '$utils'

	export let messages: ChatMessage[]
	export let userRole: string
	export let letter: Letter

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

	#message-bar {
		display: flex;
		width: inherit;
		margin-top: var(--space-xs-s);
	}

	#message-bar {
		margin: 0;
		width: 100%;
	}

	#message-bar ul {
		margin: 0;
		padding: 0;
		width: 100%;
		display: flex;
		border-bottom: 1px solid #d8d8d8;
	}

	#message-bar li {
		list-style: none;
		width: 25%;
	}

	#message-bar button {
		box-shadow: var(--bs-m-up);
		border: none;
		padding: var(--space-xs);
		background-color: var(--white);
		color: #a5a5a5;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		width: 100%;
		height: 100%;
	}
</style>

<Header sticky>
	<Back slot="left" href="/dashboard" />
	<SpokenText --align="center" slot="middle" text="Gesproken bericht" />
	<Help slot="right" />
</Header>
<div>
	<main bind:this={el}>
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
	<form
		id="message-bar"
		action="/api/letter/message/{letter.id}"
		method="POST"
		use:formEnhancer={{ success: (data, form) => console.log(data, form) }}
	>
		<ul>
			<li><button type="submit" name="message" value="Dank u wel!">Dank u wel!</button></li>
			<li><button type="submit" name="message" value="Bedankt!">Bedankt!</button></li>
			<li><button type="submit" name="message" value="😁">😁</button></li>
			<li><button type="submit" name="message" value="👌">👌</button></li>
		</ul>
	</form>
</aside>
<footer>
	{#if isUser}
		<SpokenText
			--align="center"
			text="Klik op de microfoon en stel nog een vraag of bedank de vrijwilliger"
		/>
	{/if}
	<AudioRecorder />
</footer>
