import {FunctionComponent, useCallback, useContext, useEffect, useState} from 'react'
import {CardForm} from "../Components/Card/CardForm";
import {CardHeader} from "../Components/Card/Card";
import {HomeLogo} from "../Icons/HomeLogo";
import {CircularProgress, Stack} from "@mui/material";
import {useHistory, useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import {Routes} from "../Config/Routes";
import {AuthenticationKey, ContextAuthentication} from "../Context/ContextAuthentication";
import {json} from "stream/consumers";

export const SocialLoginPage: FunctionComponent = () => {
    const location = useLocation()
    const history = useHistory()
    const authenticationContext = useContext(ContextAuthentication)

    const loginGoogle = useCallback(async (code: string) => {
        const res = await fetch('/api/google/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code })
        })
        console.log(res.status)
        if (res.status === 200) {
            const json = await res.json()
            return json.authKey
        }
        throw new Error('Cannot login with google')
    }, [])

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        const code = query.get('code')
        if (code) {
            loginGoogle(code)
                .then((authKey: AuthenticationKey) => {
                    authenticationContext.set(authKey)
                    history.push(Routes.dashboard.target)
                })
                .catch(err => {
                    toast.error('Cannot login to google')
                    history.push(Routes.login.target)
                })
        } else {
            toast.error('Token not found')
            history.push(Routes.login.target)
        }
    }, [])

    return (
        <CardForm>
            <CardHeader>
                <Stack direction='column' justifyContent='space-between' alignItems='center'>
                    <div>
                        <HomeLogo />
                    </div>
                    <div>
                        <h1>Home</h1>
                    </div>
                </Stack>
            </CardHeader>
            <Stack justifyContent='center' alignItems='center'>
                <CircularProgress/>
            </Stack>
        </CardForm>
    )
}
