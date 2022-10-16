import { FunctionComponent, useContext } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


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
import { HomePage } from './Pages/HomePage'
import { DevicePage } from './Pages/DevicePage'
import {PoolApp} from "./Applications/Pool/App";
import {ApplicationContextProvider} from "./Context/ContextApplication";
import {LogoutPage} from "./Pages/LogoutPage";
import {Routes} from "./Config/Routes";
import { AccountPage } from './Pages/Account/AccountPage';

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
								<Route exact path={Routes.login.target} component={LoginPage} />
								<Route exact path={Routes.forgetPassword.target} component={ForgetPasswordPage} />
								<Route exact path={Routes.resetPassword.target} component={ResetPasswordPage} />

								<Route exact path={Routes.dashboard.target} component={DashboardPage} />

								<AuthenticatedRoutesWrapper>
									<Route path={Routes.account.target} component={AccountPage} />
									<Route path={Routes.logout.target} component={LogoutPage} />
									<Route exact path={Routes.home.target} component={HomePage}/>
									<Route exact path={Routes.device.target} component={DevicePage}/>
									<Route exact path='/device/pool'>
										<PoolApp/>
									</Route>
								</AuthenticatedRoutesWrapper>
								<ToastContainerTheme/>
							</ApplicationContextProvider>
						</BrowserRouter>
				</AuthenticationProvider>
			</Provider>
		</ThemeWrapper>
	)
}
