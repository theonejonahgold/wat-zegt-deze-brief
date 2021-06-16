<script>
	import { formEnhancer } from '$actions'

	export let letterId: string
</script>

<style>
	form {
		display: flex;
		width: inherit;
		margin-top: var(--space-xs-s);
	}

	form {
		margin: 0;
		width: 100%;
	}

	form ul {
		margin: 0;
		padding: 0;
		width: 100%;
		display: flex;
		border-bottom: 1px solid var(--light-grey);
	}

	form li {
		list-style: none;
		width: 25%;
	}

	form button {
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
</style>

<form
	action="/api/letter/message/{letterId}"
	method="POST"
	use:formEnhancer={{
		success: (data, form) => {},
	}}
>
	<ul>
		<li><button type="submit" name="message" value="Dank u wel!">Dank u wel!</button></li>
		<li><button type="submit" name="message" value="Bedankt!">Bedankt!</button></li>
		<li><button type="submit" name="message" value="😁">😁</button></li>
		<li><button type="submit" name="message" value="👌">👌</button></li>
	</ul>
</form>
