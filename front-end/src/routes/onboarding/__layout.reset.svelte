<script context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ page, fetch }) => {
		if (page.path === '/onboarding') return {}
		if (!page.path.endsWith('/user') && !page.path.endsWith('/volunteer')) return {}

		const step = +page.query.get('step') || 1
		const res = await fetch(`${page.path}/${step}.json`)
		const data: { content: OnboardingContent; amount: number } = await res.json()

		return {
			props: {
				...data,
				step,
				path: page.path,
			},
		}
	}
</script>

<script>
	import type { OnboardingContent } from '$types'
	import { textToSpeech } from '$actions'
	import { Button, Image, Back, Help } from '$atoms'
	import { Pagination } from '$molecules'

	export let step: number
	export let content: OnboardingContent
	export let amount: number
	export let path: string
</script>

<style>
	.top-container {
		display: flex;
	}

	.content-container {
		text-align: center;
	}
</style>

{#if !content}
	<slot />
{:else}
	<div class="top-container">
		<Back href={step === 1 ? '/onboarding' : `${path}?step=${+step - 1}`} />
		<Pagination selected={+step} {amount} />
		<Help />
	</div>
	<div class="content-container">
		<!-- TODO: Fix same spoken message after going to next item -->
		<p use:textToSpeech={content.text}>{content.text}</p>
		<Image src={content.image} alt={content.text} />
		{#if step < amount}
			<Button href="{path}?step={+step + 1}">Volgende</Button>
		{:else if step === amount}
			<Button href="{path}/register">Begrepen!</Button>
		{/if}
	</div>
{/if}
