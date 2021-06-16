<script lang="typescript">
	import Icon from './Icon.svelte'
	import { ExpandIcon } from '$icons'
	import type { Letter } from '$types'

	import MessageCloud from './MessageCloud.svelte'
	export let letter: Letter
	export let userRole: string
	export let page = ''
	export let you = false
</script>

<style>
	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	a {
		display: block;
		height: 100%;

		:global(div) {
			width: var(--space-xxl);
			height: var(--space-xxl);
			position: absolute;
			bottom: var(--space-l);
			right: var(--space-l);
			z-index: 1;
		}
	}
</style>

<MessageCloud {you} --margin={userRole === 'user' ? 'auto' : ''}>
	<a slot="misc" href="/dashboard/letter/{letter.id}/pages">
		<img src={page} alt="Klik op deze pagina om alle brieven te bekijken." />
		<Icon>
			<ExpandIcon />
		</Icon>
	</a>
</MessageCloud>
