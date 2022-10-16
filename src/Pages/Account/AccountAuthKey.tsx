import {FunctionComponent, useContext, useEffect} from 'react'
import moment from "moment";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {Card, CardHeader} from '../../Components/Card/Card'
import {ContextAuthentication} from "../../Context/ContextAuthentication";
import {useDispatch, useSelector} from "react-redux";
import {authKeySelector} from "../../Store/AuthKey/AuthKeySelector";
import {AuthKey, AuthKeyStatus} from "../../Store/AuthKey/AuthKeyReducer";
import {authKeyAction} from "../../Store/AuthKey/AuthKeyActions";


export const AccountAuthKeyTab: FunctionComponent = () => {
	const authContext = useContext(ContextAuthentication)
	const dispatch = useDispatch<any>()

	const authKey = useSelector(authKeySelector.store)

	useEffect(() => {
		if (authKey.status === AuthKeyStatus.IDLE) {
			dispatch(authKeyAction.getAll({
				authenticationKey: authContext.authenticationKey
			}))
		}
	})

	const deleteAuthKey = (authKey: AuthKey) => {
		dispatch(authKeyAction.deleteOne({
			authenticationKey: authContext.authenticationKey,
			authKeyId: authKey.id
		}))
	}

	return <Card>
		<CardHeader>
			<h3>Authentification</h3>
			<p>Ces sessions sont actuellement connectées à votre compte.</p>
		</CardHeader>
		<Table>
			<TableHead>
				<TableRow>
					<TableCell align='center'>Date</TableCell>
					<TableCell width={100}></TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{authKey.authKeys.map((authKey: AuthKey, key: number) => <TableRow key={key}>
					<TableCell align='center'>
						{moment(authKey.createdAt).fromNow()}
					</TableCell>
					<TableCell align='center'>
						<Tooltip title='Supprimer cette connexion'>
							<IconButton onClick={() => deleteAuthKey(authKey)}>
								<DeleteForeverIcon/>
							</IconButton>
						</Tooltip>
					</TableCell>
				</TableRow>)}
			</TableBody>
		</Table>
	</Card>
}
