import { RootState } from ".."
import { Device } from "../Device/DeviceReducer"

/**
 * @param deviceId
 * @param actionKey
 */
const buttonGroup = (deviceId: Device['id'], actionKey: string) => (store: RootState) => {
    return store.action.buttonGroups.find(buttonGroup => buttonGroup.deviceId === deviceId && buttonGroup.actionKey === actionKey)
}

export const actionSelector = {
    buttonGroup
}
