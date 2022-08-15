import { createSlice } from "@reduxjs/toolkit"
import { Device } from "../Device/DeviceReducer"
import {sensorActions} from "./SensorActions";

export enum SensorStatus {
    IDLE = 'IDLE',
    READY = 'READY',
    PENDING = 'PENDING',
    ERROR = 'ERROR'
}

export type SensorValue = {
    min: number
    max: number
    average: number
    date: Date
}

export type SensorBuffer = [Date, number]

export type SensorUniqueKeys = {
    deviceId: Device['id']
    name: string
}

export type SensorValuesStore = SensorUniqueKeys & {
    values: SensorValue[]
    status: SensorStatus
}

export type SensorBufferStore = SensorUniqueKeys & {
    buffers: SensorBuffer[]
    status: SensorStatus
}

export type SensorStoreState = {
    buffer: SensorBufferStore[]
    values: SensorValuesStore[]
}

export const sensorStore = createSlice<SensorStoreState, any>({
    name: 'sensor',
    initialState: {
        buffer: [],
        values: []
    },
    reducers: {},
    extraReducers: builder => {
        // Get buffer
        builder.addCase(sensorActions.getBuffer.pending, (state, props) => {
            const { deviceId, name } = props.meta.arg
            state.buffer = [...state.buffer.filter(buffer => buffer.deviceId !== deviceId && buffer.name !== name), {
                buffers: [],
                status: SensorStatus.PENDING,
                deviceId,
                name
            }]
        })
        builder.addCase(sensorActions.getBuffer.fulfilled, (state, props) => {
            const { deviceId, name } = props.meta.arg
            state.buffer = [...state.buffer.filter(buffer => buffer.deviceId !== deviceId && buffer.name !== name), {
                buffers: props.payload.values,
                status: SensorStatus.READY,
                deviceId,
                name
            }]
        })
        builder.addCase(sensorActions.getBuffer.rejected, (state, props) => {
            const { deviceId, name } = props.meta.arg
            state.buffer = [...state.buffer.filter(buffer => buffer.deviceId !== deviceId && buffer.name !== name), {
                buffers: [],
                status: SensorStatus.ERROR,
                deviceId,
                name
            }]
        })

        // Get values
        builder.addCase(sensorActions.getValues.pending, (state, props) => {
            const { deviceId, name } = props.meta.arg
            state.values = [...state.values.filter(value => value.deviceId !== deviceId && value.name !== name), {
                values: [],
                status: SensorStatus.PENDING,
                deviceId,
                name
            }]
        })
        builder.addCase(sensorActions.getValues.fulfilled, (state, props) => {
            const { deviceId, name } = props.meta.arg
            state.values = [...state.values.filter(value => value.deviceId !== deviceId && value.name !== name), {
                values: props.payload.values,
                status: SensorStatus.READY,
                deviceId,
                name
            }]
        })
        builder.addCase(sensorActions.getValues.rejected, (state, props) => {
            const { deviceId, name } = props.meta.arg
            state.values = [...state.values.filter(value => value.deviceId !== deviceId && value.name !== name), {
                values: [],
                status: SensorStatus.ERROR,
                deviceId,
                name
            }]
        })
    }
})
