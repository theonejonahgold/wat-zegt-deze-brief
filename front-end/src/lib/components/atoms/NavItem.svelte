<script>
	import { Icon } from '$atoms'

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
