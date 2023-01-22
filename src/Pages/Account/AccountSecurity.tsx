import {Fragment, FunctionComponent, useContext, useEffect} from 'react'
import { ContextAuthentication} from '../../Context/ContextAuthentication'
import { toast } from 'react-toastify'
import { getAuthorization } from '../../Tools/Authentication'
import {Button} from "@mui/material";
import {SettingsCard} from "../../Components/Settings/SettingsCard";
import {useModalControl} from "../../Hooks/UseModalControl";
import {AccountSecurityUpdatePasswordModal} from "../../Components/Account/AccountSecurityModal";
import {GoogleIcon} from "../../Icons/Google";
import {SettingsRow} from "../../Components/Settings/SettingsRow";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../Store/User/UserSelector";
import {StoreStatus} from "../../Store/type";
import {userActions} from "../../Store/User/UserActions";

export const AccountSecurityPasswordTab: FunctionComponent = () => {
	const passwordModal = useModalControl()

	const dispatch = useDispatch<any>()

	const userInfo = useSelector(userSelector.info)
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
		<Fragment>
			<AccountSecurityUpdatePasswordModal
				control={passwordModal}
				onSubmit={onUpdatePassword}/>
			<SettingsCard title='Mot de passe'>
				<Button onClick={passwordModal.open}>
					Changer le mot de passe
				</Button>
			</SettingsCard>
			<SettingsCard
				title="Réseaux sociaux"
				details="Ajouter un ou plusieurs réseaux sociaux afin de vous connecter plus facilement à votre compte.">
				<SettingsRow name={<GoogleIcon/>} value="Aucun compte lié" onClick={() => {}}/>
			</SettingsCard>
		</Fragment>
	)
}


