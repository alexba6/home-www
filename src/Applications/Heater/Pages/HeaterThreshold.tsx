import {ChangeEvent, FunctionComponent, useCallback, useContext, useEffect, useState} from "react";
import {AppProps} from "../../../Wrapper/App";
import {ContextAuthentication} from "../../../Context/ContextAuthentication";
import {getAuthorization} from "../../../Tools/Authentication";
import {Button, Card, FormControl, Stack, TextField, Typography} from "@mui/material";
import {CardHeader} from "../../../Components/Card/Card";



export const HeaterThresholdPage: FunctionComponent<AppProps> = (props) => {
    const deviceStore = props.device
    const authContext = useContext(ContextAuthentication)
    const [threshold, setThreshold] = useState<null | number>(null)

    const getThreshold = useCallback(async () => {
        const res = await  fetch(`/api/app/heater/threshold?deviceId=${deviceStore.device.id}`, {
            method: 'GET',
            headers: {
                authorization: getAuthorization(authContext.authenticationKey)
            }
        })
        if (res.status === 200) {
            const json = await res.json()
            setThreshold(json.threshold)
        }
    }, [deviceStore])

    const handleSubmit = useCallback(async () => {
        const res = await  fetch(`/api/app/heater/threshold?deviceId=${deviceStore.device.id}`, {
            method: 'POST',
            headers: {
                authorization: getAuthorization(authContext.authenticationKey),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                threshold
            })
        })
        if (res.status === 200) {
            const json = await res.json()
            setThreshold(json.threshold)
        }
    }, [deviceStore, threshold])

    useEffect(() => {
        getThreshold().then()
    }, [deviceStore])


    const handleChangeThreshold = (event: ChangeEvent<HTMLInputElement>) => {
        setThreshold(Number(event.target.value))
    }

    return <div>
        <Card sx={{ padding: 2 }}>
            <CardHeader>
                <h3>
                    Seuil
                </h3>
            </CardHeader>
            {threshold &&
            <Stack sx={{ marginY: 2 }}>
                <FormControl>
                    <TextField label='Seuil' type='number' value={threshold} onChange={handleChangeThreshold} />
                </FormControl>
                <br/>
                <Button onClick={handleSubmit}>
                    Modifier
                </Button>
            </Stack>}
        </Card>
    </div>
}
