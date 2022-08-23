import { FunctionComponent,ReactNode } from 'react'

import { CloseIcon } from '../../Icons/Close'

import styles from './Modal.module.sass'
import {Modal} from "@mui/material";

type ModalProviderProps = {
	display: boolean
	onClose: () => void
	children: ReactNode
	name: string
}

type ModalBodyProps = {
	children: ReactNode
}

type ModalFooterProps = {
	children: ReactNode
}

export const ModalBody: FunctionComponent<ModalBodyProps> = (props) => {
	return <div className={styles.modalBodyContainer}>{props.children}</div>
}

export const ModalFooter: FunctionComponent<ModalFooterProps> = (props) => {
	return <div className={styles.modalFooterContainer}>
		{props.children}
	</div>
}

export const ModalProvider: FunctionComponent<ModalProviderProps> = (props) => {
	return <Modal open={props.display} onClose={props.onClose}>
		<div className={styles.modalProviderContainer} >
			<div className={styles.modalProviderHeader}>
				<div>
					<h2>{props.name}</h2>
				</div>
				<div className={styles.modalProviderCloseButtonFrame}>
					<button onClick={props.onClose}>
						<CloseIcon />
					</button>
				</div>
			</div>
			{props.children}
		</div>
	</Modal>
}
