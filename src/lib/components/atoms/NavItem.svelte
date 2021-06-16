<script>
	import Icon from './Icon.svelte'

	export let route: string = '#'
</script>

<a href={route}>
	<Icon>
		<slot />
	</Icon>
</a>
