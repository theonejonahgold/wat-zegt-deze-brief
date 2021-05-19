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
		display: flex;
		background: rgb(123, 123, 255);

		span {
			display: inline-block;
			height: 1em;
			width: 100%;

			&.active {
				background: blue;
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
