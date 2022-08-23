


export const getSeconds = (time: [number, number]) => time[0] * 3600 + time[1] * 60

export const formatTimeToArray = (time: string): [number, number] => {
    return time.split(':')
        .slice(0, 2)
        .map(v => Number(v)) as [number, number]
}

export const formatArrayToTime = (time: [number, number]): string => {
    return time.map(n => (n >= 10) ? n : `0${n}`).join(':')
}
