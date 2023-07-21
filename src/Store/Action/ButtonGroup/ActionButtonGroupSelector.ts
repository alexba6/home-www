import {Device} from "../../Device/DeviceReducer";
import {RootState} from "../../index";


const getActionStore = (deviceId: Device['id'], actionName: string) => (store: RootState) => {
    return store.actionButtonGroup.buttonGroups.find(action => action.deviceId === deviceId && action.actionName === actionName)
}


export const selectorActionButtonGroup = {
    getActionStore
}