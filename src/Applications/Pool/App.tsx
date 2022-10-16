import { FunctionComponent, useContext, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {ApplicationContextStatus, ContextApplication} from "../../Context/ContextApplication";
import {ContextAuthentication} from "../../Context/ContextAuthentication";
import {deviceSelectById} from "../../Store/Device/DeviceSelector";
import {deviceActions} from "../../Store/Device/DeviceActions";

import {PoolDashboardPage} from "./Pages/PoolDashboad";
import {PoolControlPage} from "./Pages/PoolControl";
import {PoolWaterTemperaturePage} from "./Pages/PoolWaterTemperature";
import {PoolOutsideTemperaturePage} from "./Pages/PoolOutsideTemperature";
import {PoolSlotPage} from "./Pages/PoolSlot";
import {TabNavigation} from "../../Components/Navigation/TabNavigation";
import {Template} from "../../Template/Template";
import {Typography} from "@mui/material";


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

    if (device && device.device.type === 'pool') {
        return <Template>
            <TabNavigation
                default={0}
                tabs={[
                    {
                        name: 'Dashboard',
                        anchor: 'dashboard',
                        component:  <PoolDashboardPage deviceStore={device}/>
                    },
                    {
                        name: 'Contrôle',
                        anchor: 'control',
                        component:  <PoolControlPage deviceStore={device}/>
                    },
                    {
                        name: 'Température de l\'eau',
                        anchor: 'water-temp',
                        component:  <PoolWaterTemperaturePage deviceStore={device}/>
                    },
                    {
                        name: 'Température extérieure',
                        anchor: 'outside-temp',
                        component:  <PoolOutsideTemperaturePage deviceStore={device}/>
                    },
                    {
                        name: 'Plage',
                        anchor: 'slot',
                        component:  <PoolSlotPage deviceStore={device}/>
                    }
                ]}/>
        </Template>
    }
    return <></>
}
