<script>
	import { SpokenText, Back, Button, Image, Help } from '$atoms'
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
		}
	}
</style>

<Header>
	<Back slot="left" href="/onboarding" />
	<SpokenText --align="center" slot="middle" text="We laten je eerst zien hoe deze app werkt" />
	<Help slot="right" />
</Header>

<Flex>
	<div class="image-container">
		<Image src="/images/onboarding-user-5.png" alt="Instructions" />
	</div>
	<div>
		<Button href="/onboarding/user?step=1">Volgende</Button>
	</div>
</Flex>
