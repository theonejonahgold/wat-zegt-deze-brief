<script context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ page, fetch }) => {
		if (page.path === '/onboarding') return {}

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
	import { Pagination } from '$molecules'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	export let step: number
	export let content: OnboardingContent
	export let amount: number
	export let path: string

	const paginationStore = writable({ amount: 0 })
	setContext('pagination', paginationStore)
</script>

{#if !content}
	<slot />
{:else}
	<Pagination selected={+step} {amount} />
	<p>{content.text}</p>
	{#if !(step >= amount)}
		<a href="{path}?step={+step + 1}">test</a>
	{/if}
{/if}
