import {StoreStatus} from "../type";
import {createSlice} from "@reduxjs/toolkit";
import {googleOAuthActions} from "./GoogleOAuthAction";

export type GoogleOAuth = {
    id: string
    gId: string
    givenName: string
    familyName: string
    pictureUrl: string
    locale: string
    linkedAt: string
}

type GoogleOAuthStoreState<S = StoreStatus> = {
    status: S,
    info: S extends StoreStatus.READY ? GoogleOAuth : GoogleOAuth | null,
}

export const googleOAuthReducer = createSlice<GoogleOAuthStoreState, any>({
    name: 'googleOAuth',
    initialState: {
        status: StoreStatus.IDLE,
        info: null
    },
    reducers: {},
    extraReducers: builder => {
        // Get information
        builder.addCase(googleOAuthActions.getInfo.pending, (state) => ({
            ...state,
            status: StoreStatus.PENDING,
        }))
        builder.addCase(googleOAuthActions.getInfo.fulfilled, (state, props) => ({
            status: StoreStatus.READY,
            info: props.payload.googleOAuth
        }))
        builder.addCase(googleOAuthActions.getInfo.rejected, (state) => ({
            ...state,
            status: StoreStatus.ERROR
        }))
    }
})
