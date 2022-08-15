import { Device } from "../Device/DeviceReducer"
import { SensorBufferStore,  SensorValuesStore} from "./SensorReducer";
import {RootState} from "../index";



const getBuffer = (deviceId: Device['id'], name: string) => (store: RootState): SensorBufferStore | undefined => {
    return store.sensor.buffer.find(buffer => buffer.deviceId === deviceId && buffer.name === name)
}

const getValues = (deviceId: Device['id'], name: string) => (store: RootState): SensorValuesStore | undefined => {
    return store.sensor.values.find(values => values.deviceId === deviceId && values.name === name)
}

export const sensorSelector = {
    getBuffer,
    getValues
}
