import {RoutePath} from "../../Config/Routes";

import {DashboardIcon} from "../../Icons/Sidebar/Dashboard";
import {ToggleSwitchIcon} from "../../Icons/Sidebar/ToggleSwitch";
import {WaterTemperatureIcon} from "../../Icons/Sidebar/WaterTemperature";
import {TemperatureIcon} from "../../Icons/Sidebar/Temperature";
import {ClockIcon} from "../../Icons/Sidebar/Clock";


export const PoolRoutesPath: { [key: string]: RoutePath } = {
    dashboard: {
        target: '/device/pool',
        name: 'Dashboard',
        icon: <DashboardIcon />,
    },
    control: {
        target: '/device/pool/control',
        name: 'Contrôle',
        icon: <ToggleSwitchIcon/>
    },
    waterTemperature: {
        target: '/device/pool/water-temp',
        name: 'Température de l\'eau',
        icon: <WaterTemperatureIcon/>
    },
    outsideTemperature: {
        target: '/device/pool/outside-temp',
        name: 'Température extérieure',
        icon: <TemperatureIcon/>
    },
    slot: {
        target: '/device/pool/slot',
        name: 'Plage',
        icon: <ClockIcon/>
    }
}
