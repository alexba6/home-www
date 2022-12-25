import {FunctionComponent} from "react";
import {ApplicationProps} from "../../../Context/ContextApplication";
import {Card, CardContent, CardHeader, Chip, List, ListItem, ListItemText} from "@mui/material";
import moment from "moment/moment";
import {AppProps} from "../../../Wrapper/App";


export const HeaterDashboard: FunctionComponent<AppProps> = (props) => {
    const { device } = props.device

    return <Card>
        <CardHeader title={device.name}/>
        <CardContent>
            <List>
                <ListItem>
                    <ListItemText>
                        <Chip
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
}
