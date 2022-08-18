import { createSlice } from "@reduxjs/toolkit";
import {Device} from "../../../../Store/Device/DeviceReducer";
import {poolSlotActions} from "./SlotActions";


export enum PoolSlotStatus {
    IDLE = 'IDLE',
    READY = 'READY',
    PENDING = 'PENDING',
    ERROR = 'ERROR'
}

export type PoolClock = {
    id: string
    slotId: string
    start: [number, number, number]
    end: [number, number, number]
    enable: boolean
}

export type PoolSlot = {
    id: string
    temperature: number
}


export type PoolSlotStore = {
    deviceId: Device['id']
    status: PoolSlotStatus.IDLE | PoolSlotStatus.PENDING | PoolSlotStatus.ERROR
} | {
    deviceId: Device['id']
    status: PoolSlotStatus.READY
    slots: PoolSlot[]
}

export type PoolClockStore = {
    deviceId: Device['id']
    slotId: PoolSlot['id']
    status: PoolSlotStatus.IDLE | PoolSlotStatus.PENDING | PoolSlotStatus.ERROR
} | {
    deviceId: Device['id']
    slotId: PoolSlot['id']
    status: PoolSlotStatus.READY
    clocks: PoolClock[]
}

export type PoolSlotStoreState = {
    slots: PoolSlotStore[]
    clocks: PoolClockStore[]
}

export const poolSlotStore = createSlice<PoolSlotStoreState, any>({
    name: 'poolSlot',
    initialState: {
        slots: [],
        clocks: []
    },
    reducers: {},
    extraReducers: builder => {
        // Slot get all
        builder.addCase(poolSlotActions.slotGetAll.fulfilled, (state, props) => {
            const { deviceId } = props.meta.arg
            state.slots = [...state.slots.filter(slot => slot.deviceId !== deviceId), {
                status: PoolSlotStatus.READY,
                deviceId,
                slots: props.payload.slots
            }]
        })

        // Slot post
        builder.addCase(poolSlotActions.slotPost.fulfilled, (state, props) => {
            const { deviceId } = props.meta.arg
            const storeSlot = state.slots.find(slot => slot.deviceId === deviceId)
            const slot = props.payload.slot
            if (storeSlot && storeSlot.status === PoolSlotStatus.READY) {
                state.slots = [...state.slots.filter(slot => slot.deviceId !== deviceId), {
                    status: PoolSlotStatus.READY,
                    deviceId,
                    slots: [...storeSlot.slots, slot]
                }]
            } else {
                state.slots = [...state.slots.filter(slot => slot.deviceId !== deviceId), {
                    status: PoolSlotStatus.READY,
                    deviceId,
                    slots: [slot]
                }]
            }
        })

        // Slot put
        builder.addCase(poolSlotActions.slotPut.fulfilled, (state, props) => {
            const { deviceId } = props.meta.arg
            const storeSlot = state.slots.find(slot => slot.deviceId === deviceId)
            const updatedSlot = props.payload.slot
            if (storeSlot && storeSlot.status === PoolSlotStatus.READY) {
                state.slots = [...state.slots.filter(slot => slot.deviceId !== deviceId), {
                    status: PoolSlotStatus.READY,
                    deviceId,
                    slots: [...storeSlot.slots.filter(slot => slot.id !== updatedSlot.id), updatedSlot]
                }]
            }
        })

        // Slot delete
        builder.addCase(poolSlotActions.slotDelete.fulfilled, (state, props) => {
            const { deviceId, slotId } = props.meta.arg
            const storeSlot = state.slots.find(slot => slot.deviceId === deviceId)

            if (storeSlot && storeSlot.status === PoolSlotStatus.READY) {
                state.slots = [...state.slots.filter(slot => slot.deviceId !== deviceId), {
                    status: PoolSlotStatus.READY,
                    deviceId,
                    slots: storeSlot.slots.filter(slot => slot.id !== slotId)
                }]
            }
        })


        // Clock get all
        builder.addCase(poolSlotActions.clockGetAll.fulfilled, (state, props) => {
            const { deviceId, slotId } = props.meta.arg
            state.clocks = [...state.clocks.filter(clock => clock.deviceId !== deviceId || clock.slotId !== slotId), {
                status: PoolSlotStatus.READY,
                slotId,
                deviceId,
                clocks: props.payload.clocks
            }]
        })

        // Clock post
        builder.addCase(poolSlotActions.clockPost.fulfilled, (state, props) => {
            const { deviceId } = props.meta.arg
            const storeClock = state.clocks.find(clock => clock.deviceId === deviceId)
            const addClock = props.payload.clock
            if (storeClock && storeClock.status === PoolSlotStatus.READY) {
                state.clocks = [...state.clocks.filter(clock => clock.deviceId !== deviceId || clock.slotId !== addClock.slotId), {
                    status: PoolSlotStatus.READY,
                    deviceId,
                    slotId: addClock.slotId,
                    clocks: [...storeClock.clocks, addClock]
                }]
            } else {
                state.clocks = [...state.clocks.filter(clock => clock.deviceId !== deviceId || clock.slotId !== addClock.slotId), {
                    status: PoolSlotStatus.READY,
                    deviceId,
                    slotId: addClock.slotId,
                    clocks: [addClock]
                }]
            }
        })

        // Clock put
        builder.addCase(poolSlotActions.clockPut.fulfilled, (state, props) => {
            const { deviceId, slotId } = props.meta.arg
            const storeClock = state.clocks.find(clock => clock.deviceId === deviceId && clock.slotId === slotId)
            const updatedClock = props.payload.clock
            if (storeClock && storeClock.status === PoolSlotStatus.READY) {
                state.clocks = [...state.clocks.filter(clock => clock.deviceId !== deviceId || clock.slotId !== updatedClock.slotId), {
                    status: PoolSlotStatus.READY,
                    deviceId,
                    slotId: updatedClock.slotId,
                    clocks: [...storeClock.clocks.filter(clock => clock.id !== updatedClock.id), updatedClock]
                }]
            }
        })

        // Clock delete
        builder.addCase(poolSlotActions.clockDelete.fulfilled, (state, props) => {
            const { deviceId, clockId, slotId } = props.meta.arg
            const storeClock = state.clocks.find(clock => clock.deviceId === deviceId && clock.slotId === slotId)
            if (storeClock && storeClock.status === PoolSlotStatus.READY) {
                state.clocks = [...state.clocks.filter(clock => clock.deviceId !== deviceId || clock.slotId !== storeClock.slotId), {
                    status: PoolSlotStatus.READY,
                    deviceId,
                    slotId: storeClock.slotId,
                    clocks: storeClock.clocks.filter(clock => clock.id !== clockId)
                }]
            }
        })
    },
})
