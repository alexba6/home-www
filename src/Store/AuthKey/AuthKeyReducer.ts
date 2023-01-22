import {createSlice} from "@reduxjs/toolkit";
import {authKeyAction} from "./AuthKeyActions";
import {StoreStatus} from "../type";


export type AuthKey = {
    id: string
    createdAt: Date
}

export type AuthKeyStore = {
    removing: boolean
    authKey: AuthKey
}

export type AuthKeyStoreState = {
    status: StoreStatus
    authKeys: AuthKeyStore[]
}


export const authKeyStore = createSlice<AuthKeyStoreState, any>({
    name: 'authKey',
    initialState: {
        status: StoreStatus.IDLE,
        authKeys:[]
    },
    reducers: {},
    extraReducers: builder => {
        // Get all
        builder.addCase(authKeyAction.getAll.pending, (state, props) => {
            state.status = StoreStatus.PENDING
        })
        builder.addCase(authKeyAction.getAll.rejected, (state, props) => {
            state.status = StoreStatus.ERROR
        })

        builder.addCase(authKeyAction.getAll.fulfilled, (state, props) => {
            state.status = StoreStatus.READY
            state.authKeys = props.payload.authKeys.map(authKey => ({
                removing: false,
                authKey
            }))
        })

        // Delete one
        builder.addCase(authKeyAction.deleteOne.pending, (state, props) => {
            const { authKeyId } = props.meta.arg
            const authKey = state.authKeys.find(authKey => authKey.authKey.id === authKeyId)
            if (authKey) {
                state.authKeys = [...state.authKeys.filter(authKey => authKey.authKey.id !== authKeyId), {
                    ...authKey,
                    removing: true
                }]
            }
        })
        builder.addCase(authKeyAction.deleteOne.fulfilled, (state, props) => {
            const { authKeyId } = props.meta.arg
            state.authKeys = state.authKeys.filter(authKey => authKey.authKey.id !== authKeyId)
        })
    }
})
