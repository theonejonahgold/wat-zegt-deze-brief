<script>
	import { SpokenText, Back, Button, Image } from '$atoms'
	import { Header, Flex } from '$templates'
</script>

<style>
	div {
		width: 100%;
	}
	.image-container {
		padding: var(--space-xxl);
		background: var(--secondary);
		border-radius: var(--border-radius);
		display: flex;
		justify-content: center;

		:global(img) {
			width: 100%;
			max-height: 14em;
			object-fit: contain;
		}
	}
</style>

<Header>
	<Back slot="left" href="/onboarding" />
	<SpokenText --align="center" slot="middle" text="Welkom" />
</Header>

<Flex>
	<SpokenText
		text="Hier volgt een kleine uitleg van de app, zodat je gelijk aan de slag kunt gaan."
	/>
	<div class="image-container">
		<Image src="/images/onboarding-user-5.png" alt="Instructions" />
	</div>
	<div>
		<Button invert href="/onboarding/volunteer/register">Overslaan, naar registreren</Button>
		<Button href="/onboarding/volunteer?step=1">Naar de uitleg</Button>
	</div>
</Flex>
