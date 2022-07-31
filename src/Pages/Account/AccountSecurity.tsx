import { FunctionComponent } from 'react'
import { Template } from '../../Template/Template'
import { Card, CardHeader } from '../../Components/Card/Card'
import { Button } from '../../Components/Button/Button'


export const AccountSecurityPage: FunctionComponent = () => {
	return (
		<Template>
			<Card>
				<CardHeader>
					<h3>Sécurité</h3>
					<p>Configurez et vérifiez vos paramètres de sécurité.</p>
				</CardHeader>
				<h4>Changer le mot de passe</h4>
				<Button variant='primary' onClick={() => {}}>
					Changer le mot de passe
				</Button>
				<br/>
				<h4>2-Factor Authentication</h4>
				<Button variant='primary' onClick={() => {}}>
					Activer 2-Factor Authentication
				</Button>
			</Card>
		</Template>
	)
}
