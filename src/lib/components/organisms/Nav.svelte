<script>
	import { NavItem } from '$atoms'
	import { ChatIcon, LetterIcon, ProfileIcon } from '$icons'

	export let fill: string = 'darkgrey'
</script>

<style>
	nav {
		background-color: var(--secondary);
		box-shadow: 0px -1px 3px 0px rgba(50, 50, 50, 0.05);
		width: 100vw;
	}

	ul {
		padding: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		list-style-type: none;
	}

	li {
		padding: var(--space-xs) 0;
		text-align: center;
	}
</style>

<nav>
	<ul>
		<li><NavItem><ChatIcon {fill} /></NavItem></li>
		<li><NavItem><LetterIcon {fill} /></NavItem></li>
		<li><NavItem><ProfileIcon {fill} /></NavItem></li>
	</ul>
</nav>
