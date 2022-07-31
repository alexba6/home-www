import {
    createContext,
    FunctionComponent,
    ReactNode,
    useEffect,
    useState
} from 'react'

export type AuthenticationKey = {
    id: string,
    key: string
}

export type AuthenticatedRouteProps = {
    authenticationKey: AuthenticationKey
}

type AuthenticationContextProps = {
    authenticationKey: AuthenticationKey | null | undefined,
    clear: () => void,
    set: (authKey: AuthenticationKey) => void
}

type AuthenticationProviderProps = {
    children: ReactNode
}

const STORAGE_KEY = 'AUTH_KEY'


export const formatAuthenticationKey = (authKey: AuthenticationKey) => {
    return [authKey.id, authKey.key].join(':')
}

export const ContextAuthentication = createContext<AuthenticationContextProps>({
    authenticationKey: undefined,
    set: () => {},
    clear: () => {}
})

export const AuthenticationProvider: FunctionComponent<AuthenticationProviderProps> = (props) => {
    const [authenticationKey, setAuthenticationKey] = useState<AuthenticationContextProps['authenticationKey']>(undefined)

    useEffect(() => {
        const savedKeyRaw = localStorage.getItem(STORAGE_KEY)
        if (savedKeyRaw) {
            try {
                const parsedAuthenticationKey = JSON.parse(savedKeyRaw)
                setAuthenticationKey(parsedAuthenticationKey)
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
                        authorization: formatAuthenticationKey(authenticationKey)
                    }
                })
                if (res.status !== 200) {
                    logout()
                }
            }
        }, 30*1000)
        return () => clearInterval(interval)
    }, [authenticationKey])

    const login = (authKey: AuthenticationKey) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authKey))
        setAuthenticationKey(authKey)
    }

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY)
        setAuthenticationKey(null)
    }

    return <ContextAuthentication.Provider value={{
        authenticationKey, set: login, clear: logout
    }}>
        {props.children}
    </ContextAuthentication.Provider>
}
