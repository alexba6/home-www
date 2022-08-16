import {Template, TemplateTopBar} from "../../../Template/Template";
import {FunctionComponent, SyntheticEvent, useContext, useEffect, useState} from "react";
import {PoolNav} from "../Routes";
import {ApplicationProps} from "../../../Context/ContextApplication";
import {IconButton, Stack, Tab, Tabs, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {PoolSlot} from "../Store/Slot/SlotReducer";
import {PoolSlotAccording} from "../Compoents/Slots/SlotAccording";
import {useDispatch, useSelector} from "react-redux";
import {poolSlotSelector} from "../Store/Slot/SlotSelector";
import {poolSlotActions} from "../Store/Slot/SlotActions";
import {ContextAuthentication} from "../../../Context/ContextAuthentication";


export const PoolSlotPage: FunctionComponent<ApplicationProps> = (props) => {
    const { device } = props.deviceStore

    const authContext = useContext(ContextAuthentication)
    const dispatch = useDispatch<any>()
    const [slotKey, setSlotKey] = useState<string | null>(null)

    const storeSlot = useSelector(poolSlotSelector.slotStore(device.id))
    const slots = useSelector(poolSlotSelector.slots(device.id))

    useEffect(() => {
        if (!storeSlot) {
            dispatch(poolSlotActions.slotGetAll({
                authenticationKey: authContext.authenticationKey,
                deviceId: device.id
            }))
        }
    }, [])

    const handleChangeSlot = (key: string) => () => {
        setSlotKey(k => k !== key ? key : null)
    }


    return <Template nav={PoolNav}>
        <TemplateTopBar>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <div>
                    <h2>Plages</h2>
                </div>
                <div>
                    <Tooltip title='Ajouter'>
                        <IconButton color='primary'>
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Stack>
        </TemplateTopBar>
        {slots && slots.map((slot: PoolSlot, key: number) => <PoolSlotAccording
            key={key}
            slot={slot}
            deviceId={device.id}
            expanded={slotKey === slot.id}
            onChange={handleChangeSlot(slot.id)}/>)}
    </Template>
}
