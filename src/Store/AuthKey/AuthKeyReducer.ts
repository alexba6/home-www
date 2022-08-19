import {createSlice} from "@reduxjs/toolkit";
import {authKeyAction} from "./AuthKeyActions";


export enum AuthKeyStatus {
    IDLE = 'IDLE',
    PENDING = 'PENDING',
    READY = 'READY',
    ERROR = 'ERROR'
}

export type AuthKey = {
    id: string
    createdAt: Date
}

export type AuthKeyStoreState = {
    status: AuthKeyStatus
    authKeys: AuthKey[]
}


export const authKeyStore = createSlice<AuthKeyStoreState, any>({
    name: 'authKey',
    initialState: {
        status: AuthKeyStatus.IDLE,
        authKeys:[]
    },
    reducers: {},
    extraReducers: builder => {
        // Get all
        builder.addCase(authKeyAction.getAll.pending, (state, props) => {
            state.status = AuthKeyStatus.PENDING
        })
        builder.addCase(authKeyAction.getAll.rejected, (state, props) => {
            state.status = AuthKeyStatus.ERROR
        })

        builder.addCase(authKeyAction.getAll.fulfilled, (state, props) => {
            state.status = AuthKeyStatus.READY
            state.authKeys = props.payload.authKeys
        })

        // Delete one
        builder.addCase(authKeyAction.deleteOne.fulfilled, (state, props) => {
            const { authKeyId } = props.meta.arg
            state.authKeys = state.authKeys.filter(authKey => authKey.id !== authKeyId)
        })
    }
})
