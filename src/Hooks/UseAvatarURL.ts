import {AuthenticationKey} from "../Context/ContextAuthentication";
import {getAuthorization} from "../Tools/Authentication";


export const useAvatarURL = (authenticationKey: AuthenticationKey) => {
    const query = new URLSearchParams()
    query.set('authorization', getAuthorization(authenticationKey))
    return `/api/user/avatar/?${query.toString()}`
}
