import { SVGProps } from 'react'

export const SidebarIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="40px"
			height="40px"
			viewBox="0 0 24 24"
			{...props}
		>
			<path fill="#888888" d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"></path>
		</svg>
	)
}
