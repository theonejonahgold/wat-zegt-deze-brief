<script>
	import { SpokenText, Back, Button, Image } from '$atoms'
	import { Header } from '$templates'
</script>

<Header>
	<Back slot="left" href="/onboarding" />
	<SpokenText --align="center" slot="middle" text="Welkom" />
</Header>

<main>
	<SpokenText
		text="Hier volgt een kleine uitleg van de app, zodat je gelijk aan de slag kunt gaan."
	/>
	<Image src="/images/onboarding-user-5.png" alt="Instructions" />
	<Button href="/onboarding/volunteer/register">Overslaan</Button>
	<Button href="/onboarding/volunteer?step=1">Volgende</Button>
</main>
