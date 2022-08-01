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

export type UserUpdateItems = {
    email?: User['email'],
    username?: User['username'],
    firstName?: User['firstName'],
    lastName?: User['lastName']
}

export type User = {
    id: string
    email: string
    username: string
    firstName: string | null
    lastName: string | null
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
    updatedUser: UserUpdateItems
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

        // Update user info
        builder.addCase(userActions.updateInfo.pending, (state, props) => ({
            ...state,
            status: UserStoreStatus.UPDATING,
            updatedUser: props.meta.arg.user
        }))
        builder.addCase(userActions.updateInfo.fulfilled, (state, props) => ({
            status: UserStoreStatus.READY,
            id: props.payload.user.id,
            user: props.payload.user
        }))
        builder.addCase(userActions.updateInfo.rejected, (state, props) => ({
            ...state,
            status: UserStoreStatus.ERROR,
            error: props.error
        }))
    }
})


