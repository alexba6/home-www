import {ActionState} from "../ActionType";
import {Device} from "../../Device/DeviceReducer";
import {createSlice, SerializedError} from "@reduxjs/toolkit";
import {actionButtonGroup} from "./ActionButtonGroupAction";

export type ActionButtonGroupItem = {
    hash: string
}

export type ActionButtonGroupPayload = {
    groups: ActionButtonGroupItem[]
    currentGroup: ActionButtonGroupItem['hash']
    locked: boolean
}

export type ActionButtonGroupStoreTemplate<S extends ActionState> = {
    actionName: string
    deviceType: Device['type']
    deviceId: Device['id']
    status: S
    payload: S extends ActionState.READY  ? ActionButtonGroupPayload : unknown
    error: S extends ActionState.ERROR ? SerializedError : unknown
}
type ActionButtonGroupStore =
        ActionButtonGroupStoreTemplate<ActionState.IDLE>
    |   ActionButtonGroupStoreTemplate<ActionState.UPDATING>
    |   ActionButtonGroupStoreTemplate<ActionState.READY>
    |   ActionButtonGroupStoreTemplate<ActionState.ERROR>
    |   ActionButtonGroupStoreTemplate<ActionState.FETCHING>

export type  ActionButtonGroupStoreState = {
    buttonGroups: ActionButtonGroupStore[]
}

const buttonGroupSearch = (deviceId: Device['id'], actionName: string) => (action: ActionButtonGroupStore) => action.deviceId !== deviceId && action.actionName !== actionName

export const actionButtonGroupStore = createSlice<ActionButtonGroupStoreState, any>({
    name: 'actionButtonGroup',
    initialState: {
        buttonGroups: []
    },
    reducers: [],
    extraReducers: builder => {
        // Get info
        builder.addCase(actionButtonGroup.getInfo.pending, (state, payload) => {
            const arg = payload.meta.arg

            return {
                buttonGroups: [...state.buttonGroups.filter(buttonGroupSearch(arg.deviceId, arg.actionName)), {
                    actionName: arg.actionName,
                    deviceType: arg.deviceType,
                    deviceId: arg.deviceId,
                    status: ActionState.FETCHING,
                    payload: undefined,
                    error: null
                }]
            }
        })
        builder.addCase(actionButtonGroup.getInfo.rejected, (state, payload) => {
            const arg = payload.meta.arg

            return {
                buttonGroups: [...state.buttonGroups.filter(buttonGroupSearch(arg.deviceId, arg.actionName)), {
                    actionName: arg.actionName,
                    deviceType: arg.deviceType,
                    deviceId: arg.deviceId,
                    status: ActionState.ERROR,
                    payload: state.buttonGroups.find(buttonGroupSearch(arg.deviceId, arg.actionName))?.payload,
                    error: payload.error
                }]
            }
        })
        builder.addCase(actionButtonGroup.getInfo.fulfilled, (state, payload) => {
            const arg = payload.meta.arg

            return {
                buttonGroups: [...state.buttonGroups.filter(buttonGroupSearch(arg.deviceId, arg.actionName)), {
                    actionName: arg.actionName,
                    deviceType: arg.deviceType,
                    deviceId: arg.deviceId,
                    status: ActionState.READY,
                    payload: payload.payload.buttonGroup,
                    error: null
                }]
            }
        })


        // Set group
        builder.addCase(actionButtonGroup.setGroup.pending, (state, payload) => {
            const arg = payload.meta.arg

            return {
                buttonGroups: [...state.buttonGroups.filter(buttonGroupSearch(arg.deviceId, arg.actionName)), {
                    actionName: arg.actionName,
                    deviceType: arg.deviceType,
                    deviceId: arg.deviceId,
                    status: ActionState.UPDATING,
                    payload: state.buttonGroups.find(buttonGroupSearch(arg.deviceId, arg.actionName))?.payload,
                    error: null
                }]
            }
        })
        builder.addCase(actionButtonGroup.setGroup.rejected, (state, payload) => {
            const arg = payload.meta.arg

            return {
                buttonGroups: [...state.buttonGroups.filter(buttonGroupSearch(arg.deviceId, arg.actionName)), {
                    actionName: arg.actionName,
                    deviceType: arg.deviceType,
                    deviceId: arg.deviceId,
                    status: ActionState.ERROR,
                    payload: state.buttonGroups.find(buttonGroupSearch(arg.deviceId, arg.actionName))?.payload,
                    error: payload.error
                }]
            }
        })
        builder.addCase(actionButtonGroup.setGroup.fulfilled, (state, payload) => {
            const arg = payload.meta.arg

            return {
                buttonGroups: [...state.buttonGroups.filter(buttonGroupSearch(arg.deviceId, arg.actionName)), {
                    actionName: arg.actionName,
                    deviceType: arg.deviceType,
                    deviceId: arg.deviceId,
                    status: ActionState.READY,
                    payload: payload.payload.buttonGroup,
                    error: null
                }]
            }
        })

    }
})