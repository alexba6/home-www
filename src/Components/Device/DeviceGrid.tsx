import {FunctionComponent} from "react";
import {DeviceStore} from "../../Store/Device/DeviceReducer";

import styles from './DeviceGrid.module.sass'
import {PoolItemWidget} from "../../Applications/Pool/ItemWidget";
import {useHistory} from "react-router-dom";

type DeviceGridProps = {
    devicesStore: DeviceStore[]
}

type DeviceItemProps = {
    deviceStore: DeviceStore
}

const DeviceItem: FunctionComponent<DeviceItemProps> = (props) => {
    const { device } = props.deviceStore
    const history = useHistory()

    const onOpen = () => {
        history.push({
            pathname: `/device/${device.type}`,
            search: `?deviceId=${device.id}`
        })
    }

    return <div className={styles.deviceItemContainer} onClick={onOpen}>
        <div>
            {device.type === 'pool' && <PoolItemWidget/>}
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
