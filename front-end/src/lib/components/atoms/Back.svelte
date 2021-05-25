<script>
	import { AnchorIcon } from '$icons'

	export let href: string
</script>

<style>
	a {
		display: block;
		width: var(--space-l);
		height: var(--space-l);

		:global {
			svg,
			image {
				height: 100%;
				width: 100%;
			}
		}
	}
</style>

<a {href}><AnchorIcon /></a>
