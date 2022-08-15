import {Template, TemplateTopBar} from "../../../Template/Template";
import {FunctionComponent, SyntheticEvent, useState} from "react";
import {PoolNav} from "../Routes";
import {ApplicationProps} from "../../../Context/ContextApplication";
import {IconButton, Stack, Tab, Tabs, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {PoolTempSlot} from "../Store/Slot/SlotReducer";
import {PoolSlotAccording} from "../Compoents/Slots/SlotAccording";


const slots: PoolTempSlot[] = [
    {
        id: '5r4szg5frfsg',
        temperature: 40,
        time_slots: [
            {
                id: 0,
                start: [12, 20, 30],
                end: [12, 50, 30],
                enable: true
            },
            {
                id: 1,
                start: [12, 20, 30],
                end: [12, 20, 30],
                enable: false
            }
        ]
    },
    {
        id: 'ferf5cv41a5',
        temperature: 20.3,
        time_slots: [
            {
                id: 0,
                start: [12, 20, 30],
                end: [18, 20, 30],
                enable: true
            }
        ]
    },
    {
        id: 'verzqgvf',
        temperature: 18,
        time_slots: [
            {
                id: 0,
                start: [12, 20, 30],
                end: [13, 0, 30],
                enable: true
            }
        ]
    },
    {
        id: 'rzeqf',
        temperature: 10,
        time_slots: [
            {
                id: 0,
                start: [12, 20, 30],
                end: [19, 52, 30],
                enable: true
            }
        ]
    }
]



export const PoolSlotPage: FunctionComponent<ApplicationProps> = (props) => {
    const { device } = props.deviceStore

    const [tab, setTab] = useState(0)
    const [slotKey, setSlotKey] = useState<number | false>(false);

    const handleChangeSlot = (key: number) => () => {
        setSlotKey(k => k !== key ? key : false)
    }

    const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
        setTab(newValue)
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
        {slots.map((slot: PoolTempSlot, key: number) => <PoolSlotAccording
            key={key}
            slot={slot}
            expanded={key === slotKey}
            onChange={handleChangeSlot(key)}/>)}
    </Template>
}
