import { RootState } from '../index'
import {User, UserStoreState} from './UserReducer'
import {StoreStatus} from "../type";

/**
 * @param store
 */
const store =  (store: RootState): UserStoreState => store.user

/**
 * @param store
 */
const status =  (store: RootState): StoreStatus => store.user.status

/**
 * @param store
 */
const info = (store: RootState): User | undefined => store.user.user


export const userSelector = {
    info,
    status,
    store
}
