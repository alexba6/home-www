import { FunctionComponent, MouseEvent} from "react";
import {Tooltip} from "@mui/material";
import {Routes} from "../Config/Routes";
import {useHistory, useLocation} from "react-router-dom";
import {RoutePath} from "../Config/RouteType"

import styles from "./TemplateSideBar.module.sass"

type TemplateSidebarLinkProps = {
    routePath: RoutePath
}

type TemplateSidebarProps = {
    display: boolean
    onClose: () => void
}

/**
 * @param props
 * @constructor
 */
export const TemplateSidebarLink: FunctionComponent<TemplateSidebarLinkProps> = (props) => {
    const location = useLocation()
    const history = useHistory()

    const active = location.pathname === props.routePath.target

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        event.stopPropagation()
        history.push(props.routePath.target)

    }

    return (
        <li className={styles.templateSidebarLink}>
            <Tooltip title={props.routePath.name} enterDelay={700} placement='right-end'>
                <a href={props.routePath.target} onClick={handleClick}>
                    <div className={styles.templateSidebarLinkFrame} active={active ? 'active' : 'disable'}>
                        <div className={styles.templateSidebarLinkIconFrame}>{props.routePath.icon}</div>
                        <div className={styles.templateSidebarLinkText}>
                            <span>{props.routePath.name}</span>
                        </div>
                    </div>
                </a>
            </Tooltip>
        </li>
    )
}


/**
 * @param props
 * @constructor
 */
export const TemplateSidebar: FunctionComponent<TemplateSidebarProps> = (props) => {
    return (
        <div className={styles.templateSidebar} display_menu={props.display ? 'show' : 'hide'}>
            <div className={styles.templateSidebarFrame}>
                <nav>
                    <ul>
                        <TemplateSidebarLink routePath={Routes.dashboard} />
                        <TemplateSidebarLink routePath={Routes.home} />
                        <TemplateSidebarLink routePath={Routes.device} />
                        <TemplateSidebarLink routePath={Routes.notifications} />
                        <TemplateSidebarLink routePath={Routes.account} />
                    </ul>
                </nav>
            </div>
            <div className={styles.templateSidebarOpacityFrame} onClick={props.onClose} />
        </div>
    )
}
