import {Template, TemplateTopBar} from "../../../Template/Template";
import {FunctionComponent, useContext, useEffect, useState} from "react";
import {Alert, IconButton, Stack, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import {PoolNav} from "../Routes";
import {ApplicationProps} from "../../../Context/ContextApplication";
import {PoolSlot, PoolSlotStatus} from "../Store/Slot/SlotReducer";
import {PoolSlotAccording} from "../Components/Slots/SlotAccording";
import {useDispatch, useSelector} from "react-redux";
import {poolSlotSelector} from "../Store/Slot/SlotSelector";
import {poolSlotActions} from "../Store/Slot/SlotActions";
import {ContextAuthentication} from "../../../Context/ContextAuthentication";
import {PoolModalSlot} from "../Components/Slots/SlotModal";


export const PoolSlotPage: FunctionComponent<ApplicationProps> = (props) => {
    const { device } = props.deviceStore

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
    }, [storeSlot, dispatch, poolSlotActions])

    useEffect(() => {
        if (slots && !currentSlotStore) {
            dispatch(poolSlotActions.slotGetCurrent({
                authenticationKey: authContext.authenticationKey,
                deviceId: device.id
            }))
        }
    }, [slots, currentSlotStore, dispatch, poolSlotActions])

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


    return <Template nav={PoolNav}>
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
    </Template>
}
