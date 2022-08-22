import { FunctionComponent, useContext } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import { RoutesPath } from './Config/Routes'
import { store } from './Store'

import { LoginPage } from './Pages/LoginPage'
import { DashboardPage } from './Pages/DashboardPage'

import 'moment/locale/fr'
import './Styles/var.sass'
import './Styles/index.module.sass'
import './Styles/layout.sass'
import 'react-toastify/dist/ReactToastify.css'

import { ContextTheme, ThemeWrapper } from './Context/ContextTheme'
import {
	AuthenticatedRoutesWrapper,
	AuthenticationProvider,
} from './Context/ContextAuthentication'

import { ForgetPasswordPage } from './Pages/ForgetPasswordPage'
import { ResetPasswordPage } from './Pages/ResetPasswordPage'
import { SettingsThemePage } from './Pages/Settings/SettingsThemePage'
import { AccountSecurityPage } from './Pages/Account/AccountSecurity'
import { AccountAuthKeyPage } from './Pages/Account/AccountAuthKey'
import { AccountProfilePage } from './Pages/Account/AccountProfil'
import { HomePage } from './Pages/HomePage'
import { DevicePage } from './Pages/DevicePage'
import {PoolApp} from "./Applications/Pool/App";
import {ApplicationContextProvider} from "./Context/ContextApplication";
import {SettingsHomePage} from "./Pages/Settings/SettingsHomePage";
import {LogoutPage} from "./Pages/LogoutPage";

const ToastContainerTheme: FunctionComponent = () => {
	const themeContext = useContext(ContextTheme)

	return <ToastContainer position="bottom-right" autoClose={2000} theme={themeContext.theme} />
}

export const App: FunctionComponent = () => {
	return (
		<ThemeWrapper>
			<Provider store={store}>
				<AuthenticationProvider>
						<BrowserRouter>
							<ApplicationContextProvider>
								<Route exact path={RoutesPath.login.target} component={LoginPage} />
								<Route exact path={RoutesPath.forgetPassword.target} component={ForgetPasswordPage} />
								<Route exact path={RoutesPath.resetPassword.target} component={ResetPasswordPage} />

								<Route exact path={RoutesPath.dashboard.target} component={DashboardPage} />


								<Route exact path={RoutesPath.settingsTheme.target} component={SettingsThemePage} />

								<AuthenticatedRoutesWrapper>
									<Route path={RoutesPath.accountProfile.target} component={AccountProfilePage}/>
									<Route exact path={RoutesPath.accountAuth.target} component={AccountAuthKeyPage} />
									<Route exact path={RoutesPath.accountSecurity.target} component={AccountSecurityPage}/>
									<Route path={RoutesPath.accountLogout.target} component={LogoutPage}/>
									<Route exact path={RoutesPath.home.target} component={HomePage}/>
									<Route exact path={RoutesPath.device.target} component={DevicePage}/>
									<Route exact path={RoutesPath.settingsHome.target} component={SettingsHomePage}/>
									<PoolApp/>
								</AuthenticatedRoutesWrapper>
								<ToastContainerTheme/>
							</ApplicationContextProvider>
						</BrowserRouter>
				</AuthenticationProvider>
			</Provider>
		</ThemeWrapper>
	)
}
