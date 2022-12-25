import {FunctionComponent, useContext, useEffect} from 'react'
import { Provider } from 'react-redux'
import {BrowserRouter, Route, useHistory} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'moment/locale/fr'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './Styles/var.sass'
import './Styles/index.module.sass'
import './Styles/layout.sass'

import { store } from './Store'

import { ContextTheme, ThemeWrapper } from './Context/ContextTheme'
import { AuthenticationProvider, AuthenticationStatus, ContextAuthentication } from './Context/ContextAuthentication'

import {ApplicationContextProvider} from "./Context/ContextApplication";
import {Routes} from "./Config/Routes";
import {RouteConfig} from "./Config/RouteType";

type AppAuthenticatedRoutesProps = {
	route: RouteConfig
}

const ToastContainerTheme: FunctionComponent = () => {
	const themeContext = useContext(ContextTheme)
	return <ToastContainer position="bottom-right" autoClose={2000} theme={themeContext.theme} />
}

const AppAuthenticatedRoutes: FunctionComponent<AppAuthenticatedRoutesProps> = (props) => {
	const authContext = useContext(ContextAuthentication)
	const history = useHistory()

	const route = props.route

	useEffect(() => {
		if (authContext.status === AuthenticationStatus.DISCONNECTED && route.auth) {
			history.push(Routes.login.target)
		}
	}, [authContext.status, history, route.auth])

	if (route.auth && authContext.status !== AuthenticationStatus.CONNECTED) {
		return <></>
	}

	return <Route
		key={route.target}
		exact
		path={route.target}
		component={route.component}/>
}

export const App: FunctionComponent = () => {
	return (
		<ThemeWrapper>
			<Provider store={store}>
				<AuthenticationProvider>
						<BrowserRouter>
							<ApplicationContextProvider>
								{Object.values(Routes).map((route: RouteConfig) => <AppAuthenticatedRoutes key={route.target} route={route}/>)}
								<ToastContainerTheme/>
							</ApplicationContextProvider>
						</BrowserRouter>
				</AuthenticationProvider>
			</Provider>
		</ThemeWrapper>
	)
}
