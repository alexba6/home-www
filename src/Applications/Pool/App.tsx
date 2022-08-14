import {Fragment, FunctionComponent, useContext, useEffect} from "react";
import {Route, useHistory, useLocation} from "react-router-dom";
import {PoolDashboardPage} from "./Pages/PoolDashboad";
import {PoolRoutesPath} from "./Routes";
import {PoolControlPage} from "./Pages/PoolControl";
import {ContextApplication} from "../../Context/ContextApplication";
import {useDispatch, useSelector} from "react-redux";
import {deviceSelectById} from "../../Store/Device/DeviceSelector";
import {DeviceStatus} from "../../Store/Device/DeviceReducer";
import {ContextAuthentication} from "../../Context/ContextAuthentication";
import {deviceActions} from "../../Store/Device/DeviceActions";
import {PoolWaterTemperaturePage} from "./Pages/PoolWaterTemperature";


export const PoolApp: FunctionComponent = () => {
    const appContext = useContext(ContextApplication)
    const authenticationContext = useContext(ContextAuthentication)
    const device = useSelector(deviceSelectById(appContext.deviceId))

    const dispatch = useDispatch<any>()

    useEffect(() => {
        if (!device) {
            dispatch(deviceActions.getOne({
                deviceId: appContext.deviceId,
                authenticationKey: authenticationContext.authenticationKey
            }))
        }
    })

    return <Fragment>
        { device && <Fragment>
            <Route exact path={PoolRoutesPath.dashboard.target}>
                <PoolDashboardPage deviceStore={device}/>
            </Route>
            <Route exact path={PoolRoutesPath.control.target}>
                <PoolControlPage deviceStore={device}/>
            </Route>
            <Route exact path={PoolRoutesPath.waterTemperature.target}>
                <PoolWaterTemperaturePage deviceStore={device}/>
            </Route>
        </Fragment>}
    </Fragment>
}
