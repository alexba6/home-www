import {Fragment, FunctionComponent, useContext, useEffect, useMemo} from 'react'
import {ContextAuthentication} from '../../Context/ContextAuthentication'
import {toast} from 'react-toastify'
import {getAuthorization} from '../../Tools/Authentication'
import {Avatar, Button} from "@mui/material";
import {
	SettingsCard,
	SettingsCardContent,
	SettingsCardHeader,
} from "../../Components/Settings/SettingsCard";
import {useModalControl} from "../../Hooks/UseModalControl";
import {
	AccountSecurityGoogleModal,
	AccountSecurityUpdatePasswordModal
} from "../../Components/Account/AccountSecurityModal";
import {GoogleIcon} from "../../Icons/Google";
import {
	SettingsRow,
	SettingsRowContent,
	SettingsRowLeft, SettingsRowLeftTitle, SettingsRowRight, SettingsRowRightButton
} from "../../Components/Settings/SettingsRow";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../Store/User/UserSelector";
import {StoreStatus} from "../../Store/type";
import {userActions} from "../../Store/User/UserActions";
import {googleOAuthSelector} from "../../Store/GoogleOAuth/GoogleOAuthSelector";
import {googleOAuthActions} from "../../Store/GoogleOAuth/GoogleOAuthAction";
import {useGoogleLink} from "../../Hooks/UseGoogleLink";

const AccountSecurityPassword: FunctionComponent = () => {
	const passwordModal = useModalControl()

	const dispatch = useDispatch<any>()

	const userStatus = useSelector(userSelector.status)
	const authContext = useContext(ContextAuthentication)

	useEffect(() => {
		if (userStatus === StoreStatus.IDLE) {
			dispatch(
				userActions.getInfo({
					authenticationKey: authContext.authenticationKey,
				})
			)
		}
	}, [userStatus, dispatch, authContext])

	const onUpdatePassword = async (oldPassword: string, newPassword: string) => {
		const id = toast.loading('Modication du mot de passe')
		const res = await fetch('/api/user/password', {
			method: 'PUT',
			headers: {
				authorization: getAuthorization(authContext.authenticationKey),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				oldPassword,
				newPassword,
			}),
		})
		if (res.status === 200) {
			toast.success('Mot de passe modifié')
			passwordModal.close()
		} else {
			toast.error('Impossible de modifier le mot de passe')
		}
		toast.dismiss(id)
	}

	return (
		<SettingsCard>
			<SettingsCardHeader title="Mot de passe"/>
			<AccountSecurityUpdatePasswordModal
				control={passwordModal}
				onSubmit={onUpdatePassword}/>
			<SettingsCardContent>
				<SettingsRow>
					<SettingsRowLeftTitle title='Mot de passe'/>
					<SettingsRowContent>
						Changer le mot de passe
					</SettingsRowContent>
					<SettingsRowRightButton onClick={passwordModal.open}/>
				</SettingsRow>
			</SettingsCardContent>
		</SettingsCard>
	)
}

const AccountSecurityGoogleOAuth: FunctionComponent = () => {
	const googleModal = useModalControl()

	const dispatch = useDispatch<any>()

	const googleOAthStore = useSelector(googleOAuthSelector.getStore)
	const authContext = useContext(ContextAuthentication)

	const googleLink = useGoogleLink('link')

	useEffect(() => {
		if (googleOAthStore.status === StoreStatus.IDLE) {
			dispatch(googleOAuthActions.getInfo({
				authenticationKey: authContext.authenticationKey,
			}))
		}
	}, [googleOAthStore, dispatch, authContext, googleOAuthActions])


	const onOpenLinkGoogle = () => {
		if (googleLink) {
			window.open(googleLink, '_parent')
		}
	}

	return (
		<SettingsCard>
			<SettingsCardHeader title="Google" details="Ajouter votre compte Google afin de vous connecter plus facilement au service Home."/>
			<AccountSecurityGoogleModal control={googleModal}/>
			<SettingsCardContent>
				{(googleOAthStore.status === StoreStatus.READY && googleOAthStore.info) && <SettingsRow>
					<SettingsRowLeft>
						<Avatar src={googleOAthStore.info.pictureUrl}/>
					</SettingsRowLeft>
					<SettingsRowContent>
						{[googleOAthStore.info.givenName, googleOAthStore.info.familyName].join(' ')}
					</SettingsRowContent>
					<SettingsRowRight>
						<Button>
							Supprimer
						</Button>
						<Button onClick={onOpenLinkGoogle}>
							Modifier
						</Button>
					</SettingsRowRight>
				</SettingsRow>}
				{(googleOAthStore.status === StoreStatus.READY && !googleOAthStore.info) && <SettingsRow>
					<SettingsRow>
						<SettingsRowLeft>
							<GoogleIcon/>
						</SettingsRowLeft>
						<SettingsRowContent>
							Aucun compte lié
						</SettingsRowContent>
						<SettingsRowRight>
							<Button onClick={onOpenLinkGoogle}>
								Ajouter
							</Button>
						</SettingsRowRight>
					</SettingsRow>
				</SettingsRow>}
			</SettingsCardContent>
		</SettingsCard>
	)
}

export const AccountSecurityTab: FunctionComponent = () => {
	return (
		<Fragment>
			<AccountSecurityPassword/>
			<AccountSecurityGoogleOAuth/>
		</Fragment>
	)
}


