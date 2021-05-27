<script>
	import { Button } from '$atoms'
	import { page, session } from '$app/stores'
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
		filterValue?.length > 1 &&
		languages.filter(lang => lang.name.toLowerCase().includes(filterValue))
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
</script>

<style lang="scss">
	input {
		width: 100%;
		border: 0;
		font-size: var(--font-m);
		border-radius: var(--border-radius);
		border: 1px solid var(--light);
		padding: var(--space-s);
	}

	form:not(:first-of-type) {
		button {
			background: none;
			border: none;
			padding: var(--space-s) 0;
			border-bottom: 1px solid var(--light);
			width: 100%;
			text-align: left;

			&::before {
				padding-right: var(--space-xs);
				color: #009723;
				content: '+';
			}
		}

		.selected::before {
			color: #cc0000;
			content: 'x';
		}
	}
</style>

<form on:submit|preventDefault>
	<label>
		Selecteer de talen die je spreekt:
		<input name="query" bind:value={filterValue} type="search" />
	</label>
	{#if !js}
		<Button>Zoeken</Button>
	{/if}
</form>

{#if filteredLanguages}
	{#each filteredLanguages as lang}
		<form
			method="POST"
			on:submit|preventDefault={submitHandler}
			action="/api/languages?query={$page.query.get('query')}"
		>
			<input type="hidden" name="code" value={lang.code} />
			<button class={chosenLanguages.has(lang.code) ? 'selected' : ''}>{lang.name}</button>
		</form>
	{/each}
{/if}
