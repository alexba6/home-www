import {FunctionComponent} from "react";
import {DeviceStore} from "../../Store/Device/DeviceReducer";

import styles from './DeviceGrid.module.sass'

type DeviceGridProps = {
    devicesStore: DeviceStore[]
}

type DeviceItemProps = {
    deviceStore: DeviceStore
}

const DeviceItem: FunctionComponent<DeviceItemProps> = (props) => {
    const { device } = props.deviceStore
    return <div className={styles.deviceItemContainer}>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="60px" height="60px" viewBox="0 0 16 16"><path fill="#888888" d="M6 0a.5.5 0 0 1 .5.5V3h3V.5a.5.5 0 0 1 1 0V3h1a.5.5 0 0 1 .5.5v3A3.5 3.5 0 0 1 8.5 10c-.002.434-.01.845-.04 1.22c-.041.514-.126 1.003-.317 1.424a2.083 2.083 0 0 1-.97 1.028C6.725 13.9 6.169 14 5.5 14c-.998 0-1.61.33-1.974.718A1.922 1.922 0 0 0 3 16H2c0-.616.232-1.367.797-1.968C3.374 13.42 4.261 13 5.5 13c.581 0 .962-.088 1.218-.219c.241-.123.4-.3.514-.55c.121-.266.193-.621.23-1.09c.027-.34.035-.718.037-1.141A3.5 3.5 0 0 1 4 6.5v-3a.5.5 0 0 1 .5-.5h1V.5A.5.5 0 0 1 6 0zM5 4v2.5A2.5 2.5 0 0 0 7.5 9h1A2.5 2.5 0 0 0 11 6.5V4H5z"></path></svg>
        </div>
        <div className={styles.deviceItemNameFrame}>
            <strong>{device.name}</strong>
        </div>
    </div>
}

export const DeviceGrid: FunctionComponent<DeviceGridProps> = (props) => {
    return <div className={styles.deviceGridContainer}>
        {props.devicesStore.map((deviceStore, key) => <DeviceItem
            key={key}
            deviceStore={deviceStore}/>
        )}
    </div>
}
