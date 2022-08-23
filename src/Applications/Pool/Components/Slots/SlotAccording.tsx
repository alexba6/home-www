import {Fragment, FunctionComponent, useContext, useEffect, useMemo, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Alert, Chip,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DoneIcon from '@mui/icons-material/Done';

import {getSeconds} from "../../Tools/Slot";
import {PoolSlot, PoolClock} from "../../Store/Slot/SlotReducer";
import {useDispatch, useSelector} from "react-redux";
import {poolSlotSelector} from "../../Store/Slot/SlotSelector";
import {Device} from "../../../../Store/Device/DeviceReducer";
import {ContextAuthentication} from "../../../../Context/ContextAuthentication";
import {poolSlotActions} from "../../Store/Slot/SlotActions";
import {PoolClockTable} from "./SlotClockTable";
import {PoolModalClock, PoolModalSlot} from "./SlotModal";


type SlotTimeProps = {
    clocks: PoolClock[]
}

type PoolSlotAccordingProps = {
    current: boolean
    expanded: boolean
    onChange: () => void
    deviceId: Device['id']
    slot: PoolSlot
}

const SlotTime: FunctionComponent<SlotTimeProps> = (props) => {
    const { hours, minutes } = useMemo(() => {
        let seconds = 0
        for (const {enable, start, end} of props.clocks) {
            if (enable) {
                seconds += getSeconds(end) - getSeconds(start)
            }
        }
        const hours = Math.floor(seconds / 3600)
        return {
            hours,
            minutes: Math.floor((seconds - (hours*3600)) / 60)
        }
    }, [props.clocks])

    return <Typography>
            Temps {' '}<i>
            {hours > 0&& `${hours} heures`}
            {(hours > 0 && minutes > 0) && ' et '}
            {minutes > 0 && `${minutes} minutes`}
            {minutes === 0 && hours === 0 && '0 minutes'}
        </i>
    </Typography>
}

export const PoolSlotAccording: FunctionComponent<PoolSlotAccordingProps> = (props) => {
    const { slot, deviceId, expanded, onChange, current } = props

    const [displayAddClockModal, setDisplayAddClockModal] = useState(false)
    const [displayUpdateSlotModal, setDisplayUpdateSlotModal] = useState(false)

    const authContext = useContext(ContextAuthentication)
    const dispatch = useDispatch<any>()

    const clockStore = useSelector(poolSlotSelector.clockStore(deviceId, slot.id))
    const clocks = useSelector(poolSlotSelector.clocks(deviceId, slot.id))

    useEffect(() => {
        if (!clockStore && expanded) {
            dispatch(poolSlotActions.clockGetAll({
                authenticationKey: authContext.authenticationKey,
                slotId: slot.id,
                deviceId
            }))
        }
    }, [clockStore, expanded])

    const onDeleteSlot = () => {
        if (!window.confirm('Voulez-vous vraiment supprimer cette plage ?')) {
            return
        }
        dispatch(poolSlotActions.slotDelete({
            authenticationKey: authContext.authenticationKey,
            slotId: slot.id,
            deviceId
        }))
    }

    const onUpdateSlot = (updateSlot: Omit<PoolSlot, 'id'>) => {
        dispatch(poolSlotActions.slotPut({
            authenticationKey: authContext.authenticationKey,
            slotId: slot.id,
            deviceId,
            slot: updateSlot
        }))
    }

    const addClock = (clock: Omit<PoolClock, 'id' | 'slotId'>) => {
        dispatch(poolSlotActions.clockPost({
            authenticationKey: authContext.authenticationKey,
            deviceId,
            clock: {
                ...clock,
                slotId: slot.id
            }
        }))
    }


    const onDeleteClock = (clockId: PoolClock['id']) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cette horloge ?')) {
            return
        }
        dispatch(poolSlotActions.clockDelete({
            authenticationKey: authContext.authenticationKey,
            slotId: slot.id,
            deviceId,
            clockId
        }))
    }

    const onUpdateClock = (clockId: PoolClock['id'], clock: Omit<PoolClock, 'id' | 'slotId'>) => {
        dispatch(poolSlotActions.clockPut({
            authenticationKey: authContext.authenticationKey,
            slotId: slot.id,
            deviceId,
            clockId,
            clock
        }))
    }

    return <Fragment>
        <PoolModalClock
            name='Ajouter une horloge'
            display={displayAddClockModal}
            onClose={() => setDisplayAddClockModal(false)}
            onSubmit={addClock}/>
        <PoolModalSlot
            name='Ajouter une plage'
            display={displayUpdateSlotModal}
            onClose={() => setDisplayUpdateSlotModal(false)}
            defaultValue={props.slot}
            onSubmit={onUpdateSlot}/>
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction='row' align='center'>
                    <Typography color={current ? 'inherit' : 'inherit'}>
                        <strong>{slot.temperature}°C</strong>
                    </Typography>
                    {current && <Chip
                        sx={{ marginX: 2 }}
                        size='small'
                        label="En fonctionnement"
                        icon={<DoneIcon />}
                    />}
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
                    <div>
                        <Typography>
                            Horloges <strong>{slot.temperature}°C</strong>
                        </Typography>
                        {clocks && clocks.length > 0 && <SlotTime clocks={clocks}/>}
                    </div>
                    <div>
                        <Tooltip title='Ajouter une horloge'>
                            <IconButton color='primary' onClick={() => setDisplayAddClockModal(true)}>
                                <AddIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Modifier la plage' onClick={() => setDisplayUpdateSlotModal(true)}>
                            <IconButton color='primary'>
                                <ModeEditIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Supprimer la plage'>
                            <IconButton color='primary' onClick={onDeleteSlot}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Stack>
                {clocks && clocks.length > 0 && <PoolClockTable
                    clocks={clocks}
                    onUpdate={onUpdateClock}
                    onDelete={onDeleteClock}
                />}
                {clocks && clocks.length == 0 && <Alert  severity='warning'>
                    Pas de d'horloge
                </Alert>}
            </AccordionDetails>
        </Accordion>
    </Fragment>
}
