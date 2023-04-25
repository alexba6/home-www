import { FunctionComponent, useContext } from 'react'
import {Button, IconButton, Stack, TextField, Tooltip} from "@mui/material";

import { TextLink } from '../Components/Link/TextLink'
import { CardForm, CardFormOrSeparator } from '../Components/Card/CardForm'
import { HomeLogo } from '../Icons/HomeLogo'
import { ContextAuthentication } from '../Context/ContextAuthentication'
import { useHistory } from 'react-router-dom'
import { useFormValue } from '../Hooks/UseFormValue'
import {CardHeader} from "../Components/Card/Card";
import {Routes} from "../Config/Routes";
import {SocialGoogleButton} from "../Components/Social/SocialGoogleButton";

export const LoginPage: FunctionComponent = () => {
	const history = useHistory()

	const authenticationContext = useContext(ContextAuthentication)

	const form = useFormValue({
		login: '',
		password: '',
	})

	const onLogin = async () => {
		const { login, password } = form.value
		const res = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				login,
				password,
			}),
		})
		if (res.status === 200) {
			const json = await res.json()
			authenticationContext.set(json.authKey)
			history.push(Routes.dashboard.target)
		}
	}

	return (
		<CardForm>
			<CardHeader>
				<Stack direction='column' justifyContent='space-between' alignItems='center'>
					<div>
						<HomeLogo />
					</div>
					<div>
						<h1>Home</h1>
					</div>
					<div>
						<p>
							Connectez-vous à votre compte <strong>Home</strong>
						</p>
					</div>
				</Stack>
			</CardHeader>
			<div>
				<TextField
					label="Email ou nom d'utilisateur"
					onChange={form.set.login}
					value={form.value.login}
					margin='normal'
					fullWidth/>
				<TextField
					label="Mot de passe"
					type="password"
					onChange={form.set.password}
					value={form.value.password}
					margin='normal'
					fullWidth/>
			</div>
			<div className="flex flex-align-center flex-justify-end">
				<TextLink onClick={() => {}}>Mot de passe oublié ?</TextLink>
			</div>
			<div className="mv-2 flex flex-column flex-justify-center">
				<Button variant='outlined' color='primary' onClick={onLogin}>
					Connexion
				</Button>
				<CardFormOrSeparator />
				<Stack direction='row' justifyContent='center' alignItems='center'>
					<div>
						<SocialGoogleButton/>
					</div>
				</Stack>
			</div>
		</CardForm>
	)
}
