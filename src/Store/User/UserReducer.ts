import {createSlice} from "@reduxjs/toolkit";

export enum UserStoreStatus {
    IDLE = 'IDLE',
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
    firstname: string
    lastname: string
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


export const userStore = createSlice<UserStoreState, any>({
    name: 'user',
    initialState: {
        status: UserStoreStatus.IDLE
    },
    reducers: {},
    extraReducers: builder => {

    }
})


