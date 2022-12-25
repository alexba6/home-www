import {Fragment, ReactNode, SyntheticEvent, useState, FunctionComponent, useEffect} from 'react'
import { Tab, Tabs} from "@mui/material";
import {useHistory, useLocation} from "react-router-dom";

type TabPanelProps = {
    component: ReactNode
    index: number
    value: number
}

type TabItem = {
    name: string
    anchor: string
    component: ReactNode
}

type TabNavigationProps = {
    default?: number,
    tabs: TabItem[]
}

const TabPanel = (props: TabPanelProps) => {
    const { component, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && component}
        </div>
    )
}

export const TabNavigation: FunctionComponent<TabNavigationProps> = (props) => {
    const [tab, setTab] = useState(props.default || 0)
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        const anchor = location.hash.slice(1)
        const itemAnchor = props.tabs.find(tabItem => tabItem.anchor === anchor)
        if (itemAnchor) {
            setTab(props.tabs.indexOf(itemAnchor))
        }
    }, [setTab, location, props.tabs])

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setTab(newValue)
        history.push({ hash: props.tabs[newValue].anchor })
    }

    return <Fragment>
        <Tabs
            value={tab}
            onChange={handleChange}
            variant='scrollable'
            scrollButtons='auto'>
            {props.tabs.map((tab, index) => <Tab
                key={index}
                label={tab.name}/>
            )}
        </Tabs>
        <br/>
        {props.tabs.map((tabItem, index) => <TabPanel
            key={index}
            index={index}
            value={tab}
            component={tabItem.component}/>
        )}
    </Fragment>
}
