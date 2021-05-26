<script>
	import { Help, SpokenText } from '$atoms'
	import { ImageButton } from '$molecules'
	import { UserIcon } from '$icons'
	import { Header } from '$templates'
</script>

<style>
	hr {
		margin: var(--space-m) 0;
	}
	ul {
		list-style: none;
		padding: 0;
		display: grid;
		row-gap: var(--space-m);
		margin-top: var(--space-xs);
	}
</style>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<Header>
	<SpokenText --align="center" slot="middle" text="Jouw brieven" />
	<Help slot="right" />
</Header>
<main>
	<ImageButton href="/dashboard/letter" text="Nieuwe brief opsturen">
		<UserIcon />
	</ImageButton>
	<hr />
	<section>
		<SpokenText text="Brieven" --align="center" />
		<ul />
	</section>
</main>
