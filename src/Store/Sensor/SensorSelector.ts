import { Device } from "../Device/DeviceReducer"
import {Sensor, SensorBuffer} from "./SensorReducer";
import {RootState} from "../index";


const getSensor = (deviceId: Device['id'], sensorName: Sensor['name']) => (store: RootState): Sensor | undefined => {
    const sensorStore = store.sensor.sensors.find(sensor => sensor.deviceId === deviceId)
    if (sensorStore) {
        return sensorStore.sensors.find(sensor => sensor.name == sensorName)
    }
    return undefined
}

const getBuffer = (sensorId: Sensor['id'] | undefined) => (store: RootState): SensorBuffer[] | undefined => {
    return store.sensor.buffer.find(buffer => buffer.sensorId === sensorId)?.buffers
}

export const sensorSelector = {
    getSensor,
    getBuffer
}
