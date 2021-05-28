<script>
	import { Title, Icon, Button, SpokenText } from '$atoms'
	import { IndexIcon, Oval } from '$icons'
	import { Flex } from '$templates'
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<Flex>
	<Oval />
	<Title>Hallo!</Title>
	<SpokenText text="Dit is de app die helpt met het uitleggen van brieven" />
	<Icon><IndexIcon /></Icon>
	<Button href="/login">Naar loginpagina</Button>
	<Button href="/onboarding">Start</Button>
</Flex>
