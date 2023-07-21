import {AuthenticationKey} from "../../../Context/ContextAuthentication";
import {Device} from "../../Device/DeviceReducer";
import {ActionButtonGroupItem, ActionButtonGroupPayload} from "./ActionButtonGroupReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAuthorization} from "../../../Tools/Authentication";


type GetInfoProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    deviceType: Device['type']
    actionName: string
}

type GetInfo = {
    buttonGroup: ActionButtonGroupPayload
}

type SetGroupProps = {
    groupHash: ActionButtonGroupItem['hash']
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    deviceType: Device['type']
    actionName: string
}

type SetGroup = {
    buttonGroup: ActionButtonGroupPayload
}

const getInfo = createAsyncThunk<GetInfo, GetInfoProps>(
    'actionButtonGroup#getInfo',
    async (props) => {
        const res = await fetch(`/api/service/action/button-group/${props.actionName}/${props.deviceType}/${props.deviceId}`, {
            method: 'GET',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })

        if (res.status !== 200) {
            throw new Error('Cannot get info')
        }

        return await res.json()
    }
)

const setGroup = createAsyncThunk<SetGroup, SetGroupProps>(
    'actionButtonGroup#setGroup',
    async (props) => {
        const res = await fetch(`/api/service/action/button-group/${props.actionName}/${props.deviceType}/${props.deviceId}`, {
            method: 'POST',
            headers: {
                authorization: getAuthorization(props.authenticationKey),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                group: props.groupHash
            })
        })

        if (res.status !== 200) {
            throw new Error('Cannot set group')
        }

        return await res.json()
    }
)


export const actionButtonGroup = {
    getInfo,
    setGroup
}
