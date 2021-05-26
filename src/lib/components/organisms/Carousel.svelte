<script>
	import { Icon } from '$atoms'
	import { Image } from '$atoms'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'

	const pageStore = getContext<Writable<any>>('previews')

	let index: number = 0

	const next = () => {
		index = (index + 1) % $pageStore.length
	}
</script>

{#if $pageStore}
	<section>
		<button on:click={next} id="previous"><Icon>&gt;</Icon></button>
		<div>
			{#each [$pageStore[index]] as page (index)}
				<Image src={page} alt="Page preview" />
			{/each}
		</div>
		<button on:click={next} id="previous"><Icon>&lt;</Icon></button>
	</section>
{/if}
