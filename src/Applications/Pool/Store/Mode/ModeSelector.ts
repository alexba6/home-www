import { Device } from "../../../../Store/Device/DeviceReducer";
import {RootState} from "../../../../Store";
import {PoolModeStore} from "./ModeReducer";


const getMode = (deviceId: Device['id']) =>  (store: RootState): PoolModeStore | undefined => {
    return store.poolMode.devicesMode.find(deviceMode => deviceMode.deviceId === deviceId)
}

export const poolModeSelector = {
    getMode
}
