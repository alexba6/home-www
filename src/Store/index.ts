import { configureStore } from '@reduxjs/toolkit'

import {userStore} from "./User/UserReducer";
import {homeStore} from "./Home/HomeReducer";

export const store = configureStore({
	reducer: {
		user: userStore.reducer,
		home: homeStore.reducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
