<script>
	import { flip } from 'svelte/animate'
	import { quadInOut } from 'svelte/easing'

	export let selected: number
	export let amount: number
	export let items: Array<any>

	const steps = Array(items ? items.length : amount)
</script>

<style lang="scss">
	div {
		width: 100%;
		height: 1em;
		border-radius: 2em;
		display: flex;
		background: var(--muted);

		span {
			display: inline-block;
			height: 1em;
			width: 100%;
			transition: border-radius 0.2s ease-in-out;

			&:first-of-type {
				border-radius: 2em 0 0 2em;
			}

			&:last-of-type {
				border-radius: 0 2em 2em 0;
			}

			&.active {
				background: var(--light);
			}
		}
	}
</style>

<div>
	{#each steps as _, i (i + 1 === selected ? 'active' : i)}
		<span
			class={i + 1 === selected ? 'active' : ''}
			animate:flip={{ duration: 500, easing: quadInOut }}
		/>
	{/each}
</div>
