import {Fragment, FunctionComponent, useContext, useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {userActions} from '../../Store/User/UserActions'
import {ContextAuthentication} from "../../Context/ContextAuthentication";
import {Avatar, CircularProgress, LinearProgress, Stack} from "@mui/material";
import {SettingsRow} from "../../Components/Settings/SettingsRow";
import {SettingsCard} from "../../Components/Settings/SettingsCard";
import {toast} from "react-toastify";
import {useModalControl} from "../../Hooks/UseModalControl";
import {
	AccountProfileUpdateEmailModal,
	AccountProfileUpdateNameModal,
	AccountProfileUpdateUsernameModal
} from "../../Components/Account/AccountProfileModal";
import {userSelector} from "../../Store/User/UserSelector";
import {StoreStatus} from "../../Store/type";

export const AccountProfileTab: FunctionComponent = () => {
	const nameModalControl = useModalControl()
	const usernameModalControl = useModalControl()
	const emailModalControl = useModalControl()

	const authContext = useContext(ContextAuthentication)

	const dispatch = useDispatch<any>()

	const userInfo = useSelector(userSelector.info)
	const userStatus = useSelector(userSelector.status)

	useEffect(() => {
		if (userStatus === StoreStatus.IDLE) {
			dispatch(
				userActions.getInfo({
					authenticationKey: authContext.authenticationKey,
				})
			)
		}
	}, [userStatus, dispatch, authContext])

	const onUpdateName = async (firstName: string, lastName: string) => {
		try {
			await dispatch(userActions.updateInfo({
				authenticationKey: authContext.authenticationKey,
				user: {
					firstName, lastName
				}
			}))
			nameModalControl.close()
			toast.success('Nom modifié')
		} catch (e) {
			toast.error(String(e))
		}
	}

	const onUpdateUsername = async (username: string) => {
		try {
			await dispatch(userActions.updateInfo({
				authenticationKey: authContext.authenticationKey,
				user: {
					username
				}
			}))
			usernameModalControl.close()
			toast.success("Nom d'utilisateur modifié")
		} catch (e) {
			toast.error(String(e))
		}
	}

	const onUpdateEmail = async (email: string) => {
		try {
			await dispatch(userActions.updateInfo({
				authenticationKey: authContext.authenticationKey,
				user: {
					email
				}
			}))
			emailModalControl.close()
			toast.success("Email modifié")
		} catch (e) {
			toast.error(String(e))
		}
	}

	return (
		<Fragment>
			{userStatus === StoreStatus.IDLE && <LinearProgress/>}
			{userInfo && <Fragment>
				<AccountProfileUpdateNameModal
					control={nameModalControl}
					firstName={String(userInfo.firstName)}
					lastName={String(userInfo.lastName)}
					onSubmit={onUpdateName}/>
				<AccountProfileUpdateUsernameModal
					control={usernameModalControl}
					username={userInfo.username}
					onSubmit={onUpdateUsername}/>
				<AccountProfileUpdateEmailModal
					control={emailModalControl}
					email={userInfo.email}
					onSubmit={onUpdateEmail}/>
				<SettingsCard
					title='Informations générales'
					details='Certaines de ces informations peuvent être vues par les autres utilisateurs du service Home.'>
					<SettingsRow
						name='Photo'
						value='Personnalisez votre compte en ajoutant une photo'
						divider
						onClick={() => {}}>
						<Avatar
							alt="Remy Sharp"
							src="https://upload.wikimedia.org/wikipedia/fr/thumb/3/3b/Raspberry_Pi_logo.svg/1200px-Raspberry_Pi_logo.svg.png"
							sx={{ width: 50, height: 50 }}
						/>
					</SettingsRow>
					<SettingsRow
						name='Nom'
						value={[userInfo.firstName, userInfo.lastName].join(' ')}
						divider
						onClick={nameModalControl.open}/>
					<SettingsRow
						name="Nom d'utilisateur"
						value={userInfo.username}
						onClick={usernameModalControl.open}/>
				</SettingsCard>
				<SettingsCard
					title='Coordonnées'>
					<SettingsRow
						name='Email'
						value={userInfo.email}
						onClick={emailModalControl.open}/>
				</SettingsCard>
			</Fragment>}
		</Fragment>
	)
}
