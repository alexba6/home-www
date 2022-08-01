import {FunctionComponent} from "react";
import {HomeStore} from "../../Store/Home/HomeReducer";
import moment from "moment/moment";

import styles from './HomeRow.module.sass'

type HomeRowProps = {
    home: HomeStore
    onOpen: () => void
}

export const HomeRow: FunctionComponent<HomeRowProps> = (props) => {
    const { home, devicesId } = props.home

    return <tr className={styles.homeRow} onClick={props.onOpen}>
        <td>{home.name}</td>
        <td>{devicesId.length}</td>
        <td>{moment(home.createdAt).calendar()}</td>
    </tr>
}

