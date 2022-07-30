import { FunctionComponent, MouseEvent, ReactNode, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { RoutePath, RoutesPath } from '../Config/Routes'

import { HomeLogo } from '../Icons/HomeLogo'
// import { SidebarIcon } from '../Icons/Sidebar/Sidebar'
import { ChevronIcon } from '../Icons/Sidebar/Chevron'
import { SettingsIcon } from '../Icons/Sidebar/Settings'

import styles from './Template.module.sass'
import { UserIcon } from '../Icons/Sidebar/User'
import {SidebarIcon} from "../Icons/Sidebar";

type TemplateProps = {
	children: ReactNode
}

type TemplateSidebarLinkProps = {
	routePath: RoutePath,
	badge?: ReactNode
}

type TemplateSidebarCategoryProps = {
	name: string
}

type TemplateSidebarProps = {
	display: boolean,
	onClose: () => void
}

type TemplateHeaderProps = {
	onOpenSidebar: () => void
}

type TemplateSidebarDropdownLinkProps = {
	children: ReactNode,
	name: string,
	target: string,
	itemsCount: number
	icon?: ReactNode,
}

/**
 * @param props
 * @constructor
 */
const TemplateSidebarCategory: FunctionComponent<TemplateSidebarCategoryProps> = (props) => {
	return (
		<div className={styles.templateSidebarCategory}>
			<h3>{props.name}</h3>
		</div>
	)

}

/**
 * @param props
 * @constructor
 */
const TemplateSidebarLink: FunctionComponent<TemplateSidebarLinkProps> = (props) => {
	const location = useLocation()
	const navigate = useNavigate()

	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		event.preventDefault()
		event.stopPropagation()
		navigate(props.routePath.target)
	}

	return (
		<li className={styles.templateSidebarLink}>
			<a href={props.routePath.target} onClick={handleClick}>
				<div className={styles.templateSidebarLinkFrame} active={location.pathname === props.routePath.target && 'active'}>
					<div className={styles.templateSidebarLinkIconFrame}>
						{props.routePath.icon}
					</div>
					<div>
						<span>{props.routePath.name}</span>
					</div>
					{props.badge && <div className={styles.templateSidebarLinkBadgeFrame}>
						{props.badge}
					</div>}
				</div>
			</a>
		</li>
	)
}

/**
 * @param props
 * @constructor
 */
export const TemplateSidebarDropdownLink: FunctionComponent<TemplateSidebarDropdownLinkProps> = (props) => {
	const location = useLocation()
	const [display, setDisplay] = useState(false)

	const handleClick = () => setDisplay(d => !d)

	return (
		<li>
			<div className={styles.templateSidebarDropdownLinkContainer} onClick={handleClick}>
				<div className={styles.templateSidebarLinkFrame} active={(!display && location.pathname.indexOf(props.target) !== -1) && 'active'}>
					<div className={styles.templateSidebarLinkIconFrame}>
						{props.icon}
					</div>
					<div>
						<span>{props.name}</span>
					</div>
					<div className={styles.templateSidebarDropdownLinkChevronFrame} display={display ? 'display' : 'hide'}>
						<ChevronIcon/>
					</div>
				</div>
				<div className={styles.templateSidebarDropdownLinkChildren} display={display ? 'display' : 'hide'} style={{
					height: display ? `${props.itemsCount * 45}px` : 0
				}}>
					<ul>
						{props.children}
					</ul>
				</div>
			</div>
		</li>

	)
}

/**
 * @param props
 * @constructor
 */
const TemplateHeader: FunctionComponent<TemplateHeaderProps> = (props) => {
	return (
		<div className={styles.templateHeader}>
			<div className={styles.templateHeaderHomeFrame}>
				<a href='/'>
					<HomeLogo/>
					<h1>Home</h1>
				</a>
			</div>
			<div className={styles.templateHeaderMenuBtnFrame}>
				<button onClick={props.onOpenSidebar}>
					<SidebarIcon/>
				</button>
			</div>
		</div>
	)
}

/**
 * @param props
 * @constructor
 */
const TemplateSidebar: FunctionComponent<TemplateSidebarProps> = (props) => {
	return (
		<div className={styles.templateSidebar} displayMenu={props.display ? 'show' : 'hide'}>
			<div className={styles.templateSidebarFrame}>
				<nav>
					<TemplateSidebarCategory name='Navigation'/>
					<ul>
						<TemplateSidebarLink routePath={RoutesPath.dashboard}/>
						<TemplateSidebarLink routePath={RoutesPath.home}/>
						<TemplateSidebarLink routePath={RoutesPath.devices}/>
						<TemplateSidebarLink routePath={RoutesPath.notifications}/>
						<TemplateSidebarDropdownLink name='Compte' target='account' icon={<UserIcon/>} itemsCount={4}>
							<TemplateSidebarLink routePath={RoutesPath.accountProfile}/>
							<TemplateSidebarLink routePath={RoutesPath.accountSecurity}/>
							<TemplateSidebarLink routePath={RoutesPath.accountAuth}/>
							<TemplateSidebarLink routePath={RoutesPath.accountLogout}/>
						</TemplateSidebarDropdownLink>
						<TemplateSidebarDropdownLink name='Paramètres' target='settings' icon={<SettingsIcon/>} itemsCount={4}>
							<TemplateSidebarLink routePath={RoutesPath.settingsDashboard}/>
							<TemplateSidebarLink routePath={RoutesPath.settingsHome}/>
							<TemplateSidebarLink routePath={RoutesPath.settingsDevices}/>
							<TemplateSidebarLink routePath={RoutesPath.settingsTheme}/>
						</TemplateSidebarDropdownLink>
					</ul>
				</nav>
			</div>
			<div className={styles.templateSidebarOpacityFrame} onClick={props.onClose}/>
		</div>
	)
}

/**
 * @param props
 * @constructor
 */
export const Template: FunctionComponent<TemplateProps> = (props) => {
	const [displaySidebar, setDisplaySidebar] = useState(false)

	return (
		<div className={styles.templateContainer} displayMenu={displaySidebar ? 'show' : 'hide'}>
			<TemplateHeader onOpenSidebar={() => setDisplaySidebar(s => !s)}/>
			<TemplateSidebar display={displaySidebar} onClose={() => setDisplaySidebar(false)}/>
			<div className={styles.templateContent}>
				{props.children}
			</div>
		</div>
	)
}
