import {RootState, store} from "../index";
import {Home, HomeStore, HomeStoreSate} from "./HomeReducer";

/**
 * @param store
 */
export const homeSelectAll = (store: RootState): HomeStore[] => store.home.homes

/**
 * @param store
 */
export const homeSelectStore = (store: RootState): HomeStoreSate => store.home

/**
 * @param homeId
 */
export const homeSelectOne = (homeId: Home['id'] | undefined) => (store: RootState): HomeStore | undefined => {
    return store.home.homes.find((homeStore: HomeStore) => homeStore.home.id === homeId)
}
