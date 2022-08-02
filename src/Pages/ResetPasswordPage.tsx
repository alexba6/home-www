import { FunctionComponent } from 'react'

import { Button } from '../Components/Button/Button'

import { CardForm } from '../Components/Card/CardForm'
import { HomeLogo } from '../Icons/HomeLogo'
import { Input } from '../Components/Input/Input'
import { useFormValue } from '../Hooks/UseFormValue'

export const ResetPasswordPage: FunctionComponent = () => {
	const form = useFormValue({
		password: '',
		passwordC: '',
	})

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
						Rénitialisation du mot de passe de votre compte <strong>Home</strong>
					</p>
				</div>
			</div>
			<div>
				<Input placeholder="Mot de passe" type="password" value={form.value.password} onValue={form.set.password} />
				<Input
					placeholder="Confirmez le mot de passe"
					type="password"
					value={form.value.passwordC}
					onValue={form.set.passwordC}
				/>
			</div>
			<p>
				Entrez votre le nouveau mon de passe pour le compte <strong>alexis@alex24.fr</strong>.
			</p>
			<div className="mv-2 flex flex-column flex-justify-center">
				<Button variant="primary" onClick={() => {}}>
					Valider
				</Button>
			</div>
		</CardForm>
	)
}
