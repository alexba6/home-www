import {AuthenticationKey} from "../../Context/ContextAuthentication";
import {GoogleOAuth} from "./GoogleOAuthReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAuthorization} from "../../Tools/Authentication";


type GetInfoProps = {
    authenticationKey: AuthenticationKey
}

type GetInfo = {
    googleOAuth: GoogleOAuth
}

const getInfo = createAsyncThunk<GetInfo, GetInfoProps>('googleOAuth#getInfo', async (props) => {
    const res = await fetch('/api/google', {
        method: 'GET',
        headers: {
            authorization: getAuthorization(props.authenticationKey)
        }
    })
    if (res.status !== 200) {
        throw new Error('Cannot get google OAuth information')
    }
    return await res.json()
})


export const googleOAuthActions = {
    getInfo
}
