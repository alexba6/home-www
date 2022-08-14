import { SensorValue } from "../../Store/Sensor/SensorReducer";
import {FunctionComponent, useContext, useMemo} from "react";
import Chart from "react-apexcharts";
import {ContextTheme} from "../../Context/ContextTheme";

type SensorHistoryValuesChartProps = {
    values: SensorValue[]
    units: string
}

export const SensorHistoryValuesChart: FunctionComponent<SensorHistoryValuesChartProps> = (props) => {
    const themeContext = useContext(ContextTheme)

    const averageValues: SensorValue[] = useMemo((): SensorValue[] => {
        const values: SensorValue[][]  = [[]]
        let lastDate = new Date(props.values[0].date)
        for (const value of props.values) {
            const currentDate = new Date(value.date)
            if (lastDate.getMonth() === currentDate.getMonth() && lastDate.getFullYear() === currentDate.getFullYear()) {
                values[values.length - 1].push(value)
            } else {
                values.push([value])
            }
            lastDate = currentDate
        }
        return values.map((valueMonth: SensorValue[]): SensorValue => {
            const length = valueMonth.length
            const ceil = (v: number) => Math.ceil(v * 100) / 100
            return {
                date: new Date(valueMonth[0].date),
                min: ceil(valueMonth.reduce((a: number, b: SensorValue) => a + b.min, 0) / length),
                max: ceil(valueMonth.reduce((a: number, b: SensorValue) => a + b.max, 0) / length),
                average: ceil(valueMonth.reduce((a: number, b: SensorValue) => a + b.average, 0) / length)
            }
        }).sort((a: SensorValue, b: SensorValue) => a.date.getTime() - b.date.getTime())
    }, [])

    return <Chart
        options={{
            theme: {
                mode: themeContext.theme
            },
            chart: {
                background: 'transparent'
            },
            xaxis: {
                categories: averageValues.map(value => new Date(value.date).toLocaleDateString( 'fr-CA', {
                    year: 'numeric',
                    month: 'short'
                }))
            },
            yaxis: {
                tickAmount: 6,
                labels: {
                    formatter: (val: number) => `${val} ${props.units}`
                }
            },
            dataLabels: {
                enabled: false
            }
        }}
        series={[
            {
                name: 'Min',
                data: averageValues.map(value => value.min)
            },
            {
                name: 'Moyenne',
                data: averageValues.map(value => value.average)
            },
            {
                name: 'Max',
                data: averageValues.map(value => value.max)
            }
        ]}
        type='bar' height={320}
    />
}
