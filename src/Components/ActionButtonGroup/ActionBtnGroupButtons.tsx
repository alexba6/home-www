import {FunctionComponent, useContext, useEffect} from "react";
import {Button, ButtonGroup} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {actionSelector} from "../../Store/Action/ActionSelector";
import {Device} from "../../Store/Device/DeviceReducer";
import {actionActions} from "../../Store/Action/ActionAction";
import {ContextAuthentication} from "../../Context/ContextAuthentication";
import {ActionStatus} from "../../Store/Action/ActionReducer";


type ActionBtnGroupButtonsProps = {
    actionKey: string
    deviceId: Device['id']
    groupNames: string[]
}

export const ActionBtnGroupButtons: FunctionComponent<ActionBtnGroupButtonsProps> = (props) => {
    const { deviceId, actionKey, groupNames } = props
    const dispatch = useDispatch<any>()
    const authContext = useContext(ContextAuthentication)

    const buttonGroup = useSelector(actionSelector.buttonGroup(deviceId, actionKey))

    useEffect(() => {
        if (!buttonGroup) {
            dispatch(actionActions.buttonGroupGet({
                authenticationKey: authContext.authenticationKey,
                deviceId,
                actionKey,
            }))
        }
    }, [])

    const handleClick = (groupName: string) => {
        dispatch(actionActions.buttonGroupPost({
            authenticationKey: authContext.authenticationKey,
            deviceId,
            actionKey,
            groupName
        }))
    }


    return <ButtonGroup fullWidth={true} variant='contained' size='large' aria-label='outlined primary button group'>
        {groupNames.map((groupName: string, key: number) => <Button key={key}
            onClick={() => handleClick(groupName)}
            disabled={!buttonGroup || buttonGroup.status === ActionStatus.ERROR ||
                (buttonGroup.status === ActionStatus.READY && (
                    buttonGroup.action.enableGroup === groupName ||
                    buttonGroup.action.freeze
                ))}>
            {groupName}
        </Button>)}
    </ButtonGroup>
}
