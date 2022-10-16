import {HomeInfo} from "../Home/HomeReducer";
import {RootState} from "../index";
import {Device, DeviceStore} from "./DeviceReducer";

/**
 * @param homeId
 */
export const deviceSelectFromHome = (homeId: HomeInfo['id'] | undefined) => (store: RootState): DeviceStore[] => {
    return store.device.devices.filter(deviceStore => deviceStore.homeId === homeId)
}

/**
 * @param deviceId
 */
export const deviceSelectById = (deviceId: Device['id'] | undefined) => (store: RootState): DeviceStore | undefined => {
    return store.device.devices.find(deviceStore => deviceStore.device.id === deviceId)
}
