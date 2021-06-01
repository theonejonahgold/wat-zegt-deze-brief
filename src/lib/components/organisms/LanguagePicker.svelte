<script>
	import { Button } from '$atoms'
	import { page, session } from '$app/stores'
	import { browser } from '$app/env'
	import { onMount } from 'svelte'

	const langCookies = $session.cookies.langs
	let js = false
	onMount(() => (js = true))

	interface Language {
		code: string
		name: string
	}

	const languages: Language[] = [
		{ code: 'af', name: 'Afrikaans (Afrikaans)' },
		{ code: 'sq', name: 'Albanees (Shqip)' },
		{ code: 'ar', name: 'Arabisch (العربية)' },
		{ code: 'hy', name: 'Armeens (Հայերեն)' },
		{ code: 'as', name: 'Assamees (অসমীয়া)' },
		{ code: 'de', name: 'Duits (Deutsch)' },
		{ code: 'en', name: 'Engels (English)' },
		{ code: 'fr', name: 'Frans (français)' },
		{ code: 'nl', name: 'Nederlands (Nederlands)' },
		{ code: 'es', name: 'Spaans (español)' },
		{ code: 'tr', name: 'Turks (Türkçe)' },
	]

	let filterValue = $page.query.get('query')
	$: filteredLanguages =
		filterValue?.length > 1
			? languages.filter(
					lang =>
						lang.name.toLowerCase().includes(filterValue) ||
						chosenLanguagesArray.includes(lang.code)
			  )
			: languages.filter(lang => chosenLanguagesArray.includes(lang.code))
	let chosenLanguages = new Set<string>(!!langCookies ? langCookies.split(',') : [])
	$: chosenLanguagesArray = [...chosenLanguages]

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
	section button {
		background: none;
		border: none;
		padding: var(--space-m) 0;
		border-bottom: 1px solid var(--muted);
		width: 100%;
		text-align: left;
		display: flex;
		align-items: center;
	}

	input {
		&[type='search'] {
			width: 100%;
			border: 0;
			font-size: var(--font-m);
			border-radius: var(--border-radius);
			border: 1px solid var(--light);
			padding: var(--space-s);
		}

		&[type='checkbox'] {
			pointer-events: none;
			display: inline-block;
			margin-right: var(--space-s);
		}
	}
</style>

<div>
	<form on:submit|preventDefault>
		<label>
			Selecteer de talen die je spreekt:
			<input name="query" bind:value={filterValue} type="search" />
		</label>
		{#if !js}
			<Button>Zoeken</Button>
		{/if}
	</form>

	<section>
		{#if filteredLanguages}
			{#each filteredLanguages as lang}
				<form
					method="POST"
					on:submit|preventDefault={submitHandler}
					action="/api/languages?query={$page.query.get('query')}"
				>
					<input type="hidden" name="code" value={lang.code} />
					<button>
						<input type="checkbox" checked={chosenLanguages.has(lang.code)} />
						{lang.name}
					</button>
				</form>
			{/each}
		{/if}
	</section>
</div>
