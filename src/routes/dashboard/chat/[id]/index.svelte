<script context="module">
	export const load: Load = async ({ page }) => {
		const messages = await listMessages(page.params.id)
		if (!messages) return {}

		const { body: isUserRole } = await client.rpc<boolean>('is_role', {
			user_id: client.auth.session().user.id,
			u_role: 'user',
		})

		return {
			props: {
				messages,
				letterId: page.params.id,
				userRole: (isUserRole as unknown as boolean) ? 'user' : 'volunteer',
			},
		}
	}
</script>

<script>
	import { Chat } from '$templates'
	import { listMessages, downloadAudioMessage, fetchMessage } from '$db/messages'
	import type { Load } from '@sveltejs/kit'
	import type { ChatMessage, definitions } from '$types'
	import { client } from '$config/supabase'
	import { onMount } from 'svelte'

	export let userRole: string
	export let messages: ChatMessage[]
	export let letterId: string

	onMount(async () => {
		messages = (await Promise.all(
			messages.map(message =>
				message.type === 'audio'
					? downloadAudioMessage(letterId, message.sender.id, message.content).then(file => ({
							...message,
							file,
					  }))
					: new Promise(resolve => resolve(message))
			)
		)) as ChatMessage[]

		client
			.from<definitions['letters']>(`letters:id=eq.${letterId}`)
			.on('UPDATE', async payload => {
				const messageID = payload.new.messages[payload.new.messages.length - 1]
				const message = await fetchMessage(messageID)
				if (message.type !== 'audio') {
					messages.push(message)
					messages = messages
					return
				}
				const file = await downloadAudioMessage(letterId, message.sender.id, message.content)
				messages.push({
					...message,
					file,
				})
				messages = messages
			})
			.subscribe()
	})
</script>

<Chat {messages} {userRole} />
