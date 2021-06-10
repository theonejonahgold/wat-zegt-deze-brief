<script context="module">
	export const load: Load = async ({ page }) => {
		const { data } = await listMessages(page.params.id)
		if (!data) return {}

		const { messages } = data
		const userId = client.auth.session().user.id

		return {
			props: {
				initialMessages: messages,
				userId: userId,
				letterId: page.params.id,
			},
		}
	}
</script>

<script>
	import { Chat } from '$templates'
	import { listMessages, downloadMessage } from '$db/messages'
	import type { Load } from '@sveltejs/kit'
	import { client } from '$config/supabase'
	import { onMount } from 'svelte'

	export let initialMessages: any
	export let letterId: string
	export let userId: string

	let messages = []

	onMount(() => {
		initialMessages.map(message => {
			client.storage
				.from('messages')
				.download(`${letterId}/${userId}/${message}`)
				.then(result => {
					console.log(result)
					const reader = new window.FileReader()
					reader.readAsDataURL(result.data)
					reader.onloadend = () => {
						let base64 = reader.result
						messages.push({ src: base64 })
						messages = messages
					}
					return messages
				})
		})

		client
			.from(`letters:id=eq.${letterId}`)
			.on('UPDATE', async payload => {
				const newMessage = payload.new.messages
				const lastMessage = newMessage[newMessage.length - 1]
				const downloadedMessage = await downloadMessage(letterId, userId, lastMessage)
				const reader = new window.FileReader()
				reader.readAsDataURL(downloadedMessage.data)
				reader.onloadend = () => {
					let base64 = reader.result
					messages.push({ src: base64 })
					messages = messages
				}
				return messages
			})
			.subscribe()
	})
</script>

<Chat {messages} />
