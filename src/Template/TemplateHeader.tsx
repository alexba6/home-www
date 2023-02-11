import {FunctionComponent, useState, MouseEvent, useContext} from "react";
import {Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import Logout from '@mui/icons-material/Logout';

import {HomeLogo} from "../Icons/HomeLogo";
import {SidebarIcon} from "../Icons/Sidebar";
import {RouteConfig} from "../Config/RouteType";
import {useHistory} from "react-router-dom";
import {Routes} from "../Config/Routes";

import styles from "./TemplateHeader.module.sass";
import {TemplateSearch} from "./TemplateSearch";
import {ContextAuthentication} from "../Context/ContextAuthentication";
import {useAvatarURL} from "../Hooks/UseAvatarURL";

type TemplateHeaderProps = {
    onOpenSidebar: () => void
}

/**
 * @param props
 * @constructor
 */
export const TemplateHeader: FunctionComponent<TemplateHeaderProps> = (props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const history = useHistory()

    const authContext = useContext(ContextAuthentication)
    const avatarURL = useAvatarURL(authContext.authenticationKey)

    const handleClickAccount = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseAccount = () => {
        setAnchorEl(null)
    }

    const handleClickAccountItem = (route: RouteConfig) => () => {
        history.push(route.target)
    }

    return (
        <div className={styles.templateHeader}>
            <div className={styles.templateHeaderMenuBtnFrame}>
                <button onClick={props.onOpenSidebar}>
                    <SidebarIcon />
                </button>
            </div>
            <div className={styles.templateHeaderIconFrame}>
                <a href="/">
                    <HomeLogo />
                    <h1>Home</h1>
                </a>
            </div>
            <div className={styles.templateHeaderSearchFrame}>
                <TemplateSearch/>
            </div>
            <div className={styles.templateHeaderSettings}>
                <IconButton onClick={handleClickAccount}>
                    <Tooltip title='Compte'>
                        <Avatar src={avatarURL} sx={{ width: 50, height: 50 }}/>
                    </Tooltip>
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseAccount}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}>
                    <MenuItem onClick={handleClickAccountItem(Routes.account)}>Compte</MenuItem>
                    <Divider/>

                    <MenuItem onClick={handleClickAccountItem(Routes.logout)}>
                        <ListItemIcon>
                            <Logout fontSize='small'/>
                        </ListItemIcon>
                        Logout
                    </MenuItem>

                </Menu>
            </div>
        </div>
    )
}
