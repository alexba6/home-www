import {FunctionComponent, useContext, useEffect} from "react";
import {ApplicationProps} from "../../../Context/ContextApplication";
import {Alert} from "@mui/material";
import {Card, CardHeader} from "../../../Components/Card/Card";
import {useDispatch, useSelector} from "react-redux";
import {ContextAuthentication} from "../../../Context/ContextAuthentication";
import {ActionBtnGroupButtons} from "../../../Components/ActionButtonGroup/ActionBtnGroupButtons";
import {actionSelector} from "../../../Store/Action/ActionSelector";
import {actionActions} from "../../../Store/Action/ActionAction";
import {ActionStatus} from "../../../Store/Action/ActionReducer";
import {AppProps} from "../../../Wrapper/App";

const actionKey = 'pump'

export const PoolControlPage: FunctionComponent<AppProps> = (props) => {
    const { device } = props.device
    const authenticationContext = useContext(ContextAuthentication)

    const dispatch = useDispatch<any>()

    const actionBtnGroup = useSelector(actionSelector.buttonGroup(device.id, actionKey))

    useEffect(() => {
        if (!actionBtnGroup) {
            dispatch(actionActions.buttonGroupGet({
                authenticationKey: authenticationContext.authenticationKey,
                deviceId: device.id,
                actionKey,
            }))
        }
    }, [actionBtnGroup, authenticationContext, device.id, dispatch])


    return <Card>
        <CardHeader>
            <h2>Pompe action</h2>
        </CardHeader>
        {(actionBtnGroup && actionBtnGroup.status === ActionStatus.READY) && <Alert severity='info'>
            Mode <strong>{actionBtnGroup.action.enableGroup}</strong> - {actionBtnGroup.action.state ? 'marche' : 'arrêt'}
        </Alert>}
        {(actionBtnGroup && actionBtnGroup.status === ActionStatus.PENDING) && <Alert severity='info'>
            ...
        </Alert>}
        {(actionBtnGroup && actionBtnGroup.status === ActionStatus.ERROR) && <Alert severity='error'>
            Impossible d'avoir les informations
        </Alert>}
        <br/>
        <ActionBtnGroupButtons deviceId={device.id} groupNames={['ON', 'OFF', 'AUTO']} actionKey='pump'/>
    </Card>
}
