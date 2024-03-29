import {createContext, FunctionComponent, ReactNode, useEffect, useState} from 'react'

export enum AuthenticationStatus {
	IDLE = 'IDLE',
	CONNECTED = 'CONNECTED',
	DISCONNECTED = 'DISCONNECTED'
}

export type AuthenticationKey = {
	id: string
	key: string
}

export type AuthenticationContextProps = {
	authenticationKey: AuthenticationKey
	status: AuthenticationStatus,
	clear: () => void
	set: (authKey: AuthenticationKey) => void
}

type AuthenticationProviderProps = {
	children: ReactNode
}

const STORAGE_KEY = 'AUTH_KEY'

export const formatAuthenticationKey = (authKey: AuthenticationKey) => {
	return [authKey.id, authKey.key].join(':')
}

const DefaultValue = {
	authenticationKey: {
		id: '',
		key: ''
	},
	status: AuthenticationStatus.IDLE,
	set: () => {},
	clear: () => {},
}

export const ContextAuthentication = createContext<AuthenticationContextProps>(DefaultValue)

export const AuthenticationProvider: FunctionComponent<AuthenticationProviderProps> = (props) => {
	const [authenticationKey, setAuthenticationKey] = useState<AuthenticationContextProps['authenticationKey']>(DefaultValue.authenticationKey)
	const [status, setStatus] = useState<AuthenticationStatus>(DefaultValue.status)

	useEffect(() => {
		const savedKeyRaw = localStorage.getItem(STORAGE_KEY)
		if (savedKeyRaw) {
			try {
				const parsedAuthenticationKey = JSON.parse(savedKeyRaw)
				setAuthenticationKey(parsedAuthenticationKey)
				setStatus(AuthenticationStatus.CONNECTED)
			} catch (e) {
				localStorage.removeItem(STORAGE_KEY)
			}
		} else {
			logout()
		}
	}, [])

	useEffect(() => {
		const interval = setInterval(async () => {
			if (authenticationKey) {
				const res = await fetch('/api/user', {
					headers: {
						authorization: formatAuthenticationKey(authenticationKey),
					},
				})
				if (res.status !== 200) {
					logout()
				}
			}
		}, 30 * 1000)
		return () => clearInterval(interval)
	}, [authenticationKey])

	const login = (authKey: AuthenticationKey) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(authKey))
		setAuthenticationKey(authKey)
		setStatus(AuthenticationStatus.CONNECTED)
	}

	const logout = () => {
		localStorage.removeItem(STORAGE_KEY)
		setStatus(AuthenticationStatus.DISCONNECTED)
	}

	return (
		<ContextAuthentication.Provider
			value={{
				authenticationKey,
				status,
				set: login,
				clear: logout,
			}}
		>
			{props.children}
		</ContextAuthentication.Provider>
	)
}
