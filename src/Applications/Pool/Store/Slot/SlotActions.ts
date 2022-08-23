import { AuthenticationKey } from "../../../../Context/ContextAuthentication"
import { Device } from "../../../../Store/Device/DeviceReducer"
import {PoolClock, PoolSlot } from "./SlotReducer"
import {createAsyncThunk} from "@reduxjs/toolkit";
import { getAuthorization } from "../../../../Tools/Authentication";


type SlotGetCurrentProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
}

type SlotGetCurrent = {
    slotId: PoolSlot['id'] | null
}

type SlotGetAllProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
}

type SlotGetAll = {
    slots: PoolSlot[]
}

type SlotPostProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    slot: Omit<PoolSlot, 'id'>
}

type SlotPost = {
    slot: PoolSlot
}

type SlotPutProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    slotId: PoolSlot['id']
    slot: Omit<PoolSlot, 'id'>
}

type SlotPut = {
    slot: PoolSlot
}

type SlotDeleteProps = {
    authenticationKey: AuthenticationKey,
    deviceId: Device['id']
    slotId: PoolSlot['id']
}

type ClockGetAllProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    slotId: PoolSlot['id']
}

type ClockGetAll = {
    clocks: PoolClock[]
}

type ClockPostProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    clock: Omit<PoolClock, 'id'>
}

type ClockPost = {
    clock: PoolClock
}

type ClockPutProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    clockId: PoolClock['id']
    slotId: PoolSlot['id']
    clock: Omit<PoolClock, 'id' | 'slotId'>
}

type ClockPut = {
    clock: PoolClock
}

type ClockDeleteProps = {
    authenticationKey: AuthenticationKey
    deviceId: Device['id']
    clockId: PoolClock['id']
    slotId: PoolSlot['id']
}

const slotGetCurrent = createAsyncThunk<SlotGetCurrent, SlotGetCurrentProps>(
    'poolSlot#slotGetCurrent',
    async (props) => {
        const res = await fetch(`/app-pool/slot/current?deviceId=${props.deviceId}`, {
            method: 'GET',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 200) {
            throw new Error('Cannot get current slot')
        }
        return await res.json()
    }
)

const slotGetAll = createAsyncThunk<SlotGetAll, SlotGetAllProps>(
    'poolSlot#slotGetAll',
    async (props) => {
        const res = await fetch(`/app-pool/slot?deviceId=${props.deviceId}`, {
            method: 'GET',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 200) {
            throw new Error('Cannot get slots')
        }
        return await res.json()
    }
)

const slotPost = createAsyncThunk<SlotPost, SlotPostProps>(
    'poolSlot#slotPost',
    async (props) => {
        const res = await fetch(`/app-pool/slot?deviceId=${props.deviceId}`, {
            method: 'POST',
            headers: {
                authorization: getAuthorization(props.authenticationKey),
                'Content-TYpe': 'application/json'
            },
            body: JSON.stringify(props.slot)
        })
        if (res.status !== 201) {
            throw new Error('Cannot add slot')
        }
        return await res.json()
    }
)

const slotPut = createAsyncThunk<SlotPut, SlotPutProps>(
    'poolSlot#slotPut',
    async (props) => {
        const res = await fetch(`/app-pool/slot/${props.slotId}?deviceId=${props.deviceId}`, {
            method: 'PUT',
            headers: {
                authorization: getAuthorization(props.authenticationKey),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.slot)
        })
        if (res.status !== 200) {
            throw new Error('Cannot update the slot')
        }
        return await res.json()
    }
)

const slotDelete = createAsyncThunk<void, SlotDeleteProps>(
    'poolSlot#slotDelete',
    async (props) => {
        const res = await fetch(`/app-pool/slot/${props.slotId}?deviceId=${props.deviceId}`, {
            method: 'DELETE',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 204) {
            throw new Error('Cannot delete slot')
        }
    }
)


const clockGetAll = createAsyncThunk<ClockGetAll, ClockGetAllProps>(
    'poolSlot#clockGetAll',
    async (props) => {
        const res = await fetch(`/app-pool/clock/${props.slotId}?deviceId=${props.deviceId}`, {
            method: 'GET',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 200) {
            throw new Error('Cannot get clocks')
        }
        return await res.json()
    }
)

const clockPost = createAsyncThunk<ClockPost, ClockPostProps>(
    'poolSlot#clockPost',
    async (props) => {
        const res = await fetch(`/app-pool/clock?deviceId=${props.deviceId}`, {
            method: 'POST',
            headers: {
                authorization: getAuthorization(props.authenticationKey),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.clock)
        })
        if (res.status !== 201) {
            throw new Error('Cannot add clock')
        }
        return await res.json()
    }
)


const clockPut = createAsyncThunk<ClockPut, ClockPutProps>(
    'poolSlot#clockPut',
    async (props) => {
        const res = await fetch(`/app-pool/clock/${props.clockId}?deviceId=${props.deviceId}`, {
            method: 'PUT',
            headers: {
                authorization: getAuthorization(props.authenticationKey),
                'Content-TYpe': 'application/json'
            },
            body: JSON.stringify(props.clock)
        })
        if (res.status !== 200) {
            throw new Error('Cannot update clock')
        }
        return await res.json()
    }
)

const clockDelete = createAsyncThunk<void, ClockDeleteProps>(
    'poolSlot#clockDelete',
    async (props) => {
        const  res = await fetch(`/app-pool/clock/${props.clockId}?deviceId=${props.deviceId}`, {
            method: 'DELETE',
            headers: {
                authorization: getAuthorization(props.authenticationKey)
            }
        })
        if (res.status !== 204) {
            throw new Error('Cannot delete clock')
        }
    }
)

export const poolSlotActions = {
    slotGetCurrent,
    slotGetAll,
    slotPost,
    slotPut,
    slotDelete,

    clockGetAll,
    clockPost,
    clockPut,
    clockDelete
}
