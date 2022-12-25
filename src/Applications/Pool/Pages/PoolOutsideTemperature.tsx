import { FunctionComponent} from "react";
import {ApplicationProps} from "../../../Context/ContextApplication";
import {SensorCard} from "../../../Components/Sensor/SensorCard";
import {TemperatureIcon} from "../../../Icons/Sidebar/Temperature";
import {AppProps} from "../../../Wrapper/App";


export const PoolOutsideTemperaturePage: FunctionComponent<AppProps> = (props) => {
    return <SensorCard
        deviceId={props.device.device.id}
        title='Temperature extérieure'
        sensorName='outside_temp'
        unit='°C'
        chartYName='Temperature'
        recentIcon={<TemperatureIcon/>}
    />
}
