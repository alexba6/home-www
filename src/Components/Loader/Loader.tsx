import { FunctionComponent } from 'react'

import styles from './Loarder.module.sass'

export const Loader: FunctionComponent = () =>  {
	return (
		<div className={styles.loader}>
			<div/><div/><div/>
		</div>
	)
}
