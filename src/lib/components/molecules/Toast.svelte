<script>
	import { createEventDispatcher } from 'svelte'
	import { fade } from 'svelte/transition'
	import { SuccessIcon, ErrorIcon, InfoIcon, CloseIcon } from '$icons'

	const dispatch = createEventDispatcher()

	export let type: 'success' | 'error' | 'info' = 'error'
	export let duration: number
	export let dismissible: boolean
</script>

<style lang="scss">
	article {
		position: relative;
		color: var(--secondary);
		padding: var(--space-s) var(--space-l);
		border-radius: var(--border-radius);
		display: flex;
		align-items: center;
		justify-content: space-between;
		column-gap: var(--space-s);
		margin-bottom: var(--space-xs);
		overflow: hidden;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			height: calc(var(--border-radius) / 4);
			background: var(--secondary);
			animation: slider var(--duration) linear forwards;
		}
	}

	@keyframes slider {
		from {
			width: 100%;
		}
		to {
			width: 0%;
		}
	}

	.error {
		background: var(--error);
	}

	.success {
		background: var(--success);
	}

	.info {
		background: var(--info);
	}

	div {
		width: 100%;
	}

	button {
		color: var(--secondary);
		background: transparent;
		border: 0 none;
		padding: 0;
		line-height: 1;
		font-size: 1rem;
	}
</style>

<article class={type} style="--duration: {duration}ms" role="alert" transition:fade>
	{#if type === 'success'}
		<SuccessIcon />
	{:else if type === 'error'}
		<ErrorIcon />
	{:else if type === 'info'}
		<InfoIcon />
	{/if}

	<div>
		<slot />
	</div>

	{#if dismissible}
		<button on:click={() => dispatch('dismiss')}>
			<CloseIcon width="0.6em" />
		</button>
	{/if}
</article>
