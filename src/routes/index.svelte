<script>
	import { Icon, Button, SpokenText } from '$atoms'
	import { IndexIcon, Oval } from '$icons'
	import { Flex } from '$templates'
</script>

<style>
	h1 {
		margin-bottom: var(--space-m);

		+ :global(p) {
			max-width: 75%;
			align-self: flex-start;
			margin-bottom: var(--space-xl);
		}
	}
</style>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Flex pt="var(--space-xxxxl)" px="var(--space-xxl)" pb="var(--space-xxl)">
	<Oval />
	<h1>Hallo!</h1>
	<SpokenText text="Dit is de app die helpt met het uitleggen van brieven" />
	<Icon><IndexIcon /></Icon>
	<Button href="/login">Naar loginpagina</Button>
	<Button href="/onboarding">Start</Button>
</Flex>
