import {createSlice} from "@reduxjs/toolkit"
import {Device} from "../Device/DeviceReducer"
import {actionActions} from "./ActionAction";

export enum ActionStatus {
    IDLE = 'IDLE',
    READY = 'READY',
    PENDING = 'PENDING',
    ERROR = 'ERROR'
}


export type ActionStoreWrapper<A> = {
    deviceId: Device['id']
    actionKey: string
    status: ActionStatus.IDLE | ActionStatus.PENDING | ActionStatus.ERROR
} | {
    deviceId: Device['id']
    actionKey: string
    status: ActionStatus.READY
    action: A
}

export type ActionButtonGroup = {
    state: boolean
    freeze?: boolean
    enableGroup: string
}

export type ActionStoreState = {
    buttonGroups: ActionStoreWrapper<ActionButtonGroup>[]
}

export const actionStore = createSlice<ActionStoreState, any>({
    name: 'action',
    initialState: {
        buttonGroups: []
    },
    reducers: {},
    extraReducers: builder => {
        // Button group get
        builder.addCase(actionActions.buttonGroupGet.pending, (state, props) => {
            const { deviceId, actionKey } = props.meta.arg
            state.buttonGroups = [...state.buttonGroups.filter(buttonGroup => buttonGroup.deviceId !== deviceId && buttonGroup.actionKey !== actionKey), {
                deviceId,
                actionKey,
                status: ActionStatus.PENDING,
            }]
        })
        builder.addCase(actionActions.buttonGroupGet.rejected, (state, props) => {
            const { deviceId, actionKey } = props.meta.arg
            state.buttonGroups = [...state.buttonGroups.filter(buttonGroup => buttonGroup.deviceId !== deviceId && buttonGroup.actionKey !== actionKey), {
                deviceId,
                actionKey,
                status: ActionStatus.ERROR,
            }]
        })
        builder.addCase(actionActions.buttonGroupGet.fulfilled, (state, props) => {
            const { deviceId, actionKey } = props.meta.arg
            state.buttonGroups = [...state.buttonGroups.filter(buttonGroup => buttonGroup.deviceId !== deviceId && buttonGroup.actionKey !== actionKey), {
                deviceId,
                actionKey,
                status: ActionStatus.READY,
                action: props.payload.action
            }]
        })

        // Button group post
        builder.addCase(actionActions.buttonGroupPost.pending, (state, props) => {
            const { deviceId, actionKey } = props.meta.arg
            state.buttonGroups = [...state.buttonGroups.filter(buttonGroup => buttonGroup.deviceId !== deviceId && buttonGroup.actionKey !== actionKey), {
                deviceId,
                actionKey,
                status: ActionStatus.PENDING
            }]
        })
        builder.addCase(actionActions.buttonGroupPost.rejected, (state, props) => {
            const { deviceId, actionKey } = props.meta.arg
            state.buttonGroups = [...state.buttonGroups.filter(buttonGroup => buttonGroup.deviceId !== deviceId && buttonGroup.actionKey !== actionKey), {
                deviceId,
                actionKey,
                status: ActionStatus.ERROR
            }]
        })
        builder.addCase(actionActions.buttonGroupPost.fulfilled, (state, props) => {
            const { deviceId, actionKey } = props.meta.arg
            state.buttonGroups = [...state.buttonGroups.filter(buttonGroup => buttonGroup.deviceId !== deviceId && buttonGroup.actionKey !== actionKey), {
                deviceId,
                actionKey,
                status: ActionStatus.READY,
                action: props.payload.action
            }]
        })
    }
})
