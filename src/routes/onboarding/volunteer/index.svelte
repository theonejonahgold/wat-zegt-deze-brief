<script>
	import { SpokenText, Back, Button, Image, ImageContainer } from '$atoms'
	import { Header, Flex } from '$templates'
</script>

<style>
	div {
		width: 100%;
	}
</style>

<svelte:head>
	<title>Uitleg</title>
</svelte:head>

<Header>
	<Back slot="left" href="/onboarding" />
	<SpokenText --align="center" slot="middle" text="Welkom" />
</Header>

<Flex>
	<SpokenText
		--align="center"
		text="Hier volgt een kleine uitleg van de app, zodat je gelijk aan de slag kunt gaan."
	/>
	<ImageContainer alt="Instructions" src="/images/onboarding-user-5.png" />
	<div>
		<Button invert href="/onboarding/volunteer/register">Overslaan, naar registreren</Button>
		<Button href="/onboarding/volunteer?step=1">Naar de uitleg</Button>
	</div>
</Flex>
