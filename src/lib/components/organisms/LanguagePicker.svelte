<script>
	import { Button, SpokenText } from '$atoms'
	import { page, session } from '$app/stores'
	import { browser } from '$app/env'
	import { addToast } from '$stores'
	import { onMount } from 'svelte'

	const langCookies = $session.cookies.langs
	let js = false
	onMount(() => {
		js = true
		if (langCookies) return
		addToast({
			message: 'Je telefoontaal is door ons al geselecteerd!',
			type: 'info',
		})
	})

	export let languages: Array<{
		code: string
		name: string
	}>

	let filterValue = $page.query.get('query')
	let chosenLanguages = new Set<string>(!!langCookies ? langCookies.split(',') : [])

	const submitHandler = async (e: Event & { currentTarget: HTMLFormElement }) => {
		const res = await fetch(e.currentTarget.action, {
			method: 'POST',
			body: new FormData(e.currentTarget),
			headers: {
				Accept: 'application/json',
			},
		})
		if (!res.ok) return
		const code = await res.text()
		if (chosenLanguages.has(code)) {
			chosenLanguages.delete(code)
			chosenLanguages = chosenLanguages
			return
		}
		chosenLanguages = chosenLanguages.add(code)
	}

	const setDefaultLang = () => {
		if (!browser) return
		const lang = navigator.language?.slice(0, 2)
		if (!lang || chosenLanguages.has(lang)) return
		chosenLanguages = chosenLanguages.add(lang)
		fetch('/api/languages', {
			method: 'POST',
			body: new URLSearchParams({
				code: lang,
			}),
			headers: {
				Accept: 'application/json',
			},
		})
	}

	setDefaultLang()
</script>

<style lang="scss">
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
	}

	input {
		&[type='search'] {
			width: 100%;
			border: 0;
			font-size: var(--font-s);
			border-radius: var(--border-radius);
			box-shadow: var(--bs-input);
			padding: var(--space-m);
		}

		&[type='checkbox'] {
			pointer-events: none;
			display: inline-block;
			margin-right: var(--space-xxs);
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
						<input type="checkbox" checked />
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
				<button>
					<input type="checkbox" />
					{lang.name}
				</button>
			</form>
		{/each}
	</section>
</div>
