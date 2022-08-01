import {Fragment, FunctionComponent, useContext, useMemo} from 'react'
import { Provider } from 'react-redux'
import {BrowserRouter, Route, useHistory} from 'react-router-dom'
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

import {ThemeContext, ThemeWrapper} from './Context/ContextTheme'
import {AuthenticationProvider, ContextAuthentication} from "./Context/ContextAuthentication"

import { ForgetPasswordPage } from './Pages/ForgetPasswordPage'
import { ResetPasswordPage } from './Pages/ResetPasswordPage'
import { SettingsThemePage } from './Pages/Settings/SettingsThemePage'
import { AccountSecurityPage } from './Pages/Account/AccountSecurity'
import { AccountAuthPage } from './Pages/Account/AccountAuth'
import {AccountProfilePage} from "./Pages/Account/AccountProfil";
import {Homepage} from "./Pages/HomePage";

const ProtectedRoutes: FunctionComponent = () => {
    const authenticationContext = useContext(ContextAuthentication)
    const history = useHistory()

    const authenticationKey = useMemo(() => authenticationContext.authenticationKey, [authenticationContext])

    if (authenticationKey === null) {
        history.push(RoutesPath.login.target)
    }

    if (authenticationKey) {
        return (
            <Fragment>
                <Route path={RoutesPath.accountProfile.target} component={AccountProfilePage}>
                    <AccountProfilePage authenticationKey={authenticationKey}/>
                </Route>
                <Route exact path={RoutesPath.accountSecurity.target}>
                    <AccountSecurityPage authenticationKey={authenticationKey}/>
                </Route>
                <Route exact path={RoutesPath.home.target}>
                    <Homepage authenticationKey={authenticationKey}/>
                </Route>
            </Fragment>
        )
    }
    return (
        <p></p>
    )
}

const RouteApp: FunctionComponent = () => {
    const themeContext = useContext(ThemeContext)

    return <BrowserRouter>
        <ProtectedRoutes/>
        <Route exact path={RoutesPath.login.target} component={LoginPage}/>
        <Route exact path={RoutesPath.forgetPassword.target} component={ForgetPasswordPage}/>
        <Route exact path={RoutesPath.resetPassword.target} component={ResetPasswordPage}/>

        <Route exact path={RoutesPath.dashboard.target} component={DashboardPage}/>

        <Route exact path={RoutesPath.accountAuth.target} component={AccountAuthPage}/>

        <Route exact path={RoutesPath.settingsTheme.target} component={SettingsThemePage}/>
        <ToastContainer position="bottom-right" autoClose={2000} theme={themeContext.theme}/>
    </BrowserRouter>
}

export const App: FunctionComponent = () => {
    return <ThemeWrapper>
        <Provider store={store}>
            <AuthenticationProvider>
                <RouteApp/>
            </AuthenticationProvider>
        </Provider>
    </ThemeWrapper>
}
