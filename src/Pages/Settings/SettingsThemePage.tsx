import { FunctionComponent, useContext } from 'react'
import {Button} from "@mui/material";

import { Template } from '../../Template/Template'
import { ContextTheme } from '../../Context/ContextTheme'
import { Card, CardHeader } from '../../Components/Card/Card'

export const SettingsThemePage: FunctionComponent = () => {
	const themeContext = useContext(ContextTheme)

	return (
		<Template>
			<Card>
				<CardHeader>
					<h3>Thème</h3>
					<p>Changez le theme de l'application.</p>
				</CardHeader>
				<Button color="primary" onClick={() => themeContext.toggleTheme()}>
					Passez au thème {themeContext.theme === 'light' ? 'sombre' : 'clair'}
				</Button>
			</Card>
		</Template>
	)
}
