import {FunctionComponent, useContext, useEffect} from 'react'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'

import { Template } from '../../Template/Template'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../Store/User/UserActions'
import { Card, CardHeader } from '../../Components/Card/Card'
import { userSelectInfo } from '../../Store/User/UserSelector'
import { useFormValue } from '../../Hooks/UseFormValue'
import {ContextAuthentication} from "../../Context/ContextAuthentication";
import {Button, Stack, TextField} from "@mui/material";

export const AccountProfilePage: FunctionComponent = () => {
	const authContext = useContext(ContextAuthentication)

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
					authenticationKey: authContext.authenticationKey,
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
						authenticationKey: authContext.authenticationKey,
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
						<TextField
							label="No d'utilisateur"
							value={form.value.username}
							onChange={form.set.username}
							size='small'
							variant='outlined'
							margin='normal'
							fullWidth/>
						<TextField
							label="Email"
							value={form.value.email}
							onChange={form.set.email}
							size='small'
							variant='outlined'
							margin='normal'
							fullWidth />
						<TextField
							label="Prénom"
							value={form.value.firstName}
							onChange={form.set.firstName}
							size='small'
							variant='outlined'
							margin='normal'
							fullWidth/>
						<TextField
							label="Nom"
							value={form.value.lastName}
							onChange={form.set.lastName}
							size='small'
							variant='outlined'
							margin='normal'
							fullWidth/>
						<Stack direction='row' justifyContent='end' alignItems='center'>
							<Button onClick={updateProfile} color='primary'>
								Enregistrer
							</Button>
						</Stack>
					</div>
				)}
			</Card>
		</Template>
	)
}
