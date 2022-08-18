import {ChangeEvent, useState} from 'react'

type UseMultipleRef<K extends keyof any> = {
	value: Record<K, string>
	set: Record<K, (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void>
	clear: () => {}
}

export const useFormValue = <I extends object>(initialValue: Record<keyof I, string>): UseMultipleRef<keyof I> => {
	const [state, setState] = useState<{ [key in keyof I]: string }>(initialValue)

	const names = Object.keys(initialValue)

	// @ts-ignore
	const value = Object.fromEntries(names.map((name: any) => [name, state[name]]))

	const set = Object.fromEntries(
		names.map((name: any) => [
			name,
			(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => {
				setState((current) => ({
					...current,
					[name]: typeof event === 'string' ? event : event.target.value,
				}))
			},
		])
	)

	const clear = () => {
		setState(Object.fromEntries(names.map((name: any) => [name, ''])))
	}

	return {
		value,
		set,
		clear,
	} as any
}
