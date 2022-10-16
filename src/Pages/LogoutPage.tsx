import {FunctionComponent, useCallback, useContext, useEffect} from "react";
import {Template} from "../Template/Template";
import {CircularProgress} from "@mui/material";
import {ContextAuthentication} from "../Context/ContextAuthentication";
import {useHistory} from "react-router-dom";
import {getAuthorization} from "../Tools/Authentication";
import {toast} from "react-toastify";
import {Routes} from "../Config/Routes";


export const LogoutPage: FunctionComponent = () => {
    const authContext = useContext(ContextAuthentication)

    const history = useHistory()

    const logout = useCallback(async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    authorization: getAuthorization(authContext.authenticationKey)
                }
            })
        } finally {
            history.push(Routes.login.target)
            toast.success('Déconnecté')
        }
    }, [])

    useEffect(() => {
        logout().then(() => {})
    }, [])

    return <Template>
        <CircularProgress/>
    </Template>
}
