import { createSlice, SerializedError } from '@reduxjs/toolkit'
import { userActions } from './UserActions'
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
	status: S
} & (S extends StoreStatus.IDLE
	? {
			id?: User['id']
	  }
	: { id: User['id'] }) &
	(S extends StoreStatus.READY
		? {
				user: User
		  }
		: { user?: User }) &
	(S extends StoreStatus.UPDATING
		? {
				updatedUser: UserUpdateItems
		  }
		: {}) &
	(S extends StoreStatus.ERROR
		? {
				error: SerializedError
		  }
		: {})

export const userStore = createSlice<UserStoreState, any>({
	name: 'user',
	initialState: {
		status: StoreStatus.IDLE,
	},
	reducers: {},
	extraReducers: (builder) => {
		// Get user info
		builder.addCase(userActions.getInfo.pending, () => ({
			status: StoreStatus.PENDING,
		}))
		builder.addCase(userActions.getInfo.fulfilled, (state, props) => ({
			status: StoreStatus.READY,
			id: props.payload.user.id,
			user: props.payload.user,
		}))
		builder.addCase(userActions.getInfo.rejected, (state, props) => ({
			...state,
			status: StoreStatus.ERROR,
			error: props.error,
		}))

		// Update user info
		builder.addCase(userActions.updateInfo.pending, (state, props) => ({
			...state,
			status: StoreStatus.UPDATING,
			updatedUser: props.meta.arg.user,
		}))
		builder.addCase(userActions.updateInfo.fulfilled, (state, props) => ({
			status: StoreStatus.READY,
			id: props.payload.user.id,
			user: props.payload.user,
		}))
		builder.addCase(userActions.updateInfo.rejected, (state, props) => ({
			...state,
			status: StoreStatus.ERROR,
			error: props.error,
		}))
	},
})
