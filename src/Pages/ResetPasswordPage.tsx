import { FunctionComponent, useState } from 'react'

// import { FormInput } from '../Components/Input/FormInput'
import { Button } from '../Components/Button/Button'
import { TextLink } from '../Components/Link/TextLink'

import { GoogleIcon } from '../Icons/Form/Google'
import { FacebookIcon } from '../Icons/Form/Facebook'
import { CardForm, CardFormOrSeparator } from '../Components/Card/CardForm'
import { HomeLogo } from '../Icons/HomeLogo'

export const ResetPasswordPage: FunctionComponent = () => {
	const [password, setPassword] = useState('')
	const [passwordC, setPasswordC] = useState('')

	return (
			<CardForm>
				<div className='mv-2 flex flex-column flex-align-center'>
					<div className='flex flex-justify-center flex-align-center'>
						<div>
							<HomeLogo/>
						</div>
						<div className='mh-1'>
							<h1>Home</h1>
						</div>
					</div>
					<div>
						<p>Rénitialisation du mot de passe de votre compte <strong>Home</strong></p>
					</div>
				</div>
				<div>
					{/*<FormInput*/}
					{/*	label='Mot de passe'*/}
					{/*	type='password'*/}
					{/*	value={password}*/}
					{/*	setValue={setPassword}/>*/}
					{/*<FormInput*/}
					{/*	label='Confirmez le mot de passe'*/}
					{/*	type='password'*/}
					{/*	value={passwordC}*/}
					{/*	setValue={setPasswordC}/>*/}
				</div>
				<p>
					Entrez votre le nouveau mon de passe pour le compte <strong>alexis@alex24.fr</strong>.
				</p>
				<div className='mv-2 flex flex-column flex-justify-center'>
					<Button variant='primary' onClick={() => {}} >Valider</Button>
				</div>
			</CardForm>
		)
}
