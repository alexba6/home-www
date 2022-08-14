import { FunctionComponent} from "react";
import {Template} from "../../../Template/Template";
import {PoolNav} from "../Routes";
import {ApplicationProps} from "../../../Context/ContextApplication";
import {SensorCard} from "../../../Components/Sensor/SensorCard";
import {TemperatureIcon} from "../../../Icons/Sidebar/Temperature";


export const PoolOutsideTemperaturePage: FunctionComponent<ApplicationProps> = (props) => {
    return <Template nav={PoolNav}>
        <SensorCard
            deviceId={props.deviceStore.device.id}
            title='Temperature extérieure'
            sensorName='outside_temp'
            unit='°C'
            chartYName='Temperature'
            recentIcon={<TemperatureIcon/>}
        />
    </Template>
}
