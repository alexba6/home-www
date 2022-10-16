import { FunctionComponent, ReactNode, useState } from 'react'

import { TemplateSidebar} from "./TemplateSideBar";

import styles from './Template.module.sass'
import {TemplateHeader} from "./TemplateHeader";

type TemplateProps = {
	children: ReactNode
	nav?: FunctionComponent
}


type TemplateTopBarProps = {
	children: ReactNode
}

/**
 * @param props
 * @constructor
 */
export const TemplateTopBar: FunctionComponent<TemplateTopBarProps> = (props) => {
	return <div className={styles.templateTopBar}>
		{props.children}
	</div>
}

/**
 * @param props
 * @constructor
 */
export const Template: FunctionComponent<TemplateProps> = (props) => {
	const [displaySidebar, setDisplaySidebar] = useState(false)
	return (
		<div className={styles.templateContainer} display_menu={displaySidebar ? 'show' : 'hide'}>
			<TemplateHeader onOpenSidebar={() => setDisplaySidebar((s) => !s)} />
			<TemplateSidebar display={displaySidebar} onClose={() => setDisplaySidebar(false)}/>
			<div className={styles.templateContent}>
				{props.children}
			</div>
		</div>
	)
}
