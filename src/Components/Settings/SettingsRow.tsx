import {FunctionComponent, ReactNode} from "react";
import {Box, Divider, IconButton, Skeleton, Stack, Typography} from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type SettingsRowProps = {
    name: ReactNode
    value: string
    divider?: boolean
    children?: ReactNode
    onClick: () => void
}

export const SettingsRow: FunctionComponent<SettingsRowProps> = (props) => {
    return (
        <Box>
            <Stack
                justifyContent='start'
                alignItems='center'
                direction='row'
                sx={{
                    paddingX: 2,
                    paddingY: 3,
                }}>
                <Typography
                    variant='subtitle2'
                    sx={{
                        width: '150px'
                    }}>
                    {props.name}
                </Typography>
                <Typography variant='inherit'>
                    {props.value}
                </Typography>
                <Box sx={{
                    marginLeft: 'auto'
                }}>
                    <IconButton onClick={props.onClick}>
                        {props.children ? props.children : <KeyboardArrowRightIcon/>}
                    </IconButton>
                </Box>
            </Stack>
            {props.divider && <Divider/>}
        </Box>
    )
}
