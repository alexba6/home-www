import {FunctionComponent, ReactElement, ReactNode} from "react";
import {Box, Card, Typography} from "@mui/material";

type SettingsCardProps = {
    children: ReactNode
}


type SettingsCardHeaderProps = {
    title: string
    details?: string
}

type SettingsCardContentProps = {
    children: ReactNode
}

export const SettingsCard: FunctionComponent<SettingsCardProps> = (props) => {
    return (
        <Card sx={{
            padding: 3,
            marginY: 2
        }}>
            {props.children}
        </Card>
    )
}
export const SettingsCardHeader: FunctionComponent<SettingsCardHeaderProps> = (props) => {
    return <Box marginBottom={2}>
        <Typography variant='subtitle1'>
            {props.title}
        </Typography>
        <Typography variant='subtitle2'>
            {props.details}
        </Typography>
    </Box>
}

export const SettingsCardContent: FunctionComponent<SettingsCardContentProps> = (props) => {
    return (
        <Box marginY={2}>
            {props.children}
        </Box>
    )
}
