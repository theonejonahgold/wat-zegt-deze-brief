<script>
	import { Back, Help, Button, SpokenText } from '$atoms'
	import { ImageButton } from '$molecules'
	import { VolunteerIcon, UserIcon } from '$icons'

	let users = [
		{
			value: 'user',
			alt: 'A user',
			name: 'selection',
			id: 'user',
			text: 'Ik heb hulp nodig met een brief',
		},
		{
			value: 'volunteer',
			alt: 'A volunteer',
			name: 'selection',
			id: 'volunteer',
			text: 'Hulp geven',
		},
	]
</script>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		margin: 0;
	}

	form {
		display: block;
		min-height: 100%;
		width: 100%;

		:global {
			label ~ label {
				margin-top: var(--space-m);
			}

			> button {
				margin-top: var(--space-m);
			}
		}
	}
</style>

<svelte:head>
	<title>Role</title>
</svelte:head>

<header>
	<Back href="/" />
	<SpokenText text="Waar kom je voor?" />
	<Help />
</header>

<main>
	<form action="/onboarding/user" method="GET">
		{#each users as user}
			<ImageButton {...user}>
				{#if user.value === 'volunteer'}
					<VolunteerIcon />
				{:else}
					<UserIcon />
				{/if}
			</ImageButton>
		{/each}
		<Button bottom>Volgende</Button>
	</form>
</main>
