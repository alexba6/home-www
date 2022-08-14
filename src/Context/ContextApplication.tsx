import {Device, DeviceStatus, DeviceStore} from "../Store/Device/DeviceReducer"
import {createContext, FunctionComponent, ReactNode, useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";

export enum ApplicationContextStatus {
    IDLE = 'IDLE',
    READY = 'READY',
    EMPTY = 'EMPTY'
}

export type ApplicationProps = {
    deviceStore: DeviceStore
}

type ApplicationContextProps = {
    deviceId: Device['id']
    status: ApplicationContextStatus,
    set: (deviceId: Device['id'] | null) => void
}

type ApplicationContextProviderProps = {
    children: ReactNode
}

const SESSION_DEVICE_ID_KEY = 'deviceId'

export const ContextApplication = createContext<ApplicationContextProps>({
    deviceId: '',
    status: ApplicationContextStatus.IDLE,
    set: (deviceId: Device['id'] | null) => {}
})

export const ApplicationContextProvider: FunctionComponent<ApplicationContextProviderProps> = (props) => {
    const [deviceId, setDeviceId] = useState<Device['id']>('')
    const [status, setStatus] = useState<ApplicationContextStatus>(ApplicationContextStatus.IDLE)

    const location = useLocation()
    const history = useHistory()

    const set = (deviceId: Device['id'] | null) => {
        if (deviceId) {
            setDeviceId(deviceId)
            setStatus(ApplicationContextStatus.READY)
            localStorage.setItem(SESSION_DEVICE_ID_KEY, deviceId)
        }
        else {
            setDeviceId('')
            setStatus(ApplicationContextStatus.EMPTY)
            localStorage.removeItem(SESSION_DEVICE_ID_KEY)
        }
    }

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        const searchDeviceId = query.get('deviceId')
        if (searchDeviceId) {
            query.delete('deviceId')
            set(searchDeviceId)
            history.replace({
                search: query.toString()
            })
        }
        else {
            const sessionDeviceId = localStorage.getItem(SESSION_DEVICE_ID_KEY)
            if (sessionDeviceId) {
                setDeviceId(sessionDeviceId)
                setStatus(ApplicationContextStatus.READY)
            } else {
                setStatus(ApplicationContextStatus.EMPTY)
            }
        }
    }, [location, deviceId, setDeviceId])

    return <ContextApplication.Provider value={{ deviceId, set, status }}>
        {props.children}
    </ContextApplication.Provider>
}
