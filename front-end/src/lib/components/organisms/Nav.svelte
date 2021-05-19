<script>
	import { NavItem } from '$atoms'
	import { ChatIcon, LetterIcon, ProfileIcon } from '$icons'

	export let fill: string = 'darkgrey'
</script>

<style>
	nav {
		background-color: #ffffff;
		-webkit-box-shadow: 0px -1px 3px 0px rgba(5, 1, 1, 0.05);
		-moz-box-shadow: 0px -1px 3px 0px rgba(50, 50, 50, 0.05);
		box-shadow: 0px -1px 3px 0px rgba(50, 50, 50, 0.05);
		width: 100vw;
	}

	ul {
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		list-style-type: none;
	}

	li {
		padding: 12px 0 5px 0;
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
