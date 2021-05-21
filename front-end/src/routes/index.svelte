<script>
	import { Title, Icon, Button, SpokenText } from '$atoms'
	import { IndexIcon, Oval } from '$icons'
</script>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: 100vh;
		width: inherit;

		:global(h1) {
			align-self: flex-start;
		}
	}
</style>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main>
	<Oval />
	<Title>Hallo!</Title>
	<SpokenText text="Dit is de app die helpt met het uitleggen van brieven" />
	<Icon><IndexIcon /></Icon>
	<Button href="/onboarding">Start</Button>
</main>
