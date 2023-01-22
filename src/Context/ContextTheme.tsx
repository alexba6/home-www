import {FunctionComponent, createContext, useState, useEffect, ReactNode, useMemo} from 'react'
import {createTheme, ThemeProvider} from "@mui/material";

export type Theme = 'light' | 'dark'

export type ThemeMode = 'light' | 'dark' | 'system'

type ThemeContextProps = {
	theme: Theme
	mode: ThemeMode
	setTheme: (theme: ThemeMode) => void
}

type ThemeWrapperProps = {
	children: ReactNode
}

const customTheme = (theme: Theme) => createTheme({
	typography: {
		fontFamily: 'Roboto'
	},
	palette: {
		mode: theme,
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
	mode: 'light',
	setTheme: () => {},
})

export const ThemeWrapper: FunctionComponent<ThemeWrapperProps> = (props) => {
	const [mode, setMode] = useState<ThemeMode>('light')
	const [systemTheme, setSystemTheme] = useState<Theme>('light')

	const theme = useMemo(() => mode === 'system' ? systemTheme : mode, [mode, systemTheme])

	useEffect(() => {
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme) {
			setMode(savedTheme as ThemeMode)
		}
	}, [])

	useEffect(() => {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setSystemTheme('dark')
		}
	}, [setSystemTheme])

	useEffect(() => {
		document.querySelector('html')?.setAttribute('theme', theme)
	}, [theme])

	const setTheme = (themeMode: ThemeMode) => {
		localStorage.setItem('theme', themeMode)
		setMode(themeMode)
	}

	const themeValue: ThemeContextProps = {
		theme,
		mode,
		setTheme,
	}

	return <ContextTheme.Provider value={themeValue}>
		<ThemeProvider theme={customTheme(theme)}>
			{props.children}
		</ThemeProvider>
	</ContextTheme.Provider>
}
