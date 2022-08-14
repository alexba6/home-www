import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthenticationKey } from "../../Context/ContextAuthentication"
import { getAuthorization } from "../../Tools/Authentication";
import { Device } from "../Device/DeviceReducer"
import {Sensor, SensorBuffer, SensorValue} from "./SensorReducer";


type GetAvailableProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
}

type GetAvailable = {
    sensors: Sensor[]
}

type GetBufferProps = {
    authenticationKey: AuthenticationKey
    sensorId: Sensor['id']
}

type GetBuffer = {
    values: SensorBuffer[]
}

type GetValuesProps = {
    authenticationKey: AuthenticationKey
    sensorId: Sensor['id']
}

type GetValues = {
    values: SensorValue[]
}

const getAvailable = createAsyncThunk<GetAvailable, GetAvailableProps>(
    'sensor#getAvailable',
    async (props) => {
        const res = await fetch(`/api/sensor/available/${props.deviceId}`, {
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

const getBuffer = createAsyncThunk<GetBuffer, GetBufferProps>(
    'sensor#getBuffer',
    async (props) => {
        const res = await fetch(`/api/sensor/buffer/${props.sensorId}`, {
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
        const res = await fetch(`/api/sensor/values/${props.sensorId}`, {
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
    getAvailable,
    getBuffer,
    getValues
}
