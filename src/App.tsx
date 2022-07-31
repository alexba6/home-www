import {Fragment, FunctionComponent, useContext, useMemo} from 'react'
import { Provider } from 'react-redux'
import {BrowserRouter, Route, useHistory} from 'react-router-dom'

import { RoutesPath } from './Config/Routes'
import { store } from './Store'

import { LoginPage } from './Pages/LoginPage'
import { DashboardPage } from './Pages/DashboardPage'

import './Styles/var.sass'
import './Styles/index.module.sass'
import './Styles/layout.sass'

import { ThemeWrapper } from './Context/ContextTheme'
import {AuthenticationProvider, ContextAuthentication} from "./Context/ContextAuthentication"

import { ForgetPasswordPage } from './Pages/ForgetPasswordPage'
import { ResetPasswordPage } from './Pages/ResetPasswordPage'
import { SettingsThemePage } from './Pages/Settings/SettingsThemePage'
import { AccountSecurityPage } from './Pages/Account/AccountSecurity'
import { AccountAuthPage } from './Pages/Account/AccountAuth'
import {AccountProfilePage} from "./Pages/Account/AccountProfil";

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
                <Route path={RoutesPath.accountProfile.target}>
                    <AccountProfilePage authenticationKey={authenticationKey}/>
                </Route>
            </Fragment>
        )
    }
    return (
        <p></p>
    )
}

const RouteApp: FunctionComponent = () => {
    return <BrowserRouter>
        <ProtectedRoutes/>
        <Route exact path={RoutesPath.login.target} component={LoginPage}/>
        <Route exact path={RoutesPath.forgetPassword.target} component={ForgetPasswordPage}/>
        <Route exact path={RoutesPath.resetPassword.target} component={ResetPasswordPage}/>

        <Route exact path={RoutesPath.dashboard.target} component={DashboardPage}/>

        <Route exact path={RoutesPath.accountSecurity.target} component={AccountSecurityPage}/>
        <Route exact path={RoutesPath.accountAuth.target} component={AccountAuthPage}/>

        <Route exact path={RoutesPath.settingsTheme.target} component={SettingsThemePage}/>
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
