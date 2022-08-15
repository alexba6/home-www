import { configureStore } from '@reduxjs/toolkit'

import { userStore } from './User/UserReducer'
import { homeStore } from './Home/HomeReducer'
import { deviceStore } from "./Device/DeviceReducer";
import {sensorStore} from "./Sensor/SensorReducer";
import {actionStore} from "./Action/ActionReducer";

export const store = configureStore({
	reducer: {
		user: userStore.reducer,
		home: homeStore.reducer,
		device: deviceStore.reducer,

		sensor: sensorStore.reducer,
		action: actionStore.reducer,

	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
