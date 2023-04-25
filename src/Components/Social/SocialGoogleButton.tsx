import {FunctionComponent} from "react";
import {IconButton, Tooltip} from "@mui/material";
import {useGoogleLink} from "../../Hooks/UseGoogleLink";
import {GoogleIcon} from "../../Icons/Google";



export const SocialGoogleButton: FunctionComponent = () => {
    const googleLink = useGoogleLink('login')

    const onClick = () => {
        if (googleLink) {
            window.open(googleLink, '_parent')
        }
    }

    return (
        <Tooltip title='Connexion avec google'>
            <IconButton disabled={!googleLink} onClick={onClick}>
                <GoogleIcon/>
            </IconButton>
        </Tooltip>
    )
}
