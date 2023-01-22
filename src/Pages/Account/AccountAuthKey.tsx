import {FunctionComponent, useContext, useEffect} from 'react'
import moment from "moment";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {Card, CardHeader} from '../../Components/Card/Card'
import {ContextAuthentication} from "../../Context/ContextAuthentication";
import {useDispatch, useSelector} from "react-redux";
import {authKeySelector} from "../../Store/AuthKey/AuthKeySelector";
import {AuthKey, AuthKeyStore} from "../../Store/AuthKey/AuthKeyReducer";
import {authKeyAction} from "../../Store/AuthKey/AuthKeyActions";
import {StoreStatus} from "../../Store/type";
import {SettingsCard} from "../../Components/Settings/SettingsCard";


export const AccountAuthKeyTab: FunctionComponent = () => {
	const authContext = useContext(ContextAuthentication)

	const dispatch = useDispatch<any>()

	const authKeyStatus = useSelector(authKeySelector.status)
	const authKeys = useSelector(authKeySelector.authKeys)

	useEffect(() => {
		if (authKeyStatus === StoreStatus.IDLE) {
			dispatch(authKeyAction.getAll({
				authenticationKey: authContext.authenticationKey
			}))
		}
	})

	const deleteAuthKey = (authKey: AuthKeyStore) => {
		dispatch(authKeyAction.deleteOne({
			authenticationKey: authContext.authenticationKey,
			authKeyId: authKey.authKey.id
		}))
	}

	return (
		<SettingsCard
			title="Authentification"
			details="Ces sessions sont actuellement connectées à votre compte.">
			<Table>
				<TableHead>
					<TableRow>
						<TableCell align='center'>Date</TableCell>
						<TableCell width={100}></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{authKeys.map((authKey: AuthKeyStore, key: number) => <TableRow key={key}>
						<TableCell align='center'>
							{moment(authKey.authKey.createdAt).fromNow()}
						</TableCell>
						<TableCell align='center'>
							<Tooltip title='Supprimer cette connexion'>
								<IconButton disabled={authKey.removing} onClick={() => deleteAuthKey(authKey)}>
									<DeleteForeverIcon/>
								</IconButton>
							</Tooltip>
						</TableCell>
					</TableRow>)}
				</TableBody>
			</Table>
		</SettingsCard>
	)
}
