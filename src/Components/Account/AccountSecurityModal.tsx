import {ModalControl} from "../../Hooks/UseModalControl";
import {FunctionComponent, useState} from "react";
import {ModalSimple} from "../Modal/SimpleModal";
import {Button, IconButton, Stack, TextField} from "@mui/material";
import {useGoogleLink} from "../../Hooks/UseGoogleLink";
import {GoogleIcon} from "../../Icons/Google";


type AccountSecurityUpdatePasswordModalProps = {
    control: ModalControl
    onSubmit: (oldPassword: string, newPassword: string) => void
}

type AccountSecurityGoogleModalProps = {
    control: ModalControl
}


export const AccountSecurityUpdatePasswordModal: FunctionComponent<AccountSecurityUpdatePasswordModalProps> = (props) => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordC, setNewPasswordC] = useState('')

    const handleSubmit = () => {
        if (newPassword === newPasswordC) {
            props.onSubmit(oldPassword, newPassword)
        }
    }

    return (
        <ModalSimple
            title='Mot de passe'
            control={props.control}
            footerButtons={[
                {
                    name: 'Annuler',
                    color: 'error',
                    onClick: props.control.close
                },
                {
                    name: 'Modifier',
                    color: 'primary',
                    onClick: handleSubmit
                }
            ]}>
            <Stack>
                <TextField
                    label='Ancien mot de passe'
                    value={oldPassword}
                    type='password'
                    onChange={event => setOldPassword(event.target.value)}
                    sx={{ marginY: 1 }}
                    variant='outlined'/>
                <TextField
                    label='Nouveau mot de passe'
                    value={newPassword}
                    type='password'
                    onChange={event => setNewPassword(event.target.value)}
                    sx={{ marginY: 1 }}
                    variant='outlined'/>
                <TextField
                    label='Confirmation'
                    value={newPasswordC}
                    type='password'
                    onChange={event => setNewPasswordC(event.target.value)}
                    sx={{ marginY: 1 }}
                    variant='outlined'/>
            </Stack>
        </ModalSimple>
    )
}



export const AccountSecurityGoogleModal: FunctionComponent<AccountSecurityGoogleModalProps> = (props) => {
    const googleLink = useGoogleLink('link')

    const onLinkAccount = () => {
        if (googleLink) {
            window.open(googleLink, 'parent')
        }
    }

    return (
        <ModalSimple control={props.control} title='Google'>
            <p>Vous n'avez aucun compte Google lié à Home.</p>
            <br/>
            <Stack justifyContent='center' alignItems='center'>
                <Button variant='outlined' startIcon={<GoogleIcon/>} onClick={onLinkAccount}>
                    Ajouter
                </Button>
            </Stack>
        </ModalSimple>
    )
}
