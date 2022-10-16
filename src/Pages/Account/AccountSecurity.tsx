import {FunctionComponent, useContext} from 'react'
import { Card, CardHeader } from '../../Components/Card/Card'
import { ContextAuthentication} from '../../Context/ContextAuthentication'
import { toast } from 'react-toastify'
import { getAuthorization } from '../../Tools/Authentication'
import { useFormValue } from '../../Hooks/UseFormValue'
import {Button, Stack, TextField} from "@mui/material";

export const AccountSecurityPasswordTab: FunctionComponent = () => {
	const authContext = useContext(ContextAuthentication)

	const form = useFormValue({
		oldPassword: '',
		newPassword: '',
		newPasswordC: '',
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
				form.set.oldPassword('')
			} else {
				toast.error('Impossible de modifier le mot de passe')
			}
		}
		toast.dismiss(id)
		form.clear()
	}

	return (
		<Card>
			<CardHeader>
				<h3>Changer le mot de passe</h3>
			</CardHeader>
			<div>
				<TextField
					label="Ancien mot de passe"
					value={form.value.oldPassword}
					onChange={form.set.oldPassword}
					type='password'
					size='small'
					variant='outlined'
					margin='normal'
					fullWidth/>
				<TextField
					label="Nouveau mot de passe"
					value={form.value.newPassword}
					onChange={form.set.newPassword}
					type='password'
					size='small'
					variant='outlined'
					margin='normal'
					fullWidth/>
				<TextField
					label="Confirmer le mot de passe"
					value={form.value.newPasswordC}
					onChange={form.set.newPasswordC}
					type='password'
					size='small'
					variant='outlined'
					margin='normal'
					fullWidth/>
			</div>
			<Stack direction='row' justifyContent='end' alignItems='center'>
				<Button onClick={updatePassword} color='primary'>
					Valider
				</Button>
			</Stack>
		</Card>
	)
}


