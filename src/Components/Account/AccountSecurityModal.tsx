import {ModalControl} from "../../Hooks/UseModalControl";
import {FunctionComponent, useState} from "react";
import {ModalSimple} from "../Modal/SimpleModal";
import {Stack, TextField} from "@mui/material";


type AccountSecurityUpdatePasswordModalProps = {
    control: ModalControl
    onSubmit: (oldPassword: string, newPassword: string) => void
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
