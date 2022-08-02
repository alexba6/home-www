import { FunctionComponent } from 'react'
import { HomeStore } from '../../Store/Home/HomeReducer'

import styles from './HomeItem.module.sass'

type HomeItemProps = {
	home: HomeStore
	onOpen: () => void
}

type HomeGridProps = {
	homes: HomeStore[]
	onOpen: (home: HomeStore) => void
}

export const HomeItem: FunctionComponent<HomeItemProps> = (props) => {
	const { home, devicesId } = props.home

	return (
		<div className={styles.homeItemContainer} onClick={props.onOpen}>
			<div>
				<strong>{home.name}</strong>
			</div>
			<div className={styles.homeItemDetailsFrame}>
				<ul>{devicesId.length} appareils</ul>
			</div>
		</div>
	)
}

export const HomeGrid: FunctionComponent<HomeGridProps> = (props) => {
	return (
		<div className={styles.homeGridContainer}>
			{props.homes.map((home, key) => (
				<HomeItem key={key} home={home} onOpen={() => props.onOpen(home)} />
			))}
		</div>
	)
}
