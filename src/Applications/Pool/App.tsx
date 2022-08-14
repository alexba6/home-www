import {Fragment, FunctionComponent, useContext, useEffect} from "react";
import {Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {ApplicationContextStatus, ContextApplication} from "../../Context/ContextApplication";
import {ContextAuthentication} from "../../Context/ContextAuthentication";
import {deviceSelectById} from "../../Store/Device/DeviceSelector";
import {deviceActions} from "../../Store/Device/DeviceActions";
import {PoolRoutesPath} from "./Routes";

import {PoolDashboardPage} from "./Pages/PoolDashboad";
import {PoolControlPage} from "./Pages/PoolControl";
import {PoolWaterTemperaturePage} from "./Pages/PoolWaterTemperature";
import {PoolOutsideTemperaturePage} from "./Pages/PoolOutsideTemperature";


export const PoolApp: FunctionComponent = () => {
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

    return <Fragment>
        { (device && device.device.type === 'pool') && <Fragment>
            <Route exact path={PoolRoutesPath.dashboard.target}>
                <PoolDashboardPage deviceStore={device}/>
            </Route>
            <Route exact path={PoolRoutesPath.control.target}>
                <PoolControlPage deviceStore={device}/>
            </Route>
            <Route exact path={PoolRoutesPath.waterTemperature.target}>
                <PoolWaterTemperaturePage deviceStore={device}/>
            </Route>
            <Route exact path={PoolRoutesPath.outsideTemperature.target}>
                <PoolOutsideTemperaturePage deviceStore={device}/>
            </Route>
        </Fragment>}
    </Fragment>
}
