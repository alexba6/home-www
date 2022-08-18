import {RoutePath, RoutesPath} from "../../Config/Routes";

import {DashboardIcon} from "../../Icons/Sidebar/Dashboard";
import {ToggleSwitchIcon} from "../../Icons/Sidebar/ToggleSwitch";
import {WaterTemperatureIcon} from "../../Icons/Sidebar/WaterTemperature";
import {TemperatureIcon} from "../../Icons/Sidebar/Temperature";
import {ClockIcon} from "../../Icons/Sidebar/Clock";
import {FunctionComponent} from "react";
import {TemplateSidebarCategory, TemplateSidebarLink} from "../../Template/Template";


export const PoolRoutesPath: { [key: string]: RoutePath } = {
    dashboard: {
        target: '/app/pool',
        name: 'Dashboard',
        icon: <DashboardIcon />,
    },
    control: {
        target: '/app/pool/control',
        name: 'Contrôle',
        icon: <ToggleSwitchIcon/>
    },
    waterTemperature: {
        target: '/app/pool/water-temp',
        name: 'Température de l\'eau',
        icon: <WaterTemperatureIcon/>
    },
    outsideTemperature: {
        target: '/app/pool/outside-temp',
        name: 'Température extérieure',
        icon: <TemperatureIcon/>
    },
    slot: {
        target: '/app/pool/slot',
        name: 'Plage',
        icon: <ClockIcon/>
    }
}

export const PoolNav: FunctionComponent = () => {
    return <nav>
        <ul>
            <TemplateSidebarLink routePath={RoutesPath.undo} />
        </ul>
        <TemplateSidebarCategory name='Pool' />
        <ul>
            <TemplateSidebarLink routePath={PoolRoutesPath.dashboard} />
            <TemplateSidebarLink routePath={PoolRoutesPath.control} />
            <TemplateSidebarLink routePath={PoolRoutesPath.waterTemperature} />
            <TemplateSidebarLink routePath={PoolRoutesPath.outsideTemperature} />
            <TemplateSidebarLink routePath={PoolRoutesPath.slot} />
        </ul>
    </nav>
}
