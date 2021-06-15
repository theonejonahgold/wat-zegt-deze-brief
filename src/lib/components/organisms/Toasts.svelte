<script>
	import { Toast } from '$molecules'
	import { dismissToast, toasts } from '$stores'
	import Portal from 'svelte-portal/src/Portal.svelte'
</script>

<style>
	section {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		padding: var(--space-m);
		max-height: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		z-index: 1000;
		pointer-events: none;
	}
</style>

{#if $toasts}
	<Portal target="body">
		<section>
			{#each $toasts as toast (toast.id)}
				<Toast {...toast} on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast>
			{/each}
		</section>
	</Portal>
{/if}
