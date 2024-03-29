import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthenticationKey } from '../../Context/ContextAuthentication'
import { HomeInfo } from './HomeReducer'
import { getAuthorization } from '../../Tools/Authentication'
import {Device} from "../Device/DeviceReducer";

type GetALlProps = {
	authenticationKey: AuthenticationKey
}

type GetOneProps = {
	authenticationKey: AuthenticationKey
	homeId: HomeInfo['id']
}

type AddProps = {
	authenticationKey: AuthenticationKey
	home: {
		name: HomeInfo['name']
	}
}

type GetAll = {
	homes: {
		home: HomeInfo
		devicesId: Device['id'][]
	}[]
}

type GetOne = {
	home: HomeInfo
	devicesId: Device['id'][]
}

type Add = {
	home: HomeInfo
}

type SearchProps = {
	authenticationKey: AuthenticationKey
	pattern: string
}

type Search = {
	homes: {
		home: HomeInfo
		devicesId: Device['id'][]
	}[]
}

const getAll = createAsyncThunk<GetAll, GetALlProps>('home#getAll', async (props) => {
	const res = await fetch('/api/home', {
		method: 'GET',
		headers: {
			authorization: getAuthorization(props.authenticationKey),
		},
	})
	if (res.status !== 200) {
		throw new Error('Cannot get homes')
	}
	return await res.json()
})

const getOne = createAsyncThunk<GetOne, GetOneProps>('home#getOne', async (props) => {
	const res = await fetch(`/api/home/${props.homeId}`, {
		method: 'GET',
		headers: {
			authorization: getAuthorization(props.authenticationKey),
		},
	})
	if (res.status !== 200) {
		throw new Error('Cannot get homes')
	}
	return await res.json()
})

const add = createAsyncThunk<Add, AddProps>('home#add', async (props) => {
	const res = await fetch('/api/home', {
		method: 'POST',
		headers: {
			authorization: getAuthorization(props.authenticationKey),
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(props.home),
	})
	if (res.status !== 201) {
		throw new Error('Cannot add new home')
	}
	return await res.json()
})

const search = createAsyncThunk<Search, SearchProps>('home#search', async (props) => {
	const res = await fetch(`/api/home/search?pattern=${props.pattern}`, {
		method: 'GET',
		headers: {
			authorization: getAuthorization(props.authenticationKey)
		}
	})
	// if (res.status !== 200) {
	// 	throw new Error('Cannot search homes')
	// }
	return await res.json()
})

export const homeActions = {
	getAll,
	add,
	getOne,
	search
}
