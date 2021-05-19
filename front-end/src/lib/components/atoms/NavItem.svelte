<script>
	import Icon from '$atoms/NavItem.svelte'

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
