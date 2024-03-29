import {SensorBuffer} from "../../Store/Sensor/SensorReducer";
import {FunctionComponent, useContext} from "react";
import Chart from "react-apexcharts";
import {ContextTheme} from "../../Context/ContextTheme";

type SensorBufferChartProps = {
    buffers: SensorBuffer[]
    name: string,
    units: string
}

export const SensorBufferChart: FunctionComponent<SensorBufferChartProps> = (props) => {
    const themeContext = useContext(ContextTheme)
    return <Chart
        options={{
            theme: {
              mode: themeContext.theme
            },
            chart: {
                background: 'transparent'
            },
            xaxis: {
                categories: props.buffers.map(buffer => new Date(buffer[0]).toLocaleTimeString()),
                tickAmount: 6
            },
            yaxis: {
                labels: {
                    formatter: (val: number) => `${Math.round(val * 100) / 100} ${props.units}`
                },
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 100]
                }
            },
        }}
        series={[{
            name: 'Température',
            data: props.buffers.map(buffer =>buffer[1])
        }]}
        type='area' height={320}
    />
}
