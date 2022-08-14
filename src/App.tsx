import { FunctionComponent, useContext } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { RoutesPath } from './Config/Routes'
import { store } from './Store'

import { LoginPage } from './Pages/LoginPage'
import { DashboardPage } from './Pages/DashboardPage'

import 'moment/locale/fr'
import './Styles/var.sass'
import './Styles/index.module.sass'
import './Styles/layout.sass'
import 'react-toastify/dist/ReactToastify.css'

import { ThemeContext, ThemeWrapper } from './Context/ContextTheme'
import {
	AuthenticatedRoutesWrapper,
	AuthenticationProvider,
	ContextAuthentication
} from './Context/ContextAuthentication'

import { ForgetPasswordPage } from './Pages/ForgetPasswordPage'
import { ResetPasswordPage } from './Pages/ResetPasswordPage'
import { SettingsThemePage } from './Pages/Settings/SettingsThemePage'
import { AccountSecurityPage } from './Pages/Account/AccountSecurity'
import { AccountAuthPage } from './Pages/Account/AccountAuth'
import { AccountProfilePage } from './Pages/Account/AccountProfil'
import { HomePage } from './Pages/HomePage'
import { HomeDetailsPage } from './Pages/HomeDetailsPage'
import {PoolApp} from "./Applications/Pool/App";

const ToastContainerTheme: FunctionComponent = () => {
	const themeContext = useContext(ThemeContext)

	return <ToastContainer position="bottom-right" autoClose={2000} theme={themeContext.theme} />
}

export const App: FunctionComponent = () => {
	return (
		<ThemeWrapper>
			<Provider store={store}>
				<AuthenticationProvider>
					<BrowserRouter>
						<Route exact path={RoutesPath.login.target} component={LoginPage} />
						<Route exact path={RoutesPath.forgetPassword.target} component={ForgetPasswordPage} />
						<Route exact path={RoutesPath.resetPassword.target} component={ResetPasswordPage} />

						<Route exact path={RoutesPath.dashboard.target} component={DashboardPage} />

						<Route exact path={RoutesPath.accountAuth.target} component={AccountAuthPage} />

						<Route exact path={RoutesPath.settingsTheme.target} component={SettingsThemePage} />

						<AuthenticatedRoutesWrapper>
							<Route path={RoutesPath.accountProfile.target} component={AccountProfilePage}/>
							<Route exact path={RoutesPath.accountSecurity.target} component={AccountSecurityPage}/>
							<Route exact path={RoutesPath.home.target} component={HomePage}/>
							<Route exact path={RoutesPath.homeDetails.target} component={HomeDetailsPage}/>
							<PoolApp/>
						</AuthenticatedRoutesWrapper>
						<ToastContainerTheme/>
					</BrowserRouter>
				</AuthenticationProvider>
			</Provider>
		</ThemeWrapper>
	)
}
