<script>
	import { AnchorIcon } from '$icons'

	export let href: string
</script>

<style lang="scss">
	a {
		display: block;
		width: var(--space-l);
		height: var(--space-m);

		:global {
			svg,
			img {
				height: 100%;
				width: 100%;
			}
		}
	}
</style>

<a {href}><AnchorIcon /></a>
