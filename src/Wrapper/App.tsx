import {FunctionComponent, useContext, useEffect} from "react";
import {ApplicationContextStatus, ContextApplication} from "../Context/ContextApplication";
import {ContextAuthentication} from "../Context/ContextAuthentication";
import {useDispatch, useSelector} from "react-redux";
import {deviceSelectById} from "../Store/Device/DeviceSelector";
import {deviceActions} from "../Store/Device/DeviceActions";
import {Device, DeviceStore} from "../Store/Device/DeviceReducer";
import {TabNavigation} from "../Components/Navigation/TabNavigation";

export type AppProps = {
    device: DeviceStore
}

type AppItem = {
    name: string
    anchor: string
    component: FunctionComponent<AppProps>
}

type AppWrapperProps = {
    deviceType: Device['type']
    items: AppItem[]
}


export const AppWrapper: FunctionComponent<AppWrapperProps> = (props) => {
    const appContext = useContext(ContextApplication)
    const authenticationContext = useContext(ContextAuthentication)
    const device = useSelector(deviceSelectById(appContext.deviceId))

    const dispatch = useDispatch<any>()

    useEffect(() => {
        if (!device && appContext.status === ApplicationContextStatus.READY) {
            dispatch(deviceActions.getOne({
                deviceId: appContext.deviceId,
                authenticationKey: authenticationContext.authenticationKey
            }))
        }
    })

    if (device && device.device.type === props.deviceType) {
        return <TabNavigation tabs={props.items.map(item => ({
            name: item.name,
            anchor: item.anchor,
            component: <item.component device={device}/>
        }))}/>
    }

    return <></>
}
