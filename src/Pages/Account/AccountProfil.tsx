import {FunctionComponent, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {unwrapResult} from "@reduxjs/toolkit";

import {AuthenticatedRouteProps} from "../../Context/ContextAuthentication";
import {Template} from "../../Template/Template";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../Store/User/UserActions";
import {Card, CardHeader} from "../../Components/Card/Card";
import {Input} from "../../Components/Input/Input";
import {userSelectInfo} from "../../Store/User/UserSelector";
import {Button} from "../../Components/Button/Button";


export const AccountProfilePage: FunctionComponent<AuthenticatedRouteProps> = (props) => {
    const { authenticationKey } = props

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch<any>()

    const userInfo = useSelector(userSelectInfo)

    useEffect(() => {
        if (!userInfo) {
            dispatch(userActions.getInfo({
                authenticationKey
            }))
        }
    }, [userInfo])

    useEffect(() => {
        if (userInfo) {
            const { username, firstName, lastName, email } = userInfo
            setUsername(username)
            if (firstName) {
                setFirstName(firstName)
            }
            if (lastName) {
                setLastName(lastName)
            }
            setEmail(email)
        }
    }, [userInfo])


    const updateProfile = async () => {
        const id = toast.loading('Modication du profil')
        try {
            unwrapResult(await dispatch(userActions.updateInfo({
                authenticationKey,
                user: {
                    username, firstName, lastName, email
                }
            })))
            toast.success('Profil modifié')
        } catch (e) {
            toast.error('Impossible de modifier le profil')
        } finally {
            toast.dismiss(id)
        }
    }

    return (
        <Template>
            <Card>
                <CardHeader>
                    <h3>Informations générales</h3>
                </CardHeader>
                {userInfo && <div>
                    <Input placeholder="No d'utilisateur" value={username} setValue={setUsername}/>
                    <Input placeholder='Email' value={email} setValue={setEmail}/>
                    <Input placeholder='Prénom' value={firstName} setValue={setFirstName}/>
                    <Input placeholder='Nom' value={lastName} setValue={setLastName}/>
                    <br/>
                    <Button onClick={updateProfile} variant='primary'>Enregistrer</Button>
                </div>}
            </Card>
        </Template>
    )
}
