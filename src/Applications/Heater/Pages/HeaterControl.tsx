import {ChangeEvent, FunctionComponent, useCallback, useContext, useEffect, useState} from "react";
import {AppProps} from "../../../Wrapper/App";
import {ContextAuthentication} from "../../../Context/ContextAuthentication";
import {Alert, Button, ButtonGroup, Card, Chip, FormControl, Stack, TextField, Typography} from "@mui/material";
import {CardHeader} from "../../../Components/Card/Card";
import {getAuthorization} from "../../../Tools/Authentication";


export const HeaterControlPage: FunctionComponent<AppProps> = (props) => {
    const deviceStore = props.device
    const authContext = useContext(ContextAuthentication)
    const [enable, setEnable] = useState(false)
    const [heating, setHeating] = useState(true)

    const getControl = useCallback(async () => {
        const res = await  fetch(`/api/app/heater/control?deviceId=${deviceStore.device.id}`, {
            method: 'GET',
            headers: {
                authorization: getAuthorization(authContext.authenticationKey)
            }
        })
        if (res.status === 200) {
            const json = await res.json()
            setEnable(json.enable)
            setHeating(json.heating)
        }
    }, [deviceStore])

    const handleSubmit = useCallback((status: boolean) => async () => {
        const res = await  fetch(`/api/app/heater/control?deviceId=${deviceStore.device.id}`, {
            method: 'POST',
            headers: {
                authorization: getAuthorization(authContext.authenticationKey),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                enable: status
            })
        })
        if (res.status === 200) {
            const json = await res.json()
            setEnable(json.enable)
            setHeating(json.heating)
        }
    }, [deviceStore, enable])

    useEffect(() => {
        getControl().then()
    }, [deviceStore])

    return <div>
        <Card sx={{ padding: 2 }}>
            <CardHeader>
                <h3>
                    Control
                </h3>
            </CardHeader>
            <Alert icon={false} color="info">
                {enable ? 'Activé' : 'Désactivé'}
                {heating && <Chip sx={{ marginX: 1 }} size='small' label='En chauffe' />}
            </Alert>
            <br/>
            <ButtonGroup >
                <Button onClick={handleSubmit(true)} disabled={enable}>Activer</Button>
                <Button onClick={handleSubmit(false)} disabled={!enable}>Désactiver</Button>
            </ButtonGroup>
        </Card>
    </div>
}
