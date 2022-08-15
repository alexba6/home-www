import { AuthenticationKey } from "../../Context/ContextAuthentication"
import { Device } from "../Device/DeviceReducer"
import {ActionButtonGroup} from "./ActionReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAuthorization} from "../../Tools/Authentication";

type ButtonGroupGetProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    actionKey: string
}

type ButtonGroupGet = {
    action: ActionButtonGroup
}

type ButtonGroupPostProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    actionKey: string
    groupName: string
}

type ButtonGroupPost = {
    action: ActionButtonGroup
}

const buttonGroupGet = createAsyncThunk<ButtonGroupGet, ButtonGroupGetProps>(
    'action#buttonGroup#get',
    async (props) => {
        const res = await fetch(`/api/action/button-group/${props.deviceId}/${props.actionKey}`, {
            method: 'GET',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 200) {
            throw new Error('Cannot get action')
        }
        return await res.json()
    }
)

const buttonGroupPost = createAsyncThunk<ButtonGroupPost, ButtonGroupPostProps>(
    'action#buttonGroup#post',
    async (props) => {
        const res = await fetch(`/api/action/button-group/${props.deviceId}/${props.actionKey}`, {
            method: 'POST',
            headers: {
                authorization: getAuthorization(props.authenticationKey),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupName: props.groupName
            })
        })
        if (res.status !== 200) {
            throw new Error('Cannot get action')
        }
        return await res.json()
    }
)


export const actionActions = {
    buttonGroupGet,
    buttonGroupPost
}
