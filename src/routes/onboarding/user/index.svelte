<script>
	import { SpokenText, Back, Button, Help, ImageContainer } from '$atoms'
	import { Header, Flex } from '$templates'
</script>

<style>
	div {
		width: 100%;
	}
</style>

<svelte:head>
	<title>Welkom</title>
</svelte:head>

<Header>
	<Back slot="left" href="/onboarding" />
	<SpokenText --align="center" slot="middle" text="Welkom" />
	<Help slot="right" />
</Header>

<Flex>
	<SpokenText --align="center" text="We laten je eerst zien hoe deze app werkt" />
	<ImageContainer alt="Instructions" src="/images/onboarding-user-5.png" />
	<div>
		<Button href="/onboarding/user?step=1">Naar de uitleg</Button>
	</div>
</Flex>
