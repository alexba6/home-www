import {FunctionComponent} from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { RoutesPath } from './Config/Routes'
import { store } from './Store'

import { LoginPage } from './Pages/LoginPage'
import { DashboardPage } from './Pages/DashboardPage'

import './Styles/var.sass'
import './Styles/index.module.sass'
import './Styles/layout.sass'

import { ForgetPasswordPage } from './Pages/ForgetPasswordPage'
import { ResetPasswordPage } from './Pages/ResetPasswordPage'
// import { AccountProfilePage } from './Pages/Account/AccountProfile'
import { ThemeWrapper } from './Context/ContextTheme'
import { SettingsThemePage } from './Pages/Settings/SettingsThemePage'
import { AccountSecurityPage } from './Pages/Account/AccountSecurity'
import { AccountAuthPage } from './Pages/Account/AccountAuth'

export const App: FunctionComponent = () => {
    return (
      <ThemeWrapper>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path={RoutesPath.login.target} element={<LoginPage/>}/>
              <Route path={RoutesPath.forgetPassword.target} element={<ForgetPasswordPage/>}/>
              <Route path={RoutesPath.resetPassword.target} element={<ResetPasswordPage/>}/>

              <Route path={RoutesPath.dashboard.target} element={<DashboardPage/>}/>

              {/*<Route path={RoutesPath.accountProfile.target} element={<AccountProfilePage/>}/>*/}
              <Route path={RoutesPath.accountSecurity.target} element={<AccountSecurityPage/>}/>
              <Route path={RoutesPath.accountAuth.target} element={<AccountAuthPage/>}/>

              <Route path={RoutesPath.settingsTheme.target} element={<SettingsThemePage/>}/>
            </Routes>
          </BrowserRouter>
        </Provider>
      </ThemeWrapper>

    )
}
