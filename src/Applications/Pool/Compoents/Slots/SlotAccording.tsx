import {PoolSlot, PoolClock} from "../../Store/Slot/SlotReducer";
import {FunctionComponent, useContext, useEffect, useMemo} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Chip,
    IconButton,
    Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip,
    Typography
} from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {getSeconds} from "../../Tools/Slot";
import {useDispatch, useSelector} from "react-redux";
import {poolSlotSelector} from "../../Store/Slot/SlotSelector";
import {Device} from "../../../../Store/Device/DeviceReducer";
import {ContextAuthentication} from "../../../../Context/ContextAuthentication";
import {poolSlotActions} from "../../Store/Slot/SlotActions";


type SlotTimeProps = {
    clocks: PoolClock[]
}

type ClockTableProps = {
    clocks: PoolClock[]
}

type PoolSlotAccordingProps = {
    expanded: boolean
    onChange: () => void
    slot: PoolSlot
    deviceId: Device['id']
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

const ClockTable: FunctionComponent<ClockTableProps> = (props) => {
    return <Table>
        <TableHead>
            <TableRow>
                <TableCell align='center'>Début</TableCell>
                <TableCell align='center'>Fin</TableCell>
                <TableCell align='center'>Activée</TableCell>
                <TableCell align='center' width={100}></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {props.clocks.map((clock: PoolClock, key: number) => (
                <TableRow key={key}>
                    <TableCell align='center'>{clock.start.join(':')}</TableCell>
                    <TableCell align='center'>{clock.end.join(':')}</TableCell>
                    <TableCell align='center'>
                        <Chip
                            color={clock.enable ? 'success' : 'error'}
                            label={clock.enable ? 'Active' : 'Désactive'}
                            variant='outlined'
                            size='small'/>
                    </TableCell>
                    <TableCell align='center'>
                        <Tooltip title="Modifier l'horloge">
                            <IconButton color='primary'>
                                <ModeEditIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Supprimer l'horloge">
                            <IconButton color='primary'>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}

export const PoolSlotAccording: FunctionComponent<PoolSlotAccordingProps> = (props) => {
    const { slot, deviceId, expanded, onChange } = props

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

    return <Accordion expanded={expanded} onChange={onChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color='primary'>
                <strong>{slot.temperature}°C</strong>
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
                <div>
                    <Typography>
                        Horloges <strong>{slot.temperature}°C</strong>
                    </Typography>
                    {clocks && <SlotTime clocks={clocks}/>}
                </div>
                <div>
                    <Tooltip title='Ajouter une horloge'>
                        <IconButton color='primary'>
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Modifier la plage'>
                        <IconButton color='primary'>
                            <ModeEditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Supprimer la plage'>
                        <IconButton color='primary'>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Stack>
            {clocks && <ClockTable clocks={clocks}/>}
        </AccordionDetails>
    </Accordion>
}
