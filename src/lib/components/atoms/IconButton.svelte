<script>
	import Icon from './Icon.svelte'

	export let color: string = ''
</script>

<style>
	button {
		background: none;
		border: none;
		width: 5rem;
		height: 5rem;
		cursor: pointer;
	}
</style>

<button on:click>
	<Icon {color}>
		<slot />
	</Icon>
</button>
