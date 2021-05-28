<script>
	import { Image } from '$atoms'
	import { formatTimestamp } from '$utils'
	import type { Letter } from '$types'

	export let letter: Letter

	const time = letter.messages.length ? letter.messages[0].date : letter.createdAt

	const chatMessage = letter.messages[0]
</script>

<style lang="scss">
	article {
		position: relative;

		&.unread:after {
			content: '';
			position: absolute;
			top: calc(-0.6667 * var(--space-s));
			right: calc(-0.6667 * var(--space-s));
			width: var(--space-m);
			height: var(--space-m);
			background: var(--dark);
			border-radius: 50%;
		}
	}

	a {
		text-decoration: none;
		color: var(--primary);
		display: grid;
		grid-template-columns: 2fr 3fr;
		padding: var(--space-m);
		gap: var(--space-s);
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
		}

		div {
			width: 100%;
			display: grid;
			grid-template-rows: min-content auto;
			gap: var(--space-s);

			> header {
				display: grid;
				grid-template-rows: 1fr;
				grid-template-columns: auto max-content;
				column-gap: var(--space-s);
			}

			> p {
				align-self: center;
			}
		}

		header {
			p,
			time {
				font-size: var(--font-xs);
			}
		}

		time {
			display: block;
			text-align: right;
			font-size: var(--font-xs);
			color: var(--subtext);
			grid-column: 2;
		}
	}
</style>

<article>
	<a href="/dashboard/letter/{letter.id}">
		<Image src={letter.image} />
		<div>
			<header>
				{#if letter.sender}
					<p>Brief van {letter.sender}</p>
				{:else}
					<p>
						Brief van {formatTimestamp(letter.createdAt)}
					</p>
				{/if}
				<time datetime={new Date(time).toLocaleDateString('nl-NL')}>
					{formatTimestamp(time)}
				</time>
			</header>
			{#if !chatMessage}
				<p>Je hebt nog geen uitleg ontvangen.</p>
			{:else}
				<p>
					{chatMessage.sender.name ? `${chatMessage.sender.name}:` : ''}
					{chatMessage.type === 'audio' ? 'Spraakbericht' : chatMessage.content}
				</p>
			{/if}
		</div>
	</a>
</article>
