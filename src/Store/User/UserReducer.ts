import {createSlice, SerializedError} from "@reduxjs/toolkit";
import {userActions} from "./UserActions";

export enum UserStoreStatus {
    IDLE = 'IDLE',
    PENDING = 'PENDING',
    UPDATING = 'UPDATING',
    REMOVING = 'REMOVING',
    ERROR = 'ERROR',
    READY = 'READY'
}

export type UserNotificationSettings = {
    enable: boolean
    sendByMail: boolean
}

export type User = {
    id: string
    email: string
    username: string
    firstname?: string
    lastname?: string
    emailVerified: boolean
    createdAt: Date
    lang: string
    notificationSettings: UserNotificationSettings
}


export type UserStoreState <S = UserStoreStatus> = {
    status: S
} & (S extends UserStoreStatus.IDLE ? {
    id?: User['id']
} : { id: User['id'] } )
& (S extends UserStoreStatus.READY ? {
    user: User
} : { user?: User } )
& (S extends UserStoreStatus.UPDATING ? {
    updatedUser: User
} : { })
& (S extends UserStoreStatus.ERROR ? {
    error: SerializedError
} : {})


export const userStore = createSlice<UserStoreState, any>({
    name: 'user',
    initialState: {
        status: UserStoreStatus.IDLE
    },
    reducers: {},
    extraReducers: builder => {
        // Get user info
        builder.addCase(userActions.getInfo.pending, () => ({
          status: UserStoreStatus.PENDING
        }))
        builder.addCase(userActions.getInfo.fulfilled, (state, props) => ({
            status: UserStoreStatus.READY,
            id: props.payload.user.id,
            user: props.payload.user
        }))
        builder.addCase(userActions.getInfo.rejected, (state, props) => ({
            ...state,
            status: UserStoreStatus.ERROR,
            error: props.error
        }))
    }
})


