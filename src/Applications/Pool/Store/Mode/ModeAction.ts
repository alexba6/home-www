import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthenticationKey } from "../../../../Context/ContextAuthentication"
import { Device } from "../../../../Store/Device/DeviceReducer"
import {PoolMode} from "./ModeReducer";
import {getAuthorization} from "../../../../Tools/Authentication";


type GetModeProps = {
    authenticationKey: AuthenticationKey,
    deviceId: Device['id']
}

type GetMode = {
    mode: PoolMode
    state: boolean
}

type SetModeProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    mode: PoolMode
}

type SetMode = {
    mode: PoolMode
    state: boolean
}

const get = createAsyncThunk<GetMode, GetModeProps>(
    'poolMode#get',
    async (props) => {
        const res = await fetch(`/app-pool/mode?deviceId=${props.deviceId}`, {
            method: 'GET',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 200) {
            throw new Error('Cannot get mode')
        }
        return await res.json()
    }
)

const set = createAsyncThunk<SetMode, SetModeProps>(
    'poolMode#set',
    async (props) => {
        const res = await fetch(`/app-pool/mode?deviceId=${props.deviceId}`, {
            method: 'POST',
            headers: {
                authorization: getAuthorization(props.authenticationKey),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mode: props.mode
            })
        })
        if (res.status !== 200) {
            throw new Error('Cannot get mode')
        }
        return await res.json()
    }
)

export const poolModeActions = {
    get,
    set
}
