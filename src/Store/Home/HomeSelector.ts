import {RootState} from "../index";
import {HomeStore, HomeStoreSate} from "./HomeReducer";

/**
 * @param store
 */
export const homeSelectAll = (store: RootState): HomeStore[] => store.home.homes

/**
 * @param store
 */
export const homeSelectStore = (store: RootState): HomeStoreSate => store.home
