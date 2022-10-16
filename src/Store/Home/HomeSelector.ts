import { RootState } from '../index'
import { HomeInfo, HomeStore, HomeStoreSate } from './HomeReducer'

/**
 * @param store
 */
const getAll = (store: RootState): HomeStore[] => store.home.homes

/**
 * @param store
 */
const getStore = (store: RootState): HomeStoreSate => store.home

/**
 * @param pattern
 */
const search = (pattern: string) => (store: RootState): HomeStore[] => store.home.homes.filter(home => home.home.name.toLowerCase().search(pattern.toLowerCase()) > -1)

/**
 * @param homeId
 */
const getOne =
	(homeId: HomeInfo['id'] | undefined) =>
	(store: RootState): HomeStore | undefined => {
		return store.home.homes.find((homeStore: HomeStore) => homeStore.home.id === homeId)
	}

export const homeSelector = {
	getAll,
	getStore,
	search,
	getOne
}
