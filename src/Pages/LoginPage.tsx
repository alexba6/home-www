import { FunctionComponent, useState } from 'react'

// import { FormInput } from '../Components/Input/FormInput'
import { Button } from '../Components/Button/Button'
import { TextLink } from '../Components/Link/TextLink'

import { GoogleIcon } from '../Icons/Form/Google'
import { FacebookIcon } from '../Icons/Form/Facebook'
import { CardForm, CardFormOrSeparator } from '../Components/Card/CardForm'
import { HomeLogo } from '../Icons/HomeLogo'

export const LoginPage: FunctionComponent = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')

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
						<p>Connectez-vous à votre compte <strong>Home</strong></p>
					</div>
				</div>
				<div>
					{/*<FormInput*/}
					{/*	label="Email ou nom d'utilisateur"*/}
					{/*	value={login}*/}
					{/*	setValue={setLogin}/>*/}
					{/*<FormInput*/}
					{/*	label='Mot de passe'*/}
					{/*	type='password'*/}
					{/*	value={password}*/}
					{/*	setValue={setPassword}/>*/}
				</div>
				<div className='flex flex-align-center flex-justify-end'>
					<TextLink onClick={() => {}}>
						Mot de passe oublié ?
					</TextLink>
				</div>
				<div className='mv-2 flex flex-column flex-justify-center'>
					<Button variant='primary' onClick={() => {}} >Connexion</Button>
					<CardFormOrSeparator/>
					<div className='flex flex-align-center flex-justify-center margin'>
						<Button variant='outline-secondary' onClick={() => alert('Google')} >
							<GoogleIcon/>
						</Button>
						<div className='mh-2'/>
						<Button variant='outline-secondary' onClick={() => alert('Facebook')} >
							<FacebookIcon/>
						</Button>
					</div>
				</div>
			</CardForm>
		)
}
