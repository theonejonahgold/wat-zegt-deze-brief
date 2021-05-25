<script context="module">
	export const load = ({ error, status }) => ({ props: { error, status } })
</script>

<script>
	export let error: Error
	export let status: number
</script>

<h1>{status}</h1>
<p>{error.message}</p>
