<script>
	import { AnchorIcon } from '$icons'

	export let href: string
</script>

<style>
	a {
		text-decoration: none;
		line-height: 0.5;
		color: var(--dark);
		font-size: var(--font-l);
		font-weight: 700;
	}
</style>

<a {href}><AnchorIcon /></a>
