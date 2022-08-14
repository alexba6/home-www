import {Template} from "../../../Template/Template";
import {FunctionComponent, useContext, useEffect} from "react";
import {PoolNav} from "../Routes";
import {ApplicationProps} from "../../../Context/ContextApplication";
import {Button, ButtonGroup, Chip} from "@mui/material";
import {Card, CardContent, CardHeader} from "../../../Components/Card/Card";
import {useDispatch, useSelector} from "react-redux";
import {poolModeSelector} from "../Store/Mode/ModeSelector";
import {poolModeActions} from "../Store/Mode/ModeAction";
import {ContextAuthentication} from "../../../Context/ContextAuthentication";
import {PoolMode} from "../Store/Mode/ModeReducer";


export const PoolControlPage: FunctionComponent<ApplicationProps> = (props) => {
    const { device } = props.deviceStore
    const authenticationContext = useContext(ContextAuthentication)
    const modeStore = useSelector(poolModeSelector.getMode(device.id))

    const dispatch = useDispatch<any>()

    useEffect(() => {
        if (!modeStore) {
            dispatch(poolModeActions.get({
                authenticationKey: authenticationContext.authenticationKey,
                deviceId: device.id
            }))
        }
    })

    const changeMode = (mode: PoolMode) => () => {
        dispatch(poolModeActions.set({
            authenticationKey: authenticationContext.authenticationKey,
            deviceId: device.id,
            mode
        }))
    }

    const disable = (mode: PoolMode) => {
        return mode === modeStore?.mode || modeStore?.mode === PoolMode.STARTING
    }

    return <Template nav={PoolNav}>
        <h2>
            Contrôle
            {modeStore && <Chip sx={{ marginLeft: 1 }} size='small' color={modeStore?.state ? 'success' : 'error'} label={modeStore?.mode}/>}
        </h2>
        <br/>
        <Card>
            <CardHeader>
                <h2>Actions</h2>
            </CardHeader>
            <CardContent>
                <ButtonGroup variant='contained' size='large' aria-label='outlined primary button group'>
                    <Button onClick={changeMode(PoolMode.ON)} disabled={disable(PoolMode.ON)}>ON</Button>
                    <Button onClick={changeMode(PoolMode.OFF)} disabled={disable(PoolMode.OFF)}>OFF</Button>
                    <Button onClick={changeMode(PoolMode.AUTO)} disabled={disable(PoolMode.AUTO)}>AUTO</Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    </Template>
}
