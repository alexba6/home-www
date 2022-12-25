import { FunctionComponent} from "react";

import {Template} from "../../Template/Template";
import {HeaterDashboard} from "./Pages/HeaterDashboard";
import {AppWrapper} from "../../Wrapper/App";
import {HeaterTemperaturePage} from "./Pages/HeaterTemperature";
import {HeaterThresholdPage} from "./Pages/HeaterThreshold";
import {HeaterControlPage} from "./Pages/HeaterControl";

export const HeaterAppPage: FunctionComponent = () => {
    return <Template>
        <AppWrapper deviceType='heater' items={[
            {
                name: 'Dashboard',
                anchor: 'dashboard',
                component:  HeaterDashboard
            },
            {
                name: 'Temperature',
                anchor: 'temperature',
                component: HeaterTemperaturePage
            },
            {
                name: 'Contrôle',
                anchor: 'control',
                component: HeaterControlPage
            },
            {
                name: 'Seuil',
                anchor: 'threshold',
                component: HeaterThresholdPage
            }
        ]}/>
    </Template>
}
