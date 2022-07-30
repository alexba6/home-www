import {FunctionComponent, useRef} from 'react'

import { Button } from '../Components/Button/Button'

import { CardForm } from '../Components/Card/CardForm'
import { HomeLogo } from '../Icons/HomeLogo'
import {Input} from "../Components/Input/Input";

export const ResetPasswordPage: FunctionComponent = () => {
	const passwordRef = useRef<HTMLInputElement>(null)
	const passwordCRef = useRef<HTMLInputElement>(null)

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
					<Input
						placeholder='Mot de passe'
						type='password'
						ref={passwordRef}
					/>
					<Input
						placeholder='Confirmez le mot de passe'
						type='password'
						ref={passwordCRef}/>
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
