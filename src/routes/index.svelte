<script>
	import { Icon, Button, SpokenText } from '$atoms'
	import { IndexIcon, Oval } from '$icons'
	import { Flex } from '$templates'
</script>

<style lang="scss">
	h1 {
		margin-bottom: var(--space-s);

		+ :global {
			p {
				max-width: 75%;
				align-self: flex-start;
				margin-bottom: var(--space-l);

				+ div {
					margin-top: auto;

					+ a {
						margin-top: auto;
					}
				}
			}
		}
	}
</style>

<svelte:head>
	<title>Hallo!</title>
</svelte:head>

<Flex pt="var(--space-xxxl)" pb="var(--space-xxl)">
	<Oval />
	<h1>Hallo!</h1>
	<SpokenText small text="Dit is de app die helpt met het uitleggen van brieven" />
	<Icon><IndexIcon /></Icon>
	<Button invert href="/login">Ik heb al een account</Button>
	<Button href="/onboarding">Ik ben nieuw hier</Button>
</Flex>
