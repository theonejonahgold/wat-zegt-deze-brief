<script>
	import { Button, Loader, SpokenText } from '$atoms'
	import { page, session } from '$app/stores'
	import { addToast } from '$stores'
	import { onMount } from 'svelte'

	export let languages: Array<{
		code: string
		name: string
	}>

	const langCookies = $session.cookies.langs
	let js = false
	let filterValue = $page.query.get('query')
	let chosenLanguages = new Set<string>(!!langCookies ? langCookies.split(',') : [])
	let loading = ''

	onMount(async () => {
		js = true
		if (langCookies) return

		const lang = navigator.language?.slice(0, 2)
		if (!lang || chosenLanguages.has(lang)) return
		chosenLanguages = chosenLanguages.add(lang)

		await fetch('/api/languages', {
			method: 'POST',
			body: new URLSearchParams({
				code: lang,
			}),
			headers: {
				Accept: 'application/json',
			},
		})

		addToast({
			message: 'Je telefoontaal is door ons al geselecteerd!',
			type: 'info',
		})
	})

	const submitHandler = async (e: Event & { currentTarget: HTMLFormElement }) => {
		const formData = new FormData(e.currentTarget)
		const code = formData.get('code') as string

		if (chosenLanguages.size >= 3 && !chosenLanguages.has(code)) return

		loading = code
		const res = await fetch(e.currentTarget.action, {
			method: 'POST',
			body: formData,
			headers: {
				Accept: 'application/json',
			},
		})
		if (!res.ok) return
		if (chosenLanguages.has(code)) {
			chosenLanguages.delete(code)
			chosenLanguages = chosenLanguages
			loading = ''
			return
		}
		chosenLanguages = chosenLanguages.add(code)
		loading = ''
	}
</script>

<style lang="scss">
	div {
		position: relative;
	}
	section {
		+ section {
			margin-top: var(--space-xl);
		}

		button {
			background: none;
			border: none;
			padding: var(--space-s) 0;
			border-bottom: 1px solid var(--muted);
			width: 100%;
			text-align: left;
			display: flex;
			align-items: center;
		}
	}

	div > form {
		position: sticky;
		top: calc((var(--space-l) * 2) + var(--space-xl));
		background: var(--background);
		padding-bottom: var(--space-s);
		z-index: 1;

		input {
			margin-top: var(--space-xxs);
		}
	}

	form :global(div) {
		margin-right: var(--space-xxs);
		margin-bottom: 1px;
	}

	input {
		&[type='search'] {
			width: 100%;
			border: 0;
			font-size: var(--font-s);
			border-radius: var(--border-radius);
			box-shadow: var(--bs-m-down);
			padding: var(--space-m);
		}

		&[type='checkbox'] {
			pointer-events: none;
			cursor: pointer;
			display: inline-block;
			margin: 0 var(--space-xxs) 0 0;
			width: var(--space-xs);
			height: var(--space-xs);
		}
	}
</style>

<div>
	<form on:submit|preventDefault>
		<label>
			Zoek hier naar talen
			<input
				name="query"
				placeholder="Bijvoorbeeld Nederlands"
				bind:value={filterValue}
				type="search"
			/>
		</label>
		{#if !js}
			<Button>Zoeken</Button>
		{/if}
	</form>

	{#if chosenLanguages.size}
		<section>
			<SpokenText text="Geselecteerd" />
			{#each languages.filter(lang => chosenLanguages.has(lang.code)) as lang (lang.code)}
				<form
					method="POST"
					on:submit|preventDefault={submitHandler}
					action="/api/languages?query={$page.query.get('query')}"
				>
					<input type="hidden" name="code" value={lang.code} />
					<button>
						{#if loading === lang.code}
							<Loader --size="var(--space-xs)" />
						{:else}
							<input checked type="checkbox" />
						{/if}
						{lang.name}
					</button>
				</form>
			{/each}
		</section>
	{/if}

	<section>
		{#if chosenLanguages.size}
			<SpokenText text="Overige talen" />
		{/if}
		{#each languages
			.filter(lang => !chosenLanguages.has(lang.code))
			.filter(lang => !filterValue || lang.name
						.toLowerCase()
						.includes(filterValue.toLowerCase())) as lang (lang.code)}
			<form
				method="POST"
				on:submit|preventDefault={submitHandler}
				action="/api/languages?query={$page.query.get('query')}"
			>
				<input type="hidden" name="code" value={lang.code} />
				<button disabled={chosenLanguages.size >= 3}>
					{#if loading === lang.code}
						<Loader --size="var(--space-xs)" />
					{:else}
						<input disabled={chosenLanguages.size >= 3} type="checkbox" />
					{/if}
					{lang.name}
				</button>
			</form>
		{/each}
	</section>
</div>
