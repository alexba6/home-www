import {RootState} from "../index";


const getStore = (store: RootState) => store.googleOAth

const getInfo = (store: RootState) => store.googleOAth.info


export const googleOAuthSelector = {
    getStore,
    getInfo
}
