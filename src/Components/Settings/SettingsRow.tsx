import {FunctionComponent, ReactNode} from "react";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type SettingsRowLeftProps = {
    children: ReactNode
}

type SettingsRowLeftTitleProps = {
    title: string
}

type SettingsRowProps = {
    children: ReactNode
}

type SettingsRowContentProps = {
    children: ReactNode
}

type SettingsRowRightProps = {
    children: ReactNode
}

type SettingsRowRightButtonProps = {
    onClick: () => void
    disabled?: boolean
    item?: ReactNode
}

export const SettingsRow: FunctionComponent<SettingsRowProps> = (props) => {
    return (
        <Box paddingX={2} paddingY={2.5}>
            <Stack
                justifyContent='start'
                alignItems='center'
                direction='row'>
                {props.children}
            </Stack>
        </Box>
    )
}

export const SettingsRowLeft: FunctionComponent<SettingsRowLeftProps> = (props) => {
    return (
        <Box width='150px'>
            {props.children}
        </Box>
    )
}

export const SettingsRowLeftTitle: FunctionComponent<SettingsRowLeftTitleProps> = (props) => {
    return (
        <SettingsRowLeft>
            <Typography variant='subtitle2' width='70px'>
                {props.title}
            </Typography>
        </SettingsRowLeft>
    )
}


export const SettingsRowContent: FunctionComponent<SettingsRowContentProps> = (props) => {
    return (
        <Box>
            {props.children}
        </Box>
    )
}

export const SettingsRowRight: FunctionComponent<SettingsRowRightProps> = (props) => {
    return (
        <Box marginLeft='auto'>
            {props.children}
        </Box>
    )
}

export const SettingsRowRightButton: FunctionComponent<SettingsRowRightButtonProps> = (props) => {
    return (
        <Box marginLeft='auto'>
            <IconButton onClick={props.onClick} disabled={props.disabled}>
                {props.item ? props.item : <KeyboardArrowRightIcon/>}
            </IconButton>
        </Box>
    )
}
