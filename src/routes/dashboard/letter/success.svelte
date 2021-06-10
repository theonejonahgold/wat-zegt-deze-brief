<script>
	import { Back, SpokenText, Help, Button, ImageContainer } from '$atoms'
	import { Header, Flex } from '$templates'
</script>

<Header>
	<Back slot="left" href="/dashboard" />
	<SpokenText --align="center" slot="middle" text="Gelukt!" />
	<Help slot="right" />
</Header>

<Flex>
	<SpokenText
		--align="center"
		text="Wanneer een vrijwilliger heeft gereageerd op je brief zul je dit zien op je home pagina"
	/>
	<ImageContainer alt="Instructions" src="/images/onboarding-user-4.png" />
	<Button href="/dashboard">Terug naar home</Button>
</Flex>
