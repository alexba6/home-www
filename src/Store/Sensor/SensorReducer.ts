import { createSlice } from "@reduxjs/toolkit"
import { Device } from "../Device/DeviceReducer"
import {sensorActions} from "./SensorActions";

export enum Unit {
    TEMPERATURE = 'TEMPERATURE',
}

export type Sensor = {
    id: string
    unit: Unit
    name: string
}

export type SensorValue = {
    min: number
    max: number
    average: number
    date: Date
}

export type SensorBuffer = [Date, number]

export type SensorValuesStore = {
    values: SensorValue[]
    sensorId: Sensor['id']
}

export type SensorBufferStore = {
    buffers: SensorBuffer[]
    sensorId: Sensor['id']
}

export type SensorStore = {
    deviceId: Device['id']
    sensors: Sensor[]
}

export type SensorStoreState = {
    sensors: SensorStore[]
    buffer: SensorBufferStore[]
    values: SensorValuesStore[]
}

export const sensorStore = createSlice<SensorStoreState, any>({
    name: 'sensor',
    initialState: {
        sensors: [],
        buffer: [],
        values: []
    },
    reducers: {},
    extraReducers: builder => {
        // Get available sensors
        builder.addCase(sensorActions.getAvailable.fulfilled, (state, props) => {
            const deviceId = props.meta.arg.deviceId
            state.sensors = [...state.sensors.filter(sensor => sensor.deviceId !== deviceId), {
                deviceId,
                sensors: props.payload.sensors
            }]
        })

        // Get buffer
        builder.addCase(sensorActions.getBuffer.fulfilled, (state, props) => {
            const sensorId = props.meta.arg.sensorId
            state.buffer = [...state.buffer.filter(buffer => buffer.sensorId !== sensorId), {
                sensorId,
                buffers: props.payload.values
            }]
        })

        // Get values
        builder.addCase(sensorActions.getValues.fulfilled, (state, props) => {
            const sensorId = props.meta.arg.sensorId
            state.values = [...state.values.filter(value => value.sensorId !== sensorId), {
                sensorId,
                values: props.payload.values
            }]
        })
    }
})
