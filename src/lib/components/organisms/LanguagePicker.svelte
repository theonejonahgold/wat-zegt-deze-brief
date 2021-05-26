<script>
	import { page, session } from '$app/stores'

	const langCookies = $session.cookies.langs

	interface Language {
		code: string
		name: string
	}

	const languages: Language[] = [
		{ code: 'nl', name: 'Nederlands (Nederlands)' },
		{ code: 'ar', name: 'Arabisch (العربية)' },
		{ code: 'fr', name: 'Frans (français)' },
	]

	let filterValue = $page.query.get('query')
	$: filteredLanguages = languages.filter(lang => lang.name.toLowerCase().includes(filterValue))
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

<form on:submit|preventDefault>
	<label>
		Kies je taal
		<input name="query" bind:value={filterValue} type="search" />
	</label>
	<button>Zoeken</button>
</form>

{#if filteredLanguages}
	{#each filteredLanguages as lang}
		<p>{lang.name}</p>
		<form
			method="POST"
			on:submit|preventDefault={submitHandler}
			action="/api/languages?query={$page.query.get('query')}"
		>
			<input type="hidden" name="code" value={lang.code} />
			<button>Taal {chosenLanguages.has(lang.code) ? 'verwijderen' : 'toevoegen'}</button>
		</form>
	{/each}
{/if}
