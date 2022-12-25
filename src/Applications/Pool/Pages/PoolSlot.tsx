import {FunctionComponent, useContext, useEffect, useState, Fragment} from "react";
import { TemplateTopBar} from "../../../Template/Template";
import {Alert, IconButton, Stack, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import {ApplicationProps} from "../../../Context/ContextApplication";
import {PoolSlot, PoolSlotStatus} from "../Store/Slot/SlotReducer";
import {PoolSlotAccording} from "../Components/Slots/SlotAccording";
import {useDispatch, useSelector} from "react-redux";
import {poolSlotSelector} from "../Store/Slot/SlotSelector";
import {poolSlotActions} from "../Store/Slot/SlotActions";
import {ContextAuthentication} from "../../../Context/ContextAuthentication";
import {PoolModalSlot} from "../Components/Slots/SlotModal";
import {AppProps} from "../../../Wrapper/App";


export const PoolSlotPage: FunctionComponent<AppProps> = (props) => {
    const { device } = props.device

    const authContext = useContext(ContextAuthentication)
    const dispatch = useDispatch<any>()
    const [slotKey, setSlotKey] = useState<string | null>(null)
    const [displayAddModal, setDisplayAddModal] = useState(false)


    const currentSlotStore = useSelector(poolSlotSelector.currentSlotStore(device.id))
    const currentSlotId = useSelector(poolSlotSelector.currentSlotId(device.id))
    const storeSlot = useSelector(poolSlotSelector.slotStore(device.id))
    const slots = useSelector(poolSlotSelector.slots(device.id))

    useEffect(() => {
        if (!storeSlot) {
            dispatch(poolSlotActions.slotGetAll({
                authenticationKey: authContext.authenticationKey,
                deviceId: device.id
            }))
        }
    }, [storeSlot, dispatch, authContext, device.id])

    useEffect(() => {
        if (slots && !currentSlotStore) {
            dispatch(poolSlotActions.slotGetCurrent({
                authenticationKey: authContext.authenticationKey,
                deviceId: device.id
            }))
        }
    }, [slots, currentSlotStore, dispatch, authContext, device.id])

    const handleChangeSlot = (key: string) => () => {
        setSlotKey(k => k !== key ? key : null)
    }

    const onAddSlot = (slot: Omit<PoolSlot, 'id'>) => {
        dispatch(poolSlotActions.slotPost({
            authenticationKey: authContext.authenticationKey,
            deviceId: device.id,
            slot
        }))
    }


    return <Fragment>
        <PoolModalSlot
            name='Ajouter une plage'
            display={displayAddModal}
            onClose={() => setDisplayAddModal(false)}
            onSubmit={onAddSlot}/>
        <TemplateTopBar>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <div>
                    <h2>Plages</h2>
                </div>
                <div>
                    <Tooltip title='Ajouter'>
                        <IconButton
                            disabled={storeSlot?.status !== PoolSlotStatus.READY}
                            color='primary'
                            onClick={() => setDisplayAddModal(true)}>
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Stack>
        </TemplateTopBar>
        {slots && slots.map((slot: PoolSlot, key: number) => <PoolSlotAccording
            current={currentSlotId === slot.id}
            key={key}
            slot={slot}
            deviceId={device.id}
            expanded={slotKey === slot.id}
            onChange={handleChangeSlot(slot.id)}/>)}
        {slots && slots.length === 0 && <Alert  severity='warning'>
            Pas de plage
        </Alert>}
        {storeSlot?.status === PoolSlotStatus.ERROR && <Alert  severity='error'>
            Impossible de récupérer les plages
        </Alert>}
    </Fragment>
}
