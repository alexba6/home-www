import {FunctionComponent, ReactNode} from "react";
import {Box, Card, Typography} from "@mui/material";

type LayoutCardSettingProps = {
    title: string
    details?: string
    children: ReactNode
}

export const SettingsCard: FunctionComponent<LayoutCardSettingProps> = (props) => {
    return (
        <Card sx={{
            padding: 3,
            marginY: 2
        }}>
            <Typography variant='subtitle1'>
                {props.title}
            </Typography>
            <Typography variant='subtitle2'>
                {props.details}
            </Typography>
            <Box sx={{
                marginY: 2
            }}>
                {props.children}
            </Box>
        </Card>
    )
}
