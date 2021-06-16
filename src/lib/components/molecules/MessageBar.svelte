<script>
	import { formEnhancer } from '$actions'

	export let letterId: string
</script>

<style>
	form {
		display: flex;
		margin: 0;
		width: 100%;
	}

	ul {
		margin: 0;
		padding: 0;
		width: 100%;
		display: flex;
		border-bottom: 1px solid var(--light-grey);
	}

	li {
		list-style: none;
		width: 50%;
	}

	button {
		box-shadow: var(--bs-m-up);
		border: none;
		padding: var(--space-xs);
		background-color: var(--white);
		color: var(--dark-grey);
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
		width: 100%;
		height: 100%;
	}

	.emoji {
		width: 25%;
	}

	.emoji:nth-last-child(2) button {
		border-top-right-radius: 0;
		border-right: 0.5px solid var(--light-grey);
	}
	.emoji:last-child button {
		border-top-left-radius: 0;
		border-left: 0.5px solid var(--light-grey);
	}
</style>

<form
	action="/api/letter/message/{letterId}"
	method="POST"
	use:formEnhancer={{
		success: () => {},
	}}
>
	<ul>
		<li><button type="submit" name="message" value="Dank u wel!">Dank u wel!</button></li>
		<li><button type="submit" name="message" value="Bedankt!">Bedankt!</button></li>
		<li class="emoji"><button type="submit" name="message" value="😁">😁</button></li>
		<li class="emoji"><button type="submit" name="message" value="👌">👌</button></li>
	</ul>
</form>
