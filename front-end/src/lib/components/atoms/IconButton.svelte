<script>
	import Icon from './Icon.svelte'
</script>

<button on:click>
	<Icon color="hotpink">
		<slot />
	</Icon>
</button>
