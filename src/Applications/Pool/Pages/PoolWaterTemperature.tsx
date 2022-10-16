import { FunctionComponent} from "react";
import {ApplicationProps} from "../../../Context/ContextApplication";
import {SensorCard} from "../../../Components/Sensor/SensorCard";
import {WaterTemperatureIcon} from "../../../Icons/Sidebar/WaterTemperature";


export const PoolWaterTemperaturePage: FunctionComponent<ApplicationProps> = (props) => {
    return <SensorCard
        deviceId={props.deviceStore.device.id}
        title="Temperature de l'eau"
        sensorName='water_temp'
        unit='°C'
        chartYName='Temperature'
        recentIcon={<WaterTemperatureIcon/>}
    />
}
