import {FunctionComponent, useEffect, Fragment, ReactNode, useMemo} from 'react'
import {createPortal} from 'react-dom'

import styles from './Modal.module.sass'
import {ButtonCircle} from "../Button/ButtonCircle";
import {ClickOutsideWrapper} from "../../Wrapper/ClikOutside";
import {CloseIcon} from "../../Icons/Close";

type ModalProviderProps = {
    display: boolean,
    onClose: () => void,
    children: ReactNode,
    name: string
    disabledOutsideClick?: boolean
}

type ModalBodyProps = {
    children: ReactNode
}

type ModalFooterProps = {
    children: ReactNode
}

const ModalBody: FunctionComponent<ModalBodyProps> = (props) => {
    return <div className={styles.modalBodyContainer}>
        {props.children}
    </div>
}

const ModalFooter: FunctionComponent<ModalFooterProps> = (props) => {
    return <div className={styles.modalFooterContainer}>
        {props.children}
    </div>
}

const ModalProvider: FunctionComponent<ModalProviderProps> = (props) => {
    const root = document.createElement('div')

    const active = useMemo(() => props.display ? 'active' : 'unable', [props])

    useEffect(() => {
        const body = document.querySelector('body')
        if (!body) {
            return
        }
        body.appendChild(root)
        return () => {
            body.removeChild(root)
        }
    }, [root])

    const onClickOutside = () => {
        if (props.display && props.disabledOutsideClick !== true) {
            props.onClose()
        }
    }

    return createPortal(<Fragment>
        <div className={styles.modalProviderMask} active={active}/>
        <ClickOutsideWrapper onClickOutside={onClickOutside}>
            <div className={styles.modalProviderContainer} active={active}>
                <div className={styles.modalProviderHeader}>
                    <div>
                        <h2>{props.name}</h2>
                    </div>
                    <div>
                        <ButtonCircle size={30} onClick={props.onClose} icon={<CloseIcon/>}>
                            Close
                        </ButtonCircle>
                    </div>
                </div>
                {props.children}
            </div>
        </ClickOutsideWrapper>
    </Fragment>, root)
}

export const Modal = {
    Provider: ModalProvider,
    Body: ModalBody,
    Footer: ModalFooter
}
