<script>
	import { SpokenText } from '$atoms'

	export let message: string = ''
</script>

<style>
	header {
		margin-bottom: var(--space-l);
	}
</style>

<header>
	<h1>Bijna klaar!</h1>
</header>
<main>
	<SpokenText text={message} />
</main>
