import {createAsyncThunk} from "@reduxjs/toolkit";

import {AuthenticationKey} from "../../Context/ContextAuthentication";
import {getAuthorization} from "../../Tools/Authentication";
import {User} from "./UserReducer";

type GetInfoProps = {
    authenticationKey: AuthenticationKey
}

type GetInfo = {
    user: User
}

const getInfo = createAsyncThunk<GetInfo, GetInfoProps>(
    'user#getInfo',
    async (props: GetInfoProps) => {
        const res = await fetch('/api/user', {
            method: 'GET',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 200) {
            throw new Error('Unable to get user info')
        }
        return await res.json()
    }
)


export const userActions = {
    getInfo
}
