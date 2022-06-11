import { FunctionComponent, ReactNode } from 'react'

import styles from './CardForm.module.sass'

type CardFormProps = {
	children: ReactNode
}

export const CardForm: FunctionComponent<CardFormProps> = (props) => {
	return (
		<div className={styles.cardFormWrapper}>
			<div className={styles.cardFormContainer}>
				{props.children}
			</div>
		</div>
	)
}


export const CardFormOrSeparator: FunctionComponent = () => {
	return (
		<div className={styles.cardFormOrSeparator}>
			<label>OU</label>
		</div>
	)
}
