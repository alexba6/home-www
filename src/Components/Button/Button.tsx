import { FunctionComponent, ReactNode } from 'react'

import styles from './Button.module.sass'

type ButtonProps = {
	variant?: string,
	onClick: () => void,
	children: ReactNode
}

export const Button: FunctionComponent<ButtonProps> = (props) => {
	return (
		<button className={styles.button} onClick={props.onClick} variant={props.variant}>
			{props.children}
		</button>
	)
}
