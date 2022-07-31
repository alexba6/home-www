import { configureStore } from '@reduxjs/toolkit'

import {userStore} from "./User/UserReducer";

export const store = configureStore({
	reducer: {
		user: userStore.reducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
