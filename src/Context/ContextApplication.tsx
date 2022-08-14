import { Device } from "../Store/Device/DeviceReducer"
import {createContext, FunctionComponent, ReactNode, useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";


type ApplicationContextProps = {
    deviceId: Device['id'] | null | undefined
    set: (deviceId: Device['id'] | null) => void
}

type ApplicationContextProviderProps = {
    children: ReactNode
}

const SESSION_DEVICE_ID_KEY = 'deviceId'

export const ContextApplication = createContext<ApplicationContextProps>({
    deviceId: undefined,
    set: (deviceId: Device['id'] | null) => {}
})

export const ApplicationContextProvider: FunctionComponent<ApplicationContextProviderProps> = (props) => {
    const [deviceId, setDeviceId] = useState<ApplicationContextProps['deviceId']>(undefined)

    const location = useLocation()
    const history = useHistory()

    const set = (deviceId: Device['id'] | null) => {
        setDeviceId(deviceId)
        if (deviceId) {
            sessionStorage.setItem(SESSION_DEVICE_ID_KEY, deviceId)
        }
        else {
            sessionStorage.removeItem(SESSION_DEVICE_ID_KEY)
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
            const sessionDeviceId = sessionStorage.getItem(SESSION_DEVICE_ID_KEY)
            if (sessionDeviceId) {
                setDeviceId(sessionDeviceId)
            } else {
                setDeviceId(null)
            }
        }
    }, [location, deviceId, setDeviceId])

    return <ContextApplication.Provider value={{ deviceId, set }}>
        {props.children}
    </ContextApplication.Provider>
}
