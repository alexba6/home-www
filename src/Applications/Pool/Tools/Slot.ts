


export const getSeconds = (time: [number, number, number]) => time.reverse().reduce((v: number, t: number, i: number) => v + t * 60**i, 0)
