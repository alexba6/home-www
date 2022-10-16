import { createSlice, SerializedError } from '@reduxjs/toolkit'
import { homeActions } from './HomeActions'
import {Device} from "../Device/DeviceReducer";

export enum HomeStoreStatus {
	IDLE = 'IDLE',
	PENDING = 'PENDING',
	ERROR = 'ERROR',
	READY = 'READY'
}

export enum HomeStatus {
	UPDATING = 'UPDATING',
	REMOVING = 'REMOVING',
	ERROR = 'ERROR',
	READY = 'READY',
}

export type HomeInfo = {
	id: string
	name: string
	createdAt: Date
}

export type HomeStore<S = HomeStatus> = {
	status: S
	id: HomeInfo['id']
	home: HomeInfo
	devicesId: Device['id'][]
} & (S extends HomeStatus.ERROR
	? {
		error: SerializedError
	  }
	: {})

export type HomeStoreSate = {
	homes: HomeStore[]
	status: HomeStoreStatus
}

export const homeStore = createSlice<HomeStoreSate, any>({
	name: 'home',
	initialState: {
		homes: [],
		status: HomeStoreStatus.IDLE
	},
	reducers: {},
	extraReducers: (builder) => {
		// Get all homes
		builder.addCase(homeActions.getAll.pending, state => ({
			...state,
			status: HomeStoreStatus.PENDING
		}))
		builder.addCase(homeActions.getAll.rejected, state => ({
			...state,
			status: HomeStoreStatus.ERROR
		}))
		builder.addCase(homeActions.getAll.fulfilled, (state, props) => ({
			status: HomeStoreStatus.READY,
			homes: props.payload.homes.map(({ home, devicesId }) => ({
				status: HomeStatus.READY,
				home,
				id: home.id,
				devicesId,
			}))
		}))

		// Get one home
		builder.addCase(homeActions.getOne.pending, state => ({
			...state,
			status: HomeStoreStatus.PENDING
		}))
		builder.addCase(homeActions.getOne.rejected, state => ({
			...state,
			status: HomeStoreStatus.ERROR
		}))
		builder.addCase(homeActions.getOne.fulfilled, (state, props) => ({
			status: HomeStoreStatus.READY,
			homes: [
				...state.homes.filter((home) => home.home.id !== props.payload.home.id),
				{
					status: HomeStatus.READY,
					home: props.payload.home,
					id: props.payload.home.id,
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

		// Search
		builder.addCase(homeActions.search.pending, state => ({
			...state,
			status: HomeStoreStatus.PENDING
		}))
		builder.addCase(homeActions.search.rejected, state => ({
			...state,
			status: HomeStoreStatus.ERROR
		}))
		builder.addCase(homeActions.search.fulfilled, (state, props) => {
			const homes = props.payload.homes
			const homeIds = homes.map(home => home.home.id)
			return {
				status: HomeStoreStatus.READY,
				homes: [
					...state.homes.filter(home => homeIds.indexOf(home.home.id) === -1),
					...homes.map(({ home, devicesId}) => ({
						status: HomeStatus.READY, home, devicesId, id: home.id
					}))
				]
			}

		})
	},
})
