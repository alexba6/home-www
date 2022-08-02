import { SVGProps } from 'react'

export const AddIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path fill="#888888" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"></path>
		</svg>
	)
}
