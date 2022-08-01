import {createSlice, SerializedError } from "@reduxjs/toolkit"
import {homeActions} from "./HomeActions";

export enum HomeStoreStatus {
    IDLE = 'IDLE',
    PENDING = 'PENDING',
    ERROR = 'ERROR',
    READY = 'READY'
}

export enum HomeStatus {
    IDLE = 'IDLE',
    PENDING = 'PENDING',
    UPDATING = 'UPDATING',
    REMOVING = 'REMOVING',
    ERROR = 'ERROR',
    READY = 'READY'
}

export type Home = {
    id: string
    name: string
    createdAt: Date
}

export type HomeStore<S = HomeStatus> = {
    status: S
    home: Home
    devicesId: string[]
}
& ( S extends HomeStatus.ERROR ? {
    error: SerializedError
} : {})

export type HomeStoreSate<S = HomeStoreStatus> = {
    status: S,
    homes: HomeStore[]
} & ( S extends HomeStoreStatus.ERROR ? {
    error: SerializedError
} : {})

export const homeStore = createSlice<HomeStoreSate, any>({
    name: 'home',
    initialState: {
        status: HomeStoreStatus.IDLE,
        homes: []
    },
    reducers: {},
    extraReducers: builder => {
        // Get all homes
        builder.addCase(homeActions.getAll.pending, state => ({
            ...state,
            status: HomeStoreStatus.PENDING,
        }))
        builder.addCase(homeActions.getAll.fulfilled, (state, props) => ({
            status: HomeStoreStatus.READY,
            homes: props.payload.homes.map(({home, devicesId}) => ({
                id: home.id,
                status: HomeStatus.READY,
                home,
                devicesId
            }))
        }))
        builder.addCase(homeActions.getAll.rejected, (state, props) => ({
            ...state,
            status: HomeStoreStatus.ERROR,
            error: props.error
        }))

        // Add home
        builder.addCase(homeActions.add.fulfilled, (state, props) => ({
            ...state,
            homes: [...state.homes, {
                status: HomeStatus.READY,
                id: props.payload.home.id,
                home: props.payload.home,
                devicesId: []
            }]
        }))
    }
})
