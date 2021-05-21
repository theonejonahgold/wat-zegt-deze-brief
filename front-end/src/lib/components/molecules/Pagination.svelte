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
		background-color: var(--muted);
		position: relative;

		&:after {
			position: absolute;
			content: '';
			top: 0;
			left: calc(100% / var(--steps));
			width: calc(100% - (100% / var(--steps)));
			height: 100%;
			border-radius: 0 inherit inherit 0;
			background: linear-gradient(to right, var(--black) 0px 1px, transparent 1px);
			background-size: calc(100% / (var(--steps) - 1));
		}

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
				background: var(--gradient-to-left) fixed;
			}
		}
	}
</style>

<div style="--steps: {steps.length}">
	{#each steps as _, i (i + 1 === selected ? 'active' : i)}
		<span
			class={i + 1 === selected ? 'active' : ''}
			animate:flip={{ duration: 500, easing: quadInOut }}
		/>
	{/each}
</div>
