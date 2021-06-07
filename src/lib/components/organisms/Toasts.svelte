<script>
	import { Toast } from '$molecules'
	import { dismissToast, toasts } from '$stores'
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
	}
</style>

{#if $toasts}
	<section>
		{#each $toasts as toast (toast.id)}
			<Toast {...toast} on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast>
		{/each}
	</section>
{/if}
