import {AuthenticationKey} from "../../Context/ContextAuthentication";
import {AuthKey} from "./AuthKeyReducer";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAuthorization} from "../../Tools/Authentication";


type GetAllProps = {
    authenticationKey: AuthenticationKey
}

type GetAll = {
authKeys: AuthKey[]
}

type DeleteOneProps = {
    authenticationKey: AuthenticationKey
    authKeyId: AuthKey['id']
}

const getAll = createAsyncThunk<GetAll, GetAllProps>(
    'authKet#getAll',
    async (props) => {
        const res = await fetch('/api/auth-key', {
            method: 'GET',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 200) {
            throw new Error('Cannot get the auth keys')
        }
        return await res.json()
    }
)

const deleteOne = createAsyncThunk<void, DeleteOneProps>(
    'authKey#deleteOne',
    async (props) => {
        const res = await fetch(`/api/auth-key/${props.authKeyId}`, {
            method: 'DELETE',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 204) {
            throw new Error('Cannot delete the auth keys')
        }
    }
)

export const authKeyAction = {
    getAll,
    deleteOne
}
