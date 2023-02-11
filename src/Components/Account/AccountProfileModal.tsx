import {ModalControl} from "../../Hooks/UseModalControl";
import {ChangeEvent, FunctionComponent, useEffect, useState} from "react";
import {ModalSimple} from "../Modal/SimpleModal";
import {Avatar, Button, Input, InputProps, Stack, TextField, Typography} from "@mui/material";


type AccountProfileUpdateNameModalProps = {
    control: ModalControl
    onSubmit: (firstName: string, lastName: string) => void
    firstName: string
    lastName: string
}

type AccountProfileUpdateUsernameModalProps = {
    control: ModalControl
    onSubmit: (username: string) => void
    username: string
}
type AccountProfileUpdateEmailModalProps = {
    control: ModalControl
    onSubmit: (email: string) => void
    email: string
}

type AccountAvatarModalProps = {
    control: ModalControl
    avatarUrl: string
    onSubmit: (file: File) => void
}

export const AccountProfileUpdateNameModal: FunctionComponent<AccountProfileUpdateNameModalProps> = (props) => {
    const [firstName, setFirstname] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)

    const handleSubmit = () => {
        props.onSubmit(firstName, lastName)
    }

    return (
        <ModalSimple
            title='Nom'
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
                    label='Prénom'
                    value={firstName}
                    onChange={event => setFirstname(event.target.value)}
                    sx={{ marginY: 1 }}
                    variant='outlined'/>
                <TextField
                    label='Nom'
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                    sx={{ marginY: 1 }}
                    variant='outlined'
                />
            </Stack>
        </ModalSimple>
    )
}


export const AccountProfileUpdateUsernameModal: FunctionComponent<AccountProfileUpdateUsernameModalProps> = (props) => {
    const [username, setUsername] = useState(props.username)

    const handleSubmit = () => {
        props.onSubmit(username)
    }

    return (
        <ModalSimple
            title="Nom d'utilisateur"
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
                    label="Nom d'utilisateur"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    sx={{ marginY: 1 }}
                    variant='outlined'/>
            </Stack>
        </ModalSimple>
    )
}


export const AccountProfileUpdateEmailModal: FunctionComponent<AccountProfileUpdateEmailModalProps> = (props) => {
    const [email, setEmail] = useState(props.email)

    const handleSubmit = () => {
        props.onSubmit(email)
    }

    return (
        <ModalSimple
            title="Email"
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
                    label="Email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    sx={{ marginY: 1 }}
                    variant='outlined'/>
            </Stack>
        </ModalSimple>
    )
}



export const AccountAvatarModal: FunctionComponent<AccountAvatarModalProps> = (props) => {
    const [file, setFile] = useState<File | null>(null)


    const handleSearchImage = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files && files.length > 0) {
            setFile(files[0])
        }
    }

    useEffect(() => {
        console.log(file)
    }, [file])

    return (
        <ModalSimple control={props.control} title='Photo de profil' footerButtons={file ? [
            {
                name: 'Annuler',
                color: 'error',
                onClick: () => {
                    setFile(null)
                    props.control.close()
                }
            },
            {
                name: 'Enregistrer',
                color: 'primary',
                onClick: () => {
                    setFile(null)
                    props.onSubmit(file)
                }
            }
        ] : []}>
            <Typography>
                Votre photo de profil aide les autres utilisateurs à vous reconnaître et vous permet de savoir quand vous êtes connecté à votre compte.
            </Typography><br/>
            {file ? <Stack justifyContent='center' alignItems='center' direction='row'>
                <Avatar
                    alt='Preview'
                    src={URL.createObjectURL(file)}
                    sx={{ width: 100, height: 100 }}
                />
            </Stack> : <Stack justifyContent='center' alignItems='center' direction='row'>
                <Input type='file' onChange={handleSearchImage} />
            </Stack>}
        </ModalSimple>
    )
}
