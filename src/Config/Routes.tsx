import PersonIcon from '@mui/icons-material/Person'
import { HomeIcon } from '../Icons/Sidebar/Home'
import { DashboardIcon } from '../Icons/Sidebar/Dashboard'
import { NotificationIcon } from '../Icons/Sidebar/Notification'
import { DeviceIcon } from '../Icons/Sidebar/Device'

import { RouteConfig } from "./RouteType";

import {LoginPage} from "../Pages/LoginPage";
import {ForgetPasswordPage} from "../Pages/ForgetPasswordPage";
import {ResetPasswordPage} from "../Pages/ResetPasswordPage";
import {DashboardPage} from "../Pages/DashboardPage";
import {HomePage} from "../Pages/HomePage";
import {DevicePage} from "../Pages/DevicePage";
import {NotificationsPage} from "../Pages/NotificationsPage";
import {AccountPage} from "../Pages/Account/AccountPage";
import {LogoutPage} from "../Pages/LogoutPage";

import {PoolAppPage} from "../Applications/Pool/App";
import {HeaterAppPage} from "../Applications/Heater/App";
import {SocialLoginPage} from "../Pages/SocialLoginPage";
import {SocialLinkPage} from "../Pages/SocialLinkPage";

type RoutesNames =
	'login' |
	'socialLink' |
	'socialLogin' |
	'forgetPassword' |
	'resetPassword' |
	'dashboard' |
	'home' |
	'device' |
	'notifications' |
	'account' |
	'logout' |
	'appHeater' |
	'appPool'


export const Routes: Record<RoutesNames, RouteConfig>  = {
	socialLink: {
		name: 'Social link',
		target: '/social-link',
		auth: true,
		component: SocialLinkPage
	},
	socialLogin: {
		name: 'Social',
		target: '/social-login',
		component: SocialLoginPage
	},
	login: {
		name: 'Login',
		target: '/login',
		component: LoginPage
	},
	forgetPassword: {
		name: 'Forget Password',
		target: '/forget-password',
		component: ForgetPasswordPage
	},
	resetPassword: {
		name: 'Reset Password',
		target: '/reset-password',
		component: ResetPasswordPage
	},
	dashboard: {
		name: 'Dashboard',
		target: '/',
		auth: true,
		icon: <DashboardIcon />,
		component: DashboardPage
	},
	home: {
		name: 'Maisons',
		target: '/home',
		auth: true,
		icon: <HomeIcon />,
		component: HomePage
	},
	device: {
		name: 'Appareils',
		target: '/device',
		auth: true,
		icon: <DeviceIcon />,
		component: DevicePage
	},
	notifications: {
		name: 'Notifications',
		auth: true,
		target: '/notifications',
		icon: <NotificationIcon />,
		component: NotificationsPage
	},
	account: {
		name: 'Account',
		target: '/account',
		auth: true,
		icon: <PersonIcon/>,
		component: AccountPage
	},
	logout: {
		name: 'Déconnexion',
		target: '/logout',
		component: LogoutPage
	},
	appPool: {
		name: 'Heater',
		target: '/app/heater',
		auth: true,
		component: HeaterAppPage
	},
	appHeater: {
		name: 'Pool',
		target: '/app/pool',
		auth: true,
		component: PoolAppPage
	}
}
