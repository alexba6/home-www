import { FunctionComponent} from "react";

import {PoolDashboardPage} from "./Pages/PoolDashboad";
import {PoolControlPage} from "./Pages/PoolControl";
import {PoolWaterTemperaturePage} from "./Pages/PoolWaterTemperature";
import {PoolOutsideTemperaturePage} from "./Pages/PoolOutsideTemperature";
import {PoolSlotPage} from "./Pages/PoolSlot";
import {Template} from "../../Template/Template";
import {AppWrapper} from "../../Wrapper/App";


export const PoolAppPage: FunctionComponent = () => {
    return <Template>
        <AppWrapper deviceType='pool' items={[
            {
                name: 'Dashboard',
                anchor: 'dashboard',
                component:  PoolDashboardPage
            },
            {
                name: 'Contrôle',
                anchor: 'control',
                component:  PoolControlPage
            },
            {
                name: 'Température de l\'eau',
                anchor: 'water-temp',
                component:  PoolWaterTemperaturePage
            },
            {
                name: 'Température extérieure',
                anchor: 'outside-temp',
                component:  PoolOutsideTemperaturePage
            },
            {
                name: 'Plage',
                anchor: 'slot',
                component:  PoolSlotPage
            }
        ]}/>
    </Template>
}
