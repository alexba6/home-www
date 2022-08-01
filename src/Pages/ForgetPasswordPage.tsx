import {FunctionComponent, useRef, useState} from 'react'

import { Button } from '../Components/Button/Button'

import { CardForm } from '../Components/Card/CardForm'
import { HomeLogo } from '../Icons/HomeLogo'
import {Input} from "../Components/Input/Input";
import {useFormValue} from "../Hooks/UseFormValue";

export const ForgetPasswordPage: FunctionComponent = () => {
	const [login, setLogin] = useState('')

	return (
			<CardForm>w
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
						<p>Récupération de votre compte <strong>Home</strong></p>
					</div>
				</div>
				<div>
					<Input
						placeholder="Email ou nom d'utilisateur"
						value={login}
						onValue={setLogin}/>
				</div>
				<p>
					Entrez votre email ou nom d'utilisateur afin de recevoir les instructions pour récuperer votre compte <strong>Home</strong>.
				</p>
				<div className='mv-2 flex flex-column flex-justify-center'>
					<Button variant='primary' onClick={() => {}} >Valider</Button>
				</div>
			</CardForm>
		)
}
