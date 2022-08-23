import {FunctionComponent, useRef, useState} from "react";
import {ModalBody, ModalFooter, ModalProvider} from "../../../../Components/Modal/Modal";
import {Button, FormControlLabel, Switch, TextField} from "@mui/material";
import {PoolClock, PoolSlot} from "../../Store/Slot/SlotReducer";
import {formatArrayToTime, formatTimeToArray} from "../../Tools/Slot";

type PoolModalClockProps = {
    display: boolean
    onClose: () => void
    name: string
    onSubmit: (clock: Omit<PoolClock, 'id' | 'slotId'>) => void
    defaultValue?: Omit<PoolClock, 'id' | 'slotId'>
}

type PoolModalSlotProps = {
    display: boolean
    onClose: () => void
    name: string
    defaultValue?: Omit<PoolSlot, 'id'>
    onSubmit: (slot: Omit<PoolSlot, 'id'>) => void
}

export const PoolModalSlot: FunctionComponent<PoolModalSlotProps> = (props) => {
    const tempRef = useRef<HTMLInputElement>(null)

    const onSubmit = () => {
        if (tempRef.current) {
            props.onSubmit({
                temperature: Number(tempRef.current.value)
            })
            props.onClose()
        }
    }

    return <ModalProvider display={props.display} onClose={props.onClose} name='Ajouter une plage'>
        <ModalBody>
            <TextField
                defaultValue={props.defaultValue?.temperature}
                inputRef={tempRef}
                type='number'
                label='Temperature'
                size='small'
                variant='outlined'
                fullWidth/>
        </ModalBody>
        <ModalFooter>
            <Button onClick={onSubmit}>
                Valider
            </Button>
        </ModalFooter>
    </ModalProvider>
}

export const PoolModalClock: FunctionComponent<PoolModalClockProps> = (props) => {
    const start = useRef<HTMLInputElement>(null)
    const end = useRef<HTMLInputElement>(null)
    const [enable, setEnable] = useState(props.defaultValue ? props.defaultValue.enable : true)

    const onSubmit = () => {
        if (start.current && end.current) {
            props.onSubmit({
                start: formatTimeToArray(start.current.value),
                end: formatTimeToArray(end.current.value),
                enable
            })
            console.log(start.current.value, end.current.value, enable)
            props.onClose()
        }
    }

    return <ModalProvider display={props.display} onClose={props.onClose} name={props.name}>
        <ModalBody>
            <TextField
                defaultValue={props.defaultValue && formatArrayToTime(props.defaultValue.start)}
                inputRef={start}
                type='time'
                label='Début'
                size='small'
                variant='outlined'
                margin='normal'
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}/>
            <TextField
                defaultValue={props.defaultValue && formatArrayToTime(props.defaultValue.end)}
                inputRef={end}
                type='time'
                label='Fin'
                size='small'
                variant='outlined'
                margin='normal'
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}/>
            <FormControlLabel
                labelPlacement='start'
                control={
                    <Switch
                        checked={enable}
                        onChange={() => setEnable(s => !s)}
                    />}
                label="Activitée" />
        </ModalBody>
        <ModalFooter>
            <Button onClick={onSubmit}>
                Valider
            </Button>
        </ModalFooter>
    </ModalProvider>
}
