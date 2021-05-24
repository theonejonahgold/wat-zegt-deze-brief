<script>
	import { Image } from '$atoms'
	import { formatTimestamp } from '$utils'
	import type { Letter } from '$types'

	export let letter: Letter
</script>

<style lang="scss">
	a {
		text-decoration: none;
		color: var(--primary);
		display: flex;
		margin: var(--space-m) 0;
		padding: var(--space-s);
		background-color: var(--secondary);
		box-shadow: 0px 3px 4px var(--muted);
		border-radius: 10px;

		:global(img) {
			object-fit: cover;
			width: 6em;
			height: 8em;
			border-radius: 10px;
		}

		div {
			width: 100%;
			margin-left: var(--space-s);
		}

		h3 {
			font-size: var(--font-s);
		}

		p:first-of-type {
			text-align: right;
		}
	}
</style>

<a href="/letter/{letter.id}">
	<Image src="/images/letter-4.png" alt={letter.alt} />
	<div>
		<p>{formatTimestamp(letter.time)}</p>
		{#if letter.explained}
			{#if letter.name}
				<p>Je hebt uitleg ontvangen van {letter.name}.</p>
			{:else}
				<p>Je hebt uitleg ontvangen van een anonieme gebruiker.</p>
			{/if}
		{:else}
			<p>Je hebt nog geen uitleg ontvangen voor deze brief.</p>
		{/if}
	</div>
</a>
