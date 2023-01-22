import {RootState} from "../index";

/**
 * @param store
 */
const store = (store: RootState) => store.authKeys

/**
 * @param store
 */
const status = (store: RootState) => store.authKeys.status

/**
 * @param store
 */
const authKeys = (store: RootState) => store.authKeys.authKeys

export const authKeySelector = {
    store,
    status,
    authKeys
}
