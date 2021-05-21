<script>
	import { Back, Help, Button, Main } from '$atoms'
	import { ImageButton } from '$molecules'
	import { VolunteerIcon, UserIcon } from '$icons'

	let users = [
		{
			value: 'volunteer',
			alt: 'A volunteer',
			name: 'selection',
			id: 'volunteer',
		},
		{ value: 'user', alt: 'A user', name: 'selection', id: 'user' },
	]
</script>

<style lang="scss">
	:global(header) {
		display: flex;
		justify-content: space-between;
		width: 18rem;
		margin: 0;
	}
</style>

<svelte:head>
	<title>Role</title>
</svelte:head>

<header>
	<Back href="/" />
	<Help />
</header>

<Main>
	{#each users as user}
		<ImageButton {...user}>
			{#if user.value === 'volunteer'}
				<VolunteerIcon />
			{:else}
				<UserIcon />
			{/if}
		</ImageButton>
	{/each}
	<Button>Volgende</Button>
</Main>
