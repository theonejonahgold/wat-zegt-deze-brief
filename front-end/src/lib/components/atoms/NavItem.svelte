<script>
	import Icon from './Icon.svelte'

	export let route: string = '#'
</script>

<style>
	a {
		text-decoration: none;
		cursor: pointer;
	}
</style>

<a href={route}>
	<Icon>
		<slot />
	</Icon>
</a>
