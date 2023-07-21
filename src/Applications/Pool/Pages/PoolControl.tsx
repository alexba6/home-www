import {FunctionComponent} from "react";
import {Card, CardHeader} from "../../../Components/Card/Card";
import {ActionBtnGroupButtons} from "../../../Components/ActionButtonGroup/ActionBtnGroupButtons";
import {AppProps} from "../../../Wrapper/App";

export const PoolControlPage: FunctionComponent<AppProps> = (props) => {
    const device = props.device.device

    return <Card>
        <CardHeader>
            <h2>Filtration pompe</h2>
        </CardHeader>
        <ActionBtnGroupButtons deviceId={device.id} actionName='filtration' deviceType={device.type}/>
        <br/>
    </Card>
}
