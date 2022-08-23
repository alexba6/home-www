import {FunctionComponent, useState} from "react";
import {Chip, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import {PoolClock} from "../../Store/Slot/SlotReducer";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import {PoolModalClock} from "./SlotModal";
import {formatArrayToTime} from "../../Tools/Slot";


type PoolClockTableProps = {
    clocks: PoolClock[]
    onDelete: (clockId: PoolClock['id']) => void
    onUpdate: (clockId: PoolClock['id'], clock: Omit<PoolClock, 'id' | 'slotId'>) => void
}

type ClockRowProps = {
    clock: PoolClock
    onDelete: (clockId: PoolClock['id']) => void
    onUpdate: (clockId: PoolClock['id'], clock: Omit<PoolClock, 'id' | 'slotId'>) => void
}

const ClockRow: FunctionComponent<ClockRowProps> = (props) => {
    const [displayUpdateClockModal, setDisplayUpdateClockModal] = useState(false)
    const { clock } = props

    const onUpdate = (updatedClock: Omit<PoolClock, 'id' | 'slotId'>) => {
        props.onUpdate(clock.id, updatedClock)
    }

    return <>
        <PoolModalClock
            name="Modifier l'horloge"
            display={displayUpdateClockModal}
            defaultValue={clock}
            onClose={() => setDisplayUpdateClockModal(false)}
            onSubmit={onUpdate}/>
        <TableRow>
            <TableCell align='center'>{formatArrayToTime(clock.start)}</TableCell>
            <TableCell align='center'>{formatArrayToTime(clock.end)}</TableCell>
            <TableCell align='center'>
                <Chip
                    color={clock.enable ? 'success' : 'error'}
                    label={clock.enable ? 'Active' : 'Désactive'}
                    variant='outlined'
                    size='small'/>
            </TableCell>
            <TableCell align='center'>
                <Tooltip title="Modifier l'horloge">
                    <IconButton color='primary' onClick={() => setDisplayUpdateClockModal(true)}>
                        <ModeEditIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer l'horloge" onClick={() => props.onDelete(clock.id)}>
                    <IconButton color='primary'>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    </>
}

export const PoolClockTable: FunctionComponent<PoolClockTableProps> = (props) => {

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
            {props.clocks.map((clock: PoolClock, key: number) => <ClockRow
                key={key}
                clock={clock}
                onDelete={props.onDelete}
                onUpdate={props.onUpdate}/>)}
        </TableBody>
    </Table>
}
