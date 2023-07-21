import {FunctionComponent, useContext, useEffect} from "react";
import {Alert, Button, ButtonGroup} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Device} from "../../Store/Device/DeviceReducer";
import {ContextAuthentication} from "../../Context/ContextAuthentication";
import {selectorActionButtonGroup} from "../../Store/Action/ButtonGroup/ActionButtonGroupSelector";
import {actionButtonGroup} from "../../Store/Action/ButtonGroup/ActionButtonGroupAction";
import {ActionState} from "../../Store/Action/ActionType";


type ActionBtnGroupButtonsProps = {
    actionName: string
    deviceId: Device['id']
    deviceType: Device['type']
}

export const ActionBtnGroupButtons: FunctionComponent<ActionBtnGroupButtonsProps> = (props) => {
    const dispatch = useDispatch<any>()
    const authenticationContext = useContext(ContextAuthentication)

    const actionBtnGroup = useSelector(selectorActionButtonGroup.getActionStore(props.deviceId, props.actionName))

    console.log(actionBtnGroup)

    useEffect(() => {
        if (!actionBtnGroup) {
            dispatch(actionButtonGroup.getInfo({
                authenticationKey: authenticationContext.authenticationKey,
                deviceId: props.deviceId,
                deviceType: props.deviceType,
                actionName: props.actionName,
            }))
        }
    }, [actionBtnGroup, authenticationContext, props, dispatch])

    const handleClick = (groupHash: string) => {
        dispatch(actionButtonGroup.setGroup({
            authenticationKey: authenticationContext.authenticationKey,
            deviceId: props.deviceId,
            deviceType: props.deviceType,
            actionName: props.actionName,
            groupHash
        }))
    }


    return <>
        {(actionBtnGroup && actionBtnGroup.status === ActionState.READY) && <Alert severity='info'>
            Group <strong>{actionBtnGroup.payload.currentGroup}</strong>

        </Alert>}
        {(actionBtnGroup && actionBtnGroup.status === ActionState.FETCHING) && <Alert severity='info'>
            ...
        </Alert>}
        {(actionBtnGroup && actionBtnGroup.status === ActionState.ERROR) && <Alert severity='error'>
            Impossible d'avoir les informations
        </Alert>}
        <br/>
        {(actionBtnGroup && actionBtnGroup.status === ActionState.READY) && <ButtonGroup fullWidth={true} variant='contained' size='large' aria-label='outlined primary button group'>
            {actionBtnGroup.payload.groups.map((group, key: number) => <Button key={key}
               onClick={() => handleClick(group.hash)}
               disabled={actionBtnGroup.payload.currentGroup === group.hash || actionBtnGroup.payload.locked}>
                {group.hash}
            </Button>)}
        </ButtonGroup>}
    </>

}
