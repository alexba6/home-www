import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthenticationKey } from "../../Context/ContextAuthentication"
import {HomeInfo} from "../Home/HomeReducer";
import { Device } from "./DeviceReducer";
import {getAuthorization} from "../../Tools/Authentication";

type GetAllProps = {
    authenticationKey: AuthenticationKey
    homeId: HomeInfo['id']
}

type GetOneProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
}

type UpdateOneProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    updatedDevice: {
        name?: Device['name']
        tags?: Device['tags']
        homeId?: HomeInfo
    }
}

type DeleteOneProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
}

type GetAll = {
    devices: {
      device: Device
      homeId: HomeInfo['id']
    }[]
}

type GetOne = {
    device: Device
    homeId: HomeInfo['id']
}

type UpdateOne = {
    device: Device
    homeId: HomeInfo['id']
}

const getAll = createAsyncThunk<GetAll, GetAllProps>(
    'device#getALl',
    async (props) => {
        const res = await fetch(`/api/device?homeId=${props.homeId}`, {
            method: 'GET',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 200) {
            throw new Error('Cannot get all device from home')
        }
        return await res.json()
    }
)

const getOne = createAsyncThunk<GetOne, GetOneProps>(
    'device#getOne',
    async (props) => {
        const res = await fetch(`/api/device/${props.deviceId}`, {
            method: 'GET',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 200) {
            throw new Error('Cannot get the device')
        }
        return await res.json()
    }
)

const updateOne = createAsyncThunk<UpdateOne, UpdateOneProps>(
    'device#updateOne',
    async (props) => {
        const res = await fetch(`/api/device/${props.deviceId}`, {
            method: 'PATCH',
            headers: {
                authorization: getAuthorization(props.authenticationKey),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.updatedDevice)
        })
        if (res.status !== 200) {
            throw new Error('Cannot update the device')
        }
        return await res.json()
    }
)

const deleteOne = createAsyncThunk<void, DeleteOneProps>(
    'device#deleteOne',
    async (props) => {
        const res = await fetch(`/api/device/${props.deviceId}`, {
            method: 'DELETE',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 204) {
            throw new Error('Cannot delete the device')
        }
    }
)

export const deviceActions = {
    getAll,
    getOne,
    updateOne,
    deleteOne
}
