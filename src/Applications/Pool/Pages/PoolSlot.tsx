import {Template, TemplateTopBar} from "../../../Template/Template";
import {FunctionComponent, useContext, useEffect, useRef, useState} from "react";
import {PoolNav} from "../Routes";
import {ApplicationProps} from "../../../Context/ContextApplication";
import {Button, IconButton, Stack, TextField, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {PoolSlot} from "../Store/Slot/SlotReducer";
import {PoolSlotAccording} from "../Compoents/Slots/SlotAccording";
import {useDispatch, useSelector} from "react-redux";
import {poolSlotSelector} from "../Store/Slot/SlotSelector";
import {poolSlotActions} from "../Store/Slot/SlotActions";
import {ContextAuthentication} from "../../../Context/ContextAuthentication";
import {ModalBody, ModalFooter, ModalProvider} from "../../../Components/Modal/Modal";

type ModalAddSlotProps = {
    display: boolean
    onClose: () => void
    onAdd: (temperature: number) => void
}

const ModalAddSlot: FunctionComponent<ModalAddSlotProps> = (props) => {
    const tempRef = useRef<HTMLInputElement>(null)

    const handleAdd = () => {
        if (tempRef.current) {
            props.onAdd(Number(tempRef.current.value))
            props.onClose()
        }
    }

    return <ModalProvider disabledOutsideClick display={props.display} onClose={props.onClose} name='Ajouter une plage'>
        <ModalBody>
            <TextField inputRef={tempRef} type='number' label='Temperature' size='small' variant='outlined' fullWidth/>
        </ModalBody>
        <ModalFooter>
            <Button onClick={handleAdd}>
                Ajouter
            </Button>
        </ModalFooter>
    </ModalProvider>
}

export const PoolSlotPage: FunctionComponent<ApplicationProps> = (props) => {
    const { device } = props.deviceStore

    const authContext = useContext(ContextAuthentication)
    const dispatch = useDispatch<any>()
    const [slotKey, setSlotKey] = useState<string | null>(null)
    const [displayAddModal, setDisplayAddModal] = useState(false)


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

    const onAddSlot = (temperature: number) => {
        dispatch(poolSlotActions.slotPost({
            authenticationKey: authContext.authenticationKey,
            deviceId: device.id,
            slot: {
                temperature
            }
        }))
    }


    return <Template nav={PoolNav}>
        <ModalAddSlot display={displayAddModal} onClose={() => setDisplayAddModal(false)} onAdd={onAddSlot}/>
        <TemplateTopBar>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                <div>
                    <h2>Plages</h2>
                </div>
                <div>
                    <Tooltip title='Ajouter'>
                        <IconButton color='primary' onClick={() => setDisplayAddModal(true)}>
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
