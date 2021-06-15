<script>
	import { Image } from '$atoms'
	import { formatTimestamp } from '$utils'
	import type { Letter } from '$types'
	import { client } from '$config/supabase'
	import languages from '../../../routes/onboarding/user/_languages'

	export let letter: Letter

	const href: string =
		letter.volunteer?.id === client.auth.session().user.id
			? `/dashboard/chat/${letter.id}`
			: `/dashboard/letter/${letter.id}`

	const latestMessage = letter.messages?.[letter.messages.length - 1]

	const userLanguages =
		letter.user.languages
			.filter(Boolean)
			.reduce((acc, curr, i, arr) => {
				const fullLanguage = languages
					.find(lang => lang.code === curr)
					.name.split('(')[0]
					.trim()
				return (acc +=
					i === arr.length - 1
						? `en ${fullLanguage}`
						: i === arr.length - 2
						? ` ${fullLanguage} `
						: `${fullLanguage}, `)
			}, '')
			.trim() || 'Nederlands'
</script>

<style lang="scss">
	article {
		position: relative;

		&.unread:after {
			content: '';
			position: absolute;
			top: calc(-0.6667 * var(--space-xs));
			right: calc(-0.6667 * var(--space-xs));
			width: var(--space-s);
			height: var(--space-s);
			background: var(--dark);
			border-radius: 50%;
		}
	}

	a {
		text-decoration: none;
		color: var(--primary);
		font-size: var(--font-xs);
		display: grid;
		grid-template-columns: 2fr 3fr;
		gap: var(--space-xs);
		background-color: var(--secondary);
		box-shadow: var(--bs-m-down);
		border-radius: 10px;
		height: 10rem;
		overflow: hidden;

		:global(img) {
			object-fit: cover;
			object-position: top;
			min-height: 0;
			height: 100%;
			grid-column: 1;
			width: 100%;
		}

		div {
			padding: var(--space-xs);
			padding-left: 0;
			width: 100%;
			height: 100%;
			display: grid;
			grid-template-rows: auto auto auto;
			gap: var(--space-xs);

			> p {
				align-self: center;
			}
		}
	}

	main {
		align-self: center;
	}

	header {
		align-self: start;
		display: grid;
		grid-template-columns: 4fr 1fr;

		time,
		small {
			font-size: var(--font-xxs);
		}

		time {
			color: var(--light);
			justify-self: end;
			text-align: right;
		}

		small {
			justify-self: start;
			text-align: left;
		}
	}

	strong {
		font-weight: 500;
	}

	footer {
		align-self: end;
	}

	.purple {
		color: var(--dark);
	}
</style>

<article
	class:unread={latestMessage &&
		latestMessage.sender.id !== client.auth.session().user.id &&
		!latestMessage.read}
>
	<a {href}>
		<Image src={letter.image} />
		<div>
			<header>
				<small>Brief van {letter.sender || 'onbekende instantie'}</small>
				<time
					datetime={new Date(latestMessage?.date || letter.createdAt).toLocaleDateString('nl-NL')}
				>
					{formatTimestamp(latestMessage?.date || letter.createdAt)}
				</time>
			</header>
			<main>
				{#if latestMessage}
					<p>
						<strong
							>{#if latestMessage.sender.id === client.auth.session().user.id}
								JIJ:
							{:else if latestMessage.sender.name}
								{latestMessage.sender.name}:
							{:else}
								Gebruiker:
							{/if}
						</strong>
						{#if latestMessage.type === 'audio'}
							Spraakbericht
						{:else}
							{latestMessage.content}
						{/if}
					</p>
				{:else}
					<p class="purple"><strong>Start met uitleggen</strong></p>
				{/if}
			</main>
			<footer>
				<small>Spreekt {userLanguages}</small>
			</footer>
		</div>
	</a>
</article>
