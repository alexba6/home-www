import {Template} from "../../../Template/Template";
import {FunctionComponent} from "react";
import {PoolNav} from "../Routes";
import {ApplicationProps} from "../../../Context/ContextApplication";

export const PoolWaterTemperaturePage: FunctionComponent<ApplicationProps> = (props) => {
    const { device } = props.deviceStore

    return <Template nav={PoolNav}>
        <h2>Température de l'eau</h2>
    </Template>
}
