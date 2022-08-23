import {FunctionComponent} from "react";
import {Card, CardContent, CardHeader, Chip, List, ListItem, ListItemText, Typography} from "@mui/material";

import {Template, TemplateTopBar} from "../../../Template/Template";
import {PoolNav} from "../Routes";
import {ApplicationProps} from "../../../Context/ContextApplication";
import moment from "moment";

export const PoolDashboardPage: FunctionComponent<ApplicationProps> = (props) => {
    const { device } = props.deviceStore

    return <Template nav={PoolNav}>
        <TemplateTopBar>
            <h2>Dashboard</h2>
        </TemplateTopBar>

        <Card>
            <CardHeader title={device.name}/>
            <CardContent>
                <List>
                    <ListItem>
                        <ListItemText>
                            Statut <Chip
                                size='small'
                                variant='outlined'
                                color={device.online ? 'success' : 'error'}
                                label={device.online ? 'En ligne' : 'Hors ligne'}/>
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            Ip {device.ip}
                        </ListItemText>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            Ajouté {moment(device.createdAt).fromNow()}
                        </ListItemText>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    </Template>
}
