import { FunctionComponent, ReactNode } from 'react'

import styles from './Card.module.sass'

type CardProps = {
	children: ReactNode
}

type CardHeaderProps = {
	children: ReactNode
}

export const Card: FunctionComponent<CardProps> = (props) => {
	return (
		<div className={styles.cardContainer}>
			<div className={styles.cardFrame}>{props.children}</div>
		</div>
	)
}

export const CardHeader: FunctionComponent<CardHeaderProps> = (props) => {
	return <div className={styles.cardHeaderContainer}>{props.children}</div>
}
