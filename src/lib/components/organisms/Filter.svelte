<script>
	import { quintInOut } from 'svelte/easing'
	import { fly } from 'svelte/transition'

	export let show = false
</script>

<style>
	div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: hotpink;
	}
</style>

{#if show}
	<div transition:fly={{ y: 200, duration: 500, easing: quintInOut }}>yo</div>
{/if}
