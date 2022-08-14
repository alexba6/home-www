import {Fragment, FunctionComponent, ReactNode, SyntheticEvent, useContext, useEffect, useMemo, useState} from "react";
import {Alert, Tab, Tabs} from "@mui/material";
import moment from "moment";

import {Device} from "../../Store/Device/DeviceReducer";
import {ContextAuthentication} from "../../Context/ContextAuthentication";
import {useDispatch, useSelector} from "react-redux";
import {WaterTemperatureIcon} from "../../Icons/Sidebar/WaterTemperature";
import {SensorHistoryValuesChart} from "./SensorHistoryValuesChart";
import {sensorSelector} from "../../Store/Sensor/SensorSelector";
import {SensorBufferChart} from "./SensorBufferChart";
import {SensorBuffer} from "../../Store/Sensor/SensorReducer";
import {sensorActions} from "../../Store/Sensor/SensorActions";
import {Card, CardHeader} from "../Card/Card";

type SensorCardProps = {
    deviceId: Device['id']
    sensorName: string
    chartYName: string
    title: string
    unit: string
    recentIcon?: ReactNode
}

export const SensorCard: FunctionComponent<SensorCardProps> = (props) => {
    const authenticationContext = useContext(ContextAuthentication)
    const dispatch = useDispatch<any>()

    const [tab, setTab] = useState(0)

    const sensor = useSelector(sensorSelector.getSensor(props.deviceId, props.sensorName))
    const sensorBuffer = useSelector(sensorSelector.getBuffer(sensor?.id))
    const sensorValue = useSelector(sensorSelector.getValues(sensor?.id))

    const lastValue: SensorBuffer | undefined = useMemo(() => sensorBuffer && sensorBuffer[sensorBuffer.length - 1], [sensorBuffer])

    useEffect(() => {
        if (!sensor) {
            dispatch(sensorActions.getAvailable({
                authenticationKey: authenticationContext.authenticationKey,
                deviceId: props.deviceId,
            }))
        }
        if (!sensorBuffer && sensor) {
            dispatch(sensorActions.getBuffer({
                authenticationKey: authenticationContext.authenticationKey,
                sensorId: sensor.id
            }))
        }
        if (!sensorValue && sensor) {
            dispatch(sensorActions.getValues({
                authenticationKey: authenticationContext.authenticationKey,
                sensorId: sensor.id
            }))
        }
    })

    const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
        setTab(newValue)
    }

    return <Card>
        <CardHeader>
            <h2>{props.title}</h2>
        </CardHeader>
        {lastValue &&
            <Alert icon={props.recentIcon} severity='info'>
                {lastValue[1]}{props.unit} {moment(lastValue[0]).fromNow()}
            </Alert>}
        <br/>
        <Tabs value={tab} onChange={handleChangeTab}>
            <Tab label='Récent'/>
            <Tab label='Historique'/>
        </Tabs>
        <br/>
        {tab == 0 && <Fragment>
            {(sensorBuffer && sensorBuffer.length > 0) && <SensorBufferChart
                buffers={sensorBuffer}
                name={props.chartYName}
                units={props.unit}
            />}
            {(sensorBuffer && sensorBuffer.length == 0) && <Alert severity='warning'>
                Pas de données
            </Alert>}
        </Fragment>}
        {tab == 1 && <Fragment>
            {(sensorValue && sensorValue.length > 0) && <SensorHistoryValuesChart
                values={sensorValue}
                units={props.unit}
            />}
            {(sensorValue && sensorValue.length == 0) && <Alert severity='warning'>
                Pas de données
            </Alert>}
        </Fragment>}
    </Card>
}
