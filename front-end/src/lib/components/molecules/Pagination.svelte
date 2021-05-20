<script>
	import { flip } from 'svelte/animate'
	import { quadInOut } from 'svelte/easing'

	export let selected: number
	export let amount: number

	const steps = Array(amount)
</script>

<style lang="scss">
	div {
		width: 100%;
		height: 1em;
		border-radius: 2em;
		display: flex;
		background: #d8d8d8;

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
				background: #8ca3ff;
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
