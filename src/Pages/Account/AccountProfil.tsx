import {Fragment, FunctionComponent, useContext, useEffect, useMemo} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {userActions} from '../../Store/User/UserActions'
import {ContextAuthentication} from "../../Context/ContextAuthentication";
import {Alert, Avatar, Divider, LinearProgress} from "@mui/material";
import {
	SettingsRow,
	SettingsRowContent,
	SettingsRowLeft,
	SettingsRowLeftTitle,
	SettingsRowRightButton
} from "../../Components/Settings/SettingsRow";
import {toast} from "react-toastify";
import {useModalControl} from "../../Hooks/UseModalControl";
import {
	AccountAvatarModal,
	AccountProfileUpdateEmailModal,
	AccountProfileUpdateNameModal,
	AccountProfileUpdateUsernameModal
} from "../../Components/Account/AccountProfileModal";
import {userSelector} from "../../Store/User/UserSelector";
import {StoreStatus} from "../../Store/type";
import {getAuthorization} from "../../Tools/Authentication";
import {useAvatarURL} from "../../Hooks/UseAvatarURL";
import {UserStoreState} from "../../Store/User/UserReducer";
import {SettingsCard, SettingsCardContent, SettingsCardHeader} from "../../Components/Settings/SettingsCard";

type UserStoreStateRP = UserStoreState<StoreStatus.READY | StoreStatus.UPDATING>

type AccountProfileGeneralInformationProps = {
	userStore: UserStoreStateRP
	disabledEdit: boolean
}

type AccountProfileContactProps = {
	userStore: UserStoreStateRP
	disabledEdit: boolean
}

const AccountProfileGeneralInformation: FunctionComponent<AccountProfileGeneralInformationProps> = (props) => {
	const userStore = props.userStore
	const disabledEdit = props.disabledEdit
	const userInfo = userStore.info

	const nameModalControl = useModalControl()
	const usernameModalControl = useModalControl()
	const avatarModalControl = useModalControl()

	const dispatch = useDispatch<any>()

	const authContext = useContext(ContextAuthentication)

	const avatarURL = useAvatarURL(authContext.authenticationKey)

	const fullName = useMemo(() => [userInfo?.firstName, userInfo?.lastName].join(' '), [userInfo])

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

	const onUpdateAvatar = async (file: File) => {
		const data = new FormData()
		data.append('file', file)
		data.append('fileName', file.name)
		const res = await fetch('/api/user/avatar', {
			method: 'POST',
			headers: {
				authorization: getAuthorization(authContext.authenticationKey),
			},
			body: data,
		})
		if (res.status === 200) {
			toast.success("Photo modifiée")
			document.location.reload()
		} else {
			toast.error("Impossible de modifier la photo")
		}
	}

	return (
		<SettingsCard >
			<SettingsCardHeader title='Informations générales' details='Certaines de ces informations peuvent être vues par les autres utilisateurs du service Home.'/>
			<SettingsCardContent>
				<AccountProfileUpdateNameModal
					control={nameModalControl}
					firstName={String(userInfo.firstName)}
					lastName={String(userInfo.lastName)}
					onSubmit={onUpdateName}/>
				<AccountProfileUpdateUsernameModal
					control={usernameModalControl}
					username={userInfo.username}
					onSubmit={onUpdateUsername}/>
				<AccountAvatarModal
					control={avatarModalControl}
					avatarUrl={avatarURL}
					onSubmit={onUpdateAvatar}/>
				<SettingsRow>
					<SettingsRowLeft>
						<Avatar alt={fullName} src={avatarURL}/>
					</SettingsRowLeft>
					<SettingsRowContent>
						Personnalisez votre compte en ajoutant une photo
					</SettingsRowContent>
					<SettingsRowRightButton onClick={avatarModalControl.open} disabled={disabledEdit}/>
				</SettingsRow>
				<Divider/>
				<SettingsRow>
					<SettingsRowLeftTitle title='Nom'/>
					<SettingsRowContent>
						{fullName}
					</SettingsRowContent>
					<SettingsRowRightButton onClick={nameModalControl.open} disabled={disabledEdit}/>
				</SettingsRow>
				<Divider/>
				<SettingsRow>
					<SettingsRowLeftTitle title="Nom d'utilisateur"/>
					<SettingsRowContent>
						{userInfo.username}
					</SettingsRowContent>
					<SettingsRowRightButton onClick={usernameModalControl.open} disabled={disabledEdit}/>
				</SettingsRow>
			</SettingsCardContent>
		</SettingsCard>
	)
}

const AccountProfileContact: FunctionComponent<AccountProfileContactProps> = (props) => {
	const userStore = props.userStore
	const disabledEdit = props.disabledEdit
	const userInfo = userStore.info

	const emailModalControl = useModalControl()

	const authContext = useContext(ContextAuthentication)

	const dispatch = useDispatch<any>()

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
		<SettingsCard>
			<SettingsCardHeader title='Coordonnées'/>
			<SettingsCardContent>
				<AccountProfileUpdateEmailModal
					control={emailModalControl}
					email={userInfo.email}
					onSubmit={onUpdateEmail}/>
				<SettingsRow>
					<SettingsRowLeftTitle title='Email'/>
					<SettingsRowContent>
						{userInfo.email}
					</SettingsRowContent>
					<SettingsRowRightButton onClick={emailModalControl.open} disabled={disabledEdit}/>
				</SettingsRow>
			</SettingsCardContent>
		</SettingsCard>
	)
}

export const AccountProfileTab: FunctionComponent = () => {
	const authContext = useContext(ContextAuthentication)

	const dispatch = useDispatch<any>()

	const userStore = useSelector(userSelector.store)
	const disabledEdit = useMemo(() => userStore.status !== StoreStatus.READY, [userStore])

	useEffect(() => {
		if (userStore.status === StoreStatus.IDLE) {
			dispatch(
				userActions.getInfo({
					authenticationKey: authContext.authenticationKey,
				})
			)
		}
	}, [userStore, dispatch, authContext])


	return (
		<Fragment>
			{userStore.status === StoreStatus.ERROR && <Alert severity='error'>
				Impossible de récupérer le profil.
			</Alert>}
			{userStore.status === StoreStatus.PENDING && <LinearProgress/>}
			{(userStore.status === StoreStatus.READY || userStore.status === StoreStatus.UPDATING) && <Fragment>
				<AccountProfileGeneralInformation userStore={userStore as UserStoreStateRP} disabledEdit={disabledEdit}/>
				<AccountProfileContact userStore={userStore as UserStoreStateRP} disabledEdit={disabledEdit}/>
			</Fragment>}
		</Fragment>
	)
}
