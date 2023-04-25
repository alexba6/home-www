import { FunctionComponent, useContext} from 'react'

import { ContextTheme } from '../../Context/ContextTheme'
import {
	SettingsCard,
	SettingsCardContent,
	SettingsCardHeader,
} from "../../Components/Settings/SettingsCard";
import {Button, ButtonGroup} from "@mui/material";
import {
	SettingsRow,
	SettingsRowContent,
	SettingsRowLeftTitle,
	SettingsRowRight
} from "../../Components/Settings/SettingsRow";

export const AccountPreferencesTab: FunctionComponent = () => {
	const themeContext = useContext(ContextTheme)


	return (
		<SettingsCard>
			<SettingsCardHeader title='Application'/>
			<SettingsCardContent>
				<SettingsRow>
					<SettingsRowLeftTitle title='Thème'/>
					<SettingsRowRight>
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
					</SettingsRowRight>
				</SettingsRow>
			</SettingsCardContent>
		</SettingsCard>
	)
}
