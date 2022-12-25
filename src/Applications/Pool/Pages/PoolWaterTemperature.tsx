import { FunctionComponent} from "react";
import {ApplicationProps} from "../../../Context/ContextApplication";
import {SensorCard} from "../../../Components/Sensor/SensorCard";
import {WaterTemperatureIcon} from "../../../Icons/Sidebar/WaterTemperature";
import {AppProps} from "../../../Wrapper/App";


export const PoolWaterTemperaturePage: FunctionComponent<AppProps> = (props) => {
    return <SensorCard
        deviceId={props.device.device.id}
        title="Temperature de l'eau"
        sensorName='water_temp'
        unit='°C'
        chartYName='Temperature'
        recentIcon={<WaterTemperatureIcon/>}
    />
}
