import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthenticationKey } from "../../Context/ContextAuthentication"
import { getAuthorization } from "../../Tools/Authentication";
import { Device } from "../Device/DeviceReducer"
import { SensorBuffer, SensorValue} from "./SensorReducer";


type GetBufferProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    name: string
}

type GetBuffer = {
    values: SensorBuffer[]
}

type GetValuesProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    name: string
}

type GetValues = {
    values: SensorValue[]
}

const getBuffer = createAsyncThunk<GetBuffer, GetBufferProps>(
    'sensor#getBuffer',
    async (props) => {
        const res = await fetch(`/api/sensor/buffer/${props.deviceId}/${props.name}`, {
            method: 'GET',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 200) {
            throw new Error('Cannot get available sensors')
        }
        return await res.json()
    }
)

const getValues = createAsyncThunk<GetValues, GetValuesProps>(
    'sensor#getValue',
    async (props) => {
        const res = await fetch(`/api/sensor/values/${props.deviceId}/${props.name}`, {
            method: 'GET',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 200) {
            throw new Error('Cannot get available sensors')
        }
        return await res.json()
    }
)

export const sensorActions = {
    getBuffer,
    getValues
}
