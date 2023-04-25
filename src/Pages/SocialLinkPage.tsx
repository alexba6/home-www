import {FunctionComponent, useCallback, useContext, useEffect, useState} from 'react'
import {CardForm} from "../Components/Card/CardForm";
import {CardHeader} from "../Components/Card/Card";
import {HomeLogo} from "../Icons/HomeLogo";
import {CircularProgress, Stack} from "@mui/material";
import {useHistory, useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import {Routes} from "../Config/Routes";
import {ContextAuthentication} from "../Context/ContextAuthentication";
import {getAuthorization} from "../Tools/Authentication";

export const SocialLinkPage: FunctionComponent = () => {
    const location = useLocation()
    const history = useHistory()
    const authorization = useContext(ContextAuthentication)

    const loginGoogle = useCallback(async (code: string) => {
        const res = await fetch('/api/google/link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: getAuthorization(authorization.authenticationKey)
            },
            body: JSON.stringify({ code })
        })
        console.log(res.status)
        if (res.status == 200) {
            return
        }
        throw new Error('Cannot login with google')
    }, [])

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        const code = query.get('code')
        if (code) {
            loginGoogle(code)
                .catch(err => {
                    toast.error('Cannot link to google')
                })
                .finally(() => {
                    history.push(Routes.account.target)
                })
        } else {
            toast.error('Token not found')
            history.push(Routes.account.target)
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
