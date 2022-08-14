import {Device} from "../../../../Store/Device/DeviceReducer";
import {createSlice} from "@reduxjs/toolkit";
import {poolModeActions} from "./ModeAction";


export enum PoolMode {
    ON = 'ON',
    OFF = 'OFF',
    AUTO = 'AUTO',
    STARTING = 'STARTING'
}

export type PoolModeStore = {
    deviceId: Device['id'],
    mode: PoolMode
    state: boolean
}

export type PoolModeStoreState = {
    devicesMode: PoolModeStore[]
}


export const poolModeStore = createSlice<PoolModeStoreState, any>({
    name: 'poolMode',
    initialState: {
        devicesMode: []
    },
    reducers: {},
    extraReducers: builder => {
        // Get mode
        builder.addCase(poolModeActions.get.fulfilled, (state, props) => {
            const deviceId = props.meta.arg.deviceId
            state.devicesMode = [...state.devicesMode.filter(deviceMode => deviceMode.deviceId !== deviceId), {
                deviceId,
                ...props.payload
            }]
        })

        // Set mode
        builder.addCase(poolModeActions.set.fulfilled, (state, props) => {
            const deviceId = props.meta.arg.deviceId
            state.devicesMode = [...state.devicesMode.filter(deviceMode => deviceMode.deviceId !== deviceId), {
                deviceId,
                ...props.payload
            }]
        })
    }
})
