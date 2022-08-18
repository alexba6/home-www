import { FunctionComponent, useContext } from 'react'

import { Button } from '../Components/Button/Button'
import { TextLink } from '../Components/Link/TextLink'

import { GoogleIcon } from '../Icons/Form/Google'
import { FacebookIcon } from '../Icons/Form/Facebook'
import { CardForm, CardFormOrSeparator } from '../Components/Card/CardForm'
import { HomeLogo } from '../Icons/HomeLogo'
import { ContextAuthentication } from '../Context/ContextAuthentication'
import { useHistory } from 'react-router-dom'
import { RoutesPath } from '../Config/Routes'
import { useFormValue } from '../Hooks/UseFormValue'
import {TextField} from "@mui/material";

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
			history.push(RoutesPath.dashboard.target)
		}
	}

	return (
		<CardForm>
			<div className="mv-2 flex flex-column flex-align-center">
				<div className="flex flex-justify-center flex-align-center">
					<div>
						<HomeLogo />
					</div>
					<div className="mh-1">
						<h1>Home</h1>
					</div>
				</div>
				<div>
					<p>
						Connectez-vous à votre compte <strong>Home</strong>
					</p>
				</div>
			</div>
			<div>
				<TextField label="Email ou nom d'utilisateur" onChange={form.set.login} value={form.value.login} />
				<TextField label="Mot de passe" type="password" onChange={form.set.password} value={form.value.password} />
			</div>
			<div className="flex flex-align-center flex-justify-end">
				<TextLink onClick={() => {}}>Mot de passe oublié ?</TextLink>
			</div>
			<div className="mv-2 flex flex-column flex-justify-center">
				<Button variant="primary" onClick={onLogin}>
					Connexion
				</Button>
				<CardFormOrSeparator />
				<div className="flex flex-align-center flex-justify-center margin">
					<Button variant="outline-secondary" onClick={() => alert('Google')}>
						<GoogleIcon />
					</Button>
					<div className="mh-2" />
					<Button variant="outline-secondary" onClick={() => alert('Facebook')}>
						<FacebookIcon />
					</Button>
				</div>
			</div>
		</CardForm>
	)
}
