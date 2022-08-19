import {FunctionComponent, useContext, useEffect, useMemo} from "react";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { ContextAuthentication } from "../../Context/ContextAuthentication";
import {Template} from "../../Template/Template";
import {useDispatch, useSelector} from "react-redux";
import {homeSelectAll} from "../../Store/Home/HomeSelector";
import {homeActions} from "../../Store/Home/HomeActions";
import { HomeStore} from "../../Store/Home/HomeReducer";
import {Card, CardContent, CardHeader} from "../../Components/Card/Card";



export const SettingsHomePage: FunctionComponent = () => {

    const authContext = useContext(ContextAuthentication)
    const dispatch = useDispatch<any>()

    const homes = useSelector(homeSelectAll)

    const defaultHomeId = useMemo(() => localStorage.getItem('defaultHomeId'), [])

    useEffect(() => {
        dispatch(homeActions.getAll({
            authenticationKey: authContext.authenticationKey
        }))
    }, [])

    console.log(homes)

    return <Template>
        <Card>
            <CardHeader>
                <h3>Paramètres maisons</h3>
            </CardHeader>
            <CardContent>
                {homes && <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Nom</TableCell>
                            <TableCell align='center' width='100'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {homes.map((home: HomeStore, key: number) => <TableRow key={key}>
                            <TableCell align='center'>
                                {home.home.name}
                                {defaultHomeId === home.home.id && <StarIcon color='primary'/>}
                            </TableCell>
                            <TableCell align='center'>
                                <Tooltip title='actions'>
                                    <IconButton>
                                        <MoreVertIcon/>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>

                        </TableRow>)}
                    </TableBody>
                </Table>}
            </CardContent>
        </Card>
    </Template>
}