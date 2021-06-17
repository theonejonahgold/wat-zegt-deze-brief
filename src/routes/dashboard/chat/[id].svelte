<script context="module">
	export const load: Load = async ({ page }) => {
		const messages = await listMessages(page.params.id)
		if (!messages) return {}
		const letter = await fetchSingleLetter(page.params.id)

		const { body: isUserRole } = await client.rpc<boolean>('is_role', {
			user_id: client.auth.session().user.id,
			u_role: 'user',
		})

		return {
			props: {
				messages,
				letter,
				userRole: (isUserRole as unknown as boolean) ? 'user' : 'volunteer',
			},
		}
	}
</script>

<script>
	import { Chat } from '$templates'
	import { fetchSingleLetter } from '$db/letter'
	import { listMessages, downloadAudioMessage, fetchMessage } from '$db/messages'
	import type { Load } from '@sveltejs/kit'
	import type { ChatMessage, definitions, Letter } from '$types'
	import { client } from '$config/supabase'
	import { onMount } from 'svelte'

	export let userRole: string
	export let messages: ChatMessage[]
	export let letter: Letter

	let page: string = ''

	onMount(async () => {
		await client.storage
			.from('pages')
			.download(`${letter.id}/${letter.page_order[0]}`)
			.then(
				({ data }) =>
					new Promise<string>(resolve => {
						const reader = new FileReader()
						reader.readAsDataURL(data)
						reader.addEventListener('load', e => {
							resolve((page = e.target.result as string))
						})
					})
			)
			.then(result => (page = result))

		messages = (await Promise.all(
			messages.map(message =>
				message.type === 'audio'
					? downloadAudioMessage(letter.id, message.sender.id, message.content).then(file => ({
							...message,
							file,
					  }))
					: new Promise(resolve => resolve(message))
			)
		)) as ChatMessage[]

		client
			.from<definitions['letters']>(`letters:id=eq.${letter.id}`)
			.on('UPDATE', async ({ new: newLetter }) => {
				console.log('hoi', letter, newLetter)
				letter = {
					...letter,
					status: newLetter.status,
				}
				if (messages.length === newLetter.messages.length) return
				const messageID = newLetter.messages[newLetter.messages.length - 1]
				const message = await fetchMessage(messageID)
				if (message.type !== 'audio') {
					messages.push(message)
					messages = messages
					return
				}
				const file = await downloadAudioMessage(newLetter.id, message.sender.id, message.content)
				messages.push({
					...message,
					file,
				})

				messages = messages
			})
			.subscribe()
	})
</script>

<svelte:head>
	<title>Chat</title>
</svelte:head>

<Chat {messages} {userRole} {letter} {page} />
