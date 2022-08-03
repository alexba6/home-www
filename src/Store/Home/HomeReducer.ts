import { createSlice, SerializedError } from '@reduxjs/toolkit'
import { homeActions } from './HomeActions'
import {Device} from "../Device/DeviceReducer";

export enum HomeStatus {
	UPDATING = 'UPDATING',
	REMOVING = 'REMOVING',
	ERROR = 'ERROR',
	READY = 'READY',
}

export type Home = {
	id: string
	name: string
	createdAt: Date
}

export type HomeStore<S = HomeStatus> = {
	status: S
	home: Home
	devicesId: Device['id'][]
} & (S extends HomeStatus.ERROR
	? {
			error: SerializedError
	  }
	: {})

export type HomeStoreSate = {
	homes: HomeStore[]
}

export const homeStore = createSlice<HomeStoreSate, any>({
	name: 'home',
	initialState: {
		homes: [],
	},
	reducers: {},
	extraReducers: (builder) => {
		// Get all homes
		builder.addCase(homeActions.getAll.fulfilled, (state, props) => ({
			homes: props.payload.homes.map(({ home, devicesId }) => ({
				status: HomeStatus.READY,
				home,
				devicesId,
			})),
		}))

		// Get one home
		builder.addCase(homeActions.getOne.fulfilled, (state, props) => ({
			...state,
			homes: [
				...state.homes.filter((home) => home.home.id !== props.payload.home.id),
				{
					status: HomeStatus.READY,
					home: props.payload.home,
					devicesId: props.payload.devicesId,
				},
			],
		}))

		// Add home
		builder.addCase(homeActions.add.fulfilled, (state, props) => ({
			...state,
			homes: [
				...state.homes,
				{
					status: HomeStatus.READY,
					id: props.payload.home.id,
					home: props.payload.home,
					devicesId: [],
				},
			],
		}))
	},
})
