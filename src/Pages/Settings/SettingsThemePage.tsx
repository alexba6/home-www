import { FunctionComponent, useContext } from 'react'
import { Template } from '../../Template/Template'
import { ContextTheme } from '../../Context/ContextTheme'
import { Card, CardHeader } from '../../Components/Card/Card'
import { Button } from '../../Components/Button/Button'

export const SettingsThemePage: FunctionComponent = () => {
	const themeContext = useContext(ContextTheme)

	return (
		<Template>
			<Card>
				<CardHeader>
					<h3>Thème</h3>
					<p>Changez le theme de l'application.</p>
				</CardHeader>
				<Button variant="primary" onClick={themeContext.toggleTheme}>
					Passez au thème {themeContext.theme === 'light' ? 'sombre' : 'clair'}
				</Button>
			</Card>
		</Template>
	)
}
