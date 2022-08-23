import {Device} from "../../../../Store/Device/DeviceReducer";
import {RootState} from "../../../../Store";
import {PoolClock, PoolClockStore, PoolCurrentSlotStore, PoolSlot, PoolSlotStatus, PoolSlotStore} from "./SlotReducer";
import {getSeconds} from "../../Tools/Slot";

/**
 * @param deviceId
 */
const currentSlotStore = (deviceId: Device['id']) => (store: RootState): PoolCurrentSlotStore | undefined => {
    return store.poolSlot.currentSlotId.find(currentSlotId => currentSlotId.deviceId === deviceId)
}

/**
 * @param deviceId
 */
const currentSlotId = (deviceId: Device['id']) => (store: RootState): PoolSlot['id'] | null | undefined => {
    const currentSlotIdStore = store.poolSlot.currentSlotId.find(currentSlotId => currentSlotId.deviceId === deviceId)
    if (currentSlotIdStore && currentSlotIdStore.status === PoolSlotStatus.READY) {
        return currentSlotIdStore.slotId
    }
    return undefined
}

/**
 * @param deviceId
 */
const slotStore = (deviceId: Device['id']) => (store: RootState): PoolSlotStore | undefined => {
    return store.poolSlot.slots.find(slot => slot.deviceId === deviceId)
}

/**
 * @param deviceId
 * @param slotId
 */
const clockStore = (deviceId: Device['id'], slotId: PoolSlot['id']) =>  (store: RootState): PoolClockStore | undefined => {
    return store.poolSlot.clocks.find(clock => clock.deviceId === deviceId && clock.slotId === slotId)
}

/**
 * @param deviceId
 */
const slots = (deviceId: Device['id']) => (store: RootState): PoolSlot[] | undefined => {
    const slotStore = store.poolSlot.slots.find(slot => slot.deviceId === deviceId)
    if (slotStore && slotStore.status === PoolSlotStatus.READY) {
        const slots = [...slotStore.slots]
        return slots.sort((a: PoolSlot, b: PoolSlot) => b.temperature - a.temperature)
    }
    return undefined
}

/**
 * @param deviceId
 * @param slotId
 */
const clocks = (deviceId: Device['id'], slotId: PoolSlot['id']) =>  (store: RootState) => {
    const clockStore = store.poolSlot.clocks.find(clock => clock.deviceId === deviceId  && clock.slotId === slotId)
    if (clockStore && clockStore.status === PoolSlotStatus.READY) {
        const clocks = [...clockStore.clocks]
        return clocks.sort((a: PoolClock, b: PoolClock) => {
            return getSeconds(a.start) - getSeconds(b.start)
        })
    }
}

export const poolSlotSelector = {
    currentSlotStore,
    currentSlotId,
    slotStore,
    clockStore,
    slots,
    clocks
}
