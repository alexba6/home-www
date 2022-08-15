

export type PoolTimeSlot = {
    id: number
    start: [number, number, number]
    end: [number, number, number]
    enable: boolean
}

export type PoolTempSlot = {
    id: string
    temperature: number
    time_slots: PoolTimeSlot[]
}
