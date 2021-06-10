<script context="module">
	export const load: Load = async ({ page }) => {
		const { data } = await listMessages(page.params.id)
		if (!data) return {}

		const { messages } = data
		const userId = client.auth.session().user.id

		return {
			props: {
				messages: messages,
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

	export let messages: any
	export let letterId: string
	export let userId: string

	let initialMessages = []
	let newMessages = []

	onMount(() => {
		messages.map(message => {
			client.storage
				.from('messages')
				.download(`${letterId}/${userId}/${message}`)
				.then(result => {
					const reader = new FileReader()
					reader.readAsDataURL(result.data)
					reader.onloadend = () => {
						let base64 = reader.result
						initialMessages.push({ src: base64 })
					}
					return initialMessages
				})
		})

		client
			.from(`letters:id=eq.${letterId}`)
			.on('UPDATE', async payload => {
				const reader = new window.FileReader()
				const { messages } = payload.new
				const lastMessage = messages[messages.length - 1]
				const downloadedMessage = await downloadMessage(letterId, userId, lastMessage)
				reader.readAsDataURL(downloadedMessage.data)
				reader.onloadend = () => {
					let base64 = reader.result
					newMessages.push({ src: base64 })
					newMessages = newMessages
				}
				console.log(newMessages)
				return newMessages
			})
			.subscribe()
	})
</script>

<Chat {initialMessages} {newMessages} />
