import React, { SVGProps } from 'react'

export const FilterIcon = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg width="1em" height="1em" viewBox="0 0 15 15" {...props}>
			<path
				d="M2.5 7.5H0m15 5h-2.5m2.5-10H8.5m-2 0H0m4.5 5H15m-4.5 5H0m10.5-2v4h2v-4h-2zm-8-5v4h2v-4h-2zm4-5v4h2v-4h-2z"
				stroke="currentColor"
			/>
		</svg>
	)
}
