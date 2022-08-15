import {Template} from "../../../Template/Template";
import {FunctionComponent} from "react";
import {PoolNav} from "../Routes";
import {ApplicationProps} from "../../../Context/ContextApplication";

export const PoolDashboardPage: FunctionComponent<ApplicationProps> = (props) => {
    const { device } = props.deviceStore



    return <Template nav={PoolNav}>
        <h2>Dashboard</h2>
    </Template>
}
