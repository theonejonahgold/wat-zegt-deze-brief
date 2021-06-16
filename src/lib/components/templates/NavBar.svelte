<script>
	import { NavItem } from '$atoms'
	import { ChatIcon, LetterIcon, ProfileIcon } from '$icons'

	export let fill: string = 'darkgrey'
</script>

<style>
	footer {
	}

	nav {
		background-color: var(--secondary);
		box-shadow: var(--bs-m-up);
		width: 100%;
	}

	ul {
		height: var(--space-xxxl);
		padding: 0;
		display: grid;
		justify-content: space-around;
		grid-auto-flow: column;
		align-items: center;
		list-style-type: none;
	}

	li {
		padding: var(--space-xs) 0;
		text-align: center;
	}
</style>

<footer>
	<nav>
		<ul>
			<li><NavItem><ChatIcon {fill} /></NavItem></li>
			<li><NavItem><LetterIcon {fill} /></NavItem></li>
			<li><NavItem><ProfileIcon {fill} /></NavItem></li>
		</ul>
	</nav>
</footer>
