import {Fragment, FunctionComponent, useContext, useEffect, useState} from 'react'

import { ContextTheme } from '../../Context/ContextTheme'
import {SettingsCard} from "../../Components/Settings/SettingsCard";
import {Button, ButtonGroup, Stack} from "@mui/material";

export const AccountPreferencesTab: FunctionComponent = () => {
	const themeContext = useContext(ContextTheme)
	const [count, setCount] = useState(0)

	useEffect(() => {
		if ('Notification' in window) {
			if (Notification.permission === 'granted') {

			} else {
				Notification.requestPermission()
			}
		}
	}, [])

	return (
		<Fragment>
			<SettingsCard title='Theme'>
				<Stack alignItems='center'>
					<ButtonGroup variant='outlined'>
						<Button
							onClick={() => themeContext.setTheme('light')}
							disabled={themeContext.mode === 'light'}>
							Clair
						</Button>
						<Button
							onClick={() => themeContext.setTheme('dark')}
							disabled={themeContext.mode === 'dark'}>
							Sombre
						</Button>
						<Button
							onClick={() => themeContext.setTheme('system')}
							disabled={themeContext.mode === 'system'}>
							Système
						</Button>
					</ButtonGroup>
				</Stack>
			</SettingsCard>
			<SettingsCard
				title="Notifications">
			</SettingsCard>
		</Fragment>
	)
}
