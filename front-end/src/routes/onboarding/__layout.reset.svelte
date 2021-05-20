<script context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ page, fetch }) => {
		if (page.path === '/onboarding') return {}
		if (!page.path.endsWith('/user') && !page.path.endsWith('/volunteer')) return {}

		const step = +page.query.get('step') || 1
		const res = await fetch(`${page.path}/${step}.json`)
		const data: { content: InstructionsContent; amount: number } = await res.json()

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
	import { Instructions } from '$templates'
	import type { InstructionsContent, InstructionsHrefs } from '$types'

	export let step: number
	export let content: InstructionsContent
	export let amount: number
	export let path: string
	let hrefs: InstructionsHrefs
	$: hrefs = {
		previous: step === 1 ? '/onboarding' : `${path}?step=${+step - 1}`,
		next: `${path}?step=${+step + 1}`,
		finish: `${path}/register`,
</script>
<!-- TODO: Move styling to Instructions template -->
<style>
	header {
		display: flex;
		align-items: center;
		margin-bottom: var(--space-m);

		> :global {
			:first-child {
				margin-right: var(--space-s);
			}
			:last-child {
				margin-left: var(--space-s);
			}
		}
	}

	main {
		text-align: center;
	}
</style>

{#if !content}
	<slot />
{:else}
	<Instructions {hrefs} {step} {content} {amount} {path} />
{/if}
