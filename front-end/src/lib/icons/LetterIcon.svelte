<script>
	export let fill: string
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 36 30"
>
	<defs>
		<filter id="Rectangle_40" x="0" y="0" width="36" height="30" filterUnits="userSpaceOnUse">
			<feOffset dy="1" />
			<feGaussianBlur stdDeviation="1.5" result="blur" />
			<feFlood flood-opacity="0.161" />
			<feComposite operator="in" in2="blur" />
			<feComposite in="SourceGraphic" />
		</filter>
	</defs>
	<g id="Group_165" data-name="Group 165" transform="translate(-172.499 -622.5)">
		<g transform="matrix(1, 0, 0, 1, 172.5, 622.5)" filter="url(#Rectangle_40)">
			<rect
				id="Rectangle_40-2"
				data-name="Rectangle 40"
				width="27"
				height="21"
				rx="6"
				transform="translate(4.5 3.5)"
				{fill}
			/>
		</g>
		<path
			id="Path_39"
			data-name="Path 39"
			d="M-4906.648,3086.737l13.177,8.657s9.905-6.622,13.133-8.657"
			transform="translate(5083.999 -2456.993)"
			fill="none"
			stroke="#fff"
			stroke-linejoin="round"
			stroke-width="1"
		/>
	</g>
</svg>
