import {RootState} from "../index";


const store = (store: RootState) => {
    return store.authKeys
}

export const authKeySelector = {
    store
}
