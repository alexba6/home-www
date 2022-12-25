import {ComponentType, FunctionComponent, ReactNode} from 'react'
import {AuthenticationContextProps} from "../Context/ContextAuthentication";

export type RouteConfig = {
    name: string
    icon?: ReactNode
    target: string
    component: FunctionComponent
    auth?: boolean
}
