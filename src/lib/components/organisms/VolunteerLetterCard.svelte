<script>
	import { Image } from '$atoms'
	import { formatTimestamp } from '$utils'
	import type { Letter } from '$types'
	import { client } from '$config/supabase'

	export let letter: Letter

	const href: string =
		letter.volunteer?.id === client.auth.session().user.id
			? `/dashboard/chat/${letter.id}`
			: `/dashboard/letter/${letter.id}`

	const latestMessage = letter.messages?.[letter.messages.length - 1]
	const time = latestMessage ? latestMessage.date : letter.createdAt
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
		display: grid;
		grid-template-columns: 2fr 3fr;
		padding: var(--space-s);
		gap: var(--space-xs);
		background-color: var(--secondary);
		box-shadow: 0px 3px 4px var(--muted);
		border-radius: 10px;
		height: 10rem;

		:global(img) {
			object-fit: cover;
			object-position: top;
			min-height: 0;
			height: 100%;
			grid-column: 1;
			border-radius: 5px;
			width: 100%;
		}

		div {
			width: 100%;
			display: grid;
			grid-template-rows: min-content auto;
			gap: var(--space-xs);

			> p {
				align-self: center;
			}
		}

		time {
			font-size: var(--font-s);
			color: var(--light);
		}
	}

	strong {
		font-weight: 500;
	}
</style>

<article>
	<a {href}>
		<Image src={letter.image} />
		<div>
			<p>Brief van {letter.sender ? letter.sender : 'onbekende instantie'}</p>
			<time datetime={new Date(letter.createdAt).toLocaleDateString('nl-NL')}>
				{formatTimestamp(letter.createdAt)}
			</time>
			{#if letter.volunteer}
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
			{/if}
		</div>
	</a>
</article>
