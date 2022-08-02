import { FunctionComponent, useEffect } from 'react'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'

import { AuthenticatedRouteProps } from '../../Context/ContextAuthentication'
import { Template } from '../../Template/Template'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../Store/User/UserActions'
import { Card, CardHeader } from '../../Components/Card/Card'
import { Input } from '../../Components/Input/Input'
import { userSelectInfo } from '../../Store/User/UserSelector'
import { Button } from '../../Components/Button/Button'
import { useFormValue } from '../../Hooks/UseFormValue'

export const AccountProfilePage: FunctionComponent<AuthenticatedRouteProps> = (props) => {
	const { authenticationKey } = props

	const form = useFormValue({
		email: '',
		username: '',
		firstName: '',
		lastName: '',
	})

	const dispatch = useDispatch<any>()

	const userInfo = useSelector(userSelectInfo)

	useEffect(() => {
		if (!userInfo) {
			dispatch(
				userActions.getInfo({
					authenticationKey,
				})
			)
		}
	}, [userInfo])

	const updateProfile = async () => {
		const id = toast.loading('Modication du profil')
		try {
			unwrapResult(
				await dispatch(
					userActions.updateInfo({
						authenticationKey,
						user: form.value,
					})
				)
			)
			toast.success('Profil modifié')
		} catch (e) {
			console.error(e)
			toast.error('Impossible de modifier le profil')
		} finally {
			toast.dismiss(id)
		}
	}

	useEffect(() => {
		if (userInfo) {
			form.set.username(userInfo.username)
			form.set.email(userInfo.email)
			if (userInfo.firstName) {
				form.set.firstName(userInfo.firstName)
			}
			if (userInfo.lastName) {
				form.set.lastName(userInfo.lastName)
			}
		}
	}, [userInfo])

	return (
		<Template>
			<Card>
				<CardHeader>
					<h3>Informations générales</h3>
				</CardHeader>
				{userInfo && (
					<div>
						<Input placeholder="No d'utilisateur" value={form.value.username} onValue={form.set.username} />
						<Input placeholder="Email" value={form.value.email} onValue={form.set.email} />
						<Input placeholder="Prénom" value={form.value.firstName} onValue={form.set.firstName} />
						<Input placeholder="Nom" value={form.value.lastName} onValue={form.set.lastName} />
						<br />
						<Button onClick={updateProfile} variant="primary">
							Enregistrer
						</Button>
					</div>
				)}
			</Card>
		</Template>
	)
}
