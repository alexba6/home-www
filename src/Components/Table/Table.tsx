import { FunctionComponent, ReactNode } from 'react'

import styles from './Table.module.sass'

type TableProps = {
	children: ReactNode
}

export const Table: FunctionComponent<TableProps> = (props) => {
	return (
		<div className={styles.tableContainer}>
			<table>
				{props.children}
			</table>
	</div>
	)
}
