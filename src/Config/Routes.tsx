// import { DashboardIcon } from '../Icons/Sidebar/Dashboard'
import { UserIcon } from '../Icons/Sidebar/User'
import { ReactNode } from 'react'
import { HomeIcon } from '../Icons/Sidebar/Home'
// import { DeviceIcon } from '../Icons/Sidebar/Device'
// import { NotificationIcon } from '../Icons/Sidebar/Notification'
import { SettingsIcon } from '../Icons/Sidebar/Settings'

export type RoutePath = {
	name: string,
	icon?: ReactNode,
	target: string
}


export const RoutesPath: {[key: string]: RoutePath} = {
	login: {
		name: 'Login',
		target: '/login'
	},
	forgetPassword: {
		name: 'Forget Password',
		target: '/forget-password'
	},
	resetPassword: {
		name: 'Reset Password',
		target: '/reset-password'
	},
	dashboard: {
		name: 'Dashboard',
		target: '/',
		// icon: <DashboardIcon/>
	},
	home: {
		name: 'Maison',
		target: '/home',
		icon: <HomeIcon/>
	},
	devices: {
		name: 'Appareils',
		target: '/devices',
		// icon: <DeviceIcon/>
	},
	notifications: {
		name: 'Notifications',
		target: '/notifications',
		// icon: <NotificationIcon/>
	},
	settingsHome: {
		name: 'Maisons',
		target: '/settings/home'
	},
	settingsTheme: {
		name: 'Thème',
		target: '/settings/theme'
	},
	settingsDevices: {
		name: 'Appareils',
		target: '/settings/devices'
	},
	settingsDashboard: {
		name: 'Dashboard',
		target: '/settings/dashboard'
	},
	accountProfile: {
		name: 'Profil',
		target: '/account/profile'
	},
	accountSecurity: {
		name: 'Sécurité',
		target: '/account/security'
	},
	accountAuth: {
		name: 'Sessions',
		target: '/account/auth'
	},
	accountLogout: {
		name: 'Déconnexion',
		target: '/account/logout'
	}
}
