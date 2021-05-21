<script>
	export let playing = false
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 20.013 17.928"
>
	<defs>
		<clipPath id="clip-path">
			<rect width="20.013" height="17.928" fill="none" />
		</clipPath>
	</defs>
	<g id="Group" clip-path="url(#clip-path)">
		<g id="Group-2" data-name="Group" transform="translate(0 -1.242)">
			<path
				id="Path"
				d="M4.491,6.392A.457.457,0,0,0,4.8,6.274l5.334-4.8a.914.914,0,0,1,1.525.679v16.1a.914.914,0,0,1-1.5.7L4.793,14.472a.457.457,0,0,0-.293-.106H.914A.914.914,0,0,1,0,13.452V7.305a.914.914,0,0,1,.914-.914Z"
				fill="#595959"
			/>
			{#if playing}
				<path
					d="M0,0S4.69,3.583,0,8.886"
					transform="translate(14.741 6.02)"
					fill="none"
					stroke="#595959"
					stroke-miterlimit="10"
					stroke-width="1"
				/>
				<path
					d="M0,0S5.431,6.352,0,12.8"
					transform="translate(17.086 3.642)"
					fill="none"
					stroke="#595959"
					stroke-miterlimit="10"
					stroke-width="1"
				/>
			{/if}
		</g>
	</g>
</svg>
