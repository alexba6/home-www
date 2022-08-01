import {FunctionComponent} from 'react'
import { Template } from '../../Template/Template'
import { Card, CardHeader } from '../../Components/Card/Card'
import { Button } from '../../Components/Button/Button'
import {Input} from "../../Components/Input/Input";
import {AuthenticatedRouteProps} from "../../Context/ContextAuthentication";
import {toast} from "react-toastify";
import {getAuthorization} from "../../Tools/Authentication";
import {useFormValue} from "../../Hooks/UseFormValue";

const AccountSecurityPassword: FunctionComponent<AuthenticatedRouteProps> = (props) => {
	const form = useFormValue({
		oldPassword: '',
		newPassword: '',
		newPasswordC: ''
	})

	const updatePassword = async () => {
		const id = toast.loading('Modication du mot de passe')
		const { oldPassword, newPassword, newPasswordC } = form.value
		if (newPassword !== newPasswordC) {
			toast.error('Les mots de passe ne sont pas identiques')
		} else {
			const res = await fetch('/api/user/password', {
				method: 'PUT',
				headers: {
					authorization: getAuthorization(props.authenticationKey),
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					oldPassword, newPassword
				})
			})
			if (res.status === 200) {
				toast.success('Mot de passe modifié')
				form.set.oldPassword('')
			} else {
				toast.error('Impossible de modifier le mot de passe')
			}
		}
		toast.dismiss(id)
		form.clear()
	}

	return <Card>
		<CardHeader>
			<h3>Changer le mot de passe</h3>
		</CardHeader>
		<div>
			<Input
				placeholder='Ancien mot de passe'
				type='password'
				value={form.value.oldPassword}
				onValue={form.set.oldPassword}/>
			<Input
				placeholder='Nouveau mot de passe'
				type='password'
				value={form.value.newPassword}
				onValue={form.set.newPassword}/>
			<Input
				placeholder='Confirmez le mot de passe'
				type='password'
				value={form.value.newPasswordC}
				onValue={form.set.newPasswordC}/>
		</div>
		<Button variant='primary' onClick={updatePassword}>
			Valider
		</Button>
	</Card>
}

const AccountSecurity2Fa: FunctionComponent = () => {
	return <Card>
		<CardHeader>
			<h3>2-Factor Authentication</h3>
		</CardHeader>
		<Button variant='primary' onClick={() => {}}>
			Activer 2-Factor Authentication
		</Button>
	</Card>
}

export const AccountSecurityPage: FunctionComponent<AuthenticatedRouteProps> = (props) => {
	return (
		<Template>
			<AccountSecurityPassword authenticationKey={props.authenticationKey}/>
			<br/>
			<AccountSecurity2Fa/>
		</Template>
	)
}
