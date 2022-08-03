import {Home} from "../Home/HomeReducer";
import {RootState} from "../index";
import {DeviceStore} from "./DeviceReducer";

/**
 * @param homeId
 */
export const deviceSelectFromHome = (homeId: Home['id'] | undefined) => (store: RootState): DeviceStore[] => {
    return store.device.devices.filter(deviceStore => deviceStore.homeId === homeId)
}
