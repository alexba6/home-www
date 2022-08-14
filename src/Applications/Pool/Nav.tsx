import {FunctionComponent} from "react";
import {TemplateSidebarCategory, TemplateSidebarLink} from "../../Template/Template";
import {PoolRoutesPath} from "./Routes";
import {RoutesPath} from "../../Config/Routes";


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
