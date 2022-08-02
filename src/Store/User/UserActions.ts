import { createAsyncThunk } from '@reduxjs/toolkit'

import { AuthenticationKey } from '../../Context/ContextAuthentication'
import { getAuthorization } from '../../Tools/Authentication'
import { User, UserUpdateItems } from './UserReducer'

type GetInfoProps = {
	authenticationKey: AuthenticationKey
}

type UpdateInfoProps = {
	authenticationKey: AuthenticationKey
	user: UserUpdateItems
}

type GetInfo = {
	user: User
}

type UpdateInfo = {
	user: User
}

const getInfo = createAsyncThunk<GetInfo, GetInfoProps>('user#getInfo', async (props: GetInfoProps) => {
	const res = await fetch('/api/user', {
		method: 'GET',
		headers: {
			authorization: getAuthorization(props.authenticationKey),
		},
	})
	if (res.status !== 200) {
		throw new Error('Unable to get user info')
	}
	return await res.json()
})

const updateInfo = createAsyncThunk<UpdateInfo, UpdateInfoProps>('user#updateInfo', async (props) => {
	const res = await fetch('/api/user', {
		method: 'PATCH',
		headers: {
			authorization: getAuthorization(props.authenticationKey),
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(props.user),
	})
	if (res.status !== 200) {
		throw new Error('Unable to update user info')
	}
	return await res.json()
})

export const userActions = {
	getInfo,
	updateInfo,
}
