import {PoolTempSlot, PoolTimeSlot} from "../../Store/Slot/SlotReducer";
import {FunctionComponent, useMemo} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Chip,
    IconButton, Paper,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip,
    Typography
} from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type PoolSlotAccordingProps = {
    expanded: boolean
    onChange: () => void
    slot: PoolTempSlot
}

export const PoolSlotAccording: FunctionComponent<PoolSlotAccordingProps> = (props) => {
    const { slot, expanded, onChange } = props

    const { hours, minutes } = useMemo(() => {
        let seconds = 0
        for (const { start, end, enable} of slot.time_slots) {
            const getSecond = (time: [number, number, number]) => time[0] * 3600 + time[1] * 60 + time[0]
            if (enable) {
                seconds += getSecond(end) - getSecond(start)
            }
        }
        const hours = Math.floor(seconds / 3600)
        return {
            hours,
            minutes: Math.floor((seconds - (hours*3600)) / 60)
        }
    }, [slot])

    return <Accordion expanded={expanded} onChange={onChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
                <div>
                    <Typography color='primary'>
                        <strong>{slot.temperature}°C</strong>
                    </Typography>
                </div>
                <div>
                    <Typography color='info'>
                        <i>
                            {hours > 0&& `${hours} heures`}
                            {(hours > 0 && minutes > 0) && ' et '}
                            {minutes > 0 && `${minutes} minutes`}
                        </i>
                    </Typography>
                </div>
            </Stack>
        </AccordionSummary>
        <AccordionDetails>
            <Stack direction='row' justifyContent='space-between' alignItems='center' width='100%'>
                <div>
                    <Typography>
                        Horloges <strong>{slot.temperature}°C</strong>
                    </Typography>
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
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Début</TableCell>
                            <TableCell align='center'>Fin</TableCell>
                            <TableCell align='center'>Activée</TableCell>
                            <TableCell align='center' width={100}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slot.time_slots.map((timeSlot: PoolTimeSlot, key: number) => (
                            <TableRow key={key}>
                                <TableCell align='center'>{timeSlot.start.join(':')}</TableCell>
                                <TableCell align='center'>{timeSlot.end.join(':')}</TableCell>
                                <TableCell align='center'>
                                    <Chip
                                        color={timeSlot.enable ? 'success' : 'error'}
                                        label={timeSlot.enable ? 'Active' : 'Désactive'}
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
        </AccordionDetails>
    </Accordion>
}
