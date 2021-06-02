<script context="module">
	export const load: Load = async ({ page }) => {
		const { data } = await client
			.from<definitions['letters']>('letters')
			.select()
			.eq('id', page.params.id)
			.limit(1)
			.single()

		const role = await checkRole()

		if (role !== 'volunteer') {
			return {
				redirect: '/dashboard',
				status: 302,
			}
		}

		return {
			props: {
				letter: data,
			},
		}
	}
</script>

<script>
	import { RecordAudio } from '$molecules'
	import { CarouselPage } from '$templates'
	import { browser } from '$app/env'
	import { client } from '$config/supabase'
	import { v4 as uuid } from 'uuid'
	import type { Load } from '@sveltejs/kit'
	import { onMount } from 'svelte'
	import type { definitions, Letter } from '$types'
	import { checkRole } from '$db/user'
	import { messageHandler } from '$actions'

	let letter: Letter
	let recorder: MediaRecorder
	let title: string = 'Uitleg brief'
	let backLink = '/dashboard'
	let selectedPage: number = 0
	let pages: string[] = []

	if (browser) {
		navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
			recorder = new MediaRecorder(stream)
		})
	}

	onMount(() => {
		client.storage
			.from('pages')
			.list()
			.then(({ data }) => {
				Promise.all(
					data.map(page => client.storage.from('pages').download(`${letter.id}/${page.name}`))
				)
			})
			.then(results =>
				Promise.all(
					results.map(
						({ data }) =>
							new Promise<string>(resolve => {
								const reader = new FileReader()
								reader.readAsDataURL(data)
								reader.addEventListener('load', e => {
									resolve(e.target.result as string)
								})
							})
					)
				)
			)
			.then(images => {
				pages = images
			})
	})
</script>

<svelte:head>
	<title>Uitleg over brief</title>
</svelte:head>

<CarouselPage {title} {backLink} {selectedPage} {pages}>
	<RecordAudio {recorder} on:message={messageHandler} />
</CarouselPage>
