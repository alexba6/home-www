import {FunctionComponent} from "react";
import {AppProps} from "../../../Wrapper/App";
import {SensorCard} from "../../../Components/Sensor/SensorCard";
import {TemperatureIcon} from "../../../Icons/Sidebar/Temperature";

export const HeaterTemperaturePage: FunctionComponent<AppProps> = (props) => {
    return <SensorCard
        deviceId={props.device.device.id}
        title='Temperature'
        sensorName='air_temp'
        unit='°C'
        chartYName='Temperature'
        recentIcon={<TemperatureIcon/>}
    />
}
