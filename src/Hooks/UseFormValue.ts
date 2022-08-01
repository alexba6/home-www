import { useState} from "react";

type UseMultipleRef <K extends keyof any> = {
    value: {
        [key in K]: string
    },
    set: {
        [value in K]: (value: string) => void
    },
    clear: () => {}
}


export const useFormValue = <I extends object>(initialValue: { [key in keyof I]: string }): UseMultipleRef<keyof I> => {
    const [state, setState] = useState<{ [key in keyof I]: string }>(initialValue)

    const names = Object.keys(initialValue)

    // @ts-ignore
    const value = Object.fromEntries(names.map((name: any) => [name, state[name]]))

    const set = Object.fromEntries(names.map((name: any) => [name, (value: string) => {
        setState(current => ({
            ...current,
            [name]: value
        }))
    }]))

    const clear = () => {
        setState(Object.fromEntries(names.map((name: any) => [name, ''])))
    }

    return {
        value, set, clear
    } as any
}

