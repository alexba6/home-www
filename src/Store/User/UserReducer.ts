import {createSlice} from '@reduxjs/toolkit'
import {userActions} from './UserActions'
import {StoreStatus} from "../type";


export type UserNotificationSettings = {
	enable: boolean
	sendByMail: boolean
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

export type UserUpdateItems = {
	email?: User['email']
	username?: User['username']
	firstName?: User['firstName']
	lastName?: User['lastName']
}

export type UserStoreState<S = StoreStatus> = {
	status: S,
	info: S extends (StoreStatus.READY | StoreStatus.UPDATING) ? User : User | null,
	updatedInfo: S extends StoreStatus.UPDATING ? UserUpdateItems : UserUpdateItems | null
}

export const userStore = createSlice<UserStoreState, any>({
	name: 'user',
	initialState: {
		status: StoreStatus.IDLE,
		info: null,
		updatedInfo: null
	},
	reducers: {},
	extraReducers: (builder) => {
		// Get user info
		builder.addCase(userActions.getInfo.pending, (state, props) => ({
			...state,
			status: StoreStatus.PENDING
		}))
		builder.addCase(userActions.getInfo.fulfilled, (state, props) => ({
			...state,
			status: StoreStatus.READY,
			info: props.payload.user
		}))
		builder.addCase(userActions.getInfo.rejected, (state, props) => ({
			...state,
			status: StoreStatus.ERROR
		}))

		// Update user info
		builder.addCase(userActions.updateInfo.pending, (state, props) => ({
			...state,
			status: StoreStatus.UPDATING,
			updatedInfo: props.meta.arg.user
		}))
		builder.addCase(userActions.updateInfo.fulfilled, (state, props) => ({
			status: StoreStatus.READY,
			info: props.payload.user,
			updatedInfo: null
		}))
		builder.addCase(userActions.updateInfo.rejected, (state, props) => ({
			...state,
			status: StoreStatus.ERROR
		}))
	},
})
