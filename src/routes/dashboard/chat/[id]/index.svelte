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
	import { listMessages, downloadMessages } from '$db/letter'
	import type { Load } from '@sveltejs/kit'
	import { client } from '$config/supabase'
	import { onMount } from 'svelte'

	export let messages: any
	export let letterId: string
	export let userId: string

	let blobs = []

	onMount(async () => {
		messages.map(async message => {
			return await client.storage
				.from('messages')
				.download(`${letterId}/${userId}/${message}`)
				.then(result => {
					blobs.push(result.data)
					return blobs
				})
		})
	})
</script>

<Chat {blobs} />
