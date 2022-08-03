import {createSlice, SerializedError } from "@reduxjs/toolkit"
import {deviceActions} from "./DeviceActions";
import {Home} from "../Home/HomeReducer";

export enum DeviceStatus {
	UPDATING = 'UPDATING',
	REMOVING = 'REMOVING',
	ERROR = 'ERROR',
	READY = 'READY',
}

export type Device = {
	id: string
	name: string
	type: string
	createdAt: Date
	ip: string
	tags: string[]
	online: boolean
}

export type DeviceStore<S = DeviceStatus> = {
	status: S
	device: Device
	homeId: Home['id']
} & (S extends DeviceStatus.ERROR ? {
	error: SerializedError
} : {})

export type DeviceStoreState = {
	devices: DeviceStore[]
}

export const deviceStore = createSlice<DeviceStoreState, any>({
	name: 'device',
	initialState: {
		devices: []
	},
	reducers: {},
	extraReducers: builder => {
		// Get all
		builder.addCase(deviceActions.getAll.fulfilled, (state, props) => ({
			devices: props.payload.devices.map(({device, homeId}) => ({
				status: DeviceStatus.READY,
				device,
				homeId
			}))
		}))

		// Get one
		builder.addCase(deviceActions.getOne.fulfilled, (state, props) => ({
			devices: [...state.devices.filter(deviceStore => deviceStore.device.id !== props.payload.device.id), {
				status: DeviceStatus.READY,
				device: props.payload.device,
				homeId: props.payload.homeId
			}]
		}))

		// Update one
		builder.addCase(deviceActions.updateOne.pending, (state, props) => {
			const deviceId = props.meta.arg.deviceId
			const updatedDeviceStore = state.devices.find(deviceStore => deviceStore.device.id === deviceId)
			if (!updatedDeviceStore) {
				return state
			}
			return {
				devices: [...state.devices.filter(deviceStore => deviceStore.device.id !== deviceId), {
					...updatedDeviceStore,
					status: DeviceStatus.UPDATING
				}]
			}
		})
		builder.addCase(deviceActions.updateOne.rejected, (state, props) => {
			const deviceId = props.meta.arg.deviceId
			const updatedDeviceStore = state.devices.find(deviceStore => deviceStore.device.id === deviceId)
			if (!updatedDeviceStore) {
				return state
			}
			return {
				devices: [...state.devices.filter(deviceStore => deviceStore.device.id !== deviceId), {
					...updatedDeviceStore,
					status: DeviceStatus.READY
				}]
			}
		})
		builder.addCase(deviceActions.updateOne.fulfilled, (state, props) => {
			const deviceId = props.meta.arg.deviceId
			const { device, homeId } = props.payload
			return {
				devices: [...state.devices.filter(deviceStore => deviceStore.device.id !== deviceId), {
					status: DeviceStatus.READY,
					device,
					homeId
				}]
			}
		})

		// Delete one
		builder.addCase(deviceActions.deleteOne.pending, (state, props) => {
			const deviceId = props.meta.arg.deviceId
			const removingDeviceStore = state.devices.find(deviceStore => deviceStore.device.id === deviceId)
			if (!removingDeviceStore) {
				return state
			}
			return {
				devices: [...state.devices.filter(deviceStore => deviceStore.device.id !== deviceId), {
					...removingDeviceStore,
					status: DeviceStatus.REMOVING
				}]
			}
		})
		builder.addCase(deviceActions.deleteOne.rejected, (state, props) => {
			const deviceId = props.meta.arg.deviceId
			const removingDeviceStore = state.devices.find(deviceStore => deviceStore.device.id === deviceId)
			if (!removingDeviceStore) {
				return state
			}
			return {
				devices: [...state.devices.filter(deviceStore => deviceStore.device.id !== deviceId), {
					...removingDeviceStore,
					status: DeviceStatus.READY
				}]
			}
		})
		builder.addCase(deviceActions.deleteOne.fulfilled, (state, props) => ({
			devices: [...state.devices.filter(deviceStore => deviceStore.device.id !== props.meta.arg.deviceId)]
		}))
	}
})
