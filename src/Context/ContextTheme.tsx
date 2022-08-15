import { FunctionComponent, createContext, useState, useEffect, ReactNode } from 'react'
import {createTheme, ThemeProvider} from "@mui/material";

export type Theme = 'light' | 'dark'

type ThemeContextProps = {
	theme: Theme
	toggleTheme: (theme?: Theme) => void
}

type ThemeWrapperProps = {
	children: ReactNode
}

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
})

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
	},
})

export const ContextTheme = createContext<ThemeContextProps>({
	theme: 'light',
	toggleTheme: () => {},
})

export const ThemeWrapper: FunctionComponent<ThemeWrapperProps> = (props) => {
	const [theme, setTheme] = useState<Theme>('light')

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme === 'dark') {
			toggleTheme('dark')
		}
	}, [])

	const toggleTheme = (forceTheme?: Theme) =>
		setTheme((oldTheme) => {
			const newTheme =
				forceTheme === 'light' || forceTheme === 'dark' ? forceTheme : oldTheme === 'light' ? 'dark' : 'light'
			localStorage.setItem('theme', newTheme)
			document.querySelector('html')?.setAttribute('theme', newTheme)
			return newTheme
		})

	const themeValue: ThemeContextProps = {
		theme,
		toggleTheme,
	}

	return <ContextTheme.Provider value={themeValue}>
		<ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
			{props.children}
		</ThemeProvider>
	</ContextTheme.Provider>
}
