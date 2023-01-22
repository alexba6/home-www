import { useState } from 'react'

export type ModalControl = {
	display: boolean
	open: () => void
	close: () => void
}

export const useModalControl = (): ModalControl => {
	const [display, setDisplay] = useState<boolean>(false)

	const open = () => {
		setDisplay(true)
	}

	const close = () => {
		setDisplay(false)
	}

	return { display, open, close }
}
