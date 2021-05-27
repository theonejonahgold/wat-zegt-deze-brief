<script context="module">
	export const load: Load = async ({ page }) => {
		const res = await client.rpc('is_in_letter', {
			uid: client.auth.session().user.id,
			letter_id: page.params.id,
		})

		const letterId = page.params.id

		const { signedURL } = await client.storage
			.from('pages')
			.createSignedUrl(`${letterId}/1.jpeg`, 60)

		if (res.body.length ? !res.body[0] : !res.body)
			return {
				status: 303,
				redirect: '/dashboard',
			}

		return {
			props: {
				letterId,
				image: signedURL,
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
	export let image: string

	async function submitHandler(e: Event & { currentTarget: HTMLFormElement }) {
		const data = new FormData(e.currentTarget)
		const image = data.get('page') as File
		if (!image) return goto('/dashboard')

		await Promise.all([
			client.storage.from('public').upload(`${letterId}/image.${image.type.split('/')[1]}`, image),
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
		<ImageInput selectedImage={image} name="page" />
		<input type="hidden" name="letter-id" value={letterId} />
		<Button bottom>Foto opslaan</Button>
	</form>
</main>
<footer />
