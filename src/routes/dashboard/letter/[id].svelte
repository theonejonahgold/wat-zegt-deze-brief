<script context="module">
	export const load: Load = async ({ page }) => {
		if (!client.auth.session())
			return {
				redirect: '/login',
			}
		const {
			body: [isUser],
		} = await client.rpc('is_role', {
			user_id: client.auth.session().user.id,
			u_role: 'user',
		})

		const res = await client.rpc('is_in_letter', {
			uid: client.auth.session().user.id,
			letter_id: page.params.id,
		})

		if (!res.body[0])
			return {
				redirect: '/dashboard',
			}

		return {
			props: {
				letterId: page.params.id,
			},
		}
	}
</script>

<script>
	import type { Load } from '@sveltejs/kit'
	import { client } from '$config/supabase'
	import { Help, SpokenText, ImageInput, Button } from '$atoms'
	import { Header } from '$templates'
	import { goto } from '$app/navigation'

	export let letterId: string

	async function submitHandler(e: Event & { currentTarget: HTMLFormElement }) {
		const data = new FormData(e.currentTarget)
		const image = data.get('page') as File

		await Promise.all([
			client.storage.from('public').upload(`${letterId}.${image.type.split('/')[1]}`, image),
			client.storage.from('pages').upload(`${letterId}/1.${image.type.split('/')[1]}`, image),
		])

		goto('/dashboard')
	}
</script>

<style lang="scss">
	main {
		:global {
			label:nth-child(1) {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
</style>

<!-- TODO: Make form progressively enhanced -->
<Header>
	<SpokenText --align="center" slot="middle" text="Upload pagina's" />
	<Help slot="right" />
</Header>
<main>
	<form on:submit|preventDefault={submitHandler} action="/api/letter/page" method="POST">
		<ImageInput name="page" />
		<input type="hidden" name="letter-id" value={letterId} />
		<Button bottom>Foto opslaan</Button>
	</form>
</main>
