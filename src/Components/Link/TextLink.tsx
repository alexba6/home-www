import {FunctionComponent, MouseEvent, ReactNode} from 'react'

import styles from './TextLink.module.sass'

type FormLinkProps = {
	onClick: () => void,
	children: ReactNode
}

export const TextLink: FunctionComponent<FormLinkProps> = (props) => {

	const handleClick = (event: MouseEvent<any>) => {
		event.preventDefault()
		event.stopPropagation()
		props.onClick()
	}

	return (
			<a className={styles.textLink} onClick={handleClick}>
				{props.children}
		</a>
	)
}
